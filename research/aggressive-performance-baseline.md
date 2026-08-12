# Aggressive performance baseline

Live preview route: `https://3000-iorhlexdkvq1co76jzosf-c2ce0a29.sg1.manus.computer/`

The Home route’s initial navigation entry reported `responseStart` at about 87 ms and DOMContentLoaded at about 167 ms, but the browser load event completed around 1.1 s. This indicates that the perceived multi-second delay is not explained by server HTML generation alone.

The hero image is loaded through the Next.js image endpoint at 640×360 for a rendered box of roughly 655×1053 px. The below-fold “Abstract product form” image and footer mark were still incomplete at inspection time, confirming that deferred image loading is observable as blank or late content. Work-card images were already complete at 640 px wide. The route-page animation is disabled (`animation: none`, opacity 1, transform none), so future perceived navigation delay should be addressed through route code, image preloading, and transition feedback rather than by removing that animation again.

The page has 20+ internal links, including many archive and case-study links. Archive prefetch pressure should remain disabled, while the primary navigation can be prefetched or warmed explicitly on intent.

After the aggressive asset pass, the hero, work cards, and brand mark are served as compact WebP files through `/_next/image`; the observed transfer sizes were approximately 5.3 KB for the hero and 7.7–10.5 KB per work image at the rendered 640px width. The hero preload is present and all above-fold work images were complete during inspection. One below-fold service image and the footer mark remained deferred, which is expected lazy-loading behavior but should be monitored for perceived blank regions during long-page scroll.

A fixed `.route-progress` signal is present for same-origin navigation. It provides immediate feedback without blocking or hiding the current page while the next route loads. The runtime-safe WebP CDN derivatives render correctly; the project-private `/manus-storage/` paths returned 404 and were not wired into the app.

The live Home-to-Work navigation completed with a new-document timing of roughly 857ms response start, 967ms DOMContentLoaded, and 1.77s load in the public preview. The route-progress signal cleared after destination render. Above-fold Work images were complete, while later cards and the footer mark remained lazy/deferred; those are the next candidates for intent-based preloading rather than global eager loading.

After the final asset and navigation pass, the Home hero and the first three Work images load as verified Next.js WebP responses with `complete: true`; the route-progress element is present but hidden at rest. The below-fold split image and footer mark remain intentionally deferred, avoiding unnecessary first-load bandwidth while preserving the visual composition.

The final hover-then-click test reached `/work` successfully with the primary navigation warmed by intent prefetch. The Work archive rendered all six cards with the compact WebP sources and preserved the existing filter taxonomy and editorial layout. No transition overlay remained stuck after navigation.

## Route-split verification — 2026-08-12

- The isolated Home route renders the self-hosted DM Sans and Space Grotesk files, the warm-paper hero, and WebP CDN assets without visual regression.
- Home → Work navigation reaches the isolated Work route successfully; the Work archive renders all six projects and preserves both filter systems.
- The live HTML references Next.js image optimization URLs backed by the compact WebP CDN derivatives.
- The transition signal and navigation shell remain present; final timing should be measured with browser performance marks rather than inferred from the page screenshot.
