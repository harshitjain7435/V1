"use client";

import { FeatureCard } from "./FeatureCard";
import { motion } from "framer-motion";
import {
  scrollFadeInUp,
  scrollStaggerContainer,
  scrollStaggerItem,
} from "@/lib/animations";

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: "🔍",
      title: "Verified Listings",
      description:
        "All warehouse spaces are verified and inspected for quality and safety standards.",
    },
    {
      icon: "💰",
      title: "Competitive Pricing",
      description:
        "Get the best rates directly from warehouse owners without intermediaries.",
    },
    {
      icon: "⚡",
      title: "Quick Deployment",
      description:
        "From inquiry to contract in days. Fast-track your warehouse solution.",
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Subtle background accent */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            We&apos;re committed to making warehouse logistics simple, transparent,
            and affordable for enterprise-scale operations.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={scrollStaggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={scrollStaggerItem}>
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
