import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import PagePreloader from "@/components/PagePreloader";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import {
  FAQJsonLd,
  LocalBusinessJsonLd,
  ProfilePageJsonLd,
  SoftwareApplicationJsonLd,
} from "next-seo";
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
    url: "https://themukesh.com",
    siteName: "Mukesh M",
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
    title: "Mukesh M — Full Stack Developer",
    description:
      "Official portfolio of Mukesh M — I build Web, Android, iOS & Desktop applications with modern tech stacks.",
    site: "@themukesh",
    creator: "@themukesh",
    images: [
      {
        url: "https://themukesh.com/mukesh-mg.png",
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
        <link rel="icon" href="/icon" type="image/png" sizes="32x32" />
        <link
          rel="apple-touch-icon"
          href="/apple-icon"
          type="image/png"
          sizes="192x192"
        />
        <meta
          name="google-site-verification"
          content="AUY8DrfbJpplzyCMcTJNiCHYZJ34AB2NphOmTJ1_gfY"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProfilePageJsonLd
          mainEntity={{
            name: "Mukesh M",
            description:
              "Full Stack Developer — Web, Android, iOS, Desktop Apps",
            url: "https://themukesh.com",
            sameAs: [
              "https://github.com/rtrmukesh",
              "https://www.linkedin.com/in/mukesh-m-6b9404242",
              "https://www.instagram.com/rtr_mukesh_/",
            ],
          }}
          dateCreated="2020-01-01"
          dateModified="2025-12-06"
        />
        <SoftwareApplicationJsonLd
          name="Mukesh M — Portfolio Web App"
          description="Portfolio of Mukesh M — Full Stack Developer building Web, Android, iOS & Desktop applications using modern tech stacks."
          applicationCategory="WebApplication"
          operatingSystem="All"
          url="https://themukesh.com"
        />
        <SoftwareApplicationJsonLd
          name="Android Mobile Apps by Mukesh M"
          description="High-performance Android applications built using React Native, Kotlin, and Node.js backend — by Full Stack Developer Mukesh M."
          applicationCategory="MobileApplication"
          operatingSystem="Android"
          url="https://themukesh.com"
        />

        <SoftwareApplicationJsonLd
          name="iOS Mobile Apps by Mukesh M"
          description="Modern and high-quality iOS applications developed using React Native and Node.js backend — by Full Stack Developer Mukesh M."
          applicationCategory="MobileApplication"
          operatingSystem="iOS"
          url="https://themukesh.com"
        />

        <LocalBusinessJsonLd
          type="ProfessionalService"
          name="Mukesh M — Full Stack Developer"
          description="Full Stack Developer building Web, Android, iOS & Desktop apps. Located in Tamil Nadu, India."
          url="https://themukesh.com"
          telephone="+91-9786587013"
          address={{
            streetAddress: "Mayiladuthurai",
            addressLocality: "Tamil Nadu",
            addressRegion: "TN",
            postalCode: "609118",
            addressCountry: "IN",
          }}
          geo={{
            latitude: 11.1425616,
            longitude: 79.7072551,
          }}
          sameAs={[
            "https://github.com/rtrmukesh",
            "https://www.linkedin.com/in/mukesh-m-6b9404242",
            "https://www.instagram.com/rtr_mukesh_/",
            "https://maps.app.goo.gl/Z9h6cxKiEvwEApyt7",
          ]}
        />

        <FAQJsonLd
          questions={[
            {
              question: "What technologies do you work with?",
              answer:
                "React, Next.js, Node.js, React Native, Android, iOS, and Desktop applications.",
            },
            {
              question: "Can I hire you for mobile apps?",
              answer:
                "Yes! I professionally build both Android and iOS mobile applications.",
            },
            {
              question: "Do you offer freelance services?",
              answer:
                "Yes, I am available for freelance work — Web apps, Mobile apps, UI/UX, and API development.",
            },
            {
              question: "Where are you located?",
              answer:
                "I am based in Tamil Nadu, India and I work remotely with clients worldwide.",
            },
          ]}
        />
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
