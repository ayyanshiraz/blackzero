"use client";

import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";

import { SplineSceneBasic } from "../components/ui/demo";
import SplashCursor from "../components/ui/splash-cursor";

const inter = Inter({ subsets: ["latin"], weight: ["400", "900"] });

export default function HeroSection() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const checkScrollPosition = () => {
      if (typeof window !== "undefined") {
        const vh = window.innerHeight;
        if (window.scrollY < vh * 1.0) {
          setIsHeroVisible(true);
        } else {
          setIsHeroVisible(false);
        }
      }
    };

    window.addEventListener("scroll", checkScrollPosition);
    
    checkScrollPosition();

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  return (
    <main className={`relative w-full overflow-clip bg-white ${inter.className}`}>
      <title>Intelligent Systems Architecture</title>
      <meta name="seo-title" content="Intelligent Systems Architecture" />
      <meta name="slug" content="/" />
      <meta name="description" content="Building Intelligent Systems AI and Software" />

      {/* FIX: Removed items-center justify-center, added flex-col */}
      <section className="relative min-h-screen w-full flex flex-col bg-black overflow-hidden">
        
        {isHeroVisible && (
          <div className="fixed inset-0 z-[110] pointer-events-none min-h-screen min-w-full">
            <SplashCursor 
              COLOR_UPDATE_SPEED={10} 
              BACK_COLOR={{ r: 0, g: 0, b: 0 }} 
              SPLAT_RADIUS={0.2}
            />
          </div>
        )}

        {/* FIX: Switched to flex-col and flex-1 so it takes up all available space and pushes content down naturally */}
        <div className="relative z-10 w-full flex-1 pointer-events-none flex flex-col">
          <div className="pointer-events-auto w-full flex-1 flex flex-col">
            <SplineSceneBasic />
          </div>
        </div>
        
      </section>
    </main>
  );
}