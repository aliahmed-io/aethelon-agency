# Commerce Studio SEO improvement plan

## Positioning and measurement

The knowledge hub should target the intersection of **custom ecommerce development**, **Next.js storefronts**, **AI commerce**, **3D product experience**, **cart recovery**, and **technical SEO**. The goal is not to promise rankings. The goal is to build a site that search engines can understand, shoppers can trust, and the studio can improve with evidence.

| Horizon | Primary work | Success signals |
| --- | --- | --- |
| 0–30 days | Crawl/indexation baseline, metadata, canonical URLs, sitemap, robots, route status codes, internal links, Search Console setup | All canonical routes discovered; no accidental noindex; 404s are intentional; Core Web Vitals baseline recorded |
| 31–90 days | Publish and internally link the 12 knowledge notes, add Article/Breadcrumb/Organization/Product/Review schema only where truthful, improve category and project copy | Qualified impressions and clicks by topic; indexed article coverage; non-brand query growth; scroll depth and assisted contact starts |
| 91–180 days | Refresh articles from query data, add supporting comparison pages, earn relevant links, improve product/category templates, test snippets and calls to action | More qualified landing-page sessions; better assisted conversions; stable or improving CWV; fewer zero-result and thin-content routes |

## Technical foundation

The site should keep native Next.js route segments and server-rendered content for core pages, articles, case studies, and future product pages. Google describes JavaScript SEO as a crawl → render → index process and recommends server-side or pre-rendering because it improves speed and helps crawlers that do not run JavaScript.[1]

Every indexable route should have one descriptive title, one concise meta description, one visible H1, a canonical URL, a meaningful HTTP status, and crawlable `<a href>` links. Filter and sort states should remain client-side controls unless they create a genuinely useful, indexable landing page; otherwise, canonicalize them to the parent archive to avoid duplicate variants.[2]

The implemented foundation now includes a generated sitemap, robots rules, route-level metadata, canonical URLs, Open Graph/Twitter metadata, Article JSON-LD, BreadcrumbList JSON-LD, and a 12-article editorial archive. Before launch, set `NEXT_PUBLIC_SITE_URL` to the final production domain and validate every absolute URL.

## Content and internal linking

Each knowledge note should answer one commercially meaningful question, cite its evidence, disclose whether a number is a benchmark or a verified project result, and link to a relevant service, work example, and contact path. The index should expose topic clusters so a shopper can move from **AI Commerce** to **Signal Search**, from **Growth Systems** to **Cart Recovery**, and from **Performance & SEO** to the technical SEO note.

Do not publish invented reviews, customer outcomes, client logos, or conversion lifts. The review article uses the Northwestern study as directional evidence and explicitly dates its findings; the checkout and email articles label Baymard and Litmus figures as benchmarks. This protects credibility while making the knowledge hub more useful.

## Structured data

Use `Organization` on the root site, `BreadcrumbList` on article and case-study routes, and `Article` on authored notes. Add `Product`, `ProductGroup`, `Review`, and `VideoObject` only when the corresponding content is visible on the page and eligible. Google says relevant ecommerce structured data can improve its understanding of page content, but markup is not a ranking guarantee.[3]

## Performance and accessibility

Keep `next/image` for visual assets, specify dimensions or `fill` containers, prioritize only the true above-the-fold hero, and lazy-load galleries and below-the-fold imagery. Run Lighthouse and real-user monitoring against mobile as well as desktop. Track LCP, INP, CLS, total blocking time, image weight, JavaScript transferred, and hydration errors.

The topic filter must remain keyboard reachable with a visible active state. Article headings should maintain a logical hierarchy. External source links should be labeled and open safely. Respect reduced motion for route transitions, hover effects, and Back to Top behavior.

## Operating cadence

Review Search Console queries monthly. Refresh titles and intros when impressions rise but clicks lag. Expand articles when a query cluster is earning impressions but not answering the full decision. Audit the sitemap, canonical URLs, structured data, broken links, 404s, image alt text, and CWV at every meaningful release.

## References

[1]: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics "Google Search Central — JavaScript SEO basics"
[2]: https://developers.google.com/search/docs/crawling-indexing/canonicalization "Google Search Central — Canonicalization"
[3]: https://developers.google.com/search/docs/specialty/ecommerce/include-structured-data-relevant-to-ecommerce "Google Search Central — Ecommerce structured data"
[4]: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap "Google Search Central — Build and submit a sitemap"
[5]: https://baymard.com/research/checkout-usability "Baymard — Checkout usability research"
[6]: https://www.litmus.com/resources/email-marketing-roi "Litmus — Email marketing ROI"
[7]: https://baymard.com/research/ecommerce-search "Baymard — Ecommerce search UX"
[8]: https://support.google.com/merchants/answer/13675100?hl=en "Google Merchant Center — 3D and AR"
[9]: https://spiegel.medill.northwestern.edu/how-online-reviews-influence-sales/ "Northwestern Spiegel Research Center — Online reviews"
