import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mukesh Murugaiyan | Full Stack Developer",
    short_name: "Mukesh M",
    description:
      "Portfolio of Mukesh M — Web, Android, iOS & Desktop apps developer.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0303", // Dark background to match your site
    theme_color: "#0b0303",
    icons: [
      {
        src: "/icon0.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
