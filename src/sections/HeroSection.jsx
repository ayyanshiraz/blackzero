"use client";

import React, { useEffect, useState, useRef } from "react";
import { Inter } from "next/font/google";
import { SplineSceneBasic } from "../components/ui/demo";
import SplashCursor from "../components/ui/splash-cursor";

// Fixed the font loader literals to use double quotes
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
    
    // Disconnect the observer when the component unmounts
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative w-full overflow-clip bg-white">
      <section
        ref={sectionRef}
        // Strict h-[100svh] to lock the layout height and prevent scrolling/stretching
        className="relative h-[100svh] w-full flex flex-col bg-black overflow-hidden"
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

        <div className="relative z-10 w-full h-full pointer-events-none flex flex-col">
          <div className="pointer-events-auto w-full h-full flex flex-col">
            <SplineSceneBasic />
          </div>
        </div>
      </section>
    </main>
  );
}