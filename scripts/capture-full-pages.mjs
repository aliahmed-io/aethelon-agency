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

    async function captureFullPage(url, name, width) {
      await send("Emulation.setDeviceMetricsOverride", {
        width,
        height: 900,
        deviceScaleFactor: 1,
        mobile: width < 600,
      });

      await send("Page.navigate", { url });
      await new Promise((r) => setTimeout(r, 1200));

      const docLayout = await send("Page.getLayoutMetrics");
      const contentHeight = Math.ceil(docLayout.contentSize.height);

      // Scroll and capture full height
      await send("Emulation.setDeviceMetricsOverride", {
        width,
        height: contentHeight,
        deviceScaleFactor: 1,
        mobile: width < 600,
      });

      await new Promise((r) => setTimeout(r, 800));

      const { data } = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
      });

      const outPath = path.resolve(`./research/full-${name}-${width}.png`);
      fs.writeFileSync(outPath, Buffer.from(data, "base64"));
      console.log(`Saved full page: ${outPath} (${width}x${contentHeight})`);
    }

    await captureFullPage("http://127.0.0.1:3001/", "home", 1440);
    await captureFullPage("http://127.0.0.1:3001/", "home", 390);
    await captureFullPage("http://127.0.0.1:3001/work", "work", 1440);
    await captureFullPage("http://127.0.0.1:3001/work/aethelon-furniture-commerce", "case", 1440);
    await captureFullPage("http://127.0.0.1:3001/services", "services", 1440);

    ws.close();
  } finally {
    browser.kill();
  }
}

main().catch(console.error);
