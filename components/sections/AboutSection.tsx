"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Target, Eye, Zap, Shield } from "lucide-react";

const traits = [
  {
    icon: Target,
    title: "Discipline",
    description: "Relentless execution with military precision. Every action is intentional.",
  },
  {
    icon: Eye,
    title: "Vision",
    description: "Seeing what others cannot. Building what the world needs before it knows it.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Pushing boundaries. Breaking rules that need breaking. Creating the impossible.",
  },
  {
    icon: Shield,
    title: "Leadership",
    description: "Leading by example. Inspiring teams to achieve what seems unattainable.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export function AboutSection() {
  const [ref, isInView] = useInView<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className="section-base"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span
            className="text-energy-blue text-sm tracking-[0.3em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-space)" }}
          >
            About
          </span>
          <h2
            className="heading-section text-white mb-6"
            style={{ fontFamily: "var(--font-space)" }}
          >
            The Architect
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
            Not just a developer. Not just an entrepreneur. A systems thinker who sees 
            patterns where others see chaos. Building the infrastructure of tomorrow, today.
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="glass-card glow-border p-8 md:p-12 mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Profile Image with Hologram Border */}
            <div className="relative flex-shrink-0">
              <div
                className="w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden hologram"
                style={{
                  background: "linear-gradient(135deg, #1a1a2e, #0f0f1a)",
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span
                    className="text-6xl md:text-7xl font-bold text-white/10"
                    style={{ fontFamily: "var(--font-space)" }}
                  >
                    A
                  </span>
                </div>
              </div>
              {/* Hologram scan line */}
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, transparent 40%, rgba(0,212,255,0.1) 50%, transparent 60%)",
                }}
                animate={{ backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Bio */}
            <div className="flex-1 text-center md:text-left">
              <h3
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-space)" }}
              >
                Aditya Sawant
              </h3>
              <p className="text-energy-blue text-sm tracking-wider uppercase mb-4">
                Founder & CEO, ADISA
              </p>
              <p className="text-white/60 leading-relaxed mb-6">
                Building businesses that matter. Creating systems that scale. 
                Obsessed with execution, driven by curiosity, and committed to building 
                the future. Every project is a step toward something bigger.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {["Entrepreneur", "Developer", "Systems Thinker", "Builder"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full border border-white/10 text-white/50"
                    style={{ fontFamily: "var(--font-space)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Traits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {traits.map((trait) => (
            <motion.div
              key={trait.title}
              className="glass-card glow-border p-6 group"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,168,255,0.05))",
                  border: "1px solid rgba(0,212,255,0.2)",
                }}
              >
                <trait.icon className="w-5 h-5 text-energy-blue" />
              </div>
              <h4
                className="text-lg font-semibold text-white mb-2"
                style={{ fontFamily: "var(--font-space)" }}
              >
                {trait.title}
              </h4>
              <p className="text-white/50 text-sm leading-relaxed">
                {trait.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
