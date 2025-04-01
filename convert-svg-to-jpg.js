import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using ES modules pattern
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the SVG file
const svgPath = path.join(__dirname, 'client/public/og-image.svg');
const outputPath = path.join(__dirname, 'client/public/og-image.jpg');

// Read the SVG file
const svgBuffer = fs.readFileSync(svgPath);

// Convert SVG to JPEG
sharp(svgBuffer)
  .resize(1200, 630)
  .jpeg({
    quality: 90,
    progressive: true
  })
  .toFile(outputPath)
  .then(() => {
    console.log(`Successfully converted SVG to JPEG at ${outputPath}`);
  })
  .catch(err => {
    console.error('Error converting SVG to JPEG:', err);
  });