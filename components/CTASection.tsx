"use client";

import Link from "next/link";
import { Button } from "./Button";
import { motion } from "framer-motion";
import {
  scrollFadeInUp,
  staggerContainer,
  staggerItem,
  buttonHover,
} from "@/lib/animations";

export const CTASection: React.FC = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-500 to-blue-600 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1200 300"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="30" cy="30" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <motion.div
        className="max-w-4xl mx-auto text-center relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          variants={staggerItem}
        >
          Ready to Transform Your Logistics?
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-white/90 mb-12 font-light"
          variants={staggerItem}
        >
          Join hundreds of enterprises and warehouse owners already using our
          platform. Get started in minutes and scale your operations.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={staggerItem}
        >
          <motion.div {...buttonHover}>
            <Link href="/enquiry">
              <Button className="!px-8 !py-4 !text-lg !bg-white !text-cyan-600 !hover:bg-cyan-50 !shadow-lg !font-semibold">
                Submit Enquiry Now
              </Button>
            </Link>
          </motion.div>

          <motion.div {...buttonHover}>
            <a
              href="#contact"
              className="!px-8 !py-4 !inline-block !border-2 !border-white !text-white !rounded-lg !font-semibold !hover:bg-white/10 !transition-all !duration-200 !hover:shadow-lg"
            >
              Schedule a Demo
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
