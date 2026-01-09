import GameLoader from "@/components/games/GameLoader";
import { games } from "@/data/games";
import type { Metadata } from "next";
import Link from "next/link";
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
    openGraph: {
      title: game.seo.title,
      description: game.seo.description,
      url: `https://themukesh.com/games/${slug}`,
      siteName: "GameZone",
      images: [
        {
          url: game.seo.image,
          width: 1200,
          height: 630,
          alt: game.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: game.seo.title,
      description: game.seo.description,
      images: [game.seo.image],
    },
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) return notFound();
  return (
    <div className="min-h-screen bg-black text-white">
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
      <nav className="w-full px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 backdrop-blur bg-black/60 border-b border-white/10">
        {/* LEFT : Title */}
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-bold leading-tight">
            {game.title}
          </h1>
          <p className="text-xs sm:text-sm opacity-70 max-w-xl">
            {game.description}
          </p>
        </div>

        {/* RIGHT : Menu */}
        <div className="flex gap-4 text-sm self-start sm:self-auto">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/games" className="hover:text-gray-300">
            Games
          </Link>
        </div>
      </nav>

      {/* Top Banner Ad */}
      <div className="mt-6 rounded-xl bg-gray-900 ">
        <GameLoader slug={slug} />
      </div>

      {/* Bottom Banner Ad (Optional) */}
    </div>
  );
}
