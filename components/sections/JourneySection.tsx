"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Rocket, GraduationCap, Code, Briefcase, Star, Crown } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const milestones: Milestone[] = [
  {
    year: "2018",
    title: "The Spark",
    description: "First line of code written. The journey from curiosity to obsession began. HTML, CSS, and JavaScript became the new language of creation.",
    icon: GraduationCap,
  },
  {
    year: "2019",
    title: "Deep Dive",
    description: "Mastered React ecosystem. Built first production applications. Understood that code is a tool for solving real problems, not just syntax.",
    icon: Code,
  },
  {
    year: "2020",
    title: "First Business",
    description: "Launched first commercial project. Learned that building is only half the battle — distribution, marketing, and execution matter equally.",
    icon: Briefcase,
  },
  {
    year: "2022",
    title: "ADISA Founded",
    description: "ADISA was born. A vision to build systems that scale. From a solo developer to a founder with a mission to impact millions.",
    icon: Star,
  },
  {
    year: "2024",
    title: "Scaling Up",
    description: "Multiple products launched. Team growing. Revenue scaling. The foundation is set for exponential growth in the years ahead.",
    icon: Crown,
  },
  {
    year: "Future",
    title: "The Billion-Dollar Vision",
    description: "Building toward a billion-dollar impact. Every decision, every line of code, every partnership is a step toward that future.",
    icon: Rocket,
  },
];

export function JourneySection() {
  const [ref, isInView] = useInView<HTMLElement>();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Rocket moves up as user scrolls
  const rocketY = useTransform(scrollYProgress, [0, 1], ["90%", "10%"]);
  const rocketRotate = useTransform(scrollYProgress, [0, 1], [0, -15]);

  return (
    <section id="journey" ref={sectionRef} className="section-base py-32">
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span
            className="text-energy-blue text-sm tracking-[0.3em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Timeline
          </span>
          <h2
            className="heading-section text-white mb-4"
            style={{ fontFamily: "var(--font-space)" }}
          >
            The Journey
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            From first code to future billionaire. Every milestone is a launch pad for the next.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            {/* Progress Line */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-energy-blue to-white/30"
              style={{
                height: useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]),
              }}
            />
          </div>

          {/* Rocket */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 z-20"
            style={{ top: rocketY, rotate: rocketRotate }}
          >
            <div className="relative">
              <Rocket className="w-8 h-8 text-energy-blue" />
              {/* Engine trail */}
              <motion.div
                className="absolute top-full left-1/2 -translate-x-1/2 w-[2px]"
                style={{
                  background: "linear-gradient(to bottom, rgba(0,212,255,0.5), transparent)",
                  height: "60px",
                }}
                animate={{ opacity: [0.5, 1, 0.5], height: ["40px", "80px", "40px"] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Milestones */}
          <div className="space-y-24">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              const Icon = milestone.icon;

              return (
                <motion.div
                  key={milestone.year}
                  className={`relative flex items-center ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                >
                  {/* Content Card */}
                  <div className={`w-[calc(50%-40px)] ${isLeft ? "text-right pr-8" : "text-left pl-8"}`}>
                    <div className="glass-card glow-border p-6 inline-block">
                      <span
                        className="text-energy-blue text-sm tracking-wider font-semibold block mb-2"
                        style={{ fontFamily: "var(--font-space)" }}
                      >
                        {milestone.year}
                      </span>
                      <h3
                        className="text-xl font-bold text-white mb-2"
                        style={{ fontFamily: "var(--font-space)" }}
                      >
                        {milestone.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,168,255,0.05))",
                        border: "1px solid rgba(0,212,255,0.3)",
                        boxShadow: "0 0 20px rgba(0,212,255,0.2)",
                      }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <Icon className="w-5 h-5 text-energy-blue" />
                    </motion.div>
                  </div>

                  {/* Empty space for other side */}
                  <div className="w-[calc(50%-40px)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
