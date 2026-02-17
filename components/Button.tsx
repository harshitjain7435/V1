import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  "aria-label"?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
  "aria-label": ariaLabel,
}) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-semibold transition-all duration-200 focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses =
    variant === "primary"
      ? "bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-500 shadow-md hover:shadow-lg"
      : "border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-50 focus:ring-cyan-500 shadow-sm hover:shadow-md";

  // Custom className comes last to override defaults
  const finalClasses = `${baseClasses} ${variantClasses} ${className}`.trim();

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={finalClasses}
      aria-label={ariaLabel}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
};
