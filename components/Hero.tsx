"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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

  const statCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* ===== TEXT-FOCUSED ENTERPRISE HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50 to-white min-h-[80vh] flex items-center py-32 md:py-40">
        {/* ===== SUBTLE ACCENT GLOWS ===== */}

        {/* Cyan accent glow (behind headline) */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="absolute top-1/4 w-[600px] h-[600px] bg-cyan-400/10 blur-3xl rounded-full" />
        </div>

        {/* Blue accent glow (center-right) */}
        <div className="absolute right-0 top-1/3 w-[500px] h-[500px] bg-blue-500/5 blur-2xl rounded-full pointer-events-none" />

        {/* ===== CONTENT LAYER ===== */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight"
            >
              Flexible Warehousing.
              <span className="block">Built For Scale.</span>
            </motion.h1>

            {/* ===== SUBHEADING ===== */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-2xl mt-6 leading-relaxed font-light"
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
                  <button className="w-full sm:w-auto px-8 py-4 text-lg bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Get Started
                  </button>
                </Link>
              </motion.div>

              {/* Secondary Button (Blue Outline) */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/enquiry">
                  <button className="w-full sm:w-auto px-8 py-4 text-lg bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    List Your Space
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* ===== STATS SECTION BELOW FOLD ===== */}
            <motion.div
              variants={itemVariants}
              className="mt-20 pt-16 border-t border-gray-200"
            >
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                {/* Stat Card 1 */}
                <motion.div
                  variants={statCardVariants}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="bg-white border border-gray-200 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    500+
                  </div>
                  <p className="text-gray-500 text-sm uppercase tracking-wide font-medium">
                    Warehouse Spaces
                  </p>
                </motion.div>

                {/* Stat Card 2 */}
                <motion.div
                  variants={statCardVariants}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="bg-white border border-gray-200 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    1000+
                  </div>
                  <p className="text-gray-500 text-sm uppercase tracking-wide font-medium">
                    Happy Customers
                  </p>
                </motion.div>

                {/* Stat Card 3 */}
                <motion.div
                  variants={statCardVariants}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="bg-white border border-gray-200 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    50M+
                  </div>
                  <p className="text-gray-500 text-sm uppercase tracking-wide font-medium">
                    Sq Ft Capacity
                  </p>
                </motion.div>
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

      {/* ===== SUBTLE SECTION DIVIDER ===== */}
      <div className="border-t border-gray-200 bg-gradient-to-b from-white to-gray-50 h-px" />
    </>
  );
};

