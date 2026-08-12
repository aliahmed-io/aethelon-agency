# Aethelon client bundle analysis

Generated from `pnpm analyze` on 2026-08-12. Sizes below are parsed production JavaScript sizes; compressed transfer size varies with the browser and server response.

## Largest emitted client chunks

| Chunk | Parsed size | Gzip size |
| --- | ---: | ---: |
| `static/chunks/858-73f22dcdc3f668fc.js` | 234 KB | 64.4 KB |
| `static/chunks/daeae4ce-c77a83512f050b63.js` | 196 KB | 61.7 KB |
| `static/chunks/framework-b6e88526ef5ad7a9.js` | 185 KB | 58.3 KB |
| `static/chunks/main-b33c2ef789f6f908.js` | 136 KB | 39.3 KB |
| `static/chunks/app/insights/page-f34174d3c16761a8.js` | 16.7 KB | 5.9 KB |
| `static/chunks/app/page-89433b9137bf2ce5.js` | 16.4 KB | 5.1 KB |
| `static/chunks/576-4b6efb524191da17.js` | 14.6 KB | 5.5 KB |
| `static/chunks/app/work/[slug]/page-2dc1fa997e9423ed.js` | 11.7 KB | 3.9 KB |
| `static/chunks/app/work/page-9165f050ca7d348e.js` | 11.4 KB | 3.7 KB |
| `static/chunks/960-5175fd10e6bea29c.js` | 10.5 KB | 4.3 KB |
| `static/chunks/app/contact/page-fa1925c6f3605155.js` | 10.3 KB | 3.2 KB |
| `static/chunks/app/services/page-3f47e52b6c2e5c1b.js` | 9.1 KB | 3.2 KB |
| `static/chunks/app/about/page-b1a24d0e4936351f.js` | 8.1 KB | 2.7 KB |
| `static/chunks/app/not-found-4600a00874b5dbca.js` | 6.1 KB | 2.0 KB |
| `static/chunks/app/insights/[slug]/page-0268f8e2dd3169ca.js` | 5.1 KB | 1.7 KB |

## Largest package groups

| Package | Parsed module size |
| --- | ---: |
| `next` | 586 KB |
| `react-dom` | 174 KB |
| `.` | 91.7 KB |
| `react` | 7.6 KB |
| `scheduler` | 3.4 KB |
| `lucide-react` | 2.7 KB |
| `@swc/helpers` | 1.4 KB |

## Interpretation

The Next.js and React runtime chunks are baseline framework cost. This report is intended to identify client-imported packages or page modules that are materially larger than their interaction value. Run `pnpm analyze` after significant UI or dependency changes, then regenerate this file with `node scripts/summarize-bundle-analysis.mjs`.
