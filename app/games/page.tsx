import Link from "next/link";
import { games } from "@/data/games";

export const metadata = {
  title: "Games | GameZone",
  description: "Play free online browser games on GameZone.",
  keywords: [
    "online games",
    "free games",
    "browser games",
    "puzzle games",
    "fun games",
    "arcade games",
    "strategy games",
    "kids games",
    "multiplayer games",
    "single player games",
    "adventure games",
    "action games",
    "educational games",
    "brain games",
    "memory games",
    "card games",
    "board games",
    "HTML5 games",
    "casual games",
    "skill games",
    "challenge games",
    "family games",
    "mini games",
    "top games",
    "popular games",
    "new games",
    "online puzzle games",
    "online arcade games",
    "free puzzle games",
    "free online games",
    "play games online",
    "gamezone",
    "fun for kids",
    "play free games",
    "interactive games",
    "game challenges",
    "best online games",
    "browser-based games",
    "mobile-friendly games",
  ],
};

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* ✴---Temp---✴ */}
      
      <nav className="w-full  py-4 flex justify-between items-center   backdrop-blur">
        <Link href="/" className="text-3xl font-bold">
          🎮 GameZone
        </Link>

        <div className="flex gap-4 text-sm">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
        </div>
      </nav>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link
            key={game.id}
            href={`/games/${game.slug}`}
            className="bg-gray-800 p-5 rounded-xl hover:border-white border border-gray-700 transition"
          >
            <h2 className="text-xl font-semibold">{game.title}</h2>
            <p className="text-sm text-gray-400 mt-2">{game.description}</p>
            <span className="text-xs text-green-400 mt-3 inline-block">
              ● {game.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
