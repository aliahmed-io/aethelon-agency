import { readFileSync, writeFileSync } from "node:fs";

const input = new URL("../research/lighthouse-production-mode.json", import.meta.url);
const output = new URL("../research/lighthouse-production-mode.md", import.meta.url);
const report = JSON.parse(readFileSync(input, "utf8"));
const audits = report.audits;
const metric = (id) => audits[id]?.displayValue || "Not measured";
const opportunities = Object.values(audits)
  .filter((audit) => audit.details?.type === "opportunity" && audit.details.overallSavingsMs > 0)
  .sort((a, b) => b.details.overallSavingsMs - a.details.overallSavingsMs)
  .slice(0, 6);
const lcpNode = audits["largest-contentful-paint-element"]?.details?.items?.[0]?.node;
const lcpHtml = lcpNode?.snippet?.replace(/\s+/g, " ").trim() || "Not exposed by this run";
const unusedJavaScript = audits["unused-javascript"]?.details?.items || [];

const markdown = `# Aethelon Lighthouse — production-mode audit

> **Scope note:** This audit was run against the locally served, optimized production build at \`http://127.0.0.1:3001/\` because the project has no active published deployment yet. It validates the deployed build artifact, but it does not measure proxy, CDN, or regional-network latency. Repeat the audit against the published Aethelon URL after publication.

| Metric | Result |
| --- | ---: |
| Performance score | ${Math.round((report.categories.performance.score || 0) * 100)} |
| First Contentful Paint | ${metric("first-contentful-paint")} |
| Largest Contentful Paint | ${metric("largest-contentful-paint")} |
| Total Blocking Time | ${metric("total-blocking-time")} |
| Cumulative Layout Shift | ${metric("cumulative-layout-shift")} |
| Speed Index | ${metric("speed-index")} |

## LCP target

The inspected LCP element was: \`${lcpHtml}\`.

## Remaining measured opportunities

| Audit | Reported potential saving |
| --- | ---: |
${opportunities.map((audit) => `| ${audit.title} | ${audit.displayValue || `${Math.round(audit.details.overallSavingsMs)} ms`} |`).join("\n") || "| No opportunity audits with a timing estimate | — |"}

## Unused JavaScript attribution

| Resource | Transfer size | Estimated unused bytes |
| --- | ---: | ---: |
${unusedJavaScript.map((item) => `| ${item.url.replace("http://127.0.0.1:3001", "")} | ${Math.round(item.totalBytes / 1024)} KiB | ${Math.round(item.wastedBytes / 1024)} KiB |`).join("\n") || "| No unused JavaScript audit details were reported | — | — |"}

## Next audit

After creating a checkpoint, publish through the project interface, then re-run Lighthouse against the assigned public URL. That final run will capture real transfer timing, image CDN behavior, and cache headers.
`;

writeFileSync(output, markdown);
console.log(`Wrote ${output.pathname}`);
