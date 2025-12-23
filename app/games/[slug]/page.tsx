import GameLoader from "@/components/games/GameLoader";
import { games } from "@/data/games";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) return {};

  return {
    title: game.seo.title,
    description: game.seo.description,
    keywords: game.seo.keywords,
    robots: "index, follow",
    alternates: {
      canonical: `https://themukesh.com/games/${slug}`,
    },
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) return notFound();
  return (
    <div className="min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold">{game.title}</h1>
      <p className="opacity-70 mt-2">{game.description}</p>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGame",
            name: game.title,
            description: game.description,
            url: `https://themukesh.com/games/${slug}`,
            genre: "Puzzle",
            inLanguage: "en",
          }),
        }}
      />
      <div className="mt-6 rounded-xl bg-gray-900 ">
        <GameLoader slug={slug} />
      </div>
    </div>
  );
}
