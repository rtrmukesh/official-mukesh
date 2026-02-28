import sharp from 'sharp';
import { GeneratedFile } from './iosGenerator';

const webSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' }
];

export async function generateWebIcons(
  sourceImage: sharp.Sharp,
  padding: boolean,
  backgroundColor: string,
  baseFolder: string = 'Web'
): Promise<GeneratedFile[]> {
  const files: GeneratedFile[] = [];

  for (const config of webSizes) {
    let resized: sharp.Sharp;

    if (padding) {
      const contentSize = Math.round(config.size * 0.8);
      const buffer = await sourceImage.clone()
        .resize(contentSize, contentSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();

      const bg = backgroundColor !== 'transparent' ? backgroundColor : { r: 0, g: 0, b: 0, alpha: 0 };
      
      resized = sharp({
        create: {
          width: config.size,
          height: config.size,
          channels: 4,
          background: bg as any
        }
      }).composite([{ input: buffer, gravity: 'center' }]);
    } else {
       let bgOpts = {};
      if (backgroundColor !== 'transparent') {
         bgOpts = { background: backgroundColor };
      }
      const buffer = await sourceImage.clone()
        .resize(config.size, config.size, { fit: 'cover', ...bgOpts })
        .png()
        .toBuffer();
      resized = sharp(buffer);
    }

    files.push({
      name: config.name,
      folder: baseFolder,
      buffer: await resized.png().toBuffer()
    });
    
    // Create an ico file from the 32x32 version for fallback favicon.ico
    if (config.size === 32) {
       files.push({
          name: 'favicon.ico',
          folder: baseFolder,
          buffer: await resized.png().toBuffer() // Simple renaming works in modern browsers, but real ICO encoding is better. Sharp doesn't support ICO directly out of the box, so we fallback to PNG named as .ico
       });
    }
  }

  // Generate manifest.json
  const manifest = {
    name: "App Name",
    short_name: "App",
    icons: [
        {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
        },
        {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
        }
    ],
    theme_color: backgroundColor !== 'transparent' ? backgroundColor : "#ffffff",
    background_color: backgroundColor !== 'transparent' ? backgroundColor : "#ffffff",
    display: "standalone"
  };

  files.push({
    name: 'site.webmanifest',
    folder: baseFolder,
    buffer: Buffer.from(JSON.stringify(manifest, null, 2))
  });

  return files;
}
