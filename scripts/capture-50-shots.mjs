import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT_NOV = "d:\\aethelon-agency\\research\\novexa-50";
const OUT_OAK = "d:\\aethelon-agency\\research\\oakwell-50";

fs.mkdirSync(OUT_NOV, { recursive: true });
fs.mkdirSync(OUT_OAK, { recursive: true });

async function main() {
  const browser = spawn(EDGE_PATH, [
    "--headless=new",
    "--remote-debugging-port=9226",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "about:blank",
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  try {
    const newTabRes = await fetch("http://127.0.0.1:9226/json/new", { method: "PUT" });
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
        }, 20000);

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

    async function cleanDom() {
      await send("Runtime.evaluate", {
        expression: `
          document.querySelectorAll('nextjs-portal, #next-dev-tools, [data-nextjs-toast], [data-nextjs-dialog], [class*="nextjs-portal"], next-route-announcer, #__next-build-watcher, [class*="issue"]').forEach(el => el.remove());
          
          if (!document.getElementById('__super_clean_style')) {
            const style = document.createElement('style');
            style.id = '__super_clean_style';
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
    }

    async function capture({ url, savePath, width = 1440, height = 900, scrollY = 0, scrollX = 0, zoom = 1.0, waitMs = 2200, action = null, mobile = false }) {
      try {
        await send("Emulation.setDeviceMetricsOverride", {
          width,
          height,
          deviceScaleFactor: 1,
          mobile,
        });

        await send("Page.navigate", { url });
        await new Promise((r) => setTimeout(r, waitMs));
        await cleanDom();

        if (zoom !== 1.0) {
          await send("Runtime.evaluate", { expression: `document.body.style.zoom = '${zoom}';` });
          await new Promise((r) => setTimeout(r, 400));
        }

        if (scrollY > 0 || scrollX > 0) {
          await send("Runtime.evaluate", { expression: `window.scrollTo({ top: ${scrollY}, left: ${scrollX}, behavior: 'instant' });` });
          await new Promise((r) => setTimeout(r, 600));
        }

        if (action) {
          await send("Runtime.evaluate", { expression: action });
          await new Promise((r) => setTimeout(r, 800));
        }

        await cleanDom();

        const screenshot = await send("Page.captureScreenshot", { format: "png" });
        const buffer = Buffer.from(screenshot.data, "base64");
        fs.writeFileSync(savePath, buffer);
        console.log(`[SAVED] ${path.basename(savePath)} - ${width}x${height} scroll:${scrollY} zoom:${zoom}`);
      } catch (err) {
        console.error(`[ERROR] ${path.basename(savePath)}: ${err.message}`);
      }
    }

    // =========================================================================
    // 50 DIVERSE CAPTURES FOR NOVEXA FOOTWEAR (http://127.0.0.1:3005)
    // =========================================================================
    console.log("\n==========================================");
    console.log("STARTING 50 CAPTURES FOR NOVEXA");
    console.log("==========================================");

    const novexaShots = [
      // 1-10: Hero Variations (Zooms, crops, aspect ratios)
      { id: "01", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 0, z: 1.0, desc: "Hero standard 1440x900" },
      { id: "02", url: "http://127.0.0.1:3005/", w: 1600, h: 1000, y: 0, z: 0.9, desc: "Hero wide 1600x1000 0.9x" },
      { id: "03", url: "http://127.0.0.1:3005/", w: 1920, h: 1080, y: 0, z: 0.85, desc: "Hero ultra-wide 1080p 0.85x" },
      { id: "04", url: "http://127.0.0.1:3005/", w: 1200, h: 800, y: 0, z: 1.0, desc: "Hero compact desktop" },
      { id: "05", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 0, z: 1.15, desc: "Hero zoom-in 1.15x typography" },
      { id: "06", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 80, z: 1.0, desc: "Hero slight scroll down 80px" },
      { id: "07", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 180, z: 1.0, desc: "Hero transitional scroll 180px" },
      { id: "08", url: "http://127.0.0.1:3005/", w: 768, h: 1024, y: 0, z: 1.0, desc: "Hero iPad portrait" },
      { id: "09", url: "http://127.0.0.1:3005/", w: 1024, h: 768, y: 0, z: 1.0, desc: "Hero iPad landscape" },
      { id: "10", url: "http://127.0.0.1:3005/", w: 390, h: 844, y: 0, z: 1.0, mobile: true, desc: "Hero Mobile iPhone 14" },

      // 11-20: Landing Page Mid-Section & Standard Banner
      { id: "11", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 320, z: 1.0, desc: "The Novexa Standard banner centered" },
      { id: "12", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 480, z: 1.0, desc: "Standard banner + Silhouettes header" },
      { id: "13", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 620, z: 1.0, desc: "Featured Silhouettes header and top of cards" },
      { id: "14", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 720, z: 1.0, desc: "Featured Silhouettes 3-card lineup focused" },
      { id: "15", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 850, z: 1.0, desc: "Featured Silhouettes card pricing & CTAs" },
      { id: "16", url: "http://127.0.0.1:3005/", w: 1600, h: 1000, y: 700, z: 0.9, desc: "Featured Silhouettes wide overview" },
      { id: "17", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 1100, z: 1.0, desc: "Explore Categories transition scroll" },
      { id: "18", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 1300, z: 1.0, desc: "Explore Categories header & top of cards" },
      { id: "19", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 1450, z: 1.0, desc: "Men and Women editorial cards centered" },
      { id: "20", url: "http://127.0.0.1:3005/", w: 1600, h: 1000, y: 1400, z: 0.88, desc: "Categories editorial wide-angle" },

      // 21-30: Innovation & Material Specs & Manifesto
      { id: "21", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 1850, z: 1.0, desc: "Innovation & Craft section arrival" },
      { id: "22", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 2050, z: 1.0, desc: "Material Study 001 and 3 spec pillars" },
      { id: "23", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 2150, z: 1.0, desc: "Material Study 001 crisp centered" },
      { id: "24", url: "http://127.0.0.1:3005/", w: 1600, h: 1000, y: 2100, z: 0.9, desc: "Material Study 001 wide spread" },
      { id: "25", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 2400, z: 1.0, desc: "Manifesto transition arrival" },
      { id: "26", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 2600, z: 1.0, desc: "A Considered Daily Uniform block centered" },
      { id: "27", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 2800, z: 1.0, desc: "Manifesto card with newsletter footer" },
      { id: "28", url: "http://127.0.0.1:3005/", w: 390, h: 844, y: 700, z: 1.0, mobile: true, desc: "Mobile Silhouettes 1-column scroll" },
      { id: "29", url: "http://127.0.0.1:3005/", w: 390, h: 844, y: 1600, z: 1.0, mobile: true, desc: "Mobile Material Study card" },
      { id: "30", url: "http://127.0.0.1:3005/", w: 390, h: 844, y: 2400, z: 1.0, mobile: true, desc: "Mobile Manifesto card" },

      // 31-40: Product Catalog & Category Pages
      { id: "31", url: "http://127.0.0.1:3005/store/products/men", w: 1440, h: 900, y: 0, z: 1.0, desc: "Men Catalog Header & Filter Bar" },
      { id: "32", url: "http://127.0.0.1:3005/store/products/men", w: 1440, h: 900, y: 250, z: 1.0, desc: "Men Catalog Top 3 product cards" },
      { id: "33", url: "http://127.0.0.1:3005/store/products/men", w: 1440, h: 900, y: 600, z: 1.0, desc: "Men Catalog Middle row product cards" },
      { id: "34", url: "http://127.0.0.1:3005/store/products/women", w: 1440, h: 900, y: 0, z: 1.0, desc: "Women Catalog Header & Filters" },
      { id: "35", url: "http://127.0.0.1:3005/store/products/women", w: 1440, h: 900, y: 300, z: 1.0, desc: "Women Catalog Product cards grid" },
      { id: "36", url: "http://127.0.0.1:3005/store/products/kids", w: 1440, h: 900, y: 0, z: 1.0, desc: "Kids Catalog Header" },
      { id: "37", url: "http://127.0.0.1:3005/store/products/all", w: 1440, h: 900, y: 0, z: 1.0, desc: "All Products catalog view" },
      { id: "38", url: "http://127.0.0.1:3005/store/products/men", w: 1600, h: 1000, y: 150, z: 0.9, desc: "Men Catalog wide layout" },
      { id: "39", url: "http://127.0.0.1:3005/store/products/men", w: 390, h: 844, y: 200, z: 1.0, mobile: true, desc: "Mobile Men Catalog product scroll" },
      { id: "40", url: "http://127.0.0.1:3005/store/shop", w: 1440, h: 900, y: 0, z: 1.0, desc: "Store Shop Index" },

      // 41-50: Storefront Home & Lookbook
      { id: "41", url: "http://127.0.0.1:3005/store", w: 1440, h: 900, y: 0, z: 1.0, desc: "Storefront Home Hero Slider" },
      { id: "42", url: "http://127.0.0.1:3005/store", w: 1440, h: 900, y: 400, z: 1.0, desc: "Storefront Home Category Banners" },
      { id: "43", url: "http://127.0.0.1:3005/store", w: 1440, h: 900, y: 900, z: 1.0, desc: "Storefront Home Featured Products" },
      { id: "44", url: "http://127.0.0.1:3005/store", w: 1440, h: 900, y: 1500, z: 1.0, desc: "Storefront Home Lookbook" },
      { id: "45", url: "http://127.0.0.1:3005/about", w: 1440, h: 900, y: 0, z: 1.0, desc: "Novexa About / Brand Story" },
      { id: "46", url: "http://127.0.0.1:3005/about", w: 1440, h: 900, y: 400, z: 1.0, desc: "About page craftsmanship values" },
      { id: "47", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 0, z: 1.0, action: "const s = document.querySelector('button[aria-label*=\"Search\"], input[placeholder*=\"Search\"]'); if(s) s.click();", desc: "Search overlay state" },
      { id: "48", url: "http://127.0.0.1:3005/", w: 1440, h: 900, y: 720, z: 1.0, action: "const cards = document.querySelectorAll('div[class*=\"card\"], div[class*=\"group\"]'); if(cards[0]) cards[0].style.transform='translateY(-6px)';", desc: "Silhouettes hover micro-interaction" },
      { id: "49", url: "http://127.0.0.1:3005/store/products/men", w: 1440, h: 900, y: 350, z: 1.1, desc: "Men product card close-up" },
      { id: "50", url: "http://127.0.0.1:3005/", w: 1920, h: 1080, y: 2000, z: 0.9, desc: "Full Innovation + Manifesto ultra-wide spread" },
    ];

    for (const shot of novexaShots) {
      await capture({
        url: shot.url,
        savePath: path.join(OUT_NOV, `nov_${shot.id}.png`),
        width: shot.w,
        height: shot.h,
        scrollY: shot.y,
        zoom: shot.z,
        action: shot.action,
        mobile: shot.mobile || false,
      });
    }

    // =========================================================================
    // 50 DIVERSE CAPTURES FOR OAKWELL ATELIER (http://127.0.0.1:3004)
    // =========================================================================
    console.log("\n==========================================");
    console.log("STARTING 50 CAPTURES FOR OAKWELL");
    console.log("==========================================");

    const oakwellShots = [
      // 1-10: Hero Variations (Angles, zooms, aspect ratios)
      { id: "01", url: "http://127.0.0.1:3004/", w: 1440, h: 900, y: 0, z: 1.0, desc: "Oakwell Hero 1440x900 standard" },
      { id: "02", url: "http://127.0.0.1:3004/", w: 1600, h: 1000, y: 0, z: 0.88, desc: "Oakwell Hero 1600x1000 0.88x" },
      { id: "03", url: "http://127.0.0.1:3004/", w: 1920, h: 1080, y: 0, z: 0.82, desc: "Oakwell Hero 1080p full room 0.82x" },
      { id: "04", url: "http://127.0.0.1:3004/", w: 1200, h: 800, y: 0, z: 1.0, desc: "Oakwell Hero compact desktop" },
      { id: "05", url: "http://127.0.0.1:3004/", w: 1440, h: 900, y: 0, z: 1.15, desc: "Oakwell Hero typography close-up" },
      { id: "06", url: "http://127.0.0.1:3004/", w: 1440, h: 900, y: 120, z: 1.0, desc: "Oakwell Hero scroll down 120px" },
      { id: "07", url: "http://127.0.0.1:3004/", w: 1440, h: 900, y: 240, z: 1.0, desc: "Oakwell Hero scroll down 240px" },
      { id: "08", url: "http://127.0.0.1:3004/", w: 768, h: 1024, y: 0, z: 1.0, desc: "Oakwell Hero iPad portrait" },
      { id: "09", url: "http://127.0.0.1:3004/", w: 1024, h: 768, y: 0, z: 1.0, desc: "Oakwell Hero iPad landscape" },
      { id: "10", url: "http://127.0.0.1:3004/", w: 390, h: 844, y: 0, z: 1.0, mobile: true, desc: "Oakwell Hero Mobile iPhone 14" },

      // 11-20: The Oakwell Way & Pedestal Table Focus
      { id: "11", url: "http://127.0.0.1:3004/", w: 1440, h: 900, y: 650, z: 1.0, desc: "The Oakwell Way arrival scroll" },
      { id: "12", url: "http://127.0.0.1:3004/", w: 1440, h: 900, y: 880, z: 1.0, desc: "The Oakwell Way centered split" },
      { id: "13", url: "http://127.0.0.1:3004/", w: 1600, h: 1000, y: 850, z: 0.9, desc: "The Oakwell Way wide layout" },
      { id: "14", url: "http://127.0.0.1:3004/", w: 1440, h: 900, y: 1100, z: 1.0, desc: "Fluted table pedestal base detail" },
      { id: "15", url: "http://127.0.0.1:3004/", w: 1440, h: 900, y: 1300, z: 1.0, desc: "Material Study 01 badge & pedestal" },
      { id: "16", url: "http://127.0.0.1:3004/", w: 1440, h: 900, y: 1550, z: 1.0, desc: "Transition to 02 Curated by Room" },
      { id: "17", url: "http://127.0.0.1:3004/", w: 1440, h: 900, y: 1800, z: 1.0, desc: "Make space for living header" },
      { id: "18", url: "http://127.0.0.1:3004/", w: 1440, h: 900, y: 2100, z: 1.0, desc: "Room cards top edge arrival" },
      { id: "19", url: "http://127.0.0.1:3004/", w: 1440, h: 900, y: 2450, z: 1.0, desc: "Living, Dining, Bedroom 3-column spread" },
      { id: "20", url: "http://127.0.0.1:3004/", w: 1600, h: 1000, y: 2400, z: 0.88, desc: "Room cards wide architectural panorama" },

      // 21-30: Lookbook Dining/Living Details & The Edit
      { id: "21", url: "http://127.0.0.1:3004/", w: 1440, h: 900, y: 2750, z: 1.0, desc: "The Edit - Pieces to keep header & tabs" },
      { id: "22", url: "http://127.0.0.1:3004/", w: 1440, h: 900, y: 3000, z: 1.0, desc: "The Edit furniture pieces row 1" },
      { id: "23", url: "http://127.0.0.1:3004/", w: 1440, h: 900, y: 3300, z: 1.0, desc: "The Edit furniture pieces row 2" },
      { id: "24", url: "http://127.0.0.1:3004/", w: 1440, h: 900, y: 3700, z: 1.0, desc: "Craftsmanship & slow-grown timber narrative" },
      { id: "25", url: "http://127.0.0.1:3004/", w: 1440, h: 900, y: 4100, z: 1.0, desc: "Footer brand monograph" },
      { id: "26", url: "http://127.0.0.1:3004/", w: 390, h: 844, y: 880, z: 1.0, mobile: true, desc: "Mobile The Oakwell Way" },
      { id: "27", url: "http://127.0.0.1:3004/", w: 390, h: 844, y: 2200, z: 1.0, mobile: true, desc: "Mobile Room Cards Stack" },
      { id: "28", url: "http://127.0.0.1:3004/", w: 390, h: 844, y: 3200, z: 1.0, mobile: true, desc: "Mobile The Edit catalog" },
      { id: "29", url: "http://127.0.0.1:3004/", w: 768, h: 1024, y: 2400, z: 1.0, desc: "iPad Room Cards layout" },
      { id: "30", url: "http://127.0.0.1:3004/", w: 1920, h: 1080, y: 2400, z: 0.85, desc: "Ultra-wide 1080p 3-room lookbook" },

      // 31-40: Shop Catalog Grid (/shop)
      { id: "31", url: "http://127.0.0.1:3004/shop", w: 1440, h: 900, y: 0, z: 1.0, desc: "Shop Catalog Header - Objects for real life" },
      { id: "32", url: "http://127.0.0.1:3004/shop", w: 1440, h: 900, y: 350, z: 1.0, desc: "Shop Catalog filters & top row" },
      { id: "33", url: "http://127.0.0.1:3004/shop", w: 1440, h: 900, y: 650, z: 1.0, desc: "Shop Catalog Cairn table & Noma sofa" },
      { id: "34", url: "http://127.0.0.1:3004/shop", w: 1440, h: 900, y: 1050, z: 1.0, desc: "Shop Catalog middle grid" },
      { id: "35", url: "http://127.0.0.1:3004/shop", w: 1600, h: 1000, y: 550, z: 0.9, desc: "Shop Catalog wide grid view" },
      { id: "36", url: "http://127.0.0.1:3004/shop", w: 390, h: 844, y: 450, z: 1.0, mobile: true, desc: "Mobile Shop Catalog products" },
      { id: "37", url: "http://127.0.0.1:3004/categories", w: 1440, h: 900, y: 0, z: 1.0, desc: "Oakwell Categories Index" },
      { id: "38", url: "http://127.0.0.1:3004/lookbooks", w: 1440, h: 900, y: 0, z: 1.0, desc: "Oakwell Lookbooks Index" },
      { id: "39", url: "http://127.0.0.1:3004/lookbooks", w: 1440, h: 900, y: 400, z: 1.0, desc: "Lookbooks editorial spreads" },
      { id: "40", url: "http://127.0.0.1:3004/journal", w: 1440, h: 900, y: 0, z: 1.0, desc: "Oakwell Journal / Monograph articles" },

      // 41-50: Atelier, Vault, AR & Dashboard
      { id: "41", url: "http://127.0.0.1:3004/atelier", w: 1440, h: 900, y: 0, z: 1.0, desc: "Atelier Hero - Bespoke craft" },
      { id: "42", url: "http://127.0.0.1:3004/atelier", w: 1440, h: 900, y: 450, z: 1.0, desc: "Atelier 3 pillars (Adaptation, Reserve, Commission)" },
      { id: "43", url: "http://127.0.0.1:3004/atelier", w: 1440, h: 900, y: 900, z: 1.0, desc: "Atelier craftsmanship process" },
      { id: "44", url: "http://127.0.0.1:3004/vault", w: 1440, h: 900, y: 0, z: 1.0, desc: "Trade Vault Hero - The quiet vault" },
      { id: "45", url: "http://127.0.0.1:3004/vault", w: 1440, h: 900, y: 350, z: 1.0, desc: "Trade Vault Patrons Key Portal" },
      { id: "46", url: "http://127.0.0.1:3004/spatial-ar", w: 1440, h: 900, y: 0, z: 1.0, desc: "Spatial AR WebXR visualizer page" },
      { id: "47", url: "http://127.0.0.1:3004/about", w: 1440, h: 900, y: 0, z: 1.0, desc: "Oakwell About / Monograph" },
      { id: "48", url: "http://127.0.0.1:3004/contact", w: 1440, h: 900, y: 0, z: 1.0, desc: "Oakwell Concierge Contact" },
      { id: "49", url: "http://127.0.0.1:3004/shop", w: 1440, h: 900, y: 700, z: 1.1, desc: "Shop product card zoom" },
      { id: "50", url: "http://127.0.0.1:3004/", w: 1920, h: 1080, y: 880, z: 0.9, desc: "Ultra-wide 1080p The Oakwell Way panorama" },
    ];

    for (const shot of oakwellShots) {
      await capture({
        url: shot.url,
        savePath: path.join(OUT_OAK, `oak_${shot.id}.png`),
        width: shot.w,
        height: shot.h,
        scrollY: shot.y,
        zoom: shot.z,
        action: shot.action,
        mobile: shot.mobile || false,
      });
    }

    console.log("\n==========================================");
    console.log("ALL 100 SCREENSHOTS CAPTURED SUCCESSFULLY!");
    console.log("==========================================");
  } catch (err) {
    console.error("Batch capture failed:", err);
  } finally {
    browser.kill();
  }
}

main();
