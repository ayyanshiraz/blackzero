"use client";

import React, { useEffect, Suspense } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import Navbar from "@/components/Navbar";
import TechModel from "@/components/TechModel";
import HeroSection from "@/sections/HeroSection";
import MessageSection from "@/sections/MessageSection";
import ServicesSection from "@/sections/ServicesSection";
import VectorBridge from "@/sections/VectorBridge";
import BenefitSection from "@/sections/BenefitSection";
import TestimonialSection from "@/sections/TestimonialSection";
import FooterSection from "@/sections/FooterSection";

gsap.registerPlugin(ScrollTrigger);

const HomePageClient = () => {
  useEffect(() => {
    gsap.ticker.lagSmoothing(0);
    const onLoad = () => ScrollTrigger.refresh();
    
    if (document.readyState === `complete`) {
      onLoad();
    } else {
      window.addEventListener(`load`, onLoad);
      return () => window.removeEventListener(`load`, onLoad);
    }
  }, []);

  return (
    <ReactLenis root options={{ smoothWheel: true, duration: 1.2 }}>
      <div className={`relative bg-black`}>
        
        <div className={`fixed inset-0 w-full h-full z-0 pointer-events-none`}>
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <Environment preset={`city`} />
            <Suspense fallback={null}>
              <TechModel />
            </Suspense>
          </Canvas>
          <div className={`absolute inset-0 bg-black/60 z-10`}></div>
        </div>

        <main className={`relative z-10`}>
          <Navbar />
          <HeroSection />
          
          <div className={`-mt-[40vh] md:mt-0 relative z-20`}>
            <MessageSection />
          </div>

          <ServicesSection />
          <VectorBridge />
          <BenefitSection />
          <TestimonialSection />
          
        </main>
      </div>
    </ReactLenis>
  );
};

export default HomePageClient;