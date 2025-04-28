"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TableOfContentsProps {
  sections: {
    id: string;
    title: string;
  }[];
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-24 hidden lg:block w-64 h-[calc(100vh-6rem)] overflow-y-auto"
    >
      <nav aria-label="Table of contents">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">On this page</h2>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`text-sm transition-colors duration-200 ${
                  activeSection === section.id
                    ? "text-blue-600 font-medium"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                aria-current={activeSection === section.id ? "location" : undefined}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
} 