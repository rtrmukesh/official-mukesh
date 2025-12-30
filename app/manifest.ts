import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mukesh Murugaiyan | Full Stack Developer",
    short_name: "Mukesh M",
    description:
      "Freelancer available for Web, Android, iOS, Chrome Extensions & Desktop apps",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0303",
    theme_color: "#0b0303",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon0.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
