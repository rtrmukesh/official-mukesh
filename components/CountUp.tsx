"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  duration?: number; // ms
  prefix?: string;
  suffix?: string;
  className?: string;
};

export default function CountUp({
  value,
  duration = 1200,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let rafId: number;

    const easeOutCubic = (t: number) =>
      1 - Math.pow(1 - t, 3); // 🔥 smooth slow end

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      startTimeRef.current = null;
    };
  }, [value, duration]);

  return (
    <p className={className}>
      {prefix}
      {count}
      {suffix}
    </p>
  );
}
