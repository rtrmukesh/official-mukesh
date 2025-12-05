"use client";

export default function NavigationTab() {
  return (
    <button
      className="
        absolute top-0 right-0
        flex items-center gap-3     
        px-4 h-8 sm:px-6 sm:h-9
        text-xs font-medium
        rounded-tr-[1.25rem] rounded-bl-[1.25rem]
        bg-gradient-to-r from-[hsl(190,82%,20%)] to-black
        border border-[hsl(190,82%,72%)]
        text-[hsl(190,82%,72%)]
        hover:text-white hover:bg-[#0f2c33]
        duration-300 cursor-pointer
        hidden sm:flex
        z-[1]
  "
    >
      {/* Desktop / Tablet Text */}
      <span className="hidden sm:flex items-center gap-3">
        <span className="cursor-pointer hover:underline">About</span>
        <span className="cursor-pointer hover:underline">Resume</span>
        <span className="cursor-pointer hover:underline">Portfolio</span>
        <span className="cursor-pointer hover:underline">Contact</span>
        <span className="cursor-pointer hover:underline">Gallery</span>
      </span>
    </button>
  );
}
