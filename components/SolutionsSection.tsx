"use client";

import { Card } from "./Card";
import { motion } from "framer-motion";
import {
  scrollStaggerContainer,
  scrollStaggerItem,
} from "@/lib/animations";

export const SolutionsSection: React.FC = () => {
  const solutions = [
    {
      title: "🏢 For Businesses",
      icon: "🏢",
      description:
        "Need warehouse space? Find verified, flexible solutions tailored to your requirements.",
      features: [
        "Browse multiple locations and capacities",
        "Short-term or long-term leases",
        "Transparent pricing with no hidden fees",
        "Direct communication with owners",
      ],
    },
    {
      title: "🏭 For Warehouse Owners",
      icon: "🏭",
      description:
        "Have unused warehouse space? Start generating revenue with our platform.",
      features: [
        "List your space in minutes",
        "Reach thousands of potential tenants",
        "Manage inquiries and bookings easily",
        "Maximize your revenue potential",
      ],
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Enterprise Solutions for Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Whether you need flexible warehouse space or want to monetize your
            assets, we have an enterprise-grade solution.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={scrollStaggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={scrollStaggerItem}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full card-premium rounded-xl">
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-4xl">{solution.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {solution.title.split(" ")[1]} {solution.title.split(" ")[2]}
                  </h3>
                </div>

                <p className="text-gray-600 mb-6 font-light">
                  {solution.description}
                </p>

                <ul className="space-y-4">
                  {solution.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-cyan-500 font-bold mt-1 flex-shrink-0">
                        ✓
                      </span>
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Accent gradient line */}
                <motion.div
                  className="mt-6 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  origin="left"
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
