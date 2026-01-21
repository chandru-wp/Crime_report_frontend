import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateIcons() {
  const sourceImage = path.join(__dirname, 'public', 'crime-icon-source.png');
  
  if (!fs.existsSync(sourceImage)) {
    console.error('❌ Source image not found:', sourceImage);
    return;
  }

  console.log('📸 Generating PWA icons from source image...\n');

  const sizes = [
    { size: 192, name: 'pwa-192x192.png' },
    { size: 512, name: 'pwa-512x512.png' },
    { size: 180, name: 'apple-touch-icon.png' }
  ];

  try {
    for (const { size, name } of sizes) {
      const outputPath = path.join(__dirname, 'public', name);
      
      await sharp(sourceImage)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Created ${name} (${size}x${size})`);
    }

    console.log('\n🎉 All icons generated successfully!');
    console.log('\nGenerated files:');
    sizes.forEach(({ name }) => {
      console.log(`  - public/${name}`);
    });

  } catch (error) {
    console.error('❌ Error generating icons:', error);
  }
}

generateIcons();

