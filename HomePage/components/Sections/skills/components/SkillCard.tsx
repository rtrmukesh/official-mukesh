"use client";

import { motion } from "framer-motion";

interface Skill {
  features: string[];
}

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      className="relative pt-24 sm:pt-28 md:pt-32 pl-2 sm:pl-4"
    >
      <div className="grid">
        {skill.features.map((f) => (
          <div
            key={f}
            className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 text-sm sm:text-base md:text-base text-gray-300 border-l border-neutral-700"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            {f}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
