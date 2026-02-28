import sharp from 'sharp';

export interface GeneratedFile {
  name: string;
  folder: string;
  buffer: Buffer;
}

const iosSizes = [
  { size: 20, scale: 1, idiom: 'iphone' },
  { size: 20, scale: 2, idiom: 'iphone' },
  { size: 20, scale: 3, idiom: 'iphone' },
  { size: 29, scale: 1, idiom: 'iphone' },
  { size: 29, scale: 2, idiom: 'iphone' },
  { size: 29, scale: 3, idiom: 'iphone' },
  { size: 40, scale: 1, idiom: 'iphone' },
  { size: 40, scale: 2, idiom: 'iphone' },
  { size: 40, scale: 3, idiom: 'iphone' },
  { size: 60, scale: 2, idiom: 'iphone' },
  { size: 60, scale: 3, idiom: 'iphone' },
  { size: 20, scale: 1, idiom: 'ipad' },
  { size: 20, scale: 2, idiom: 'ipad' },
  { size: 29, scale: 1, idiom: 'ipad' },
  { size: 29, scale: 2, idiom: 'ipad' },
  { size: 40, scale: 1, idiom: 'ipad' },
  { size: 40, scale: 2, idiom: 'ipad' },
  { size: 76, scale: 1, idiom: 'ipad' },
  { size: 76, scale: 2, idiom: 'ipad' },
  { size: 83.5, scale: 2, idiom: 'ipad' },
  { size: 1024, scale: 1, idiom: 'ios-marketing' },
];

export async function generateIOSIcons(
  sourceImage: sharp.Sharp,
  padding: boolean,
  backgroundColor: string,
  baseFolder: string = 'AppIcon.appiconset'
): Promise<GeneratedFile[]> {
  const files: GeneratedFile[] = [];
  const contentsJson: any = {
    images: [],
    info: { author: 'sush-app-icon-generator', version: 1 }
  };

  const uniqueFiles = new Set<string>();

  for (const config of iosSizes) {
    const dimension = Math.round(config.size * config.scale);
    let filename = `icon-${config.size}${config.scale > 1 ? `@${config.scale}x` : ''}.png`;
    
    // Normalize 83.5 naming conventions typically seen in xcode
    if (config.size === 83.5) filename = `icon-83.5@2x.png`;
    if (config.size === 1024) filename = `icon-1024.png`;

    contentsJson.images.push({
      size: `${config.size}x${config.size}`,
      idiom: config.idiom,
      filename: filename,
      scale: `${config.scale}x`
    });

    if (uniqueFiles.has(filename)) continue;
    uniqueFiles.add(filename);

    let resized: sharp.Sharp;
    
    if (padding) {
      // 10% padding
      const contentSize = Math.round(dimension * 0.8);
      
      const buffer = await sourceImage.clone()
        .resize(contentSize, contentSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();

      // Ensure no alpha on iOS main icons if background color is specified as full hex. 
      // Typically iOS app icons cannot have alpha channels, so if it's transparent, we default to white.
      const bg = backgroundColor !== 'transparent' ? backgroundColor : '#FFFFFF';
      
      resized = sharp({
        create: {
          width: dimension,
          height: dimension,
          channels: 4,
          background: bg
        }
      }).composite([{ input: buffer, gravity: 'center' }]);
    } else {
      const bg = backgroundColor !== 'transparent' ? backgroundColor : '#FFFFFF';
      const buffer = await sourceImage.clone()
        .resize(dimension, dimension, { fit: 'cover' })
        .png()
        .toBuffer();

      // composite over bg to remove alpha
      resized = sharp({
        create: {
          width: dimension,
          height: dimension,
          channels: 4,
          background: bg
        }
      }).composite([{ input: buffer }]);
    }

    files.push({
      name: filename,
      folder: baseFolder,
      buffer: await resized.png().toBuffer()
    });
  }

  // Add Contents.json
  files.push({
    name: 'Contents.json',
    folder: baseFolder,
    buffer: Buffer.from(JSON.stringify(contentsJson, null, 2))
  });

  return files;
}
