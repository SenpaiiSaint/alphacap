"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Breadcrumb from "../components/Breadcrumb";
import TableOfContents from "../components/TableOfContents";
import BackToTop from "../components/BackToTop";

export default function ResourcesPage() {
  const sections = [
    { id: "documentation", title: "Documentation" },
    { id: "learning-center", title: "Learning Center" },
    { id: "support", title: "Support" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50/95 to-slate-50/90">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources", current: true },
        ]}
      />

      <div className="flex">
        {/* Table of Contents */}
        <TableOfContents sections={sections} />

        <div className="flex-1">
          {/* Hero Section */}
          <section id="hero" className="relative pt-20 pb-20 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800">
                  Resources & Support
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Everything you need to get started, learn best practices, and
                  maximize your platform experience.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Documentation Section */}
          <section id="documentation" className="relative py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800">
                  Documentation
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Comprehensive guides and technical documentation for all
                  platform features.
                </p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    title: "Getting Started",
                    description: "Quick start guides and onboarding resources",
                    links: [
                      { text: "Platform Overview", href: "#" },
                      { text: "First Steps Guide", href: "#" },
                      { text: "Account Setup", href: "#" },
                      { text: "User Roles", href: "#" },
                    ],
                  },
                  {
                    title: "Core Features",
                    description: "Detailed documentation for platform features",
                    links: [
                      { text: "Spend Management", href: "#" },
                      { text: "Compliance Tools", href: "#" },
                      { text: "Analytics Dashboard", href: "#" },
                      { text: "Reporting Tools", href: "#" },
                    ],
                  },
                  {
                    title: "Technical Guides",
                    description: "API documentation and integration guides",
                    links: [
                      { text: "API Reference", href: "#" },
                      { text: "Integration Guide", href: "#" },
                      { text: "Security Best Practices", href: "#" },
                      { text: "Data Migration", href: "#" },
                    ],
                  },
                ].map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6"
                  >
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-slate-600 mb-6">
                      {category.description}
                    </p>
                    <ul className="space-y-3">
                      {category.links.map((link) => (
                        <li key={link.text}>
                          <Link
                            href={link.href}
                            className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          >
                            <span className="mr-2">→</span>
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Learning Center */}
          <section
            id="learning-center"
            className="relative py-20 bg-gradient-to-br from-blue-50 to-slate-50"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800">
                  Learning Center
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Video tutorials, webinars, and best practices for maximizing
                  your platform usage.
                </p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-2">
                {[
                  {
                    title: "Video Tutorials",
                    description:
                      "Step-by-step video guides for common tasks and features",
                    items: [
                      "Getting Started with Spend Management",
                      "Setting Up Compliance Rules",
                      "Creating Custom Reports",
                      "Using the Analytics Dashboard",
                    ],
                  },
                  {
                    title: "Webinars",
                    description:
                      "Live and recorded sessions on advanced topics",
                    items: [
                      "Advanced Analytics Techniques",
                      "Compliance Best Practices",
                      "Integration Strategies",
                      "Security & Risk Management",
                    ],
                  },
                ].map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6"
                  >
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-slate-600 mb-6">{section.description}</p>
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center text-sm text-slate-600"
                        >
                          <span className="text-blue-500 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Support Section */}
          <section id="support" className="relative py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800">
                  Support
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Get help when you need it through our comprehensive support
                  channels.
                </p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    title: "Help Center",
                    description:
                      "Search our knowledge base for answers to common questions",
                    icon: "🔍",
                    link: "#",
                  },
                  {
                    title: "Contact Support",
                    description:
                      "Get in touch with our support team for assistance",
                    icon: "💬",
                    link: "#",
                  },
                  {
                    title: "Status Page",
                    description: "Check platform status and incident reports",
                    icon: "📊",
                    link: "#",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6 text-center"
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 mb-6">{item.description}</p>
                    <Link
                      href={item.link}
                      className="inline-block px-4 py-2 bg-slate-100 text-slate-900 font-semibold rounded-lg hover:bg-slate-200 transition-all duration-300"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800">
                  Need Additional Help?
                </h2>
                <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                  Our team is here to help you succeed. Contact us for
                  personalized assistance.
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300"
                >
                  Contact Support
                </Link>
              </motion.div>
            </div>
          </section>
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
