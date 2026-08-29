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

    await send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await send("Page.navigate", { url: "http://127.0.0.1:3001/" });
    await new Promise((r) => setTimeout(r, 1000));

    // Smoothly scroll down the entire page to trigger all IntersectionObservers and lazy images
    await send("Runtime.evaluate", {
      expression: `(async () => {
        const distance = 400;
        const delay = 100;
        while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
          document.scrollingElement.scrollBy(0, distance);
          await new Promise(r => setTimeout(r, delay));
        }
        await new Promise(r => setTimeout(r, 1000));
        document.scrollingElement.scrollTop = 0;
      })()`,
      awaitPromise: true,
    });

    // Check images natural dimensions and loading state
    const imgInfo = await send("Runtime.evaluate", {
      expression: `(() => {
        return Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.currentSrc || img.src,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          complete: img.complete,
          displayed: img.offsetWidth > 0 && img.offsetHeight > 0
        }));
      })()`,
      returnByValue: true,
    });

    console.log("Image load status after scroll:", imgInfo.result.value);

    // Get section rectangles on HomePage
    const secRectsRes = await send("Runtime.evaluate", {
      expression: `(() => {
        const targets = [
          { name: '01-hero', el: document.querySelector('.hero') },
          { name: '03-flagship', el: document.querySelector('.flagship-section') },
          { name: '04-fullstack', el: document.querySelector('.fullstack-section') },
          { name: '05-design-grid', el: document.querySelector('.design-section') },
          { name: '06-demo-slice', el: document.querySelector('.demo-section') },
          { name: '07-capabilities', el: document.querySelector('.services-preview') },
          { name: '08-split-statement', el: document.querySelector('.split-statement') },
          { name: '09-faq', el: document.querySelector('.faq') },
          { name: '10-closing-cta', el: document.querySelector('.closing-cta') }
        ];
        return targets.map(t => {
          if (!t.el) return null;
          const r = t.el.getBoundingClientRect();
          return {
            name: t.name,
            x: Math.max(0, Math.floor(r.x)),
            y: Math.max(0, Math.floor(r.y + window.scrollY)),
            width: Math.floor(r.width),
            height: Math.floor(r.height)
          };
        }).filter(Boolean);
      })()`,
      returnByValue: true,
    });

    const rects = secRectsRes.result.value;

    for (const r of rects) {
      if (r.height < 10 || r.width < 10) continue;
      const { data } = await send("Page.captureScreenshot", {
        format: "png",
        clip: {
          x: r.x,
          y: r.y,
          width: r.width,
          height: Math.min(r.height, 1200),
          scale: 1,
        },
        captureBeyondViewport: true,
      });
      const outPath = path.resolve(`./research/section-${r.name}.png`);
      fs.writeFileSync(outPath, Buffer.from(data, "base64"));
      console.log(`Saved scrolled section screenshot: ${outPath}`);
    }

    ws.close();
  } finally {
    browser.kill();
  }
}

main().catch(console.error);
