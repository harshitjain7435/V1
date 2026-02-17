"use client";

import { Card } from "./Card";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="h-full"
    >
      <Card className="h-full bg-white border-gray-100 rounded-xl shadow-sm hover:shadow-lg hover:border-cyan-200 relative group">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="text-5xl mb-6 inline-block"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>

          {/* Description */}
          <p className="text-gray-600 font-light leading-relaxed">
            {description}
          </p>

          {/* Accent line */}
          <motion.div
            className="mt-6 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 w-0 group-hover:w-12 transition-all duration-500"
          />
        </div>
      </Card>
    </motion.div>
  );
};
