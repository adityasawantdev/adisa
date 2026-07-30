"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ExternalLink, Github, ChevronRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    title: "ADISA Platform",
    description: "The flagship business platform. A comprehensive system for managing operations, analytics, and growth. Built with scalability and performance in mind.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    image: "/images/project-adisa.jpg",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Nebula Dashboard",
    description: "Real-time analytics dashboard with 3D visualizations. Monitor metrics across multiple dimensions with stunning interactive charts.",
    tech: ["React", "Three.js", "D3.js", "Node.js"],
    image: "/images/project-nebula.jpg",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Quantum API",
    description: "High-performance REST API with GraphQL support. Handles millions of requests with sub-millisecond response times.",
    tech: ["Node.js", "GraphQL", "PostgreSQL", "Redis"],
    image: "/images/project-quantum.jpg",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    title: "Stellar Mobile",
    description: "Cross-platform mobile application for managing business on the go. Native performance with React Native.",
    tech: ["React Native", "TypeScript", "Firebase", "Expo"],
    image: "/images/project-stellar.jpg",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    title: "Orbit CMS",
    description: "Headless content management system with AI-powered content generation and optimization features.",
    tech: ["Next.js", "OpenAI", "Prisma", "Vercel"],
    image: "/images/project-orbit.jpg",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    title: "Nova AI",
    description: "AI-powered assistant for business automation. Integrates with existing workflows to boost productivity.",
    tech: ["Python", "OpenAI", "FastAPI", "Docker"],
    image: "/images/project-nova.jpg",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

export function ProjectsSection() {
  const [ref, isInView] = useInView<HTMLElement>();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" ref={ref} className="section-base">
      <div className="relative z-10 max-w-7xl mx-auto w-full">
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
            Portfolio
          </span>
          <h2
            className="heading-section text-white mb-4"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Space Stations
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Every project is a space station — a self-contained world of innovation, 
            built to solve real problems at scale.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div
                className="glass-card glow-border overflow-hidden h-full transition-all duration-500"
                style={{
                  transform: hoveredIndex === index ? "translateY(-8px)" : "translateY(0)",
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="w-full h-full"
                    style={{
                      background: `linear-gradient(135deg, ${
                        index % 3 === 0
                          ? "#1a3a5c, #0a1a2a"
                          : index % 3 === 1
                          ? "#2d1b4e, #0f0f1a"
                          : "#1a4a3c, #0a1a15"
                      })`,
                    }}
                  />
                  {/* Animated Border on Hover */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent)",
                    }}
                    animate={{
                      x: hoveredIndex === index ? ["-100%", "100%"] : "-100%",
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: hoveredIndex === index ? Infinity : 0,
                      ease: "linear",
                    }}
                  />

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 text-xs rounded-full"
                        style={{
                          background: "rgba(0,212,255,0.15)",
                          border: "1px solid rgba(0,212,255,0.3)",
                          color: "#00d4ff",
                          fontFamily: "var(--font-space)",
                        }}
                      >
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="text-xl font-bold text-white mb-2 group-hover:text-energy-blue transition-colors duration-300"
                    style={{ fontFamily: "var(--font-space)" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-md border border-white/10 text-white/50"
                        style={{ fontFamily: "var(--font-space)" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <a
                      href={project.liveUrl}
                      className="flex items-center gap-2 text-sm text-energy-blue hover:text-white transition-colors"
                      style={{ fontFamily: "var(--font-space)" }}
                      data-hoverable
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
                      style={{ fontFamily: "var(--font-space)" }}
                      data-hoverable
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </div>
                </div>

                {/* Hover Glow */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500"
                  style={{
                    boxShadow: "inset 0 0 30px rgba(0,212,255,0.05)",
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
