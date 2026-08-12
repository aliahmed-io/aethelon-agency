# Aethelon Lighthouse — production-mode audit

> **Scope note:** This audit was run against the locally served, optimized production build at `http://127.0.0.1:3001/` because the project has no active published deployment yet. It validates the deployed build artifact, but it does not measure proxy, CDN, or regional-network latency. Repeat the audit against the published Aethelon URL after publication.

| Metric | Result |
| --- | ---: |
| Performance score | 83 |
| First Contentful Paint | 0.9 s |
| Largest Contentful Paint | 4.2 s |
| Total Blocking Time | 190 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 0.9 s |

## LCP target

The inspected LCP element was: `Not exposed by this run`.

## Remaining measured opportunities

| Audit | Reported potential saving |
| --- | ---: |
| Reduce unused JavaScript | Est savings of 51 KiB |

## Unused JavaScript attribution

| Resource | Transfer size | Estimated unused bytes |
| --- | ---: | ---: |
| /_next/static/chunks/2121bce1-44814e986667e61c.js | 62 KiB | 27 KiB |
| /_next/static/chunks/138-4dca151690c076e3.js | 64 KiB | 24 KiB |

## Next audit

After creating a checkpoint, publish through the project interface, then re-run Lighthouse against the assigned public URL. That final run will capture real transfer timing, image CDN behavior, and cache headers.
