"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { createPortal } from "react-dom";

interface OverlayProps {
  isOpen: boolean;
  body: React.ReactNode;
  setIsOpen?: (value: boolean) => void;
}

export default function OverlayModal({
  isOpen,
  body,
  setIsOpen,
}: OverlayProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  console.log("OverlayModal rendered. isOpen:", isOpen, "mounted:", mounted);
  // Lock scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="
            fixed inset-0 
            bg-[#111111] 
            flex items-center justify-center
            z-[9999]
          "
          onClick={() => {
            setIsOpen?.(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className="flex items-center justify-center pointer-events-none"
          >
            {body}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
