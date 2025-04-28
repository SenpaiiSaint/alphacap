// app/page.tsx
"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Notification } from "./components/Notification";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const [showNotification, setShowNotification] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const partners = [
    {
      name: "Goldman Sachs",
      logo: "GS",
      description: "Global Investment Banking",
    },
    { name: "BlackRock", logo: "BLK", description: "Asset Management" },
    { name: "Morgan Stanley", logo: "MS", description: "Financial Services" },
    { name: "JPMorgan Chase", logo: "JPM", description: "Investment Banking" },
    { name: "KKR", logo: "KKR", description: "Private Equity" },
    { name: "Blackstone", logo: "BX", description: "Alternative Investments" },
    { name: "Carlyle Group", logo: "CG", description: "Global Investment" },
    { name: "Apollo Global", logo: "APO", description: "Private Equity" },
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % partners.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, partners.length]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50/95 to-slate-50/90"
    >
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-md border-b border-slate-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-xl font-extrabold text-blue-600/90">
                AlphaCap
              </span>
              <span className="ml-2 text-xs font-bold text-blue-400/90 bg-blue-50/50 px-2 py-1 rounded-full backdrop-blur-sm">
                BETA
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: "Product", url: "/product" },
                { name: "Solutions", url: "/solutions" },
                { name: "Pricing", url: "/pricing" },
                { name: "Resources", url: "/resources" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="text-slate-700/90 hover:text-blue-600/90 transition-colors duration-300 text-sm font-semibold"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/sign-in"
                className="text-slate-700/90 hover:text-blue-600/90 transition-colors duration-300 text-sm font-semibold"
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                className="px-4 py-2 bg-gradient-to-r from-blue-600/90 to-blue-800/90 text-white/90 text-sm font-semibold rounded-lg hover:from-blue-500/90 hover:to-blue-700/90 transition-all duration-300 backdrop-blur-sm"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-slate-700/90 hover:text-blue-600/90">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <motion.div
          style={{ y, opacity }}
          className="max-w-4xl mx-auto relative z-10 text-center px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 text-sm font-medium text-blue-600 bg-gradient-to-r from-blue-50 to-slate-50 rounded-full shadow-sm backdrop-blur-sm border border-blue-100">
              Trusted by leading private equity firms
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800"
          >
            Smart Spend Management for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800">
              Private Equity Firms
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Streamline your fund operations with intelligent spend management,
            automated workflows, and real-time insights.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex justify-center gap-6"
          >
            <Link
              href="/demodashboard"
              className="group relative px-6 py-3 font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg hover:from-blue-500 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <span className="relative z-10">View Demo</span>
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
            <Link
              href="/auth/sign-up"
              className="group relative px-6 py-3 font-medium text-blue-600 transition-all duration-300 bg-white border border-blue-200 rounded-lg hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-slate-50"
            >
              <span className="relative z-10">Request Access</span>
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-50 to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* Trusted Partners Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join the ranks of top private equity firms who trust our platform
              for their spend management needs.
            </p>
          </motion.div>

          <div
            className="relative h-40 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className="absolute flex gap-8"
              animate={{
                x: -currentSlide * 300,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
              {[...partners, ...partners].map((partner, index) => (
                <motion.div
                  key={`${partner.name}-${index}`}
                  className="flex flex-col items-center justify-center w-64 h-40 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 hover:shadow-md hover:border-slate-300 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-center p-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {partner.logo}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {partner.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {partners.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-blue-600 w-4" : "bg-slate-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800">
              Transform Your Fund Operations
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our platform is designed specifically for private equity firms,
              helping you achieve operational excellence.
            </p>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Portfolio Intelligence Platform",
                description:
                  "AI-driven spend analytics with real-time portfolio visibility and predictive insights.",
                icon: "📊",
                metrics: [
                  "98% accuracy in spend forecasting",
                  "Real-time fund performance tracking",
                  "Automated compliance monitoring",
                  "Cross-fund benchmarking",
                ],
                impact: "Reduced operational costs by $2.5M annually",
                technical: {
                  features: [
                    "Machine learning algorithms for expense prediction",
                    "API-first architecture for seamless integration",
                    "256-bit encryption for data security",
                    "Real-time data processing at scale",
                  ],
                  integrations: [
                    "ERP Systems",
                    "Accounting Software",
                    "Banking APIs",
                    "Compliance Tools",
                  ],
                  financial: {
                    roi: "300% within 12 months",
                    savings: "$1M+ per fund annually",
                    efficiency: "60% reduction in manual processes",
                  },
                },
              },
              {
                title: "Risk & Compliance Engine",
                description:
                  "Enterprise-grade security with automated controls and real-time monitoring.",
                icon: "🛡️",
                metrics: [
                  "99.99% system uptime",
                  "Sub-second transaction processing",
                  "Automated fraud detection",
                  "Real-time compliance alerts",
                ],
                impact: "99.9% compliance rate across all funds",
                technical: {
                  features: [
                    "Advanced anomaly detection algorithms",
                    "Automated audit trail generation",
                    "Role-based access control",
                    "Multi-factor authentication",
                  ],
                  integrations: [
                    "Security Information Systems",
                    "Compliance Platforms",
                    "Risk Management Tools",
                    "Identity Providers",
                  ],
                  financial: {
                    roi: "250% within 12 months",
                    savings: "$2M+ in audit costs",
                    efficiency: "70% faster compliance reporting",
                  },
                },
              },
              {
                title: "Smart Spend Management",
                description:
                  "End-to-end automation with intelligent workflows and process optimization.",
                icon: "⚡",
                metrics: [
                  "60% reduction in manual processes",
                  "40% faster transaction processing",
                  "95% automated reconciliation",
                  "24/7 system availability",
                ],
                impact: "15% improvement in operational efficiency",
                technical: {
                  features: [
                    "Workflow automation engine",
                    "Self-healing processes",
                    "Automated reconciliation engine",
                    "Real-time monitoring dashboard",
                  ],
                  integrations: [
                    "Workflow Management",
                    "Document Management",
                    "Communication Tools",
                    "Task Management",
                  ],
                  financial: {
                    roi: "400% within 12 months",
                    savings: "$1.5M+ in operational costs",
                    efficiency: "80% faster approval cycles",
                  },
                },
              },
            ].map((proposition, index) => (
              <motion.div
                key={proposition.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-300 relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {proposition.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                    {proposition.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {proposition.description}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-blue-600 mb-2">
                        Key Metrics
                      </h4>
                      <ul className="space-y-2">
                        {proposition.metrics.map((metric, i) => (
                          <li
                            key={i}
                            className="flex items-center text-sm text-slate-600"
                          >
                            <span className="text-blue-500 mr-2">•</span>
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-blue-600 mb-2">
                        Technical Features
                      </h4>
                      <ul className="space-y-2">
                        {proposition.technical.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center text-sm text-slate-600"
                          >
                            <span className="text-blue-500 mr-2">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-blue-600 mb-2">
                        Financial Impact
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <p className="text-xs text-blue-600">ROI</p>
                          <p className="text-sm font-medium">
                            {proposition.technical.financial.roi}
                          </p>
                        </div>
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <p className="text-xs text-blue-600">
                            Annual Savings
                          </p>
                          <p className="text-sm font-medium">
                            {proposition.technical.financial.savings}
                          </p>
                        </div>
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <p className="text-xs text-blue-600">
                            Efficiency Gain
                          </p>
                          <p className="text-sm font-medium">
                            {proposition.technical.financial.efficiency}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-blue-600 mb-2">
                        Integrations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {proposition.technical.integrations.map(
                          (integration, i) => (
                            <span
                              key={i}
                              className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
                            >
                              {integration}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm font-medium text-blue-600">
                      {proposition.impact}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-slate-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-r from-blue-600 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold mb-6"
          >
            Ready to transform how your firm spends?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/90 mb-10"
          >
            Experience the future of spend management—built for private equity.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/auth/sign-up"
              className="group inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-white/20 relative overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 rounded-lg bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
            <Link
              href="/contact"
              className="group inline-block bg-transparent text-white font-semibold px-8 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">Contact Sales</span>
              <span className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-slate-800/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <Notification
            type="info"
            title="New Feature Available"
            message="Try our new transaction management system"
            onClose={() => setShowNotification(false)}
            autoClose={5000}
          />
        )}
      </AnimatePresence>

      {/* Market Opportunity Section */}
      <section className="relative py-32 bg-gradient-to-br from-blue-50 to-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800">
              Market Opportunity
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Transforming private equity operations with intelligent spend
              management.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Total Addressable Market",
                value: "$23.4B",
                description:
                  "Global Business Spend Management software market (2024)",
                trend: "11.7% CAGR through 2032",
                metrics: [
                  "PE-specific segment: $4.2B",
                  "Mid-market focus: $8.9B",
                  "Enterprise segment: $10.3B",
                  "Average deal size: $1.2M ARR",
                  "Market penetration: <5%",
                  "Annual growth: $2.7B+",
                ],
              },
              {
                title: "Target Market",
                value: "8,000+",
                description: "Private equity funds worldwide",
                trend: "50,000+ portfolio companies",
                metrics: [
                  "North America: 3,200+ funds",
                  "Europe: 2,800+ funds",
                  "Asia-Pacific: 2,000+ funds",
                  "Average portfolio: 12 companies",
                  "Total AUM: $4.5T+",
                  "Average fund size: $1.2B",
                ],
              },
              {
                title: "Initial Focus",
                value: "$2-20B",
                description: "North American mid-market PE firms",
                trend: "AUM range for beachhead market",
                metrics: [
                  "Average fund size: $1.2B",
                  "Portfolio companies: 8-12 per fund",
                  "Annual spend: $50M+ per fund",
                  "Average ticket: $500K+",
                  "Target penetration: 25%",
                  "Market share goal: 15%",
                ],
              },
            ].map((stat) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6 text-center hover:shadow-md hover:border-slate-300 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </p>
                <p className="text-slate-600 mb-2">{stat.description}</p>
                <p className="text-sm text-blue-500 mb-4">{stat.trend}</p>
                <div className="space-y-2 text-left">
                  {stat.metrics.map((metric) => (
                    <p
                      key={metric}
                      className="text-sm text-slate-600 flex items-center"
                    >
                      <span className="text-blue-500 mr-2">•</span>
                      {metric}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Landscape Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800">
              Competitive Advantage
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Built specifically for private equity operations.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="overflow-x-auto">
              <table className="w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                      Competitor
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                      Focus
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                      Our Advantage
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    {
                      competitor: "Coupa",
                      focus: "Broad BSM",
                      advantage: "Lacks fund-level roll-ups & IRR simulator",
                    },
                    {
                      competitor: "SAP Concur",
                      focus: "T&E",
                      advantage: "Weak AI anomaly detection, slow UI",
                    },
                    {
                      competitor: "Ramp / Brex",
                      focus: "SMB cards",
                      advantage: "No multi-entity budgeting or audit depth",
                    },
                  ].map((row) => (
                    <motion.tr
                      key={row.competitor}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="hover:bg-slate-50/50"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {row.competitor}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {row.focus}
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-600">
                        {row.advantage}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Key Differentiators
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "PE-Specific Features",
                    items: [
                      "Fund-level roll-ups & waterfall calculations",
                      "Portfolio company benchmarking",
                      "LP reporting automation",
                      "Carried interest tracking",
                      "Multi-entity consolidation",
                      "GP commitment tracking",
                    ],
                  },
                  {
                    title: "Technical Advantages",
                    items: [
                      "Real-time anomaly detection",
                      "Automated compliance monitoring",
                      "Seamless ERP integration",
                      "AI-powered forecasting",
                      "Blockchain-based audit trail",
                      "Zero-trust security model",
                    ],
                  },
                  {
                    title: "Business Impact",
                    items: [
                      "60% reduction in manual processes",
                      "40% faster transaction processing",
                      "98% accuracy in spend forecasting",
                      "30% reduction in audit costs",
                      "25% increase in operational efficiency",
                      "15% reduction in compliance risk",
                    ],
                  },
                ].map((group) => (
                  <div key={group.title} className="space-y-2">
                    <h4 className="text-sm font-medium text-blue-600">
                      {group.title}
                    </h4>
                    <ul className="space-y-1">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-slate-600 flex items-center"
                        >
                          <span className="text-blue-500 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Projections Section */}
      <section className="relative py-32 bg-gradient-to-br from-blue-50 to-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800">
              Financial Projections
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Clear path to profitability and growth.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="overflow-x-auto">
              <table className="w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                      Year
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                      Clients
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                      ARR ($M)
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                      Gross Margin
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                      EBITDA
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                      Key Driver
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    {
                      year: "Y1",
                      clients: "5",
                      arr: "3.0",
                      margin: "78%",
                      ebitda: "-1.2",
                      driver: "Pilot rollout",
                    },
                    {
                      year: "Y2",
                      clients: "20",
                      arr: "15.0",
                      margin: "80%",
                      ebitda: "4.5",
                      driver: "Marketplace + partners",
                    },
                    {
                      year: "Y3",
                      clients: "50",
                      arr: "45.0",
                      margin: "83%",
                      ebitda: "18.0",
                      driver: "Global expansion",
                    },
                  ].map((row) => (
                    <motion.tr
                      key={row.year}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="hover:bg-slate-50/50"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {row.year}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {row.clients}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {row.arr}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {row.margin}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {row.ebitda}
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-600">
                        {row.driver}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Investment Highlights
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Revenue Growth",
                    metrics: [
                      "400% YoY growth in Y2",
                      "200% YoY growth in Y3",
                      "90% gross margin expansion",
                      "120% net revenue retention",
                      "5x revenue multiple target",
                      "3x industry growth rate",
                    ],
                  },
                  {
                    title: "Market Expansion",
                    metrics: [
                      "North America: 60% of revenue",
                      "Europe: 30% of revenue",
                      "Asia-Pacific: 10% of revenue",
                      "Global expansion roadmap",
                      "Strategic partnerships",
                      "Channel distribution",
                    ],
                  },
                  {
                    title: "Key Metrics",
                    metrics: [
                      "CAC: $150K (Y1) → $100K (Y3)",
                      "LTV: $2.4M per client",
                      "Payback period: 12 months",
                      "Gross margin: 83% (Y3)",
                      "Rule of 40: 45% (Y3)",
                      "ARR per employee: $500K",
                    ],
                  },
                ].map((group) => (
                  <div key={group.title} className="space-y-2">
                    <h4 className="text-sm font-medium text-blue-600">
                      {group.title}
                    </h4>
                    <ul className="space-y-1">
                      {group.metrics.map((metric) => (
                        <li
                          key={metric}
                          className="text-sm text-slate-600 flex items-center"
                        >
                          <span className="text-blue-500 mr-2">•</span>
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Thesis Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800">
              Investment Thesis
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Why now is the right time to invest in PE spend management.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Market Timing",
                description: "Perfect storm of market conditions",
                points: [
                  "PE industry growth: 15% CAGR",
                  "Digital transformation acceleration",
                  "Regulatory compliance complexity",
                  "LP demand for transparency",
                  "Cost pressure on GPs",
                  "Industry consolidation trend",
                ],
              },
              {
                title: "Technology Shift",
                description: "Next-gen platform architecture",
                points: [
                  "AI/ML maturity in finance",
                  "Cloud-native infrastructure",
                  "API-first ecosystem",
                  "Real-time data processing",
                  "Blockchain integration",
                  "Zero-trust security model",
                ],
              },
              {
                title: "Value Creation",
                description: "Clear path to value realization",
                points: [
                  "Proven ROI metrics",
                  "Scalable business model",
                  "Strong network effects",
                  "High switching costs",
                  "Multiple expansion potential",
                  "Recurring revenue model",
                ],
              },
            ].map((thesis) => (
              <motion.div
                key={thesis.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {thesis.title}
                </h3>
                <p className="text-slate-600 mb-4">{thesis.description}</p>
                <ul className="space-y-2">
                  {thesis.points.map((point) => (
                    <li
                      key={point}
                      className="text-sm text-slate-600 flex items-center"
                    >
                      <span className="text-blue-500 mr-2">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Go-to-Market Strategy Section */}
      <section className="relative py-32 bg-gradient-to-br from-blue-50 to-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800">
              Go-to-Market Strategy
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Clear path to market leadership and revenue growth.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Market Entry",
                description: "Focused approach to initial market penetration",
                points: [
                  "Target top 50 mid-market PE firms",
                  "Leverage industry partnerships",
                  "Focus on key decision makers",
                  "Pilot program with 5 firms",
                  "Reference customer development",
                  "Industry analyst relations",
                ],
              },
              {
                title: "Growth Strategy",
                description: "Scalable approach to market expansion",
                points: [
                  "Channel partner development",
                  "Strategic acquisitions",
                  "International expansion",
                  "Product line extensions",
                  "Marketplace development",
                  "API ecosystem growth",
                ],
              },
              {
                title: "Revenue Model",
                description: "Sustainable and scalable revenue generation",
                points: [
                  "Subscription-based pricing",
                  "Usage-based components",
                  "Professional services",
                  "Marketplace revenue",
                  "API monetization",
                  "Value-based pricing",
                ],
              },
            ].map((strategy) => (
              <motion.div
                key={strategy.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {strategy.title}
                </h3>
                <p className="text-slate-600 mb-4">{strategy.description}</p>
                <ul className="space-y-2">
                  {strategy.points.map((point) => (
                    <li
                      key={point}
                      className="text-sm text-slate-600 flex items-center"
                    >
                      <span className="text-blue-500 mr-2">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative py-16 bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">AlphaCap</span>
                <span className="text-xs text-blue-400 bg-blue-900/50 px-2 py-1 rounded-full">
                  BETA
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Transforming private equity operations with intelligent spend
                management solutions.
              </p>
              <div className="flex space-x-4">
                {[
                  { name: "Twitter", icon: "🐦", url: "#" },
                  { name: "LinkedIn", icon: "🔗", url: "#" },
                  { name: "GitHub", icon: "💻", url: "#" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="text-slate-400 hover:text-white transition-colors duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                {[
                  { name: "Features", url: "#" },
                  { name: "Pricing", url: "#" },
                  { name: "Integrations", url: "#" },
                  { name: "API", url: "#" },
                  { name: "Roadmap", url: "#" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      className="text-slate-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {[
                  { name: "About", url: "#" },
                  { name: "Careers", url: "#" },
                  { name: "Blog", url: "#" },
                  { name: "Press", url: "#" },
                  { name: "Contact", url: "#" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      className="text-slate-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {[
                  { name: "Documentation", url: "#" },
                  { name: "Guides", url: "#" },
                  { name: "Support", url: "#" },
                  { name: "Status", url: "#" },
                  { name: "Security", url: "#" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      className="text-slate-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-slate-500 text-sm">
                © {new Date().getFullYear()} AlphaCap. All rights reserved.
              </div>
              <div className="flex space-x-6">
                {[
                  { name: "Privacy Policy", url: "#" },
                  { name: "Terms of Service", url: "#" },
                  { name: "Cookie Policy", url: "#" },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="text-slate-500 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
