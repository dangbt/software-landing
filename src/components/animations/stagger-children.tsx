"use client";

import { motion } from "framer-motion";
import { ReactNode, ElementType } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  as?: ElementType;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (staggerDelay: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  as: Component = "div",
}: StaggerChildrenProps) {
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={staggerDelay}
      variants={containerVariants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

export { itemVariants };
