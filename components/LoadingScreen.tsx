"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        // Non-linear progress for realism
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="loading-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Black Hole Effect */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Accretion Disk */}
          <motion.div
            className="w-32 h-32 rounded-full relative"
            style={{
              background: "radial-gradient(circle, #000 30%, transparent 70%)",
              boxShadow: "0 0 60px rgba(0,212,255,0.3), inset 0 0 40px rgba(0,0,0,0.9)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, transparent, rgba(0,212,255,0.3), transparent, rgba(0,168,255,0.2), transparent)",
              }}
            />
          </motion.div>

          {/* ADISA Logo */}
          <motion.div
            className="mt-12 text-4xl font-bold tracking-[0.3em]"
            style={{ fontFamily: "var(--font-space)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="text-white">ADISA</span>
          </motion.div>

          {/* Progress Bar */}
          <div className="mt-8 w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #00d4ff, #00a8ff)",
                boxShadow: "0 0 10px rgba(0,212,255,0.5)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <motion.p
            className="mt-4 text-sm text-white/40 tracking-widest"
            style={{ fontFamily: "var(--font-space)" }}
          >
            {Math.round(progress)}%
          </motion.p>

          {/* Skip Button */}
          {showSkip && (
            <motion.button
              className="mt-8 px-6 py-2 text-sm text-white/50 border border-white/10 rounded-full hover:text-white hover:border-white/30 transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => {
                setProgress(100);
                setTimeout(onComplete, 300);
              }}
            >
              Skip Intro
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
