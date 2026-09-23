"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const legacyThemeCode = `// ❌ Commodity Theme: 47 jQuery plugins, 4MB payload, render-blocking
$(document).ready(function() {
  $('select.single-option-selector').on('change', function() {
    var variantId = $(this).val();
    // Bloated 12-second roundtrip via 8 tracking scripts
    $.post('/cart/add.js', { id: variantId, quantity: 1 })
      .done(function() {
        location.reload(); // Full-page reload layout shift!
      });
  });
});`;

const aethelonModernCode = `// ✅ Aethelon Standard: Next.js 16 Server Action + Optimistic 0.2s State
export async function addToCartAction(prevState: CartState, formData: FormData) {
  'use server';
  const variantId = z.string().parse(formData.get('variantId'));
  
  // Direct Shopify Storefront GraphQL query via Edge CDN
  const { cart } = await storefrontClient.cartLinesAdd({
    cartId: getSessionCartId(),
    lines: [{ merchandiseId: variantId, quantity: 1 }]
  });

  revalidateTag('cart');
  return { success: true, cart, latencyMs: 24 };
}`;

export default function CodeComparisonCard() {
  const [activeTab, setActiveTab] = useState<"modern" | "legacy">("modern");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = activeTab === "modern" ? aethelonModernCode : legacyThemeCode;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-[#0d0e12] text-neutral-100 shadow-2xl overflow-hidden">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#16171d] border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
          </div>
          <span className="ml-3 text-xs font-mono text-neutral-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-neutral-500" />
            engineering-manifesto.ts
          </span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-neutral-800">
          <button
            type="button"
            onClick={() => setActiveTab("modern")}
            className={cn(
              "px-3 py-1 text-xs font-mono rounded-md transition-colors flex items-center gap-1.5",
              activeTab === "modern"
                ? "bg-orange-600 text-white font-semibold shadow-sm"
                : "text-neutral-400 hover:text-white"
            )}
          >
            <Zap className="w-3 h-3" /> Aethelon Standard
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("legacy")}
            className={cn(
              "px-3 py-1 text-xs font-mono rounded-md transition-colors flex items-center gap-1.5",
              activeTab === "legacy"
                ? "bg-neutral-800 text-white font-semibold"
                : "text-neutral-400 hover:text-white"
            )}
          >
            Legacy Theme Bloat
          </button>
        </div>

        {/* Copy button */}
        <button
          type="button"
          onClick={handleCopy}
          className="text-neutral-400 hover:text-white transition-colors p-1"
          aria-label="Copy code snippet"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Code Editor Body */}
      <div className="p-5 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed bg-[#0b0c10]">
        <pre className="text-neutral-300">
          <code>{activeTab === "modern" ? aethelonModernCode : legacyThemeCode}</code>
        </pre>
      </div>

      {/* Terminal Footer Specs */}
      <div className="px-5 py-3 bg-[#111217] border-t border-neutral-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-400 gap-2">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          Strict TypeScript ON · 100% Zero Runtime Warnings
        </span>
        <span className="text-neutral-500">
          Next.js 16.3 · Turbopack · Sub-100ms TTFB
        </span>
      </div>
    </div>
  );
}
