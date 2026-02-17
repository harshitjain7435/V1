"use client";

import { motion } from "framer-motion";

/**
 * Subtle floating glow blobs for hero background
 * Provides depth and visual interest without distraction
 */
export const FloatingGlobs: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top-left glow */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom-right glow */}
      <motion.div
        className="absolute bottom-10 right-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center accent */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
