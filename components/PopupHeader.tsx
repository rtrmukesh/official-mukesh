"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PopupHeaderProps {
  activeSection: string;
  visible: boolean;
}

const PopupHeader = ({ activeSection: _externalActiveSection, visible }: PopupHeaderProps) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("about");

  const Menus = [
    { label: "About", id: "about" },
    { label: "Resume", id: "resume" },
    { label: "Expertise", id: "skills" },
    { label: "Contact", id: "contact" },
    { label: "Tools", id: "tools" },
  ];

  const scrollToSection = (
    id: string,
    label?: string,
    headerHeight: number = 0
  ) => {
    const element = document.getElementById(id);
    if (!element) return;
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    // Offset for the fixed header
    const scrollTo = elementTop - headerHeight;
    window.scrollTo({ top: scrollTo, behavior: "smooth" });
  };

  const [isUserActive, setIsUserActive] = useState(true);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -35% 0px", // Adjusts triggering zone to center-top
      threshold: 0.1,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Menus.forEach((menu) => {
      const element = document.getElementById(menu.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      setIsUserActive(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsUserActive(false);
      }, 5000); 
    };

    const events = ["scroll", "mousemove", "keydown", "click", "touchstart"];
    
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); 

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && isUserActive && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed top-6 left-1/2 z-[999] -translate-x-1/2"
        >
          <div
            className="
            flex gap-1 md:gap-2
            px-2 md:px-3
            py-1.5 md:py-2
            rounded-3xl shadow-xl backdrop-blur-xl 
            bg-white/70 dark:bg-black/60 
            border border-black/5 dark:border-white/10
            transition-all duration-300
          "
          >
           {Menus.map((item) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredTab === item.id;

              return (
                <button
                  key={item.id}
                  className={`
                  relative 
                  flex items-center justify-center
                  px-4 py-2
                  text-sm font-medium 
                  transition-colors duration-200
                  outline-none
                  rounded-2xl
                  ${
                    isActive
                      ? "text-white dark:text-black"
                      : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                  }
                `}
                  onClick={() => {
                    scrollToSection(item.id, item.label);
                  }}
                  onMouseEnter={() => setHoveredTab(item.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPopup"
                      className="absolute inset-0 bg-black dark:bg-white rounded-2xl shadow-sm z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Hover Indicator (Only when not active) */}
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="hoverTabPopup"
                      className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-2xl z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupHeader;