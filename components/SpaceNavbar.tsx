"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Rocket, Menu, X } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export function SpaceNavbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [rocketPosition, setRocketPosition] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current ? "down" : "up";
    lastScrollY.current = latest;

    // Show navbar when scrolling up or at top
    if (direction === "up" && latest > 100) {
      setIsVisible(true);
    } else if (latest < 100) {
      setIsVisible(false);
    } else if (direction === "down") {
      setIsVisible(false);
    }
  });

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate rocket position based on active section
  useEffect(() => {
    const index = navItems.findIndex((item) => item.href.slice(1) === activeSection);
    if (index !== -1) {
      setRocketPosition(index * 100 + 50);
    }
  }, [activeSection]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            ref={navRef}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[9996]"
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Glassmorphism Container */}
            <div
              className="relative px-2 py-2 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-1 relative">
                {/* Rocket indicator */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2"
                  animate={{ left: `${rocketPosition}px` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Rocket className="w-3 h-3 text-energy-blue" />
                </motion.div>

                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full ${
                      activeSection === item.href.slice(1)
                        ? "text-white"
                        : "text-white/50 hover:text-white/80"
                    }`}
                    style={{ fontFamily: "var(--font-space)" }}
                  >
                    {activeSection === item.href.slice(1) && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        layoutId="activeNav"
                        style={{
                          background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,168,255,0.05))",
                          border: "1px solid rgba(0,212,255,0.2)",
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Mobile Nav Toggle */}
              <div className="md:hidden flex items-center gap-4">
                <span
                  className="text-lg font-bold tracking-wider text-white"
                  style={{ fontFamily: "var(--font-space)" }}
                >
                  ADISA
                </span>
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  className="md:hidden mt-2 p-4 rounded-2xl"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                    backdropFilter: "blur(30px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => scrollToSection(item.href)}
                      className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                        activeSection === item.href.slice(1)
                          ? "text-energy-blue bg-white/5"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Floating Logo - Always visible when navbar hidden */}
      <motion.div
        className="fixed top-6 left-6 z-[9995]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span
          className="text-xl font-bold tracking-[0.2em] text-white/80"
          style={{ fontFamily: "var(--font-space)" }}
        >
          ADISA
        </span>
      </motion.div>
    </>
  );
}
