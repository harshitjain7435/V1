import React from "react";
import { motion } from "framer-motion";

interface SelectProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
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
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 outline-none font-light appearance-none bg-no-repeat bg-right pr-10 ${
          error
            ? "border-red-400 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            : "border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 hover:border-gray-300"
        } ${disabled ? "bg-gray-50 cursor-not-allowed text-gray-500" : "bg-white"}`}
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundSize: "20px",
          backgroundPosition: "right 10px center",
        }}
        aria-label={label}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
