import { readFileSync, writeFileSync } from "node:fs";

const reportPath = new URL("../.next/analyze/client.html", import.meta.url);
const outputPath = new URL("../research/unused-chunk-attribution.md", import.meta.url);
const chunkNeedles = ["2121bce1-44814e986667e61c", "138-4dca151690c076e3"];
const html = readFileSync(reportPath, "utf8");
const dataMatch = html.match(/window\.chartData\s*=\s*(\[.*?\]);\s*window\.entrypoints/);

if (!dataMatch) throw new Error("Unable to locate chartData in the client bundle analyzer report.");

const chartData = JSON.parse(dataMatch[1]);

function leaves(node, rows = []) {
  if (node.groups?.length) {
    node.groups.forEach((group) => leaves(group, rows));
    return rows;
  }
  if (node.path && node.parsedSize) rows.push({ path: node.path, parsedSize: node.parsedSize });
  return rows;
}

const format = (bytes) => `${(bytes / 1024).toFixed(bytes > 1024 * 100 ? 0 : 1)} KiB`;
const tables = chunkNeedles.map((needle) => {
  const asset = chartData.find((item) => item.isAsset && item.label.includes(needle));
  if (!asset) return `## \`${needle}\`\n\nThis asset was not found in the available analyzer report. Re-run \`pnpm analyze\` before rerunning this script.\n`;
  const modules = leaves(asset).sort((a, b) => b.parsedSize - a.parsedSize).slice(0, 20);
  return `## \`${asset.label}\`\n\n| Module | Parsed size |\n| --- | ---: |\n${modules.map((module) => `| \`${module.path.replace(/^.*?(node_modules\/|client\/|app\/)/, "$1")}\` | ${format(module.parsedSize)} |`).join("\n")}`;
});

writeFileSync(
  outputPath,
  `# Aethelon unused-JavaScript attribution\n\nThese module tables map Lighthouse’s remaining unused-JavaScript entries to the closest available production bundle analysis. The audit reported 51 KiB of unused code across the two chunks below.\n\n${tables.join("\n\n")}`,
);
console.log(`Wrote ${outputPath.pathname}`);
