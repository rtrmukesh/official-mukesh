import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import PagePreloader from "@/components/PagePreloader";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import {
  FAQJsonLd,
  ImageJsonLd,
  LocalBusinessJsonLd,
  ProfilePageJsonLd,
  SoftwareApplicationJsonLd,
} from "next-seo";
import { person } from "@/lib/seo/person";
import { profilePage } from "@/lib/seo/profilePage";
import { faqs, images, localBusinesses, softwareApplications } from "@/lib/seo";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const GAID = process.env.GA_ID || "";
const GTMID = process.env.GTM_ID || "";

export const metadata: Metadata = {
  title: "Mukesh Murugaiyan — Full Stack Developer",
  description:
    "Portfolio of Mukesh Murugaiyan — Web, Android, iOS, and Desktop apps developer.",
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "Android Developer",
    "iOS Developer",
    "Desktop Apps",
    "Portfolio",
    "sush tech",
    "themukesh.com",
    "themukesh",
    "mukeshm",
    "SushTech",
    "Sush Tech",
    "sush tech",
    "sush tech portal",
  ],
  appleWebApp: {
    title: "Mukesh Murugaiyan",
    capable: true,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Mukesh Murugaiyan — Full Stack Developer Portfolio",
    description: "Web, Android, iOS, and Desktop apps developer portfolio.",
    url: "https://themukesh.com",
    siteName: "Mukesh Murugaiyan",
    images: [
      {
        url: "https://themukesh.com/mukesh-mg.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mukesh Murugaiyan — Full Stack Developer",
    description:
      "Official portfolio of Mukesh Murugaiyan — I build Web, Android, iOS & Desktop applications with modern tech stacks.",
    site: "@themukesh",
    creator: "@themukesh",
    images: [
      {
        url: "https://themukesh.com/mukesh-mg.png",
        alt: "Mukesh Murugaiyan — Full Stack Developer Portfolio",
      },
    ],
  },
  verification: {
    google: "AUY8DrfbJpplzyCMcTJNiCHYZJ34AB2NphOmTJ1_gfY",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <head>
        <meta
          name="google-site-verification"
          content="AUY8DrfbJpplzyCMcTJNiCHYZJ34AB2NphOmTJ1_gfY"
        />
      </head> */}

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Profile */}
        <ProfilePageJsonLd
          mainEntity={person}
          dateCreated={profilePage.dateCreated}
          dateModified={profilePage.dateModified}
        />
        {/* Software Applications */}
        {softwareApplications.map((app, i) => (
          <SoftwareApplicationJsonLd key={i} {...app} />
        ))}
        {/* Local Business */}
        {localBusinesses.map((biz, i) => (
          <LocalBusinessJsonLd key={i} {...biz} />
        ))}
        {/* Images */}
        {images.map((img, i) => (
          <ImageJsonLd key={i} {...img} />
        ))}
        {/* FAQ */}
        <FAQJsonLd questions={faqs} />

        <GoogleTagManager gtmId={GTMID} />
        <PagePreloader>
          <ThemeProvider>{children}</ThemeProvider>
        </PagePreloader>
        <Toaster richColors closeButton position="top-right" />
        <GoogleAnalytics gaId={GAID} />
      </body>
    </html>
  );
}
