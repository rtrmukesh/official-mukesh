import type { Metadata } from "next";
import CSSGridGenerator from "./components/ClientPage";
import { SEO_KEYWORDS } from "@/data/seo";

export const metadata: Metadata = {
  title: "CSS Grid Generator – Visual Grid Builder Tool",
  description:
    "Free CSS Grid Generator tool to visually create responsive grid layouts. Drag, resize, merge grid items and instantly copy clean HTML & CSS code.",
  keywords: [
    ...SEO_KEYWORDS,
    "CSS Grid Generator",
    "CSS Grid Builder",
    "Grid Layout Generator",
    "Responsive CSS Grid",
    "Visual CSS Grid Tool",
    "CSS Layout Generator",
    "Frontend Tools",
    "free online pdf tools"
  ],
  alternates: {
    canonical: "https://themukesh.com/tools/css-grid-generator",
  },
  openGraph: {
    title: "CSS Grid Generator – Visual Grid Builder",
    description:
      "Build responsive CSS Grid layouts visually. Drag, resize, merge items and export production-ready HTML & CSS.",
    url: "https://themukesh.com/tools/css-grid-generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Grid Generator – Visual Grid Builder Tool",
    description:
      "Create responsive CSS Grid layouts visually and export clean code.",
  },
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">
        CSS Grid Generator – Visual Grid Layout Builder
      </h1>

      <p className="sr-only">
        This CSS Grid Generator allows developers and designers to visually
        create responsive grid layouts. Drag, resize, and merge grid items and
        instantly generate clean HTML and CSS Grid code for production use.
      </p>

      <CSSGridGenerator />
    </>
  );
}
