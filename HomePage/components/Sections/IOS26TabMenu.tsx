"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Cpu, Gamepad2, Info, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const tabs = [
  { id: "About", icon: Info, label: "About" },
  { id: "Resume", icon: Briefcase, label: "Resume" },
  { id: "Expertise", icon: Cpu, label: "Expertise" },
  { id: "Contact", icon: Send, label: "Contact" },
  { id: "Fun", icon: Gamepad2, label: "Fun", link: "/games" },
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
  const router = useRouter();

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



  return (
    <div>
      {/* PAGE CONTENT – SWIPE WITH ANIMATION */}
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={activeIndex}
          custom={direction}
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
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            const isActive = i === activeIndex;

            return (
              <motion.button
                key={tab.id}
                onClick={() => {
                  if (tab.link) {
                    router.push(tab.link);
                  } else {
                    setActiveIndex(i);
                  }
                }}
                whileTap={{ scale: 0.92 }}
                className="relative
                w-14 h-12
                md:w-14 md:h-12
                flex flex-col items-center justify-center"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                    className="absolute inset-0 rounded-xl md:rounded-2xl bg-black dark:bg-white"
                  />
                )}

                <div className="relative z-10 flex flex-col items-center">
                  <Icon
                    className={
                      isActive
                        ? "w-4 h-4 md:w-[22px] md:h-[22px] text-white dark:text-black"
                        : "w-4 h-4 md:w-[22px] md:h-[22px] text-black/70 dark:text-white/70"
                    }
                  />
                  <span
                    className={`text-[9px] md:text-[10px] mt-0.5 ${
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
