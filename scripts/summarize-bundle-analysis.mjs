import { readFileSync, writeFileSync } from "node:fs";

const reportPath = new URL("../.next/analyze/client.html", import.meta.url);
const outputPath = new URL("../research/bundle-analysis.md", import.meta.url);
const html = readFileSync(reportPath, "utf8");
const dataMatch = html.match(/window\.chartData\s*=\s*(\[.*?\]);\s*window\.entrypoints/s);

if (!dataMatch) {
  throw new Error("Unable to locate chartData in the client bundle analyzer report.");
}

const chartData = JSON.parse(dataMatch[1]);
const packageBytes = new Map();
const assetRows = chartData
  .filter((asset) => asset.isAsset && asset.parsedSize)
  .sort((a, b) => b.parsedSize - a.parsedSize)
  .slice(0, 15)
  .map((asset) => ({ label: asset.label, parsedSize: asset.parsedSize, gzipSize: asset.gzipSize ?? 0 }));

function packageName(path) {
  const segments = path.split("/node_modules/");
  const packagePath = segments.at(-1) || "";
  if (!packagePath || packagePath.startsWith(".pnpm/")) return null;
  const [first, second] = packagePath.split("/");
  return first.startsWith("@") ? `${first}/${second || ""}` : first;
}

function collectLeaves(node) {
  if (node.groups?.length) {
    node.groups.forEach(collectLeaves);
    return;
  }
  if (!node.path || !node.parsedSize) return;
  const name = packageName(node.path);
  if (!name) return;
  packageBytes.set(name, (packageBytes.get(name) || 0) + node.parsedSize);
}

chartData.forEach((asset) => asset.groups?.forEach(collectLeaves));
const packageRows = [...packageBytes.entries()]
  .map(([name, parsedSize]) => ({ name, parsedSize }))
  .sort((a, b) => b.parsedSize - a.parsedSize)
  .slice(0, 20);

const format = (bytes) => `${(bytes / 1024).toFixed(bytes >= 1024 * 100 ? 0 : 1)} KB`;
const rows = (items, formatter) => items.map(formatter).join("\n");
const markdown = `# Aethelon client bundle analysis\n\nGenerated from \`pnpm analyze\` on ${new Date().toISOString().slice(0, 10)}. Sizes below are parsed production JavaScript sizes; compressed transfer size varies with the browser and server response.\n\n## Largest emitted client chunks\n\n| Chunk | Parsed size | Gzip size |\n| --- | ---: | ---: |\n${rows(assetRows, (asset) => `| \`${asset.label}\` | ${format(asset.parsedSize)} | ${format(asset.gzipSize)} |`)}\n\n## Largest package groups\n\n| Package | Parsed module size |\n| --- | ---: |\n${rows(packageRows, (pkg) => `| \`${pkg.name}\` | ${format(pkg.parsedSize)} |`)}\n\n## Interpretation\n\nThe Next.js and React runtime chunks are baseline framework cost. This report is intended to identify client-imported packages or page modules that are materially larger than their interaction value. Run \`pnpm analyze\` after significant UI or dependency changes, then regenerate this file with \`node scripts/summarize-bundle-analysis.mjs\`.\n`;

writeFileSync(outputPath, markdown);
console.log(`Wrote ${outputPath.pathname}`);
