"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingPage() {
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
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Choose the plan that&apos;s right for your firm. All plans include core
              features and enterprise-grade security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "$2,500",
                period: "per month",
                description: "Perfect for emerging managers",
                features: [
                  "Up to $500M AUM",
                  "1-3 funds",
                  "Basic compliance",
                  "Standard reporting",
                  "Email support",
                  "Core integrations",
                ],
                cta: "Get Started",
                popular: false,
              },
              {
                name: "Professional",
                price: "$5,000",
                period: "per month",
                description: "For growing private equity firms",
                features: [
                  "Up to $5B AUM",
                  "3-10 funds",
                  "Advanced analytics",
                  "Custom workflows",
                  "Priority support",
                  "API access",
                ],
                cta: "Start Free Trial",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "per month",
                description: "For global investment firms",
                features: [
                  "Unlimited AUM",
                  "Unlimited funds",
                  "Custom integrations",
                  "Dedicated support",
                  "Advanced security",
                  "Strategic consulting",
                ],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`group relative bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-300 ${
                  tier.popular ? "border-blue-500" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {tier.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-slate-900">
                    {tier.price}
                  </span>
                  <span className="text-slate-600">/{tier.period}</span>
                </div>
                <p className="text-slate-600 mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-sm text-slate-600"
                    >
                      <span className="text-blue-500 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={
                    tier.cta === "Contact Sales" ? "/contact" : "/auth/sign-up"
                  }
                  className={`block w-full text-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    tier.popular
                      ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {tier.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
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
              Feature Comparison
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Compare features across all plans to find the perfect fit for your
              firm.
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                    Feature
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-slate-600">
                    Starter
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-slate-600">
                    Professional
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-slate-600">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  {
                    feature: "AUM Limit",
                    starter: "$500M",
                    professional: "$5B",
                    enterprise: "Unlimited",
                  },
                  {
                    feature: "Number of Funds",
                    starter: "1-3",
                    professional: "3-10",
                    enterprise: "Unlimited",
                  },
                  {
                    feature: "Compliance Monitoring",
                    starter: "Basic",
                    professional: "Advanced",
                    enterprise: "Custom",
                  },
                  {
                    feature: "Analytics",
                    starter: "Standard",
                    professional: "Advanced",
                    enterprise: "Custom",
                  },
                  {
                    feature: "Support",
                    starter: "Email",
                    professional: "Priority",
                    enterprise: "Dedicated",
                  },
                  {
                    feature: "API Access",
                    starter: "No",
                    professional: "Yes",
                    enterprise: "Custom",
                  },
                  {
                    feature: "Custom Integrations",
                    starter: "No",
                    professional: "Limited",
                    enterprise: "Yes",
                  },
                  {
                    feature: "Security",
                    starter: "Standard",
                    professional: "Advanced",
                    enterprise: "Custom",
                  },
                ].map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-slate-600">
                      {row.starter}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-slate-600">
                      {row.professional}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-slate-600">
                      {row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about our pricing and plans.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                question: "What&apos;s included in each plan?",
                answer:
                  "All plans include core features like fund-level spend management, basic compliance monitoring, and standard reporting. Higher tiers add advanced analytics, custom workflows, and dedicated support.",
              },
              {
                question: "Can I upgrade or downgrade my plan?",
                answer:
                  "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
              },
              {
                question: "Do you offer custom pricing?",
                answer:
                  "Yes, our Enterprise plan offers custom pricing based on your specific needs, including unlimited AUM, custom integrations, and dedicated support.",
              },
              {
                question: "Is there a free trial?",
                answer:
                  "Yes, we offer a 14-day free trial for our Professional plan. No credit card required.",
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-600">{faq.answer}</p>
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
              Ready to get started?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Choose the plan that&apos;s right for your firm and start transforming
              your operations today.
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
