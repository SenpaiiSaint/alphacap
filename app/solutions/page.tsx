"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const solutions = [
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
  }
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-slate-900">AlphaCap</span>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/"
                  className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/product"
                  className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Product
                </Link>
                <Link
                  href="/solutions"
                  className="border-blue-500 text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Solutions
                </Link>
                <Link
                  href="/demo"
                  className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Demo
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="outline" size="sm" className="ml-4">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Solutions for Every Stage
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Tailored solutions for private equity firms of all sizes, from emerging managers to global investment firms.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-6">{solution.description}</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {solution.features.map((feature) => (
                          <li key={feature} className="flex items-center text-slate-600">
                            <span className="mr-2">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Target Metrics</h3>
                      <ul className="space-y-2">
                        {solution.metrics.map((metric) => (
                          <li key={metric} className="flex items-center text-slate-600">
                            <span className="mr-2">•</span>
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button className="w-full">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Schedule a demo to see how our solutions can help streamline your private equity operations.
          </p>
          <Button size="lg">Schedule a Demo</Button>
        </motion.div>
      </div>
    </div>
  );
} 