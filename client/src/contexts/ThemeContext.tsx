"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (switchable) {
      setTheme(getStoredTheme(defaultTheme));
    }
    setIsMounted(true);
  }, [defaultTheme, switchable]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;

    if (switchable && isMounted) {
      try {
        window.localStorage.setItem("theme", theme);
      } catch {
        // A blocked storage area should never prevent the site from rendering.
      }
    }
  }, [isMounted, switchable, theme]);

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
