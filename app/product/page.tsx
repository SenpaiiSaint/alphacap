"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50/95 to-slate-50/90">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800">
              Smart Spend Management Platform
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Transform your private equity operations with our AI-powered platform for intelligent spend management, automated workflows, and real-time insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Portfolio Intelligence",
                description: "AI-driven analytics with real-time portfolio visibility and predictive insights.",
                features: [
                  "Real-time fund performance tracking",
                  "Automated compliance monitoring",
                  "Cross-fund benchmarking",
                  "Predictive analytics"
                ]
              },
              {
                title: "Risk & Compliance",
                description: "Enterprise-grade security with automated controls and real-time monitoring.",
                features: [
                  "Advanced anomaly detection",
                  "Automated audit trail",
                  "Role-based access control",
                  "Multi-factor authentication"
                ]
              },
              {
                title: "Smart Spend Management",
                description: "End-to-end automation with intelligent workflows and process optimization.",
                features: [
                  "Workflow automation",
                  "Self-healing processes",
                  "Automated reconciliation",
                  "Real-time monitoring"
                ]
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.features.map((item) => (
                    <li key={item} className="flex items-center text-sm text-slate-600">
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

      {/* Technical Specifications */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800">
              Technical Specifications
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Built with enterprise-grade technology and security.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">System Requirements</h3>
              <ul className="space-y-3">
                {[
                  "Cloud-native architecture",
                  "API-first design",
                  "256-bit encryption",
                  "99.99% uptime SLA",
                  "Real-time data processing",
                  "Scalable infrastructure"
                ].map((item) => (
                  <li key={item} className="flex items-center text-sm text-slate-600">
                    <span className="text-blue-500 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Integration Capabilities</h3>
              <ul className="space-y-3">
                {[
                  "ERP Systems",
                  "Accounting Software",
                  "Banking APIs",
                  "Compliance Tools",
                  "Security Systems",
                  "Identity Providers"
                ].map((item) => (
                  <li key={item} className="flex items-center text-sm text-slate-600">
                    <span className="text-blue-500 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
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
              Ready to transform your operations?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Experience the future of spend management—built for private equity.
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 