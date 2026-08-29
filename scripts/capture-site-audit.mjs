import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function main() {
  const browser = spawn(EDGE_PATH, [
    "--headless=new",
    "--remote-debugging-port=9222",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "about:blank",
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  try {
    const newTabRes = await fetch("http://127.0.0.1:9222/json/new", { method: "PUT" });
    const tab = await newTabRes.json();
    console.log("Created tab:", tab.id, tab.webSocketDebuggerUrl);

    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise((r) => (ws.onopen = r));

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        const timeout = setTimeout(() => {
          ws.removeEventListener("message", handler);
          reject(new Error(`Timeout on ${method}`));
        }, 15000);

        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === id) {
            clearTimeout(timeout);
            ws.removeEventListener("message", handler);
            if (data.error) reject(data.error);
            else resolve(data.result);
          }
        };
        ws.addEventListener("message", handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send("Page.enable");
    await send("DOM.enable");
    await send("CSS.enable");

    async function auditRoute(url, name, width, height) {
      console.log(`Auditing ${name} (${width}x${height})...`);
      await send("Emulation.setDeviceMetricsOverride", {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: width < 600,
      });

      await send("Page.navigate", { url });
      await new Promise((r) => setTimeout(r, 1200));

      const { data } = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: false,
      });

      const outPath = path.resolve(`./research/shot-${name}-${width}.png`);
      fs.writeFileSync(outPath, Buffer.from(data, "base64"));

      const evalRes = await send("Runtime.evaluate", {
        expression: `(() => {
          const elements = Array.from(document.querySelectorAll('*'));
          const stretched = [];
          const overlaps = [];
          const lowContrast = [];
          const textClutter = [];
          
          // Check section geometry
          const sections = Array.from(document.querySelectorAll('section, header, footer, .flagship-card, .fullstack-card, .design-card, .hero, .product-demo-card'));
          const sectionData = sections.map(s => {
            const r = s.getBoundingClientRect();
            const comp = window.getComputedStyle(s);
            return {
              tag: s.tagName.toLowerCase(),
              className: (s.className || '').slice(0, 40),
              width: Math.round(r.width),
              height: Math.round(r.height),
              aspectRatio: (r.width / (r.height || 1)).toFixed(2),
              padding: comp.padding,
              margin: comp.margin,
              display: comp.display
            };
          });

          // Check images
          const images = Array.from(document.querySelectorAll('img')).map(img => {
            const r = img.getBoundingClientRect();
            return {
              src: img.src.split('/').pop(),
              renderedWidth: Math.round(r.width),
              renderedHeight: Math.round(r.height),
              aspectRatio: (r.width / (r.height || 1)).toFixed(2),
              objectFit: window.getComputedStyle(img).objectFit
            };
          });

          return {
            title: document.title,
            sections: sectionData,
            images: images.slice(0, 8),
            pageHeight: document.documentElement.scrollHeight,
            clientWidth: document.documentElement.clientWidth
          };
        })()`,
        returnByValue: true,
      });

      return evalRes.result?.value;
    }

    const homeDesk = await auditRoute("http://127.0.0.1:3001/", "home", 1440, 900);
    const homeMob = await auditRoute("http://127.0.0.1:3001/", "home", 390, 844);
    const workDesk = await auditRoute("http://127.0.0.1:3001/work", "work", 1440, 900);
    const caseDesk = await auditRoute("http://127.0.0.1:3001/work/aethelon-furniture-commerce", "case", 1440, 900);
    const aboutDesk = await auditRoute("http://127.0.0.1:3001/about", "about", 1440, 900);
    const servicesDesk = await auditRoute("http://127.0.0.1:3001/services", "services", 1440, 900);

    const report = {
      homeDesk,
      homeMob,
      workDesk,
      caseDesk,
      aboutDesk,
      servicesDesk,
    };

    fs.writeFileSync("./research/visual-layout-audit.json", JSON.stringify(report, null, 2));
    console.log("Visual audit completed! Results saved to ./research/visual-layout-audit.json");

    ws.close();
  } finally {
    browser.kill();
  }
}

main().catch(console.error);
