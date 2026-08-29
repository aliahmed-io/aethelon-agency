import { execSync } from "node:child_process";
import fs from "node:fs";

const routes = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/work", name: "Work" },
  { path: "/work/aethelon-furniture-commerce", name: "Work-CaseStudy" },
  { path: "/services", name: "Services" },
  { path: "/insights", name: "Insights" },
  { path: "/insights/custom-storefront-vs-hosted-platform", name: "Insights-Article" },
  { path: "/contact", name: "Contact" },
];

const results = [];
for (const r of routes) {
  const file = `./research/lh-desk-${r.name}.json`;
  console.log(`Auditing Desktop ${r.name} (http://127.0.0.1:3001${r.path})...`);
  execSync(
    `npx lighthouse http://127.0.0.1:3001${r.path} --preset=desktop --output=json --output-path=${file} --chrome-flags="--headless=new --no-sandbox" --quiet`,
    { stdio: "inherit" }
  );
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  results.push({
    route: r.path,
    name: r.name,
    performance: Math.round(data.categories.performance.score * 100),
    accessibility: Math.round(data.categories.accessibility.score * 100),
    bestPractices: Math.round(data.categories["best-practices"].score * 100),
    seo: Math.round(data.categories.seo.score * 100),
    fcp: data.audits["first-contentful-paint"]?.displayValue,
    lcp: data.audits["largest-contentful-paint"]?.displayValue,
    cls: data.audits["cumulative-layout-shift"]?.displayValue,
    tbt: data.audits["total-blocking-time"]?.displayValue,
  });
}
console.table(results);
