"use client";

import dynamic from "next/dynamic";
const ToolSection = dynamic(
  () => import("@/HomePage/components/Sections/Tool"),
  { ssr: false }
);
import Link from "next/link";
import { MdErrorOutline } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center bg-[#111111] text-white px-6 pt-16 pb-10 min-h-screen">
      {/* 404 Icon */}
      <MdErrorOutline className="text-9xl text-red-500 mb-6" />

      {/* 404 Heading */}
      <h1 className="text-4xl font-bold mb-4 text-center">
        404 - Page Not Found
      </h1>

      {/* Description */}
      <p className="text-gray-400 text-center mb-6 max-w-md">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>

      {/* Go Home Button */}
      <Link
        href="/"
        className="px-6 py-3 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-500 transition mb-12"
      >
        Go Back Home
      </Link>

      {/* Tool Section */}
      <div className="w-full max-w-7xl">
        <ToolSection />
      </div>
    </div>
  );
}
