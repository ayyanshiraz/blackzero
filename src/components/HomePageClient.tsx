"use client";

import React, { useEffect } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";
import MessageSection from "@/sections/MessageSection";
import ServicesSection from "@/sections/ServicesSection";
import BenefitSection from "@/sections/BenefitSection";


gsap.registerPlugin(ScrollTrigger);

const HomePageClient = () => {
  useEffect(() => {
    // Keep GSAP and Lenis perfectly synced
    gsap.ticker.lagSmoothing(0);
    const onLoad = () => ScrollTrigger.refresh();
    
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  return (
    <ReactLenis root options={{ smoothWheel: true, duration: 1.2 }}>
      <div className="relative bg-white">
        <Preloader />
{/* Main Content */}
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