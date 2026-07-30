"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card glow-border p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3
                className="text-3xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-space)" }}
              >
                ADISA
              </h3>
              <p className="text-white/40 text-sm">
                Building Businesses. Building Systems. Building The Future.
              </p>
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-energy-blue/30 transition-all duration-300"
              whileHover={{ y: -3 }}
              data-hoverable
            >
              <Rocket className="w-4 h-4" />
              <span style={{ fontFamily: "var(--font-space)" }}>Back to Orbit</span>
            </motion.button>
          </div>

          {/* Divider */}
          <div className="my-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
            <p style={{ fontFamily: "var(--font-space)" }}>
              &copy; {new Date().getFullYear()} ADISA. All rights reserved.
            </p>
            <p style={{ fontFamily: "var(--font-space)" }}>
              Crafted with precision by Aditya Sawant
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
