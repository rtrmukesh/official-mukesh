import sharp from 'sharp';
import archiver from 'archiver';
import { appIconSizes } from './iconSizes';

export interface ProcessedImage {
  name: string;
  platform: string;
  folder: string;
  base64: string;
}

export async function processImage(imageBuffer: Buffer): Promise<{ zipBase64: string, images: ProcessedImage[] }> {
  const metadata = await sharp(imageBuffer).metadata();
  
  if (!metadata.width || !metadata.height || metadata.width < 1024 || metadata.height < 1024) {
    throw new Error('Image must be at least 1024x1024 pixels.');
  }

  const processedImages: ProcessedImage[] = [];
  const zipFiles: { name: string, folder: string, buffer: Buffer }[] = [];
  
  // Create resized images
  for (const size of appIconSizes) {
    const resizeDimension = Math.round(size.size);
    
    const resizedBuffer = await sharp(imageBuffer)
      .resize(resizeDimension, resizeDimension, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toBuffer();
      
    processedImages.push({
      name: size.name,
      platform: size.platform,
      folder: size.folder,
      base64: resizedBuffer.toString('base64')
    });
    
    zipFiles.push({
      name: size.name,
      folder: size.folder,
      buffer: resizedBuffer
    });
  }

  // Create Zip
  const zipBuffer = await createZip(zipFiles);
  
  return {
    zipBase64: zipBuffer.toString('base64'),
    images: processedImages
  };
}

function createZip(files: { name: string, folder: string, buffer: Buffer }[]): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    const chunks: Buffer[] = [];
    
    archive.on('data', (chunk) => {
      chunks.push(chunk);
    });
    
    archive.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    
    archive.on('error', (err) => {
      reject(err);
    });

    files.forEach(file => {
      archive.append(file.buffer, { name: `${file.folder}/${file.name}` });
    });

    archive.finalize();
  });
}
