import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  role?: string;
  ariaLabel?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  role,
  ariaLabel,
}) => {
  return (
    <div
      className={`bg-white border border-gray-100 rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md ${className}`}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};
