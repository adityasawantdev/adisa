"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

const roles = [
  "Entrepreneur",
  "Developer",
  "Builder",
  "System Thinker",
  "Future Billionaire",
];

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  // Typing animation
  useEffect(() => {
    const role = roles[currentRole];
    const typeSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ opacity, scale, y }}
    >
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm tracking-widest uppercase"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,168,255,0.05))",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "rgba(0,212,255,0.8)",
              fontFamily: "var(--font-space)",
            }}
          >
            <Sparkles className="w-4 h-4" />
            Building The Future
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="heading-hero text-gradient-hero mb-4"
          style={{ fontFamily: "var(--font-space)" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          ADITYA SAWANT
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-white/60 mb-8 tracking-wide"
          style={{ fontFamily: "var(--font-space)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Founder of{" "}
          <span className="text-energy-blue font-semibold">ADISA</span>
        </motion.p>

        {/* Typing Animation */}
        <motion.div
          className="h-12 mb-12 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span
            className="text-lg md:text-xl text-white/50 tracking-wider"
            style={{ fontFamily: "var(--font-space)" }}
          >
            {displayText}
            <motion.span
              className="inline-block w-[2px] h-6 bg-energy-blue ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <button
            onClick={scrollToAbout}
            className="magnetic-btn group"
            data-hoverable
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
          </button>

          <a
            href="#projects"
            className="magnetic-btn"
            style={{
              background: "transparent",
              borderColor: "rgba(255,255,255,0.2)",
            }}
            data-hoverable
          >
            <span className="relative z-10">Projects</span>
          </a>

          <a
            href="#contact"
            className="magnetic-btn"
            style={{
              background: "transparent",
              borderColor: "rgba(255,255,255,0.2)",
            }}
            data-hoverable
          >
            <span className="relative z-10">Contact</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-white/30 tracking-widest uppercase" style={{ fontFamily: "var(--font-space)" }}>
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
