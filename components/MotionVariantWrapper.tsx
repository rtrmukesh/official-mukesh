"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

export type AnimationVariant =
  | "fadeUp"
  | "slideLeft"
  | "slideRight"
  | "zoomIn"
  | "rotateIn";

interface MotionVariantWrapperProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  id?: string;
  delay?: number;
}

const variants: Record<AnimationVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -5, scale: 0.9 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
};

const MotionVariantWrapper = ({
  children,
  className = "",
  variant = "fadeUp",
  id,
  delay = 0,
}: MotionVariantWrapperProps) => {
  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants[variant]}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionVariantWrapper;
