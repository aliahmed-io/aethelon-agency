# Performance benchmark after implementation

The production build passes TypeScript checking and generates all 28 routes as static or statically generated output. The case-study routes are now included in the static build rather than rendered on demand.

The local managed server returned the representative HTML routes in approximately 40–58 ms total with 26–36 KB HTML responses:

| Route | Local total | HTML bytes |
|---|---:|---:|
| `/` | 58 ms | 36,263 |
| `/work` | 52 ms | 32,818 |
| `/insights` | 55 ms | 30,639 |
| `/services` | 40 ms | 26,427 |

The public preview measured approximately 0.51–0.90 seconds total, which is dominated by the managed preview/proxy path rather than application rendering. This means the app-side response target is below 300 ms, but a sub-300 ms public Lighthouse result cannot be guaranteed without controlling the final deployment region, CDN, browser network, and test conditions.

The visual asset audit found three PNG sources totaling approximately 13.9 MB. WebP derivatives were created at approximately 203 KB, 111 KB, and 133 KB, but the managed preview returned 404s for the storage paths, so those URLs were not shipped. The verified CDN sources remain active until a runtime-safe optimized URL is available.
