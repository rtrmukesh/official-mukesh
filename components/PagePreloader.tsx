"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

export default function PagePreloader({ children }: { children?: ReactNode }) {

    const pathname = usePathname();
  const isHome = pathname === "/";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     if (!isHome) return;
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, [isHome]);

   if (!isHome) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#111111] flex items-center justify-center"
          >
            <div className="preloader-container">
              <motion.svg
                className="loader-svg"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Hexagon Shape Border */}
                <motion.polygon
                  points="50,5 90,27 90,72 50,95 10,72 10,27"
                  stroke="#00FFF0"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                />

                {/* MS Letter */}
                <motion.text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  fill="#00FFF0"
                  fontSize="28"
                  fontWeight="700"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  MS
                </motion.text>
              </motion.svg>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
