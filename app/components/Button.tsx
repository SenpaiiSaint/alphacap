"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`
        px-4 py-2 rounded-lg font-medium transition-colors
        ${variant === "primary" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-600 hover:bg-gray-700 text-white"}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
} 