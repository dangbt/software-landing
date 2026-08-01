"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion, useMotionValue, useTransform, animate } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export function CountUp({ end, duration = 2, suffix = "", prefix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, end, {
        duration,
        ease: "easeOut",
      });

      const unsubscribe = rounded.on("change", (latest) => {
        setDisplayValue(latest);
      });

      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, end, duration, count, rounded]);

  return (
    <motion.span ref={ref}>
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
}
