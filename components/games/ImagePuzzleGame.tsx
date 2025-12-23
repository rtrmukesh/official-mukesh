"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function PuzzleGame() {
  const [gridSize, setGridSize] = useState(3);
  const [image, setImage] = useState<string | null>(null);
  const [tiles, setTiles] = useState<number[]>([]);
  const [emptyIndex, setEmptyIndex] = useState(0);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [tileSize, setTileSize] = useState(120);
  const [showWin, setShowWin] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalTiles = gridSize * gridSize;

  const getTileSize = () => {
    if (typeof window === "undefined") return 120;
    if (window.innerWidth < 480) return 80; // Mobile
    if (window.innerWidth < 768) return 100; // Tablet
    if (window.innerWidth < 1024) return 120; // Laptop
    return 150; // Desktop
  };

  useEffect(() => {
    setTileSize(getTileSize());
    const handleResize = () => setTileSize(getTileSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (image) startGame();
    return () => stopTimer();
  }, [image, gridSize]);

  const startGame = () => {
    const arr = Array.from({ length: totalTiles }, (_, i) => i);
    shuffle(arr);
    setTiles(arr);
    setEmptyIndex(arr.indexOf(totalTiles - 1));
    setMoves(0);
    setTime(0);
    startTimer();
  };

  const shuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  /* ---------------- TIMER ---------------- */
  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  /* ---------------- MOVE ---------------- */
  const handleTileClick = (index: number) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;

    const isAdjacent =
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (!isAdjacent) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [
      newTiles[emptyIndex],
      newTiles[index],
    ];

    setTiles(newTiles);
    setEmptyIndex(index);
    setMoves((m) => m + 1);
    checkWin(newTiles);
  };

  /* ---------------- WIN CHECK ---------------- */
  const checkWin = (tiles: number[]) => {
    const isWin = tiles.every((t, i) => t === i);
    if (isWin) {
      stopTimer();
      saveBestScore();
      setShowWin(true);
    }
  };

  const saveBestScore = () => {
    const key = `best-${gridSize}`;
    const best = localStorage.getItem(key);
    if (!best || time < Number(best)) {
      localStorage.setItem(key, String(time));
    }
  };

  /* ---------------- IMAGE UPLOAD ---------------- */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      <nav className="w-full px-6 py-4 flex justify-between items-center border-b border-white/10 bg-black/60 backdrop-blur">
        <Link href="/" className="text-xl font-bold">
          🎮 GameZone
        </Link>

        <div className="flex gap-4 text-sm">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/games" className="hover:text-gray-300">
            Games
          </Link>
        </div>
      </nav>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
      {showWin && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-2xl p-6 w-[90%] max-w-sm text-center animate-fade-in">
            <h2 className="text-2xl font-extrabold mb-2">🎉 You Win!</h2>

            <p className="text-sm opacity-70 mb-4">
              Puzzle solved successfully
            </p>

            <div className="flex justify-center gap-3 mb-4 text-sm">
              <span>⏱ {time}s</span>
              <span>🧮 {moves} moves</span>
            </div>

            <button
              onClick={() => {
                setShowWin(false);
                startGame();
              }}
              className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
            >
              🔀 Play Again
            </button>
          </div>
        </div>
      )}
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center p-4">
        {/* Glass Card */}
        <div className="w-full max-w-3xl rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6 flex flex-col items-center gap-6 animate-fade-in">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
            🧩 Image Puzzle Game
          </h1>
          <p className="text-sm opacity-70 text-center max-w-md">
            Upload your image, choose difficulty and solve the puzzle as fast as
            you can.
          </p>

          {/* Controls */}
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <select
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
              className="px-4 py-2 rounded-full bg-black/60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <option value={3}>Easy • 3x3</option>
              <option value={4}>Medium • 4x4</option>
              <option value={5}>Hard • 5x5</option>
            </select>

            {/* Upload Button */}
            <label className="cursor-pointer px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Stats */}
          {image && (
            <div className="flex gap-3 flex-wrap justify-center">
              <div className="px-4 py-1 rounded-full bg-black/60 border border-white/20 text-sm">
                ⏱ {time}s
              </div>
              <div className="px-4 py-1 rounded-full bg-black/60 border border-white/20 text-sm">
                🧮 Moves: {moves}
              </div>
              <div className="px-4 py-1 rounded-full bg-black/60 border border-white/20 text-sm">
                🏆 Best: {localStorage.getItem(`best-${gridSize}`) || "--"}s
              </div>
            </div>
          )}

          {/* Puzzle */}
          {image && (
            <div className="overflow-x-auto max-w-full">
              <div
                className="grid gap-1 mx-auto rounded-xl overflow-hidden shadow-lg"
                style={{
                  gridTemplateColumns: `repeat(${gridSize}, ${tileSize}px)`,
                }}
              >
                {tiles.map((tile, index) => {
                  if (tile === totalTiles - 1) {
                    return (
                      <div
                        key={index}
                        style={{
                          width: tileSize,
                          height: tileSize,
                          backgroundColor: "black",
                        }}
                      />
                    );
                  }

                  const x = (tile % gridSize) * tileSize;
                  const y = Math.floor(tile / gridSize) * tileSize;

                  return (
                    <div
                      key={index}
                      onClick={() => handleTileClick(index)}
                      className="cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-95"
                      style={{
                        width: tileSize,
                        height: tileSize,
                        backgroundImage: `url(${image})`,
                        backgroundSize: `${gridSize * tileSize}px ${
                          gridSize * tileSize
                        }px`,
                        backgroundPosition: `-${x}px -${y}px`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Shuffle */}
          {image && (
            <button
              onClick={startGame}
              className="mt-2 px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              🔀 Shuffle Again
            </button>
          )}
        </div>
      </div>
    </>
  );
}
