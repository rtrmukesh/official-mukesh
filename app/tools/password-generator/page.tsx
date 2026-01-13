import ToolLayout from "@/Layout/ToolLayout";
import PasswordGenerator from "./components/ClientPage";
import { SEO_KEYWORDS } from "@/data/seo";

// SEO metadata
export const metadata = {
  title: "SecurePass Generator – Strong & Safe Passwords",
  description:
    "Generate strong, secure passwords instantly with SecurePass Generator. Customize length, character types, and avoid similar characters for maximum security.",
  keywords: [
    ...SEO_KEYWORDS,
    "password generator",
    "strong passwords",
    "secure passwords",
    "online password tool",
    "password strength checker",
    "password manager",
  ],
  openGraph: {
    title: "SecurePass Generator – Strong & Safe Passwords",
    description:
      "Generate strong, secure passwords instantly with SecurePass Generator. Customize length, character types, and avoid similar characters for maximum security.",
    url: "https://themukesh.com/tools/password-generator",
    siteName: "YourSiteName",
    images: [
      {
        url: "https://themukesh.com/mukesh-mg.png",
        width: 1200,
        height: 630,
        alt: "SecurePass Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SecurePass Generator – Strong & Safe Passwords",
    description:
      "Generate strong, secure passwords instantly with SecurePass Generator. Customize length, character types, and avoid similar characters for maximum security.",
    images: ["https://themukesh.com/mukesh-mg.png"],
  },
};

const Page = () => {
  return (
    <ToolLayout>
      <PasswordGenerator />
    </ToolLayout>
  );
};

export default Page;
