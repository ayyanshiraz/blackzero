import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import MessageSection from "./sections/MessageSection";
import ServicesSection from "./sections/ServicesSection";
import TechCoreSection from "./sections/TechCoreSection";
import BenefitSection from "./sections/BenefitSection";
import TestimonialSection from "./sections/TestimonialSection";
import FooterSection from "./sections/FooterSection";
import { useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import TechModel from "./components/TechModel";
import VectorBridge from "./sections/VectorBridge";


// 1. IMPORT LENIS HERE
import { ReactLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
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
    // 2. WRAP THE ENTIRE APP IN <ReactLenis>
    <ReactLenis root options={{ smoothWheel: true, duration: 1.2 }}>
      <div className="relative bg-black">
        
        {/* Global Fixed 3D Background */}
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <Environment preset="city" />
            <Suspense fallback={null}>
              <TechModel />
            </Suspense>
          </Canvas>
          <div className="absolute inset-0 bg-black/60 z-10"></div>
        </div>

        {/* Main Content */}
        <main className="relative z-10">
          <NavBar />
          <HeroSection />
          <MessageSection />
          
          {/* Your new Stacking Section */}
          <ServicesSection />
          <VectorBridge />
          
         {/* <NutritionSection /> */}
          <BenefitSection />
          <TestimonialSection />
          <FooterSection />
        </main>
      </div>
    </ReactLenis>
  );
};

export default App;