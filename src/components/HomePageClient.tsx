"use client";

import React, { useState, useCallback, useEffect } from "react";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";
import MessageSection from "@/sections/MessageSection";
import ServicesSection from "@/sections/ServicesSection";
import BenefitSection from "@/sections/BenefitSection";

gsap.registerPlugin(ScrollTrigger);

const HomePageClient = () => {
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
    // Re-calculate ScrollTrigger positions after preloader slide-out
    // Small timeout to let the DOM settle after the preloader unmounts
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 80);
  }, []);

  useEffect(() => {
    // Keep GSAP ticker perfectly in sync – zero lag smoothing means no frame
    // debt accumulation that causes jank on lower-end machines
    gsap.ticker.lagSmoothing(0);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        smoothWheel: true,
        // 0.9 feels snappy on Windows and natural on Mac trackpads
        duration: 0.9,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        // Prevent Lenis from running while the preloader is blocking scroll
        prevent: () => !preloaderDone,
      }}
    >
      <div className="relative bg-white">
        <Preloader onComplete={handlePreloaderComplete} />

        <main className="relative z-10">
          <Navbar />
          <HeroSection />

          <div className="-mt-[40vh] md:mt-0 relative z-20">
            <MessageSection />
          </div>

          <ServicesSection />
          <BenefitSection />
        </main>
      </div>
    </ReactLenis>
  );
};

export default HomePageClient;
