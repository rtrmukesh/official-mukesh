import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import PagePreloader from "@/components/PagePreloader";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const GAID = process.env.GA_ID || ""
const GTMID = process.env.GTM_ID || ""

export const metadata: Metadata = {
  title: "Mukesh M — Full Stack Developer",
  description:
    "Portfolio of Mukesh M — Web, Android, iOS, and Desktop apps developer.",
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
    title: "Mukesh M",
    capable: true,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Mukesh M — Full Stack Developer Portfolio",
    description: "Web, Android, iOS, and Desktop apps developer portfolio.",
    url: "https://www.themukesh.com",
    siteName: "Mukesh M",
    images: [
      {
        url: "https://www.themukesh.com/mukesh-mg.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mukesh M — Full Stack Developer",
    description:
      "Official portfolio of Mukesh M — I build Web, Android, iOS & Desktop applications with modern tech stacks.",
    site: "@themukesh",
    creator: "@themukesh",
    images: [
      {
        url: "https://www.themukesh.com/mukesh-mg.png",
        alt: "Mukesh M — Full Stack Developer Portfolio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/png"
          sizes="192x192"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
