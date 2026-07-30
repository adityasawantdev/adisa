"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

// Dynamic imports for heavy components
const SpaceScene = dynamic(
  () => import("@/components/3d/SpaceScene").then((mod) => mod.SpaceScene),
  { ssr: false, loading: () => <div className="fixed inset-0 bg-space-900" /> }
);

const CustomCursor = dynamic(
  () => import("@/components/CustomCursor").then((mod) => mod.CustomCursor),
  { ssr: false }
);

// Static imports for lighter components
import { LoadingScreen } from "@/components/LoadingScreen";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SpaceNavbar } from "@/components/SpaceNavbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Custom Cursor */}
      {isMounted && <CustomCursor />}

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* 3D Space Background */}
      {isMounted && !isLoading && <SpaceScene />}

      {/* Space HUD Navbar */}
      <SpaceNavbar />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <JourneySection />
        <StatsSection />
        <ContactSection />
        <Footer />
      </main>

      {/* Noise Overlay for texture */}
      <div className="noise-overlay" />
    </>
  );
}
