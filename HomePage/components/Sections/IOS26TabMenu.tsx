"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Briefcase, Cpu, Send, Layers } from "lucide-react";

const tabs = [
  { id: "About", icon: Info, label: "About" },
  { id: "Resume", icon: Briefcase, label: "Resume" },
  { id: "Skills", icon: Cpu, label: "Skills" },
  { id: "Contact", icon: Send, label: "Contact" },
  { id: "Gallery", icon: Layers, label: "Gallery" },
];

export default function IOS26TabMenu({
  children,
  setActiveIndex,
  activeIndex,
}: {
  children: React.ReactNode[];
  setActiveIndex: (index: number) => void;
  activeIndex: number;
}) {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    navigator.vibrate?.(4);
  }, [activeIndex]);

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

    setActiveIndex(index);
  };

  /* Drag end handler for page swipe */
  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -80 && activeIndex < tabs.length - 1) {
      setDirection(1);
      setActiveIndex(activeIndex + 1);
    }
    if (info.offset.x > 80 && activeIndex > 0) {
      setDirection(-1);
      setActiveIndex(activeIndex - 1);
    }
  };

  /* Motion variants for swipe animations */
  const pageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.98,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <div>
      {/* PAGE CONTENT – SWIPE WITH ANIMATION */}
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={activeIndex}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="w-full h-full"
        >
          {children[activeIndex]}
        </motion.div>
      </AnimatePresence>

      {/* FLOATING TAB BAR */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
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
          className="relative flex items-center gap-2 px-3 py-2 rounded-3xl shadow-xl backdrop-blur-xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/60"
          style={{ touchAction: "none" }}
        >
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            const isActive = i === activeIndex;

            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveIndex(i)}
                whileTap={{ scale: 0.92 }}
                className="relative w-14 h-12 flex flex-col items-center justify-center"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                    className="absolute inset-0 rounded-2xl bg-black dark:bg-white"
                  />
                )}

                <div className="relative z-10 flex flex-col items-center">
                  <Icon
                    size={22}
                    className={
                      isActive
                        ? "text-white dark:text-black"
                        : "text-black/70 dark:text-white/70"
                    }
                  />
                  <span
                    className={`text-[10px] mt-0.5 ${
                      isActive
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
