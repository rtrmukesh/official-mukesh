"use client";
import { MdBuild } from "react-icons/md";

const ToolSection = () => {
  const tools = [
    {
      title: "Free Online Book Library",
      description:
        "Explore a massive online library with 77,786+ books across multiple categories. Read, search, and access books instantly from anywhere.",
      url: "https://books.themukesh.com/",
    },
    {
      title: "Password Generator",
      description:
        "Create strong, secure passwords with custom length and character rules.",
      url: "tools/password-generator",
    },
    {
      title: "Grid Generator",
      description:
        "Generate responsive CSS grid layouts visually for modern web designs.",
      url: "tools/grid-generator",
    },
  ];

  return (
    <section className="bg-[#111111] p-6 border border-gray-800 rounded-[1.25rem] h-[-webkit-fill-available]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-1.5 rounded-md bg-[#202020] border border-gray-700">
          <MdBuild
            className="text-base"
            style={{ color: "hsl(190, 82%, 72%)" }}
          />
        </div>
        <h2 className="text-3xl font-bold text-white">Tools</h2>
      </div>

      <div className="w-24 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-6" />

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {tools.map((tool, idx) => (
          <div
            key={idx}
            className="
              group 
              bg-[#202020] 
              border border-gray-700 
              rounded-xl 
              overflow-hidden
              transition-all
              hover:border-cyan-400
              hover:shadow-[0_0_25px_rgba(34,211,238,0.18)]
            "
          >
            {/* Preview */}
            <div className="relative h-67 bg-black overflow-hidden">
              <iframe
                src={tool.url}
                loading="lazy"
                className="absolute top-0 left-0 transform scale-[0.3] origin-top-left pointer-events-none"
                style={{
                  width: "1840px",
                  height: "900px",
                }}
              />
              {/* Overlay for fade effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition">
                {tool.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {tool.description}
              </p>

              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm text-[#52b3c7] hover:underline"
              >
                Open Tool →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ToolSection;
