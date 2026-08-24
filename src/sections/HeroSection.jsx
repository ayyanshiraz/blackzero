"use client";

import React, { useEffect, useState, useRef } from "react";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import SplashCursor from "../components/ui/splash-cursor";

// Dynamically import SplineSceneBasic and completely disable SSR for it
const SplineSceneBasic = dynamic(
  () => import("../components/ui/demo").then((mod) => mod.SplineSceneBasic),
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"], weight: ["400", "900"] });

export default function HeroSection() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(sectionRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative w-full overflow-clip bg-white">
      <section
        ref={sectionRef}
        className="relative min-h-[100svh] md:h-[100svh] w-full flex flex-col bg-black overflow-hidden"
      >
        {isHeroVisible && (
          <div className="fixed inset-0 z-[110] pointer-events-none h-[100svh] min-w-full">
            <SplashCursor
              COLOR_UPDATE_SPEED={10}
              BACK_COLOR={{ r: 0, g: 0, b: 0 }}
              SPLAT_RADIUS={0.2}
            />
          </div>
        )}

        {/* MODIFIED: Changed h-full to min-h-full flex-1 so these wrappers grow on mobile */}
        <div className="relative z-10 w-full min-h-full flex-1 pointer-events-none flex flex-col">
          <div className="pointer-events-auto w-full min-h-full flex-1 flex flex-col">
            <SplineSceneBasic />
          </div>
        </div>
      </section>
    </main>
  );
}