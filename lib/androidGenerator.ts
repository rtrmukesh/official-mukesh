import sharp from 'sharp';
import { GeneratedFile } from './iosGenerator';

const androidSizes = [
  { size: 48, folder: 'mipmap-mdpi' },
  { size: 72, folder: 'mipmap-hdpi' },
  { size: 96, folder: 'mipmap-xhdpi' },
  { size: 144, folder: 'mipmap-xxhdpi' },
  { size: 192, folder: 'mipmap-xxxhdpi' },
];

export async function generateAndroidIcons(
  sourceImage: sharp.Sharp,
  padding: boolean,
  backgroundColor: string,
  baseFolder: string = 'Android'
): Promise<GeneratedFile[]> {
  const files: GeneratedFile[] = [];

  // Generate legacy icons (with background / padding applied if requested)
  for (const config of androidSizes) {
    let resized: sharp.Sharp;

    if (padding) {
      const contentSize = Math.round(config.size * 0.7); // Android adaptive typically uses smaller safe zone
      
      const buffer = await sourceImage.clone()
        .resize(contentSize, contentSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();

      const bg = backgroundColor !== 'transparent' ? backgroundColor : { r: 0, g: 0, b:0, alpha: 0};
      
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
      name: 'ic_launcher.png',
      folder: `${baseFolder}/${config.folder}`,
      buffer: await resized.png().toBuffer()
    });
    
    // Also create rounded icons for older android versions
    // We cheat here by just supplying the same image for simplicity, standard Android studio behavior often mirrors this.
    files.push({
      name: 'ic_launcher_round.png',
      folder: `${baseFolder}/${config.folder}`,
      buffer: await resized.png().toBuffer()
    });
  }

  // Generate Play Store 512x512
  const playStoreBuffer = await sourceImage.clone().resize(512, 512, { fit: 'cover' }).png().toBuffer();
  files.push({
    name: '512x512.png',
    folder: `${baseFolder}/playstore`,
    buffer: playStoreBuffer
  });

  // Generate Adaptive Icon XML Template
  const xmlContent = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>`;

  files.push({
    name: 'ic_launcher.xml',
    folder: `${baseFolder}/mipmap-anydpi-v26`,
    buffer: Buffer.from(xmlContent)
  });

  // Generate the adaptive foreground icon (which should ideally be transparent)
  for (const config of androidSizes) {
    const contentSize = Math.round(config.size * 0.7); 
    const buffer = await sourceImage.clone()
        .resize(contentSize, contentSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();
        
    const foreground = sharp({
      create: {
        width: config.size,
        height: config.size,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    }).composite([{ input: buffer, gravity: 'center' }]);
    
    files.push({
      name: 'ic_launcher_foreground.png',
      folder: `${baseFolder}/${config.folder}`,
      buffer: await foreground.png().toBuffer()
    });
  }

  return files;
}
