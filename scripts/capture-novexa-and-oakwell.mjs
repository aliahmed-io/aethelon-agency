import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT_DIR_OAKWELL = "d:\\aethelon-agency\\research\\oakwell-captures";
const OUT_DIR_NOVEXA = "d:\\aethelon-agency\\research\\novexa-captures";

fs.mkdirSync(OUT_DIR_OAKWELL, { recursive: true });
fs.mkdirSync(OUT_DIR_NOVEXA, { recursive: true });

async function main() {
  const browser = spawn(EDGE_PATH, [
    "--headless=new",
    "--remote-debugging-port=9224",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "about:blank",
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  try {
    const newTabRes = await fetch("http://127.0.0.1:9224/json/new", { method: "PUT" });
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
        }, 25000);

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
    await send("Runtime.enable");

    async function captureShot({ url, savePath, width = 1440, height = 900, scrollY = 0, zoom = 1.0, waitMs = 3000 }) {
      try {
        console.log(`Capturing: ${url} (scroll: ${scrollY}, zoom: ${zoom}) -> ${path.basename(savePath)}`);
        
        await send("Emulation.setDeviceMetricsOverride", {
          width,
          height,
          deviceScaleFactor: 1,
          mobile: false,
        });

        await send("Page.navigate", { url });
        await new Promise((r) => setTimeout(r, waitMs));

        if (zoom !== 1.0) {
          await send("Runtime.evaluate", {
            expression: `document.body.style.zoom = '${zoom}';`,
          });
          await new Promise((r) => setTimeout(r, 500));
        }

        if (scrollY > 0) {
          await send("Runtime.evaluate", {
            expression: `window.scrollTo({ top: ${scrollY}, behavior: 'instant' });`,
          });
          await new Promise((r) => setTimeout(r, 800));
        }

        const screenshot = await send("Page.captureScreenshot", {
          format: "png",
        });

        const buffer = Buffer.from(screenshot.data, "base64");
        fs.writeFileSync(savePath, buffer);
        console.log(`Saved: ${savePath} (${width}x${height})`);
      } catch (e) {
        console.error(`Failed ${savePath}:`, e.message);
      }
    }

    console.log("=== CAPTURING REMAINING OAKWELL SHOTS ===");

    // Oakwell Shot 4: Craftsmanship scroll
    await captureShot({
      url: "http://127.0.0.1:3004/",
      savePath: path.join(OUT_DIR_OAKWELL, "04_landing_craftsmanship_scroll.png"),
      width: 1440,
      height: 900,
      scrollY: 1500,
    });

    // Oakwell Shot 5: Lookbook staging section
    await captureShot({
      url: "http://127.0.0.1:3004/",
      savePath: path.join(OUT_DIR_OAKWELL, "05_landing_lookbook_staging.png"),
      width: 1440,
      height: 900,
      scrollY: 2400,
    });

    // Oakwell Shot 6: Shop Catalog Grid
    await captureShot({
      url: "http://127.0.0.1:3004/shop",
      savePath: path.join(OUT_DIR_OAKWELL, "06_shop_catalog_grid.png"),
      width: 1440,
      height: 900,
      scrollY: 0,
    });

    // Oakwell Shot 7: Shop Catalog Scrolled
    await captureShot({
      url: "http://127.0.0.1:3004/shop",
      savePath: path.join(OUT_DIR_OAKWELL, "07_shop_catalog_scrolled.png"),
      width: 1440,
      height: 900,
      scrollY: 650,
    });

    // Oakwell Shot 8: Atelier Story Page
    await captureShot({
      url: "http://127.0.0.1:3004/atelier",
      savePath: path.join(OUT_DIR_OAKWELL, "08_atelier_craft_story.png"),
      width: 1440,
      height: 900,
      scrollY: 0,
    });

    // Oakwell Shot 9: Trade Vault / Wholesale
    await captureShot({
      url: "http://127.0.0.1:3004/vault",
      savePath: path.join(OUT_DIR_OAKWELL, "09_trade_vault_portal.png"),
      width: 1440,
      height: 900,
      scrollY: 0,
    });

    // Oakwell Shot 10: Admin Dashboard Studio
    await captureShot({
      url: "http://127.0.0.1:3004/dashboard",
      savePath: path.join(OUT_DIR_OAKWELL, "10_admin_dashboard_studio.png"),
      width: 1440,
      height: 900,
      scrollY: 0,
    });

    // Oakwell Shot 11: Admin Dashboard AI COO
    await captureShot({
      url: "http://127.0.0.1:3004/dashboard/ai-coo",
      savePath: path.join(OUT_DIR_OAKWELL, "11_admin_ai_coo_desk.png"),
      width: 1440,
      height: 900,
      scrollY: 0,
    });

    // Extra Novexa Shot: Storefront Home
    await captureShot({
      url: "http://127.0.0.1:3005/store",
      savePath: path.join(OUT_DIR_NOVEXA, "11_storefront_home.png"),
      width: 1440,
      height: 900,
      scrollY: 0,
    });

    // Extra Novexa Shot: Storefront Home Scrolled
    await captureShot({
      url: "http://127.0.0.1:3005/store",
      savePath: path.join(OUT_DIR_NOVEXA, "12_storefront_home_scrolled.png"),
      width: 1440,
      height: 900,
      scrollY: 800,
    });

    console.log("=== COMPLETED ALL CAPTURES ===");
  } catch (err) {
    console.error("Capture script error:", err);
  } finally {
    browser.kill();
  }
}

main();
