# Ask Phill transition reference

Source: https://askphill.com/

The live homepage presents a dark, highly animated agency experience with a compact header, a large hero headline, and an image carousel/stack. The reference uses motion and visual continuity to make the site feel responsive, but the relevant lesson for Commerce Studio is not to add a heavy animation layer. Commerce Studio should use a short, opacity/transform-only route transition that begins immediately on navigation, preserves the existing paper layout, and never blocks the next page or masks slow image requests.

The current Lighthouse attachment reports FCP 1.6 s, LCP 2.4 s, TBT 20 ms, CLS 0, and Speed Index 7.4 s. Its strongest actionable signals are 393 KiB of unused JavaScript, one long task, forced reflow, render-blocking requests, and incomplete robots.txt/llms.txt fetching. The new pass must prioritize route-code reduction and image request reliability over decorative motion.
