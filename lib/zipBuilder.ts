import sharp from 'sharp';
import archiver from 'archiver';
import { generateIOSIcons, GeneratedFile } from './iosGenerator';
import { generateAndroidIcons } from './androidGenerator';
import { generateWebIcons } from './webGenerator';

export interface GenerationParams {
  platforms: string[];
  padding: boolean;
  backgroundColor: string;
}

export async function buildZipArchive(
  imageBuffer: Buffer,
  params: GenerationParams
): Promise<Buffer> {
  const sourceImage = sharp(imageBuffer);
  const metadata = await sourceImage.metadata();

  if (!metadata.width || !metadata.height || metadata.width < 1024 || metadata.height < 1024) {
    throw new Error('Image must be at least 1024x1024 pixels.');
  }

  let allFiles: GeneratedFile[] = [];

  if (params.platforms.includes('iOS')) {
    const iosFiles = await generateIOSIcons(sourceImage, params.padding, params.backgroundColor);
    allFiles = allFiles.concat(iosFiles);
  }

  if (params.platforms.includes('Android')) {
    const androidFiles = await generateAndroidIcons(sourceImage, params.padding, params.backgroundColor);
    allFiles = allFiles.concat(androidFiles);
  }

  if (params.platforms.includes('Web')) {
    const webFiles = await generateWebIcons(sourceImage, params.padding, params.backgroundColor);
    allFiles = allFiles.concat(webFiles);
  }

  return new Promise((resolve, reject) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const chunks: Buffer[] = [];

    archive.on('data', (chunk) => chunks.push(chunk));
    archive.on('end', () => resolve(Buffer.concat(chunks)));
    archive.on('error', (err) => reject(err));

    allFiles.forEach(file => {
      archive.append(file.buffer, { name: `${file.folder}/${file.name}` });
    });

    archive.finalize();
  });
}
