import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get directory name using ES modules pattern
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to SVG favicon
const svgPath = path.join(__dirname, 'client/public/favicon.svg');
const sizes = [16, 32, 48, 64, 128, 256];

// Ensure directory exists
const faviconDir = path.join(__dirname, 'client/public/favicons');
if (!fs.existsSync(faviconDir)) {
  fs.mkdirSync(faviconDir, { recursive: true });
}

async function generatePNGs() {
  try {
    const svgBuffer = fs.readFileSync(svgPath);
    
    // Generate favicons for each size
    for (const size of sizes) {
      const outputPath = path.join(faviconDir, `favicon-${size}x${size}.png`);
      
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`Generated ${size}x${size} favicon at ${outputPath}`);
    }
    
    // Also create a favicon.png in the root
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, 'client/public/favicon.png'));
      
    console.log('Successfully generated all favicon PNGs');
  } catch (err) {
    console.error('Error generating favicon PNGs:', err);
  }
}

generatePNGs();