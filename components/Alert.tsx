import React from "react";
import { motion } from "framer-motion";

interface AlertProps {
  type: "success" | "error" | "info" | "warning";
  message: string;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type,
  message,
  onClose,
  className = "",
}) => {
  const bgColor = {
    success: "bg-green-50/80 border-green-200",
    error: "bg-red-50/80 border-red-200",
    info: "bg-blue-50/80 border-blue-200",
    warning: "bg-yellow-50/80 border-yellow-200",
  }[type];

  const textColor = {
    success: "text-green-800",
    error: "text-red-800",
    info: "text-blue-800",
    warning: "text-yellow-800",
  }[type];

  const iconColor = {
    success: "text-green-500",
    error: "text-red-500",
    info: "text-blue-500",
    warning: "text-yellow-500",
  }[type];

  return (
    <motion.div
      className={`border-2 rounded-lg p-4 flex items-start gap-3 backdrop-blur-sm ${bgColor} ${className}`}
      role="alert"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`flex-shrink-0 w-5 h-5 ${iconColor} mt-0.5 text-lg`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 40, delay: 0.1 }}
      >
        {type === "success" && "✓"}
        {type === "error" && "✕"}
        {type === "info" && "ℹ"}
        {type === "warning" && "⚠"}
      </motion.div>
      <div className={`flex-1 ${textColor} text-sm font-medium`}>{message}</div>
      {onClose && (
        <motion.button
          onClick={onClose}
          className={`flex-shrink-0 text-xl leading-none opacity-50 hover:opacity-100 transition-opacity`}
          aria-label="Close alert"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ×
        </motion.button>
      )}
    </motion.div>
  );
};
