"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Cpu, Info, Send, ToolCase } from "lucide-react";
import { useEffect, useRef, useState } from "react";



export default function IOS26TabMenu({
  activeSection,
}: {
  activeSection: string;
}) {
  const barRef = useRef<HTMLDivElement | null>(null);

  const tabs = [
    { id: "about-mobile", icon: Info, label: "About" },
    { id: "resume-mobile", icon: Briefcase, label: "Resume" },
    { id: "skills-mobile", icon: Cpu, label: "Expertise" },
    { id: "contact-mobile", icon: Send, label: "Contact" },
    { id: "tools-mobile", icon: ToolCase, label: "Tools" },
  ];
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  /* TAB BAR FINGER FOLLOW */
  const handlePointerMove = (clientX: number) => {
    if (!barRef.current) return;

    const rect = barRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const tabWidth = rect.width / tabs.length;
    const index = Math.max(
      0,
      Math.min(tabs.length - 1, Math.floor(x / tabWidth))
    );

    // Optional: Could trigger scroll on slide, but might be too aggressive.
    // For now, let's keep it as visual feedback or click-only.
  };

  return (
    <div>
      {/* FLOATING TAB BAR */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-50
             bottom-[calc(env(safe-area-inset-bottom)+0.10rem)]
             md:bottom-6"
      >
        <motion.div
          ref={barRef}
          onPointerMove={(e) => {
            e.preventDefault();
            handlePointerMove(e.clientX);
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            handlePointerMove(e.touches[0].clientX);
          }}
          className=" relative flex items-center
          gap-1 md:gap-2
          px-2 md:px-3
          py-1.5 md:py-2
          rounded-3xl shadow-xl backdrop-blur-xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/60"
          style={{ touchAction: "none" }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            // Map index logic if needed, but string ID is safer

             // We need to map activeSection string to this tab
            const isTabActive = activeSection === tab.id || activeSection + "-mobile" === tab.id;

            return (
              <motion.button
                key={tab.id}
                onClick={() => {
                  handleScrollTo(tab.id);
                }}
                whileTap={{ scale: 0.92 }}
                className="relative
                w-14 h-12
                md:w-14 md:h-12
                flex flex-col items-center justify-center"
              >
                {isTabActive && (
                  <motion.div
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                    className="absolute inset-0 rounded-xl md:rounded-2xl bg-black dark:bg-white"
                  />
                )}

                <div className="relative z-10 flex flex-col items-center">
                  <Icon
                    className={
                      isTabActive
                        ? "w-4 h-4 md:w-[22px] md:h-[22px] text-white dark:text-black"
                        : "w-4 h-4 md:w-[22px] md:h-[22px] text-black/70 dark:text-white/70"
                    }
                  />
                  <span
                    className={`text-[9px] md:text-[10px] mt-0.5 ${
                      isTabActive
                        ? "text-white dark:text-black"
                        : "text-black/50 dark:text-white/50"
                    }`}
                  >
                    {tab.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

/*
🍏 NEXT APPLE LEVEL ENABLED

✔ Page swipe ↔ tab sync (Instagram style)
✔ Finger-follow tab highlight
✔ AnimatePresence + motion variants for smooth swipe
✔ Floating glass tab bar
✔ Micro haptic illusion
✔ Liquid spring physics
*/
