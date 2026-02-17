import React from "react";
import { motion } from "framer-motion";

interface TextareaProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  rows = 4,
  className = "",
  error,
}) => {
  return (
    <motion.div
      className={`mb-4 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 resize-vertical outline-none font-light ${
          error
            ? "border-red-400 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            : "border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 hover:border-gray-300"
        } ${disabled ? "bg-gray-50 cursor-not-allowed text-gray-500" : "bg-white"}`}
        aria-label={label}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <motion.p
          id={`${name}-error`}
          className="text-red-500 text-sm mt-2 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          ✕ {error}
        </motion.p>
      )}
    </motion.div>
  );
};
