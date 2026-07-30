"use client";

import { useState, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "@/hooks/useInView";

interface Skill {
  name: string;
  level: number;
  color: string;
  description: string;
  category: string;
}

const skills: Skill[] = [
  {
    name: "HTML",
    level: 95,
    color: "#e34c26",
    description: "Semantic markup mastery. Accessibility-first approach.",
    category: "Frontend",
  },
  {
    name: "CSS",
    level: 92,
    color: "#264de4",
    description: "Advanced layouts, animations, and design systems.",
    category: "Frontend",
  },
  {
    name: "JavaScript",
    level: 90,
    color: "#f7df1e",
    description: "ES6+, async programming, DOM manipulation expert.",
    category: "Frontend",
  },
  {
    name: "React",
    level: 88,
    color: "#61dafb",
    description: "Hooks, Context, Redux, Next.js, performance optimization.",
    category: "Frontend",
  },
  {
    name: "Next.js",
    level: 85,
    color: "#ffffff",
    description: "SSR, SSG, API routes, App Router, deployment.",
    category: "Framework",
  },
  {
    name: "TypeScript",
    level: 82,
    color: "#3178c6",
    description: "Type safety, generics, advanced patterns.",
    category: "Language",
  },
  {
    name: "Node.js",
    level: 80,
    color: "#339933",
    description: "REST APIs, Express, real-time applications.",
    category: "Backend",
  },
  {
    name: "Supabase",
    level: 78,
    color: "#3ecf8e",
    description: "PostgreSQL, auth, real-time subscriptions, edge functions.",
    category: "Database",
  },
  {
    name: "Three.js",
    level: 75,
    color: "#ffffff",
    description: "3D web experiences, shaders, WebGL optimization.",
    category: "3D",
  },
  {
    name: "System Design",
    level: 70,
    color: "#00d4ff",
    description: "Architecture, scalability, microservices patterns.",
    category: "Systems",
  },
];

// ─── 3D PLANET COMPONENT ─────────────────────────────────────────
function SkillPlanet({
  skill,
  position,
  onHover,
  onClick,
  isActive,
}: {
  skill: Skill;
  position: [number, number, number];
  onHover: (skill: Skill | null) => void;
  onClick: (skill: Skill) => void;
  isActive: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
    }
    if (glowRef.current) {
      const scale = isActive ? 1.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1 : 1.1;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        {/* Planet Body */}
        <mesh
          ref={meshRef}
          onPointerOver={() => onHover(skill)}
          onPointerOut={() => onHover(null)}
          onClick={() => onClick(skill)}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={skill.color}
            roughness={0.4}
            metalness={0.6}
            emissive={skill.color}
            emissiveIntensity={isActive ? 0.3 : 0.1}
          />
        </mesh>

        {/* Glow */}
        <mesh ref={glowRef} scale={isActive ? 1.3 : 1.1}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color={skill.color}
            transparent
            opacity={isActive ? 0.15 : 0.05}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.4, 1.6, 64]} />
          <meshStandardMaterial
            color={skill.color}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Label */}
        <Html
          position={[0, -1.8, 0]}
          center
          style={{
            color: "white",
            fontSize: "12px",
            fontFamily: "var(--font-space)",
            textAlign: "center",
            pointerEvents: "none",
            textShadow: "0 0 10px rgba(0,0,0,0.8)",
            opacity: isActive ? 1 : 0.7,
            transition: "opacity 0.3s",
          }}
        >
          {skill.name}
        </Html>
      </group>
    </Float>
  );
}

// ─── 3D SCENE ────────────────────────────────────────────────────
function SkillsScene({
  onHover,
  onClick,
  activeSkill,
}: {
  onHover: (skill: Skill | null) => void;
  onClick: (skill: Skill) => void;
  activeSkill: Skill | null;
}) {
  // Arrange planets in a spiral
  const planetPositions: [number, number, number][] = useState(() => {
    const positions: [number, number, number][] = [];
    const count = skills.length;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3 + Math.sin(i * 0.5) * 1.5;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(i * 0.8) * 2;
      const z = Math.sin(angle) * radius;
      positions.push([x, y, z]);
    }
    return positions;
  })[0];

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00a8ff" />

      {skills.map((skill, i) => (
        <SkillPlanet
          key={skill.name}
          skill={skill}
          position={planetPositions[i]}
          onHover={onHover}
          onClick={onClick}
          isActive={activeSkill?.name === skill.name}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────
export function SkillsSection() {
  const [ref, isInView] = useInView<HTMLElement>();
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  return (
    <section id="skills" ref={ref} className="section-base">
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span
            className="text-energy-blue text-sm tracking-[0.3em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Arsenal
          </span>
          <h2
            className="heading-section text-white mb-4"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Skills Universe
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Every technology is a planet in my skill galaxy. Hover to explore, click to discover.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Planet Scene */}
          <motion.div
            className="h-[500px] rounded-3xl overflow-hidden"
            style={{
              background: "radial-gradient(circle at center, rgba(0,212,255,0.03), transparent)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center text-white/30">
                  Loading Galaxy...
                </div>
              }
            >
              <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                <SkillsScene
                  onHover={setHoveredSkill}
                  onClick={setActiveSkill}
                  activeSkill={activeSkill || hoveredSkill}
                />
              </Canvas>
            </Suspense>
          </motion.div>

          {/* Skill Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {activeSkill || hoveredSkill ? (
                <motion.div
                  key={(activeSkill || hoveredSkill)?.name}
                  className="glass-card glow-border p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        background: (activeSkill || hoveredSkill)?.color,
                        boxShadow: `0 0 20px ${(activeSkill || hoveredSkill)?.color}40`,
                      }}
                    />
                    <div>
                      <h3
                        className="text-2xl font-bold text-white"
                        style={{ fontFamily: "var(--font-space)" }}
                      >
                        {(activeSkill || hoveredSkill)?.name}
                      </h3>
                      <span className="text-sm text-white/40">
                        {(activeSkill || hoveredSkill)?.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-white/60 leading-relaxed mb-6">
                    {(activeSkill || hoveredSkill)?.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/50">Proficiency</span>
                      <span className="text-energy-blue font-semibold">
                        {(activeSkill || hoveredSkill)?.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${(activeSkill || hoveredSkill)?.color}, ${(activeSkill || hoveredSkill)?.color}80)`,
                        }}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(activeSkill || hoveredSkill)?.level}%`,
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="glass-card p-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-white/40 text-lg">
                    Hover over a planet to explore its capabilities
                  </p>
                  <p className="text-white/20 text-sm mt-2">
                    Click to lock the selection
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skill List (Mobile/Alternative) */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {skills.map((skill) => (
                <button
                  key={skill.name}
                  onClick={() => setActiveSkill(skill)}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-left ${
                    (activeSkill?.name === skill.name || hoveredSkill?.name === skill.name)
                      ? "bg-white/5 border border-white/10"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      background: skill.color,
                      boxShadow: `0 0 10px ${skill.color}40`,
                    }}
                  />
                  <div>
                    <span className="text-white/80 text-sm font-medium block">
                      {skill.name}
                    </span>
                    <span className="text-white/30 text-xs">{skill.level}%</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
