"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

function getStoredTheme(defaultTheme: Theme): Theme {
  try {
    const storedTheme = window.localStorage.getItem("theme");
    return storedTheme === "dark" || storedTheme === "light" ? storedTheme : defaultTheme;
  } catch {
    return defaultTheme;
  }
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  // Keep the server and first client render identical. Reading localStorage in
  // the useState initializer causes hydration mismatches on returning visitors.
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    if (switchable) {
      const stored = getStoredTheme(defaultTheme);
      if (stored !== defaultTheme) {
        setTheme(stored);
      }
    }
  }, [defaultTheme, switchable]);

  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute("data-theme") !== theme) {
      root.classList.toggle("dark", theme === "dark");
      root.setAttribute("data-theme", theme);
      root.style.colorScheme = theme;
    }

    if (switchable && isMountedRef.current) {
      try {
        window.localStorage.setItem("theme", theme);
      } catch {
        // A blocked storage area should never prevent the site from rendering.
      }
    }
  }, [switchable, theme]);

  const value = useMemo<ThemeContextType>(() => ({
    theme,
    switchable,
    toggleTheme: switchable
      ? () => setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"))
      : undefined,
  }), [switchable, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
