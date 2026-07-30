"use client";

import { motion } from "framer-motion";
import { Rocket, Compass } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Lost Astronaut Icon */}
        <motion.div
          className="mb-8"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-24 h-24 mx-auto rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,168,255,0.05))",
              border: "1px solid rgba(0,212,255,0.2)",
              boxShadow: "0 0 40px rgba(0,212,255,0.1)",
            }}
          >
            <Compass className="w-10 h-10 text-energy-blue" />
          </div>
        </motion.div>

        <h1
          className="text-8xl font-bold text-white/10 mb-4"
          style={{ fontFamily: "var(--font-space)" }}
        >
          404
        </h1>

        <h2
          className="text-2xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Lost In Space
        </h2>

        <p className="text-white/40 mb-8 leading-relaxed">
          The page you are looking for has drifted into deep space. 
          It might have been consumed by a black hole or never existed in this universe.
        </p>

        <Link
          href="/"
          className="magnetic-btn inline-flex items-center gap-2"
          data-hoverable
        >
          <Rocket className="w-4 h-4" />
          <span>Return to Earth</span>
        </Link>
      </motion.div>
    </div>
  );
}
