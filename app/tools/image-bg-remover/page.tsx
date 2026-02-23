import { Metadata } from "next";
import ImageBGRemover from "./components/ClientPage";
import { SEO_KEYWORDS } from "@/data/seo";

export const metadata: Metadata = {
  title: "AI Image Background Remover – Free, Fast & Private",
  description:
    "Instantly remove backgrounds from your images for free using our client-side AI tool. Perfect for product photos, portraits, and social media. Processing happens locally in your browser ensuring 100% privacy.",
  keywords: [
    ...SEO_KEYWORDS,
    "image background remover",
    "remove bg",
    "transparent background maker",
    "ai photo editor",
    "free background removal",
    "local AI background removal",
    "private image editor"
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
    canonical: "https://themukesh.com/tools/image-bg-remover",
  },
  openGraph: {
    title: "AI Image Background Remover – Free & Private",
    description:
      "Instantly remove backgrounds from your images for free using our client-side AI tool. 100% local processing.",
    url: "https://themukesh.com/tools/image-bg-remover",
    siteName: "TheMukesh",
    images: [
      {
        url: "https://themukesh.com/mukesh-mg.png",
        width: 1200,
        height: 630,
        alt: "AI Image Background Remover Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Background Remover – Free & Private",
    description: "Instantly remove backgrounds from your images for free without uploads.",
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
    "name": "AI Image Background Remover",
    "url": "https://themukesh.com/tools/image-bg-remover",
    "description": "Instantly remove backgrounds from any image 100% locally in your browser. Fast, private, and free.",
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
      <ImageBGRemover />
    </>
  );
};

export default Page;
