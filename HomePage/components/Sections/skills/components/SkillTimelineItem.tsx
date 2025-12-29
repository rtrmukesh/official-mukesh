"use client";

import { JSX, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SkillCard from "./SkillCard";

type Skill = {
  title: string;
  subtitle: string;
  icon: JSX.Element;
  tech: string;
  features: string[];
};

export default function SkillTimelineItem({ skill }: { skill: Skill }) {
  const itemRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 85%", "start 45%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  return (
    <div ref={itemRef} className="relative">
      {/* Header */}
      <div className="absolute -left-16 sm:-left-20 md:-left-24 lg:-left-28 top-0 flex items-start gap-3 sm:gap-4">
        {/* ICON */}
        <motion.div
          style={{ opacity, scale }}
          animate={{
            boxShadow: [
              "0 0 8px rgba(34,211,238,0.3)",
              "0 0 22px rgba(34,211,238,1)",
              "0 0 8px rgba(34,211,238,0.3)",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          className="relative z-20 p-2 sm:p-3 md:p-4 rounded-lg bg-[#111] border border-cyan-400"
        >
          {skill.icon}
        </motion.div>

        {/* TITLE BOX */}
        <div className="bg-[#1e1e1f] px-3 sm:px-4 md:px-5 py-2 rounded-lg border border-gray-700 shadow-lg max-w-xs sm:max-w-sm md:max-w-md">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white whitespace-nowrap">
            {skill.title}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-400">
            {skill.subtitle}
          </p>
          <p className="text-xs sm:text-sm md:text-base text-cyan-400 mt-1">
            {skill.tech}
          </p>
        </div>
      </div>

      <SkillCard skill={skill} />
    </div>
  );
}
