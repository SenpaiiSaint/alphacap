"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`bg-white rounded-lg shadow-sm p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
