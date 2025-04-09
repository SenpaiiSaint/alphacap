"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleGoogleLogin() {
    setLoading(true);
    const res = await signIn("google", { redirect: false });
    setLoading(false);
    if (res?.ok) router.push("/dashboard");
    else alert("Google sign-up failed");
  }

  async function handleGitHubLogin() {
    setLoading(true);
    const res = await signIn("github", { redirect: false });
    setLoading(false);
    if (res?.ok) router.push("/dashboard");
    else alert("GitHub sign-up failed");
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "EMPLOYEE" }),
      });
      if (res.ok) {
        router.push("/auth/sign-in");
      } else {
        alert("Error signing up");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("Error signing up");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center">
      <motion.div
        className="relative bg-white px-16 py-16 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="absolute -top-16 -left-16 w-64 h-64 bg-blue-300 rounded-full filter blur-3xl opacity-60"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-16 -right-16 w-48 h-48 bg-purple-300 rounded-full filter blur-3xl opacity-60"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
        <motion.div
          className="absolute -top-16 -right-16 w-48 h-48 bg-green-300 rounded-full filter blur-3xl opacity-60"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-16 -left-16 w-48 h-48 bg-pink-300 rounded-full filter blur-3xl opacity-60"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <h2 className="text-8xl font-bold text-gray-300 transform -rotate-12">
            BlueSky Labs
          </h2>
        </motion.div>

        <div className="relative z-10 flex flex-col items-center">
          <motion.h1
            className="text-4xl font-extrabold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Create Your Account
          </motion.h1>
          <motion.p
            className="mb-6 text-gray-600 text-center text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Join BlueSky Labs to experience seamless spend management and
            tailored project insights.
          </motion.p>
          <div className="w-full flex flex-col gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 w-full py-3 bg-white border border-gray-300 rounded-md shadow hover:shadow-lg transition"
              disabled={loading}
            >
              <Image
                src="/logos/google.svg"
                alt="Google Logo"
                width={40}
                height={40}
              />
              <span className="text-gray-700 font-medium">
                {loading ? "Processing..." : "Sign up with Google"}
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGitHubLogin}
              className="flex items-center justify-center gap-3 w-full py-3 bg-white border border-gray-300 rounded-md shadow hover:shadow-lg transition"
              disabled={loading}
            >
              <Image
                src="/logos/github.svg"
                alt="GitHub Logo"
                width={40}
                height={40}
              />
              <span className="text-gray-700 font-medium">
                {loading ? "Processing..." : "Sign up with GitHub"}
              </span>
            </motion.button>
          </div>

          {/* Separator */}
          <div className="w-full flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Manual Sign Up Form */}
          <form onSubmit={handleSignUp} className="w-full flex flex-col gap-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />

            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </motion.button>
          </form>

          {/* Sign In Redirect */}
          <motion.div
            className="mt-6 flex items-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <span>Already have an account? </span>
            <Link href="/auth/sign-in">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-600 font-semibold ml-1"
              >
                Sign In
              </motion.a>
            </Link>
          </motion.div>

          <motion.p
            className="mt-4 text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Join us today and unlock a new era of spend management.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
