import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT_DIR_NOVEXA = "d:\\aethelon-agency\\research\\novexa-captures";
const OUT_DIR_OAKWELL = "d:\\aethelon-agency\\research\\oakwell-captures";

fs.mkdirSync(OUT_DIR_NOVEXA, { recursive: true });
fs.mkdirSync(OUT_DIR_OAKWELL, { recursive: true });

async function main() {
  const browser = spawn(EDGE_PATH, [
    "--headless=new",
    "--remote-debugging-port=9225",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "about:blank",
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  try {
    const newTabRes = await fetch("http://127.0.0.1:9225/json/new", { method: "PUT" });
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
        }, 30000);

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

    async function captureCleanShot({ url, savePath, width = 1440, height = 900, scrollY = 0, zoom = 1.0, waitMs = 4000 }) {
      try {
        console.log(`Navigating to: ${url} (scroll: ${scrollY}, zoom: ${zoom}) -> ${path.basename(savePath)}`);
        
        await send("Emulation.setDeviceMetricsOverride", {
          width,
          height,
          deviceScaleFactor: 1,
          mobile: false,
        });

        await send("Page.navigate", { url });
        await new Promise((r) => setTimeout(r, waitMs));

        // Inject script to eradicate Next.js dev indicator, error toasts, and cookie banners
        await send("Runtime.evaluate", {
          expression: `
            // Remove Next.js dev indicators and portals
            document.querySelectorAll('nextjs-portal, #next-dev-tools, [data-nextjs-toast], [data-nextjs-dialog], [class*="nextjs-portal"], next-route-announcer, #__next-build-watcher, [class*="issue"]').forEach(el => el.remove());
            
            // Hide via global CSS injection
            const cleanStyle = document.createElement('style');
            cleanStyle.id = '__clean_screenshot_style';
            cleanStyle.innerHTML = \`
              nextjs-portal, #next-dev-tools, [data-nextjs-toast], [data-nextjs-dialog], 
              [class*="nextjs-portal"], [id*="nextjs"], [class*="cookie"], [id*="cookie"],
              div[class*="issue"], button[class*="issue"], .fixed.bottom-4.left-4 {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
              }
            \`;
            document.head.appendChild(cleanStyle);

            // Accept/dismiss cookie banner if present
            const buttons = Array.from(document.querySelectorAll('button'));
            const cookieBtn = buttons.find(b => b.textContent.includes('I understand') || b.textContent.includes('Accept'));
            if (cookieBtn) cookieBtn.click();
          `,
        });

        await new Promise((r) => setTimeout(r, 600));

        if (zoom !== 1.0) {
          await send("Runtime.evaluate", {
            expression: `document.body.style.zoom = '${zoom}';`,
          });
          await new Promise((r) => setTimeout(r, 600));
        }

        if (scrollY > 0) {
          await send("Runtime.evaluate", {
            expression: `window.scrollTo({ top: ${scrollY}, behavior: 'instant' });`,
          });
          await new Promise((r) => setTimeout(r, 1000));
        }

        // Second clean sweep right before capture
        await send("Runtime.evaluate", {
          expression: `
            document.querySelectorAll('nextjs-portal, #next-dev-tools, [data-nextjs-toast], [class*="nextjs-portal"]').forEach(el => el.remove());
          `,
        });

        const screenshot = await send("Page.captureScreenshot", {
          format: "png",
        });

        const buffer = Buffer.from(screenshot.data, "base64");
        fs.writeFileSync(savePath, buffer);
        console.log(`SUCCESS: Saved ${savePath} (${width}x${height})`);
      } catch (err) {
        console.error(`FAILED ${savePath}:`, err.message);
      }
    }

    // ==========================================
    // 1. CAPTURE NOVEXA (PRISTINE NO DEV BADGE)
    // ==========================================
    console.log("=== CAPTURING NOVEXA PRISTINE SHOTS ===");
    
    // N-01: Landing Hero Default
    await captureCleanShot({
      url: "http://127.0.0.1:3005/",
      savePath: path.join(OUT_DIR_NOVEXA, "clean_01_hero_default.png"),
      width: 1440,
      height: 900,
      scrollY: 0,
      waitMs: 4000,
    });

    // N-02: Landing Hero Wide Zoomed (0.85x)
    await captureCleanShot({
      url: "http://127.0.0.1:3005/",
      savePath: path.join(OUT_DIR_NOVEXA, "clean_02_hero_wide_zoom.png"),
      width: 1600,
      height: 1000,
      zoom: 0.85,
      scrollY: 0,
      waitMs: 3000,
    });

    // N-03: Featured Silhouettes / Considered Details
    await captureCleanShot({
      url: "http://127.0.0.1:3005/",
      savePath: path.join(OUT_DIR_NOVEXA, "clean_03_featured_silhouettes.png"),
      width: 1440,
      height: 900,
      scrollY: 680,
      waitMs: 3000,
    });

    // N-04: Curated Categories (Men's & Women's Edits)
    await captureCleanShot({
      url: "http://127.0.0.1:3005/",
      savePath: path.join(OUT_DIR_NOVEXA, "clean_04_curated_categories.png"),
      width: 1440,
      height: 900,
      scrollY: 1450,
      waitMs: 3000,
    });

    // N-05: Innovation & Craft (Nothing Extra. Nothing Overlooked. + Material Study 001)
    await captureCleanShot({
      url: "http://127.0.0.1:3005/",
      savePath: path.join(OUT_DIR_NOVEXA, "clean_05_innovation_material_specs.png"),
      width: 1440,
      height: 900,
      scrollY: 2150,
      waitMs: 3000,
    });

    // N-06: Daily Uniform Manifesto / Brand Statement
    await captureCleanShot({
      url: "http://127.0.0.1:3005/",
      savePath: path.join(OUT_DIR_NOVEXA, "clean_06_brand_manifesto.png"),
      width: 1440,
      height: 900,
      scrollY: 2850,
      waitMs: 3000,
    });

    // N-07: Storefront Products (Men's category)
    await captureCleanShot({
      url: "http://127.0.0.1:3005/store/products/men",
      savePath: path.join(OUT_DIR_NOVEXA, "clean_07_store_men_catalog.png"),
      width: 1440,
      height: 900,
      scrollY: 0,
      waitMs: 4000,
    });

    // ==========================================
    // 2. CAPTURE OAKWELL (PRISTINE NO DEV BADGE)
    // ==========================================
    console.log("=== CAPTURING OAKWELL PRISTINE SHOTS ===");

    // O-01: Landing Hero Default
    await captureCleanShot({
      url: "http://127.0.0.1:3004/",
      savePath: path.join(OUT_DIR_OAKWELL, "clean_01_hero_default.png"),
      width: 1440,
      height: 900,
      scrollY: 0,
      waitMs: 4000,
    });

    // O-02: Landing Hero Zoomed Out (0.85x for full architectural breath)
    await captureCleanShot({
      url: "http://127.0.0.1:3004/",
      savePath: path.join(OUT_DIR_OAKWELL, "clean_02_hero_zoomed_out.png"),
      width: 1600,
      height: 1000,
      zoom: 0.85,
      scrollY: 0,
      waitMs: 3000,
    });

    // O-03: The Oakwell Way (Nothing loud. Everything felt.)
    await captureCleanShot({
      url: "http://127.0.0.1:3004/",
      savePath: path.join(OUT_DIR_OAKWELL, "clean_03_the_oakwell_way.png"),
      width: 1440,
      height: 900,
      scrollY: 880,
      waitMs: 3000,
    });

    // O-04: Curated by Room (Living, Dining, Bedroom 3-column lookbook)
    await captureCleanShot({
      url: "http://127.0.0.1:3004/",
      savePath: path.join(OUT_DIR_OAKWELL, "clean_04_curated_rooms_lookbook.png"),
      width: 1440,
      height: 900,
      scrollY: 2450,
      waitMs: 3000,
    });

    // O-05: Shop Catalog Grid ("Objects for real life.")
    await captureCleanShot({
      url: "http://127.0.0.1:3004/shop",
      savePath: path.join(OUT_DIR_OAKWELL, "clean_05_shop_catalog_header.png"),
      width: 1440,
      height: 900,
      scrollY: 0,
      waitMs: 4000,
    });

    // O-06: Shop Catalog Scrolled (Cairn table, Noma sofa, Boucle lounge)
    await captureCleanShot({
      url: "http://127.0.0.1:3004/shop",
      savePath: path.join(OUT_DIR_OAKWELL, "clean_06_shop_catalog_products.png"),
      width: 1440,
      height: 900,
      scrollY: 650,
      waitMs: 3000,
    });

    // O-07: Atelier Story ("Bespoke craft, made to measure.")
    await captureCleanShot({
      url: "http://127.0.0.1:3004/atelier",
      savePath: path.join(OUT_DIR_OAKWELL, "clean_07_atelier_craft_story.png"),
      width: 1440,
      height: 900,
      scrollY: 0,
      waitMs: 4000,
    });

    // O-08: Trade Vault Portal ("The quiet vault. Reserved for Studio Patrons.")
    await captureCleanShot({
      url: "http://127.0.0.1:3004/vault",
      savePath: path.join(OUT_DIR_OAKWELL, "clean_08_trade_vault_portal.png"),
      width: 1440,
      height: 900,
      scrollY: 0,
      waitMs: 4000,
    });

    console.log("=== ALL PRISTINE SCREENSHOTS COMPLETED ===");
  } catch (err) {
    console.error("Capture execution error:", err);
  } finally {
    browser.kill();
  }
}

main();
