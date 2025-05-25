const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images/optimized');
const formats = ['webp', 'avif']; // Modern image formats
const qualityLevels = {
  webp: 80,
  avif: 65,
  jpeg: 85,
  png: 85
};
const sizes = [
  { width: 1920, suffix: 'large' },
  { width: 1280, suffix: 'medium' },
  { width: 640, suffix: 'small' },
  { width: 320, suffix: 'thumbnail' }
];

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Process images
async function processImages() {
  try {
    // Get all image files
    const files = fs.readdirSync(inputDir)
      .filter(file => /\.(jpe?g|png|gif)$/i.test(file));
    
    console.log(`Found ${files.length} images to process`);
    
    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const fileBaseName = path.basename(file, path.extname(file));
      
      // Get image metadata
      const metadata = await sharp(inputPath).metadata();
      
      // Process each size
      for (const size of sizes) {
        // Skip if original is smaller than target size
        if (metadata.width <= size.width) continue;
        
        // Process each format
        for (const format of formats) {
          const outputFileName = `${fileBaseName}-${size.suffix}.${format}`;
          const outputPath = path.join(outputDir, outputFileName);
          
          // Skip if file already exists
          if (fs.existsSync(outputPath)) continue;
          
          // Resize and convert
          await sharp(inputPath)
            .resize({ width: size.width, withoutEnlargement: true })
            [format]({ quality: qualityLevels[format] })
            .toFile(outputPath);
          
          console.log(`Created: ${outputFileName}`);
        }
      }
      
      // Also create a standard optimized version in original format
      const originalFormat = metadata.format.toLowerCase();
      if (originalFormat === 'jpeg' || originalFormat === 'jpg') {
        const outputPath = path.join(outputDir, `${fileBaseName}-optimized.jpg`);
        await sharp(inputPath)
          .jpeg({ quality: qualityLevels.jpeg, mozjpeg: true })
          .toFile(outputPath);
      } else if (originalFormat === 'png') {
        const outputPath = path.join(outputDir, `${fileBaseName}-optimized.png`);
        await sharp(inputPath)
          .png({ quality: qualityLevels.png, compressionLevel: 9 })
          .toFile(outputPath);
      }
    }
    
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages();
