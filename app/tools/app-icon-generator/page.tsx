import React from 'react';
import { Metadata } from 'next';
import AppIconGeneratorClient from './AppIconGeneratorClient';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Advanced App Icon Generator for iOS, Android & Web – Xcode Ready Export',
  description: 'Pro app icon generator. Crop, pad, and export perfectly structured AppIcon.appiconset for iOS, adaptive mipmaps for Android, and PWA manifests.',
  keywords: 'app icon generator, Xcode Contents.json generator, Android adaptive icons generator, PWA icon manifest maker, iOS icon sizes, react-easy-crop',
};

export default function AppIconGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Advanced App Icon Generator",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "description": "Professional tool to generate perfectly structured app icons for iOS, Android, and Web projects.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Script
        id="software-app-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AppIconGeneratorClient />
    </>
  );
}
