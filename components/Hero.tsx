"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CinematicBackground } from "./CinematicBackground";

export const Hero: React.FC = () => {
  // Animation variants for refined entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* ===== CINEMATIC HERO WITH BACKGROUND VIDEO ===== */}
      <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
        {/* Cinematic background layer */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <CinematicBackground />
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30 z-5" />

        {/* ===== CONTENT LAYER ===== */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 sm:py-24">
          {/* Clean single-column layout */}
          <motion.div
            className="text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* ===== ENTERPRISE HEADLINE ===== */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight"
            >
              Flexible Warehousing.
              <span className="block">Built For Scale.</span>
            </motion.h1>

            {/* ===== SUBHEADING ===== */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-100 max-w-2xl mt-6 leading-relaxed font-light"
            >
              Enterprise-grade logistics infrastructure. Connect with verified
              warehouse spaces or monetize your unused capacity.
            </motion.p>

            {/* ===== PRIMARY CTA BUTTONS ===== */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-8 items-start"
            >
              {/* Primary Button (Blue) */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/enquiry">
                  <button className="w-full sm:w-auto px-8 py-4 text-lg bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black/30">
                    Get Started
                  </button>
                </Link>
              </motion.div>

              {/* Secondary Button (White Outline) */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/enquiry">
                  <button className="w-full sm:w-auto px-8 py-4 text-lg bg-white/10 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black/30">
                    List Your Space
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ===== SCROLL INDICATOR ===== */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>
    </>
  );
};

