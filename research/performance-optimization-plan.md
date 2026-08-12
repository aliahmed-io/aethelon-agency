# Commerce Studio performance optimization plan

## Executive assessment

The visual quality should not be reduced. The Lighthouse result points to a delivery and architecture problem rather than a styling problem: **LCP is 6.4 s, Speed Index is 10.1 s, the payload is 3,170 KiB, and Lighthouse reports approximately 500 ms of render-blocking savings and 610 ms of document-request latency**. TBT is already 0 ms and CLS is already strong at 0.012, so the work should preserve the existing layout stability and avoid adding JavaScript-heavy animation or new third-party packages.

The current code inspection found five high-impact causes:

1. `app/layout.tsx` exports `dynamic = "force-dynamic"`, preventing the mostly-static editorial site from using the strongest static/cached delivery path.
2. `SiteChrome` imports `Header` and `Footer` from the monolithic `client/src/pages/Site.tsx`, while that file is a client module containing all pages, all page data, forms, galleries, filters, and interactive sections. This makes the shared client graph much larger than necessary.
3. `client/src/lib/insights.ts` contains the full body of all 12 articles and is imported by the client-side Site module, even though the Insights index only needs summaries and the article detail route can render its body on the server.
4. The hero image is marked `unoptimized`, and the fill images do not consistently declare responsive `sizes`. That can prevent the browser from receiving the smallest appropriate image and makes the LCP resource harder to prioritize correctly.
5. The global CSS imports Google Fonts through a render-blocking CSS `@import`, and the whole route is wrapped in a 480 ms opacity/transform entrance animation. Both are unnecessary on the first paint.

## Important target correction

“Under 300 ms” needs to be split into targets. A full public-page cold load below 300 ms cannot be guaranteed across mobile networks because it includes DNS, connection setup, server response, HTML, font/image transfer, and browser rendering. The practical target is:

| Measurement | Target |
|---|---:|
| Work / Insights filter response after click | **under 50 ms** on a mid-range mobile device |
| Client route transition after the user clicks a nav link | **under 300 ms perceived** on a warm connection |
| FCP on a normal cached deployment | **under 1.0 s** |
| Mobile LCP | **under 2.5 s**, moving toward 1.8–2.0 s |
| CLS | Keep **under 0.05**; current 0.012 is already good |
| Initial HTML + critical JS/CSS | Aim for **under 500–700 KiB compressed** |
| Above-the-fold image | Aim for **under 100–150 KiB** at the tested viewport |
| Lighthouse mobile Performance | First milestone **90+**, then optimize the remaining network variance |

The filter target is genuinely achievable. The cold-load target should be reported separately so a fast interaction result is not confused with an unrealistic laboratory network promise.

## P0 — fix the critical path first

### 1. Remove `force-dynamic` from the root layout

Remove `export const dynamic = "force-dynamic"` from `app/layout.tsx`. The public routes are primarily static content, and the contact/newsletter demo writes to browser storage rather than requiring a per-request server response. Let Next.js prerender and cache the pages. If a future route truly needs request-time data, scope the dynamic behavior to that route rather than the root layout.

**Expected impact:** lower document latency, better cacheability, faster first byte, and fewer repeated server renders.

### 2. Split the monolithic client module into server pages and small interactive islands

Keep the editorial markup and content in Server Components. Move only these pieces behind client boundaries:

| Interactive island | Keep client-side because |
|---|---|
| Theme toggle and mobile menu | Uses local storage, `window`, and state |
| Home service accordion | Uses open/close state |
| Product demo controls | Uses local state |
| FAQ accordion | Uses open/close state |
| Work filter controls | Uses filter state |
| Insights topic filter | Uses topic state |
| Contact form | Uses submission state and browser validation |
| Case-study gallery and Back to Top | Uses active slide and scroll state |

The header, footer, page copy, article bodies, article cards, work cards, and SEO JSON-LD should stay server-rendered. `SiteChrome` should no longer import `Header` and `Footer` from `Site.tsx`; it should import small shell components instead. This follows Next.js guidance to keep `use client` boundaries narrow because a client module pulls its imports and directly rendered graph into the browser bundle [1].

**Expected impact:** the homepage and each route receive only the JavaScript needed by that route instead of the entire site module.

### 3. Split Insights data into index summaries and server-only article bodies

Create a lightweight `insight-index.ts` containing only slug, title, excerpt, category, tags, date, read time, stat, and stat label. Keep the long sections, proof lists, and citations in the server-side article data module. The Insights index should not send all article paragraphs to the browser merely to render a list of cards.

Precompute topic counts once from the index records instead of running a full filter for every pill on every render. The current 12-article archive is small, but this prevents the cost from growing linearly with every new article.

**Expected impact:** materially smaller route payload and faster hydration for `/insights`.

## P1 — fix image and font delivery without changing the visual system

### 4. Optimize the hero as the LCP resource

Keep the same hero artwork, but remove `unoptimized` and configure it as the single early image:

```tsx
<Image
  src={heroImage}
  alt="Abstract product composition..."
  fill
  preload
  sizes="(max-width: 900px) 100vw, 50vw"
  quality={70}
  className="cover-image"
/>
```

Use `preload` only for the hero; do not preload footer or below-the-fold images. Next.js documents that responsive `sizes` controls the generated `srcset`, while the LCP image is the appropriate candidate for early loading [2]. The hero parent must retain its explicit `position: relative` and height, which the prior repair already established.

### 5. Add accurate `sizes` to every fill image

Use these defaults:

| Context | `sizes` |
|---|---|
| Home hero | `(max-width: 900px) 100vw, 50vw` |
| Home work cards | `(max-width: 760px) 100vw, 55vw` |
| Two-column work archive | `(max-width: 760px) 100vw, 45vw` |
| Split statement image | `(max-width: 760px) 100vw, 50vw` |
| Case-study gallery | `(max-width: 760px) 100vw, 70vw` |

Keep gallery thumbnails lazy and remove `priority` from the footer mark. Use `quality={65–75}` for editorial thumbnails and retain a higher quality only for the active case-study hero if needed. The composition remains the same; only the delivered pixel dimensions change.

### 6. Replace the CSS font import with `next/font`

Load Space Grotesk and DM Sans through `next/font/google` in the root layout, map the generated variables to `--font-display` and `--font-body`, and remove the Google Fonts `@import` from `index.css`. This keeps the type pairing while avoiding a separate render-blocking stylesheet request and giving Next.js control over font delivery.

If the final deployment environment cannot fetch fonts at build time, the fallback plan is to self-host the exact WOFF2 files and preload only the two weights used above the fold. Do not add more font weights.

## P1 — reduce visual and JavaScript work

### 7. Do not animate the entire first route into visibility

Change the global `.route-page` animation from a 480 ms `opacity: 0` entrance to either no initial animation or a short 140–180 ms transform-only transition after navigation. The first content should be visible immediately; preserve motion on deliberate interactions and route changes without making LCP wait for a full-page fade.

Respect `prefers-reduced-motion: reduce` by disabling nonessential transitions.

### 8. Reduce prefetch pressure on long archives

Keep normal prefetching for the main header navigation. Set `prefetch={false}` on the many Work and Insights card links if the network dependency tree shows that viewport prefetch is competing with the LCP request. This is a network prioritization change, not a visual change; clicking a card remains fully functional.

### 9. Remove unused dependencies and reduce package imports only after measurement

Confirm whether `framer-motion`, unused Radix components, and other template dependencies are imported by the production graph. Remove only dependencies with no import path. Keep `lucide-react` icons, but use direct named imports and consider `experimental.optimizePackageImports` only if the bundle report confirms icon overhead.

Do not add a performance library, client-side data-fetching library, or animation framework to solve this page. The current problem is too much shared code and too much network work, not a lack of tooling.

## P2 — filtering and sorting speed

The current Work filter already uses `useMemo`, and the Insights filter already filters a small in-memory list. With six projects and twelve notes, the raw filter operation is not large enough to explain multi-second Lighthouse behavior. The likely perceived delay comes from the shared client bundle, route animation, image work, and re-rendered list layout.

Implement the following after the critical-path work:

1. Move filter controls into a small client island and keep card content server-rendered where possible.
2. Precompute industry, service, and topic indexes at module scope.
3. Use stable arrays and stable keys; do not create filter metadata inside the render loop.
4. Use `startTransition` for filter state updates only if a larger archive makes rendering visibly expensive.
5. Avoid animating every card on filter changes. Keep the existing hover treatment, but render the new filtered slice immediately.
6. If sorting is added, sort a precomputed summary array and preserve the existing editorial order as the default.

## P3 — verification loop

Run the same Lighthouse configuration before and after each milestone. Do not compare one good run to one bad run; capture at least three runs and use the median.

| Milestone | Verification |
|---|---|
| Baseline | Lighthouse mobile and desktop; record LCP subparts and network waterfall |
| After static delivery | Verify HTML response timing, cache headers, and route build output |
| After client split | Compare transferred JS and hydration time per route |
| After image/font pass | Confirm hero request, intrinsic size, `srcset`, and LCP element |
| After filter pass | Measure click-to-painted-result with a Performance trace |
| Final | Run TypeScript, production build, Lighthouse, 1280 px screenshot, and 390 px screenshot |

Success means: **the hero remains visually identical, the filter result updates in under 50 ms on a representative device, route transitions feel under 300 ms on a warm connection, LCP falls below 2.5 s on mobile, and the site’s Lighthouse performance score reaches at least 90 under the same test configuration**.

## Recommended implementation order

1. Remove `force-dynamic` and replace the blocking font import.
2. Split `Site.tsx` into route-level server components and small interactive islands.
3. Separate Insights index data from full article bodies.
4. Optimize the hero and all fill-image `sizes`; remove footer preloading.
5. Shorten or remove the first-paint route animation.
6. Measure bundle and network changes.
7. Optimize filter metadata and archive link prefetch behavior.
8. Re-run Lighthouse and responsive visual checks.

## Sources

[1]: https://nextjs.org/docs/app/getting-started/server-and-client-components "Next.js Server and Client Components"
[2]: https://nextjs.org/docs/app/api-reference/components/image "Next.js Image Component API"
[3]: https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint "Chrome Lighthouse Largest Contentful Paint"
