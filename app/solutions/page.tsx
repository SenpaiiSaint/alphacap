"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SolutionsPage() {
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
              Industry Solutions
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Tailored solutions for private equity firms of all sizes, from emerging managers to global investment firms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            {[
              {
                title: "Emerging Managers",
                description: "Streamline operations and scale efficiently with our entry-level solution.",
                features: [
                  "Fund-level spend management",
                  "Basic compliance monitoring",
                  "Standard reporting",
                  "Core integrations"
                ],
                metrics: [
                  "Up to $500M AUM",
                  "1-3 funds",
                  "5-10 portfolio companies"
                ]
              },
              {
                title: "Mid-Market Firms",
                description: "Advanced features for growing private equity firms.",
                features: [
                  "Multi-fund management",
                  "Advanced analytics",
                  "Custom workflows",
                  "API access"
                ],
                metrics: [
                  "$500M - $5B AUM",
                  "3-10 funds",
                  "10-30 portfolio companies"
                ]
              },
              {
                title: "Large Investment Firms",
                description: "Enterprise-grade solution for global private equity firms.",
                features: [
                  "Global operations support",
                  "Custom integrations",
                  "Dedicated support",
                  "Advanced security"
                ],
                metrics: [
                  "$5B+ AUM",
                  "10+ funds",
                  "30+ portfolio companies"
                ]
              },
              {
                title: "Specialized Solutions",
                description: "Custom solutions for specific investment strategies.",
                features: [
                  "Sector-specific workflows",
                  "Regulatory compliance",
                  "Custom reporting",
                  "Strategic consulting"
                ],
                metrics: [
                  "All AUM ranges",
                  "Any fund structure",
                  "Custom portfolio size"
                ]
              }
            ].map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{solution.title}</h3>
                <p className="text-slate-600 mb-6">{solution.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-blue-600 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-slate-600">
                        <span className="text-blue-500 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-blue-600 mb-3">Target Metrics</h4>
                  <ul className="space-y-2">
                    {solution.metrics.map((metric) => (
                      <li key={metric} className="flex items-center text-sm text-slate-600">
                        <span className="text-blue-500 mr-2">•</span>
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
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
              Common Use Cases
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              How our clients are using our platform to transform their operations.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Fund Operations",
                description: "Streamline fund operations and improve efficiency.",
                benefits: [
                  "60% reduction in manual processes",
                  "40% faster transaction processing",
                  "98% accuracy in spend forecasting"
                ]
              },
              {
                title: "Compliance & Risk",
                description: "Automate compliance monitoring and risk management.",
                benefits: [
                  "99.9% compliance rate",
                  "Real-time risk alerts",
                  "Automated audit trails"
                ]
              },
              {
                title: "Portfolio Management",
                description: "Gain insights into portfolio performance.",
                benefits: [
                  "Real-time portfolio visibility",
                  "Cross-fund benchmarking",
                  "Predictive analytics"
                ]
              }
            ].map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{useCase.title}</h3>
                <p className="text-slate-600 mb-6">{useCase.description}</p>
                <ul className="space-y-3">
                  {useCase.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center text-sm text-slate-600">
                      <span className="text-blue-500 mr-2">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
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
              Ready to find your solution?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help transform your operations.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300"
            >
              Contact Sales
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 