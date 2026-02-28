import { Metadata } from "next";
import PinterestDownloader from "./components/ClientPage";
import { SEO_KEYWORDS } from "@/data/seo";

export const metadata: Metadata = {
  title: "Pinterest Video & Image Downloader – Fast & Free",
  description:
    "Instantly download Pinterest Videos and Images in high quality for free. Fast, secure, and no login required.",
  keywords: [
    ...SEO_KEYWORDS,
    "pinterest video downloader",
    "pinterest downloader",
    "download pinterest video",
    "pinterest image downloader",
    "download video from pinterest",
    "pinterest gif downloader",
    "pinterest story downloader",
    "save pinterest video",
    "pinterest pin downloader",
    "free pinterest video downloader",
    "pinterest reels downloader",
    "hd pinterest downloader",
    "online pinterest video downloader",
    "pinterest video saver",
    "pinterest photo downloader",
  ],
  authors: [{ name: "Mukesh" }],
  creator: "Mukesh",
  publisher: "Mukesh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://themukesh.com/tools/pinterest-downloader",
  },
  openGraph: {
    title: "Pinterest Video & Image Downloader – Free & Fast",
    description:
      "Instantly download Pinterest Videos and Images in high quality for free. No login needed.",
    url: "https://themukesh.com/tools/pinterest-downloader",
    siteName: "TheMukesh",
    images: [
      {
        url: "https://themukesh.com/mukesh-mg.png",
        width: 1200,
        height: 630,
        alt: "Pinterest Downloader Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinterest Video & Image Downloader",
    description: "Download Pinterest Videos and Images in HD instantly. No app required.",
    images: ["https://themukesh.com/mukesh-mg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const Page = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pinterest Video & Image Downloader",
    "url": "https://themukesh.com/tools/pinterest-downloader",
    "description": "Download any Pinterest Video or Image easily and save it directly to your device.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Person",
      "name": "Mukesh",
      "url": "https://themukesh.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PinterestDownloader />
    </>
  );
};

export default Page;
