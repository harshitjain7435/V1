"use client";

import { motion } from "framer-motion";

/**
 * Subtle animated grid overlay for hero background
 * Very light opacity, slow movement
 */
export const AnimatedGrid: React.FC = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-5"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      style={{ filter: "blur(0.5px)" }}
    >
      <defs>
        <pattern
          id="grid"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
          patternTransform="translate(0,0)"
        >
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke="white"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </pattern>
      </defs>
      <motion.rect
        width="100%"
        height="100%"
        fill="url(#grid)"
        animate={{
          y: [0, 60],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </svg>
  );
};
