export interface AppIconSize {
  name: string;
  size: number;
  platform: 'iOS' | 'Android' | 'Web';
  folder: string;
}

export const appIconSizes: AppIconSize[] = [
  // iOS
  { name: 'icon-20x20.png', size: 20, platform: 'iOS', folder: 'iOS' },
  { name: 'icon-29x29.png', size: 29, platform: 'iOS', folder: 'iOS' },
  { name: 'icon-40x40.png', size: 40, platform: 'iOS', folder: 'iOS' },
  { name: 'icon-60x60.png', size: 60, platform: 'iOS', folder: 'iOS' },
  { name: 'icon-76x76.png', size: 76, platform: 'iOS', folder: 'iOS' },
  { name: 'icon-83.5x83.5.png', size: 84, platform: 'iOS', folder: 'iOS' }, // rounded to 84 or use exact size
  { name: 'icon-1024x1024.png', size: 1024, platform: 'iOS', folder: 'iOS' },
  
  // Android
  { name: 'mipmap-mdpi.png', size: 48, platform: 'Android', folder: 'Android' },
  { name: 'mipmap-hdpi.png', size: 72, platform: 'Android', folder: 'Android' },
  { name: 'mipmap-xhdpi.png', size: 96, platform: 'Android', folder: 'Android' },
  { name: 'mipmap-xxhdpi.png', size: 144, platform: 'Android', folder: 'Android' },
  { name: 'mipmap-xxxhdpi.png', size: 192, platform: 'Android', folder: 'Android' },
  { name: 'play_store_512.png', size: 512, platform: 'Android', folder: 'Android' },
  
  // Web
  { name: 'favicon-16x16.png', size: 16, platform: 'Web', folder: 'Web' },
  { name: 'favicon-32x32.png', size: 32, platform: 'Web', folder: 'Web' },
  { name: 'icon-192x192.png', size: 192, platform: 'Web', folder: 'Web' },
  { name: 'icon-512x512.png', size: 512, platform: 'Web', folder: 'Web' }
];
