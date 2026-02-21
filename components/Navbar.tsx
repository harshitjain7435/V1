"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all duration-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl transition-colors"
            >
              {/*<div
                className={`w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 ${
                  isScrolled ? "shadow-md" : "shadow-lg"
                }`}
              >
                WM
              </div>*/}
              <span className="text-cyan-600 font-bold">
                FlexiSpace
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <Link
                href="/"
                className="font-medium text-gray-700 hover:text-cyan-600 transition-colors duration-300 link-underline"
              >
                Home
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/enquiry"
                className="px-6 py-2 rounded-lg font-medium bg-cyan-500 text-white hover:bg-cyan-600 shadow-md transition-all duration-300"
              >
                Submit Enquiry
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 text-gray-700"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={isOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pb-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 rounded-lg transition-all duration-300 text-gray-700 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              href="/enquiry"
              className="block px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-cyan-500 text-white hover:bg-cyan-600"
            >
              Submit Enquiry
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};
