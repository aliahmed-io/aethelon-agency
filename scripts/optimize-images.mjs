import sharp from "sharp";
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const dir = "./public/images";
const files = readdirSync(dir).filter(f => f.endsWith(".webp") || f.endsWith(".png"));

async function optimize() {
  for (const file of files) {
    const fullPath = join(dir, file);
    const beforeSize = statSync(fullPath).size;
    
    if (file.endsWith(".webp")) {
      const buffer = readFileSync(fullPath);
      const optimized = await sharp(buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 75, effort: 6 })
        .toBuffer();
      
      if (optimized.length < beforeSize) {
        writeFileSync(fullPath, optimized);
        console.log(`Optimized ${file}: ${Math.round(beforeSize/1024)}KB -> ${Math.round(optimized.length/1024)}KB`);
      }
    }
  }
}

optimize();
