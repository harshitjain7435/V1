"use client";

import { Button } from "./Button";
import { AnimatedGrid } from "./AnimatedGrid";
import { FloatingGlobs } from "./FloatingGlobs";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  buttonHover,
} from "@/lib/animations";

export const Hero: React.FC = () => {
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
    <section className="relative min-h-screen bg-gradient-to-b from-cyan-500 via-sky-400 to-blue-600 overflow-hidden flex items-center justify-center py-20">
      {/* Animated background elements */}
      <AnimatedGrid />
      <FloatingGlobs />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Headline */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Flexible Warehousing
              <span className="block text-cyan-100">Solutions At Your Scale</span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
          >
            Connect with verified warehouse spaces or monetize your unused
            capacity. Enterprise-grade logistics platform built for modern supply
            chains.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.div {...buttonHover}>
              <Link href="/enquiry">
                <Button className="!bg-white !text-cyan-600 !hover:bg-cyan-50">
                  Get Started
                </Button>
              </Link>
            </motion.div>
            <motion.div {...buttonHover}>
              <Link href="/enquiry">
                <Button
                  variant="outline"
                  className="!border-white !text-white !hover:bg-white/10"
                >
                  List Your Space
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-8 pt-12 border-t border-white/20"
          >
            <motion.div
              whileHover={{ y: -4 }}
              className="transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                500+
              </div>
              <p className="text-white/80 font-medium">Warehouse Spaces</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -4 }}
              className="transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                1000+
              </div>
              <p className="text-white/80 font-medium">Happy Customers</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -4 }}
              className="transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                50M+
              </div>
              <p className="text-white/80 font-medium">Sq Ft Capacity</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          className="w-6 h-6 text-white/60"
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
  );
};
 
