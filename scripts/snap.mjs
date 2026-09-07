import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

// Usage: node scripts/snap.mjs --url=http://... --out=... [--selector=...] [--zoom=1] [--width=1440] [--height=900] [--scrollY=0] [--action="..."] [--wait=3000]

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, "").split("=");
    return [k, v.join("=")];
  })
);

const url = args.url || "http://127.0.0.1:3005/";
const outPath = args.out ? path.resolve(args.out) : path.resolve("research/snap.png");
const selector = args.selector || null;
const zoom = parseFloat(args.zoom || "1.0");
const width = parseInt(args.width || "1440", 10);
const height = parseInt(args.height || "900", 10);
const scrollY = parseInt(args.scrollY || "0", 10);
const action = args.action || null;
const waitMs = parseInt(args.wait || "3500", 10);

fs.mkdirSync(path.dirname(outPath), { recursive: true });

async function main() {
  const port = 9230 + Math.floor(Math.random() * 50);
  const browser = spawn(EDGE_PATH, [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "about:blank",
  ]);

  await new Promise((r) => setTimeout(r, 1800));

  try {
    const newTabRes = await fetch(`http://127.0.0.1:${port}/json/new`, { method: "PUT" });
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

    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 600,
    });

    await send("Page.navigate", { url });
    await new Promise((r) => setTimeout(r, waitMs));

    // Clean DevTools overlays, portals, and cookie banners
    await send("Runtime.evaluate", {
      expression: `
        document.querySelectorAll('nextjs-portal, #next-dev-tools, [data-nextjs-toast], [data-nextjs-dialog], [class*="nextjs-portal"], next-route-announcer, #__next-build-watcher, [class*="issue"]').forEach(el => el.remove());
        
        if (!document.getElementById('__snap_clean_style')) {
          const style = document.createElement('style');
          style.id = '__snap_clean_style';
          style.innerHTML = \`
            nextjs-portal, #next-dev-tools, [data-nextjs-toast], [data-nextjs-dialog], 
            [class*="nextjs-portal"], [id*="nextjs"], [class*="cookie"], [id*="cookie"],
            div[class*="issue"], button[class*="issue"], .fixed.bottom-4.left-4 {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
          \`;
          document.head.appendChild(style);
        }

        const buttons = Array.from(document.querySelectorAll('button'));
        const cookieBtn = buttons.find(b => b.textContent.includes('I understand') || b.textContent.includes('Accept'));
        if (cookieBtn) cookieBtn.click();
      `,
    });

    await new Promise((r) => setTimeout(r, 400));

    if (zoom !== 1.0) {
      await send("Runtime.evaluate", {
        expression: `document.body.style.zoom = '${zoom}';`,
      });
      await new Promise((r) => setTimeout(r, 400));
    }

    if (selector) {
      const scrollResult = await send("Runtime.evaluate", {
        expression: `
          (() => {
            const el = document.querySelector('${selector}');
            if (el) {
              el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' });
              return { found: true, tag: el.tagName, text: el.textContent.slice(0, 50) };
            }
            return { found: false };
          })()
        `,
        returnByValue: true,
      });
      console.log("Selector scroll result:", scrollResult.result?.value);
      await new Promise((r) => setTimeout(r, 800));
    } else if (scrollY > 0) {
      await send("Runtime.evaluate", {
        expression: `window.scrollTo({ top: ${scrollY}, behavior: 'instant' });`,
      });
      await new Promise((r) => setTimeout(r, 800));
    }

    if (action) {
      await send("Runtime.evaluate", { expression: action });
      await new Promise((r) => setTimeout(r, 800));
    }

    // Final clean pass
    await send("Runtime.evaluate", {
      expression: `
        document.querySelectorAll('nextjs-portal, #next-dev-tools, [data-nextjs-toast], [class*="nextjs-portal"]').forEach(el => el.remove());
      `,
    });

    const screenshot = await send("Page.captureScreenshot", { format: "png" });
    const buffer = Buffer.from(screenshot.data, "base64");
    fs.writeFileSync(outPath, buffer);
    console.log(`[SNAP SAVED] ${outPath} (${width}x${height})`);
  } catch (err) {
    console.error("Snap error:", err);
  } finally {
    browser.kill();
  }
}

main();
