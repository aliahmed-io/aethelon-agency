# Performance planning sources

## Next.js 16.3 image optimization

Source: [Next.js Image Optimization](https://nextjs.org/docs/app/getting-started/images)

Key findings: `next/image` can serve correctly sized modern formats, reserve image space to reduce layout shift, and lazy-load below-the-fold images. Remote images require explicit dimensions or `fill` with a positioned parent, plus a correctly scoped `remotePatterns` configuration.

Source: [Next.js Image Component API](https://nextjs.org/docs/app/api-reference/components/image)

Key findings: responsive `sizes` affects the generated `srcset`; missing or inaccurate sizes can cause unnecessarily large downloads. In Next.js 16, `priority` is deprecated in favor of `preload`; the documentation recommends using `loading="eager"` or `fetchPriority="high"` in most cases. The LCP image is the appropriate candidate for early loading, while below-the-fold images should remain lazy.

## Next.js server/client boundaries

Source: [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)

Key findings: Server Components reduce the amount of JavaScript sent to the browser and can improve FCP. Once a module is marked `use client`, its imports and directly rendered component graph are included in the client bundle. The guidance is to keep client boundaries narrow and isolate interactivity to the components that need state, event handlers, or browser APIs.

## Lighthouse LCP

Source: [Chrome Lighthouse — Largest Contentful Paint](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint)

Key findings: LCP measures when the largest visible content element is rendered. For mobile, 0–2.5 seconds is considered fast, 2.5–4 seconds moderate, and over 4 seconds slow. The LCP breakdown is TTFB, load delay, load time, and render delay; each part needs a different remedy.

## Project baseline notes

The user-provided Lighthouse run reported FCP 1.4 s, LCP 6.4 s, TBT 0 ms, CLS 0.012, Speed Index 10.1 s, a 3,170 KiB total payload, approximately 610 ms of document request latency, approximately 500 ms of render-blocking savings, 22 KiB of JavaScript minification savings, 65 KiB of unused JavaScript, and two long tasks.

Current source inspection found a global Google Fonts CSS import, a monolithic client `Site.tsx` imported by the shared `SiteChrome`, full article data imported into that client module, a dynamic `force-dynamic` root layout, an unoptimized above-the-fold hero image, and unnecessary `priority` flags on footer logo images. Work and Insights filtering already use `useMemo`, but topic counts repeatedly scan the full Insights corpus during render and both page routes inherit the large client graph.
