"use client";

import {
  DocumentTextIcon,
  FolderIcon,
  PhoneIcon,
  PhotoIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Hand } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const menuItems = [
  { label: "About", icon: UserIcon },
  { label: "Resume", icon: DocumentTextIcon },
  { label: "Portfolio", icon: FolderIcon },
  { label: "Contact", icon: PhoneIcon },
  { label: "Gallery", icon: PhotoIcon },
];

const MobileNavigationTab = () => {
  const [showWheel, setShowWheel] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const longPressTimer = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const accumulatedDistance = useRef(0);

  const itemAngle = 360 / menuItems.length;
  const stepDistance = 30;

  useEffect(() => {
    document.body.style.overflow = showWheel ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showWheel]);

  const rotateByDrag = (delta: number) => {
    accumulatedDistance.current += delta;

    if (Math.abs(accumulatedDistance.current) >= stepDistance) {
      const steps = Math.floor(accumulatedDistance.current / stepDistance);
      setActiveIndex(
        (prev) => (prev - steps + menuItems.length) % menuItems.length
      );
      accumulatedDistance.current = 0;
      navigator.vibrate?.(12);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!showWheel) return;

    const touch = e.touches[0];
    if (!touch) return;

    if (startY.current == null) startY.current = touch.clientY;

    const diff = startY.current - touch.clientY;
    rotateByDrag(diff);
    startY.current = touch.clientY;

    e.preventDefault();
  };

  const startLongPress = () => {
    longPressTimer.current = window.setTimeout(() => {
      setShowWheel(true);
      navigator.vibrate?.(40);
    }, 420);
  };

  const cancelLongPress = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    setShowWheel(false);
  };

  const closeWheel = () => {
    setShowWheel(false);
    startY.current = null;
    accumulatedDistance.current = 0;
    navigator.vibrate?.(10);
  };

  return (
    <>
      {/* SIDE BUTTON */}
      <div
        role="button"
        className="fixed sm:hidden right-1 top-1/2 -translate-y-1/2
            flex items-center justify-center
            z-50
            active:scale-95 transition-transform duration-150 bg-transparent"
      >
        <motion.div
          whileTap={{ scale: 0.75, rotate: -8 }}
          transition={{ duration: 0.12, type: "spring", stiffness: 200 }}
          onTapStart={() => navigator.vibrate?.(12)}
          className="flex items-center justify-center select-none"
          style={{
            WebkitUserSelect: "none",
            userSelect: "none",
            WebkitTapHighlightColor: "transparent",
            touchAction: "none",
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            startLongPress();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            cancelLongPress();
          }}
          onTouchCancel={cancelLongPress}
          onTouchMove={handleTouchMove}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Hand size={34} className="text-white/90" />
        </motion.div>
      </div>

      {/* WHEEL */}
      {showWheel && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm 
          flex justify-center items-center z-[99999] touch-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeWheel}
          onTouchMove={handleTouchMove}
        >
          <motion.div
            className="relative w-[220px] h-[220px]"
            animate={{ rotate: activeIndex * -itemAngle }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
          >
            {menuItems.map((item, i) => {
              const angle = i * itemAngle;
              const Icon = item.icon;
              const active = activeIndex === i;

              return (
                <div
                  key={item.label}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-90px)`,
                  }}
                >
                  <motion.div
                    animate={{
                      scale: active ? 1.35 : 0.75,
                      opacity: active ? 1 : 0.35,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className={`${active ? "text-cyan-300" : "text-gray-400"}`}
                  >
                    <Icon className="w-7 h-7 mx-auto" />
                    {active && (
                      <motion.span
                        className="text-[10px] mt-2 block font-semibold uppercase text-center"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default MobileNavigationTab;
