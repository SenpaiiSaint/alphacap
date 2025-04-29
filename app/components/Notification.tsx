"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NotificationProps {
  type: "info" | "success" | "error" | "warning";
  title: string;
  message: string | ReactNode;
  onClose?: () => void;
}

export function Notification({
  type,
  title,
  message,
  onClose,
}: NotificationProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
          type === "info"
            ? "bg-blue-100 text-blue-800"
            : type === "success"
            ? "bg-green-100 text-green-800"
            : type === "error"
            ? "bg-red-100 text-red-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        <div className="flex items-start">
          <div className="flex-1">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm mt-1">{message}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-4 text-current hover:opacity-75"
            >
              ×
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
