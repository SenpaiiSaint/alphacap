// app/page.tsx
"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900">
      {/* Hero */}
      <section className="py-24 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Smart Spend Management for <br className="hidden sm:inline-block" />
          <span className="text-blue-600">Private Equity Firms</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl">
          Issue cards, track expenses, and manage funds—all in one elegant
          platform built for finance leaders.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/demodashboard"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition"
          >
            View Demo
          </Link>
          <Link
            href="/auth/sign-up"
            className="inline-block bg-white border border-gray-300 px-6 py-3 rounded-md text-lg font-medium hover:border-gray-400"
          >
            Request Access
          </Link>
        </div>
      </section>

      {/* Trusted Logos */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-lg uppercase tracking-wide text-gray-500 mb-6">
            Trusted by professionals at
          </p>
          <div className="flex flex-wrap justify-center gap-8 grayscale opacity-80">
            <img src="/logos/pic1.svg" alt="Blackstone" className="h-35" />
            <img src="/logos/pic2.svg" alt="KKR" className="h-35" />
            <img src="/logos/pic3.svg" alt="Carlyle" className="h-35" />
            <img src="/logos/pic5.svg" alt="Softbank" className="h-35" />
            <img src="/logos/pic6.svg" alt="Softbank" className="h-35" />
            <img src="/logos/pic8.svg" alt="Softbank" className="h-35" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-12">
            Built for Scale & Simplicity
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Corporate Cards</h3>
              <p>
                Instantly issue physical or virtual cards. Set custom limits and
                monitor real-time usage.
              </p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Fund Management</h3>
              <p>
                Oversee multiple PE funds, manage budgets, and gain insights into
                spend performance.
              </p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Expense Intelligence</h3>
              <p>
                Track, categorize, and export expenses. Unlock patterns and reduce
                waste across the firm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to transform how your firm spends?
          </h2>
          <p className="mb-8 text-lg">
            Experience the future of spend management—built for private equity.
          </p>
          <Link
            href="/auth/sign-up"
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-md hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
