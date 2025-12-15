"use client";

import { motion } from "framer-motion";

interface Skill {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  tech: string;
  features: string[];
}

export default function SkillCard({
  skill,
  index,
  openIndex,
  setOpenIndex,
}: {
  skill: Skill;
  index: number;
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
}) {
  const expanded = openIndex === index;

  const visibleFeatures = expanded
    ? skill.features
    : skill.features.slice(0, 5);

  return (
    <div className="group relative p-5 rounded-xl bg-[#202020] border border-gray-700 hover:border-cyan-400/50 transition-all">
      {/* Glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-xl bg-cyan-500/10 transition" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          {skill.icon}
          <div>
            <h3 className="text-lg font-semibold text-white">{skill.title}</h3>
            <p className="text-sm text-gray-400">{skill.subtitle}</p>
          </div>
        </div>

        <p className="text-sm text-cyan-400 mb-4">{skill.tech}</p>

        {/* Animated Features */}
        <motion.div
          layout
          className="flex flex-wrap gap-2 overflow-hidden"
          transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}
        >
          {visibleFeatures.map((f) => (
            <motion.span
              layout
              key={f}
              className="text-xs px-3 py-1 rounded-full bg-[#2a2a2a] text-gray-300 border border-gray-700 hover:border-cyan-400 hover:text-white transition"
            >
              {f}
            </motion.span>
          ))}
        </motion.div>

        {/* Toggle */}
        {skill.features.length > 5 && (
          <button
            onClick={() => setOpenIndex(expanded ? null : index)}
            className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
          >
            {expanded ? "Show less" : `+ ${skill.features.length - 5} more`}
          </button>
        )}
      </div>
    </div>
  );
}
