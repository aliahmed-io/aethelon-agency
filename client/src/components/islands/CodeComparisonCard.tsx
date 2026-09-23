"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const legacyRawCode = `// ❌ Commodity Theme: 47 jQuery plugins, 4MB payload, render-blocking
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

const modernRawCode = `// ✅ Aethelon Standard: Next.js 16 Server Action + Optimistic 0.2s State
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
    const code = activeTab === "modern" ? modernRawCode : legacyRawCode;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-terminal-card">
      {/* Terminal Titlebar */}
      <div className="code-terminal-titlebar">
        <div className="code-terminal-left">
          <div className="mac-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <span className="code-file-name">
            <Terminal size={14} className="code-file-icon" />
            engineering-manifesto.ts
          </span>
        </div>

        {/* Tab switchers */}
        <div className="code-tab-group">
          <button
            type="button"
            onClick={() => setActiveTab("modern")}
            className={cn("code-tab-btn", activeTab === "modern" && "is-active")}
          >
            <Zap size={13} />
            <span>Aethelon Standard</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("legacy")}
            className={cn("code-tab-btn", activeTab === "legacy" && "is-active-legacy")}
          >
            <span>Legacy Theme Bloat</span>
          </button>
        </div>

        {/* Copy button */}
        <button
          type="button"
          onClick={handleCopy}
          className="code-copy-btn"
          aria-label="Copy code snippet"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        </button>
      </div>

      {/* Code Editor Body */}
      <div className="code-terminal-body">
        <pre className="code-pre">
          <code>
            {activeTab === "modern" ? (
              <div className="code-syntax-stream">
                <div className="syn-comment">// Direct Shopify Storefront GraphQL query via Edge CDN</div>
                <div>
                  <span className="syn-keyword">export async function </span>
                  <span className="syn-function">addToCartAction</span>
                  <span className="syn-punct">(prevState: CartState, formData: FormData) &#123;</span>
                </div>
                <div className="pl-4">
                  <span className="syn-string">&apos;use server&apos;</span>;
                </div>
                <div className="pl-4">
                  <span className="syn-keyword">const </span>
                  <span className="syn-var">variantId = z.string().parse(formData.get(</span>
                  <span className="syn-string">&apos;variantId&apos;</span>
                  <span className="syn-var">));</span>
                </div>
                <div className="pl-4 syn-comment mt-1">// Sub-30ms Edge execution with optimistic cart dispatch</div>
                <div className="pl-4">
                  <span className="syn-keyword">const </span>
                  <span className="syn-punct">&#123; cart &#125; = </span>
                  <span className="syn-keyword">await </span>
                  <span className="syn-function">storefrontClient</span>
                  <span className="syn-punct">.cartLinesAdd(&#123;</span>
                </div>
                <div className="pl-8">
                  <span className="syn-prop">cartId: </span>
                  <span className="syn-function">getSessionCartId</span>(),
                </div>
                <div className="pl-8">
                  <span className="syn-prop">lines: </span>
                  <span className="syn-punct">[&#123; merchandiseId: variantId, quantity: 1 &#125;]</span>
                </div>
                <div className="pl-4">
                  <span className="syn-punct">&#125;);</span>
                </div>
                <div className="pl-4 mt-1">
                  <span className="syn-function">revalidateTag</span>
                  <span className="syn-punct">(</span>
                  <span className="syn-string">&apos;cart&apos;</span>
                  <span className="syn-punct">);</span>
                </div>
                <div className="pl-4">
                  <span className="syn-keyword">return </span>
                  <span className="syn-punct">&#123; success: </span>
                  <span className="syn-val">true</span>
                  <span className="syn-punct">, cart, latencyMs: </span>
                  <span className="syn-val">24</span>
                  <span className="syn-punct"> &#125;;</span>
                </div>
                <div>&#125;</div>
              </div>
            ) : (
              <div className="code-syntax-stream">
                <div className="syn-comment-red">// ❌ Commodity Theme: 47 jQuery plugins, 4MB payload, render-blocking</div>
                <div>
                  <span className="syn-val">$</span>(document).ready(<span className="syn-keyword">function</span>() &#123;
                </div>
                <div className="pl-4">
                  <span className="syn-val">$</span>(<span className="syn-string">&apos;select.single-option-selector&apos;</span>).on(<span className="syn-string">&apos;change&apos;</span>, <span className="syn-keyword">function</span>() &#123;
                </div>
                <div className="pl-8">
                  <span className="syn-keyword">var </span>variantId = <span className="syn-val">$</span>(<span className="syn-keyword">this</span>).val();
                </div>
                <div className="pl-8 syn-comment mt-1">// Bloated 12-second roundtrip via 8 tracking scripts</div>
                <div className="pl-8">
                  <span className="syn-val">$</span>.post(<span className="syn-string">&apos;/cart/add.js&apos;</span>, &#123; id: variantId, quantity: 1 &#125;)
                </div>
                <div className="pl-12">
                  .done(<span className="syn-keyword">function</span>() &#123;
                </div>
                <div className="pl-16">
                  location.reload(); <span className="syn-comment-red">// Full-page reload layout shift!</span>
                </div>
                <div className="pl-12">&#125;);</div>
                <div className="pl-4">&#125;);</div>
                <div>&#125;);</div>
              </div>
            )}
          </code>
        </pre>
      </div>

      {/* Terminal Footer Specs */}
      <div className="code-terminal-footer">
        <span className="terminal-badge-live">
          <ShieldCheck size={14} />
          Strict TypeScript ON · 100% Zero Runtime Warnings
        </span>
        <span className="terminal-specs-text">
          Next.js 16.3 · Turbopack · Sub-100ms TTFB
        </span>
      </div>
    </div>
  );
}

