import { games } from "@/data/games";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://themukesh.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/games`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const gameRoutes: MetadataRoute.Sitemap = games.map((game) => ({
    url: `${baseUrl}/games/${game.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

   const bookRoutes: MetadataRoute.Sitemap = [];

  let page = 1;
  let hasNext = true;

  while (hasNext) {
    // Fetch 20 books per page from Gutendex
    const res = await fetch(
      `https://gutendex.com/books/?page=${page}&page_size=20`
    );
    const data = await res.json();

    if (!data.results || data.results.length === 0) break;

    // Map books to sitemap entries
    const routes = data.results.map((book: {id:number, title:string}) => {
      const slug =
        book.id +
        "-" +
        book.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      return {
        url: `${baseUrl}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      };
    });

    bookRoutes.push(...routes);

    if (data.next) {
      page++;
    } else {
      hasNext = false;
    }
  }

  return [...staticRoutes, ...gameRoutes, ...bookRoutes];
}
