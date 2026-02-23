import { Metadata } from "next";
import IGDownloader from "./components/ClientPage";
import { SEO_KEYWORDS } from "@/data/seo";

export const metadata: Metadata = {
  title: "Instagram Reels & Story Downloader – Fast & Free",
  description:
    "Instantly download Instagram Reels, Stories, and Posts in HD quality for free. Fast, secure, and no login required.",
  keywords: [
    ...SEO_KEYWORDS,
    "instagram downloader",
    "ig video download",
    "reels downloader",
    "download instagram story",
    "save instagram video",
    "free ig downloader",
    "instagram post saver",
    "download igtv"
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
    canonical: "https://themukesh.com/tools/instagram-downloader",
  },
  openGraph: {
    title: "Instagram Reels & Story Downloader – Free & Fast",
    description:
      "Instantly download Instagram Reels, Stories, and Posts in HD quality for free. No login needed.",
    url: "https://themukesh.com/tools/instagram-downloader",
    siteName: "TheMukesh",
    images: [
      {
        url: "https://themukesh.com/mukesh-mg.png",
        width: 1200,
        height: 630,
        alt: "Instagram Video Downloader Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Reels & Story Downloader",
    description: "Download Instagram Reels, Stories, and Posts in HD instantly. No app required.",
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
    "name": "Instagram Reels & Story Downloader",
    "url": "https://themukesh.com/tools/instagram-downloader",
    "description": "Download any Instagram Reel, Story, or Post easily and save it directly to your device.",
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
      <IGDownloader />
    </>
  );
};

export default Page;
