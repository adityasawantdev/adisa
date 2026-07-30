"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Code2, Clock, Target } from "lucide-react";

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    icon: Rocket,
    value: 15,
    suffix: "+",
    label: "Projects",
    description: "Shipped to production",
  },
  {
    icon: Code2,
    value: 10,
    suffix: "+",
    label: "Skills",
    description: "Technologies mastered",
  },
  {
    icon: Clock,
    value: 5000,
    suffix: "+",
    label: "Hours",
    description: "Of focused learning",
  },
  {
    icon: Target,
    value: 1,
    suffix: "B$",
    label: "Dream",
    description: "Billion-dollar vision",
  },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      countRef.current = Math.floor(easeOut * value);
      setCount(countRef.current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, value]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-base py-24">
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span
            className="text-energy-blue text-sm tracking-[0.3em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Numbers
          </span>
          <h2
            className="heading-section text-white mb-4"
            style={{ fontFamily: "var(--font-space)" }}
          >
            By The Numbers
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="glass-card glow-border p-8 text-center group"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,168,255,0.05))",
                    border: "1px solid rgba(0,212,255,0.2)",
                  }}
                >
                  <Icon className="w-6 h-6 text-energy-blue" />
                </div>

                <div
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-space)" }}
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={isInView}
                  />
                </div>

                <h3
                  className="text-lg font-semibold text-white/80 mb-1"
                  style={{ fontFamily: "var(--font-space)" }}
                >
                  {stat.label}
                </h3>

                <p className="text-white/40 text-sm">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
