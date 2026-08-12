# Route split verification

## Initial browser checkpoint — 2026-08-12

- `/` rendered successfully with the Paper Signal hero, optimized CDN image, navigation, work cards, interactive proof-of-concept, FAQ, and footer.
- `/services` rendered successfully with the service architecture, six service articles, CTA, navigation, and footer.
- `/about` rendered successfully with its studio narrative, rhythm, principles, CTA, navigation, and footer.
- `/insights` rendered successfully with all 12 evidence-backed notes, topic pills, article links, SEO preview, and newsletter form.
- The archive filter controls were visible and interactive in the live page; the attempted AI Commerce click did not change the rendered result count in this browser pass, so the filter behavior remains a follow-up validation item rather than being marked as passed.
- The later direct DOM check was first run while the browser was still on the 404 route, so it was not evidence about the archive filter. The Insights route has since been reopened for a deterministic check.
- On the reopened Insights route, the direct DOM click found the AI Commerce button but the archive still rendered “Showing 12 of 12 notes” after the click. This is recorded as a likely filter interaction defect requiring source inspection before final delivery.
- A second DOM check confirmed the AI Commerce button exists and receives a click, but the active button remains “All” and the rendered article-card count remains 12. The browser console showed no runtime error, so the issue appears to be isolated to event attachment or the loaded client bundle rather than a render crash.
- The AI Commerce button reports `disabled: false`, `pointer-events: auto`, and is now physically within the viewport after scrolling. The next check will use a direct browser click at its visible position.
- Both a visible element-index click and a coordinate click left the active topic at “All” with 12 notes. The source and exact file headers confirm valid `'use client'` directives on both `InsightsPage` and `SiteChrome`, so this needs a focused runtime diagnosis rather than being attributed to a missing client boundary.
- A clean reload reproduced the issue: after 800ms, clicking AI Commerce still left `aria-pressed` on All, the result copy at “Showing 12 of 12 notes,” and 12 visible cards. This is reproducible across fresh documents.
- Runtime inspection found no `__reactProps$` markers on either the shared dark-mode button or the Insights topic button, no `#__next` root, and no `data-reactroot`. The document is serving the server-rendered HTML but is not hydrating the React client tree, which explains the non-functional filters and likely affects other page interactions in this preview.
- Performance entries show `main-app.js`, `app-pages-internals.js`, `app/insights/page.js`, and `not-found.js` requested; the script list also contains the Insights page chunk. The unresolved issue is therefore likely within chunk execution or the preview’s runtime instrumentation, not an absent script tag.
- A comparison check on `/work` did not click a filter because the test selector expected `.work-filters` and a bare `BEAUTY` label; the returned result showed `clicked: false`. No Work filter defect is inferred from that attempt.
- A correctly targeted Work filter click also left “All” active and six cards visible. The live page reports Next 16.3.0 and a loaded webpack runtime, but `window.React` and `window.ReactDOM` are undefined. The current preview therefore renders the App Router document without attaching the client component event tree in this browser session.
- Isolated production validation on a standalone `next start` server succeeded: the AI Commerce button had React props attached, changed active state to “AI Commerce,” reduced the archive to 3 cards, and updated the result copy to “Showing 3 of 12 notes.” The interaction defect is confined to the managed development preview runtime, not the extracted route code or production build.
- `/contact` rendered successfully with the full project-intake form, direct email fallback, navigation, and footer.
- `/work/form-and-function` rendered successfully as a static case-study route with three gallery thumbnails, project metadata, honest metric placeholders, CTA, and footer.
- An unknown path rendered the custom editorial 404 with a homepage escape route. The dark-mode control responded visually on the 404 route, confirming the shared shell remains interactive.
- The extracted routes returned the expected editorial content and no visible blank states or image failures in the live preview.

## Remaining checks

- Verify `/about`, `/insights`, `/contact`, one case-study route, and the custom 404.
- Exercise Insights topic filtering, Work filtering, case-study gallery controls, dark mode persistence, and contact form success flow.
