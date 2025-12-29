"use client";
import React from "react";
import { motion } from "motion/react";

export function ColourfulText({
  text,
  colors,
  fontSize = "1rem",
  glow = true,
  glowStrength = 18,
  glowColor,
}: {
  text: string;
  colors?: string[];
  fontSize?: number | string;
  glow?: boolean;
  glowStrength?: number;
  glowColor?: string;
}) {
  const defaultColors = [
    "rgb(131, 179, 32)",
    "rgb(47, 195, 106)",
    "rgb(42, 169, 210)",
    "rgb(4, 112, 202)",
    "rgb(107, 10, 255)",
    "rgb(183, 0, 218)",
    "rgb(218, 0, 171)",
    "rgb(230, 64, 92)",
    "rgb(232, 98, 63)",
    "rgb(249, 129, 47)",
  ];

  colors = colors || defaultColors;

  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [colors]);

  return (
    <>
      {text.split("").map((char, index) => {
        const color = currentColors[index % currentColors.length];

        return (
          <motion.span
            key={`${char}-${count}-${index}`}
            animate={{
              color,
              y: [0, -3, 0],
              scale: [1, 1.01, 1],
              filter: ["blur(0px)", "blur(4px)", "blur(0px)"],
              opacity: [1, 0.85, 1],
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
            }}
            style={{
              fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
              textShadow: glow
                ? `
                  0 0 ${glowStrength / 2}px ${glowColor || color},
                  0 0 ${glowStrength}px ${glowColor || color},
                  0 0 ${glowStrength * 1.5}px ${glowColor || color}
                `
                : "none",
            }}
            className="inline-block whitespace-pre font-sans tracking-tight"
          >
            {char}
          </motion.span>
        );
      })}
    </>
  );
}
