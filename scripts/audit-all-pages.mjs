import { exec } from "node:child_process";
import { promisify } from "node:util";
import { readFileSync, writeFileSync } from "node:fs";

const execAsync = promisify(exec);

const routes = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/work", name: "Work" },
  { path: "/work/form-and-function", name: "Work-CaseStudy" },
  { path: "/services", name: "Services" },
  { path: "/insights", name: "Insights" },
  { path: "/insights/custom-storefront-vs-hosted-platform", name: "Insights-Article" },
  { path: "/contact", name: "Contact" },
];

async function runAudit() {
  const results = [];
  for (const route of routes) {
    const url = `http://127.0.0.1:3001${route.path}`;
    const outPath = `./research/lighthouse-${route.name.toLowerCase()}.json`;
    console.log(`Auditing ${route.name} (${url})...`);
    try {
      await execAsync(`npx lighthouse ${url} --output=json --output-path=${outPath} --chrome-flags="--headless=new --no-sandbox" --quiet`);
      const report = JSON.parse(readFileSync(outPath, "utf8"));
      const cat = report.categories;
      const aud = report.audits;
      results.push({
        route: route.path,
        name: route.name,
        performance: Math.round((cat.performance?.score || 0) * 100),
        accessibility: Math.round((cat.accessibility?.score || 0) * 100),
        bestPractices: Math.round((cat["best-practices"]?.score || 0) * 100),
        seo: Math.round((cat.seo?.score || 0) * 100),
        fcp: aud["first-contentful-paint"]?.displayValue || "N/A",
        lcp: aud["largest-contentful-paint"]?.displayValue || "N/A",
        lcpMs: Math.round(aud["largest-contentful-paint"]?.numericValue || 0),
        tbt: aud["total-blocking-time"]?.displayValue || "N/A",
        cls: aud["cumulative-layout-shift"]?.displayValue || "N/A",
        speedIndex: aud["speed-index"]?.displayValue || "N/A",
      });
    } catch (e) {
      console.error(`Failed ${route.name}:`, e.message);
    }
  }

  console.table(results);
  writeFileSync("./research/lighthouse-all-after-rsc.json", JSON.stringify(results, null, 2));
}

runAudit();
