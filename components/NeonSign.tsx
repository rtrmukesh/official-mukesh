"use client";

import { useRef } from "react";

type NeonSignProps = {
  text: string;
  color?: "pink" | "blue" | "cyber" | string;
  size?: number;
};

export default function NeonSign({
  text,
  color = "pink",
  size = 25,
}: NeonSignProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Color themes
  const colors = {
    pink: {
      main: "#ffe6ff",
      glow1: "#ff65bd",
      glow2: "#ff2483",
      bg: "#6b1839",
    },
    blue: {
      main: "#e6f6ff",
      glow1: "#65c7ff",
      glow2: "#248bff",
      bg: "#18396b",
    },
    cyber: {
      main: "#d1fff3",
      glow1: "#00ffd5",
      glow2: "#00c2a8",
      bg: "#0f3b33",
    },
  };

  const theme =
    typeof color === "string" && color.startsWith("#")
      ? {
          main: color,
          glow1: color,
          glow2: color,
          bg: color,
        }
      : colors[color as keyof typeof colors];

  return (
    <div ref={containerRef} className="neon-container">
      <div className="sign">
        {text.split("").map((char, i) => {
          const rand = Math.random();
          const cls =
            rand > 0.85 ? "fast-flicker" : rand > 0.7 ? "flicker" : "";
          return (
            <span key={i} className={cls}>
              {char}
            </span>
          );
        })}
      </div>

      {/* Font */}
      <style jsx global>{`
        @font-face {
          font-family: Clip;
          src: url("https://acupoftee.github.io/fonts/Clip.ttf");
        }
      `}</style>

      {/* Component Styles */}
      <style jsx>{`
        .neon-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sign {
          display: flex;
          font-family: "Clip";
          text-transform: uppercase;
          font-size: ${size}px;
          letter-spacing: 2px;
          background-image: radial-gradient(
            ellipse 50% 35% at 50% 50%,
            ${theme.bg},
            transparent
          );
          color: ${theme.main};
          text-shadow: 0 0 0.6rem ${theme.main}, 0 0 1.5rem ${theme.glow1},
            -0.2rem 0.1rem 1rem ${theme.glow1},
            0.2rem 0.1rem 1rem ${theme.glow1}, 0 -0.5rem 2rem ${theme.glow2},
            0 0.5rem 3rem ${theme.glow2};
          animation: shine 2s forwards, flicker 3s infinite;
        }

        span {
          display: inline-block;
        }

        .flicker {
          animation: shine 2s forwards, blink 3s 2s infinite;
        }

        .fast-flicker {
          animation: shine 2s forwards, blink 8s 1s infinite;
        }

        @keyframes shine {
          0% {
            opacity: 0;
            text-shadow: none;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes blink {
          0%,
          20%,
          22%,
          63%,
          64%,
          100% {
            opacity: 1;
          }
          21%,
          62% {
            opacity: 0.4;
          }
        }

        @keyframes flicker {
          from {
            opacity: 1;
          }
          38% {
            opacity: 0.5;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
