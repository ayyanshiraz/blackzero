"use client";

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

export function SplineSceneBasic() {
  const wipeIn: Variants = {
    hidden: { clipPath: `inset(0 100% 0 0)`, opacity: 0, x: -20 },
    show: { 
      clipPath: `inset(0 0% 0 0)`, 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
      } 
    }
  };

  const slideUp: Variants = {
    hidden: { opacity: 0, y: 40, filter: `blur(8px)` },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: `blur(0px)`,
      transition: { duration: 1.2, ease: `circOut` } 
    }
  };

  return (
    <Card className={`w-full min-h-full bg-transparent relative overflow-hidden border-none rounded-none flex flex-col`}>
      <div className={`flex flex-col md:flex-row flex-1 w-full max-w-[1920px] mx-auto min-h-full`}>
        
        {/* Left content (Text) */}
        {/* MODIFIED: Replaced min-h-[60svh] with h-auto and adjusted padding so the wrapper tightly hugs the button on mobile */}
        <div className={`w-full h-auto px-6 pb-8 md:pb-6 md:h-full md:flex-1 pt-32 md:pt-48 lg:pt-64 xl:pt-37 md:pl-16 lg:pl-24 relative z-10 flex flex-col justify-start pointer-events-none order-1`}>
          
          <div className={`flex flex-col items-start w-full`}>
            <motion.h1 
              variants={wipeIn}
              initial={`hidden`}
              animate={`show`}
              className={`relative z-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.85] tracking-tighter text-white`}
              style={{ 
                transform: `scaleY(1.15)`, 
                transformOrigin: `bottom left`,
                textShadow: `0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4)` 
              }}
            >
              Building Intelligent Systems
            </motion.h1>
            
            <motion.div 
              variants={wipeIn}
              initial={`hidden`}
              animate={`show`}
              transition={{ delay: 0.2 }}
              className={`relative z-20 mt-4 md:mt-6 transform -rotate-[3deg] border-[4px] md:border-[8px] border-white px-3 py-1 md:px-6 md:py-1 bg-transparent`}
            >
              <h1 
                className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tight text-white whitespace-nowrap`}
                style={{ transform: `scaleY(1.15)`, transformOrigin: `bottom left` }}
              >
                AI + Software
              </h1>
            </motion.div>

            <motion.p
              variants={slideUp}
              initial={`hidden`}
              animate={`show`}
              transition={{ delay: 0.5 }}
              className={`mt-6 md:mt-12 text-white/90 font-serif text-base sm:text-lg md:text-xl lg:text-2xl max-w-lg leading-relaxed`}
            >
              Unlock the power of your data with advanced web systems and scalable portals.
            </motion.p>

            <motion.div
              variants={slideUp}
              initial={`hidden`}
              animate={`show`}
              transition={{ delay: 0.7 }}
              className={`mt-8 md:mt-10 pointer-events-auto w-full sm:w-auto`}
            >
              <Link 
                href={`/services`}
                className={`inline-block text-center w-full sm:w-auto bg-white text-black font-bold uppercase tracking-widest px-8 md:px-10 py-4 rounded-full text-sm md:text-base hover:scale-105 hover:bg-gray-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]`}
              >
                Explore Services
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right content (3D Robot) */}
        {/* MODIFIED: Added a subtle negative top margin (-mt-4) to pull the scene up slightly closer to the button */}
        <div className={`w-full flex-none h-[100svh] -mt-4 md:mt-0 md:h-full relative md:flex-1 pointer-events-auto order-2 overflow-hidden flex items-center justify-center`}>
          <div className={`absolute inset-0 w-full h-full flex items-center justify-center`}>
            <SplineScene 
              scene={`https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode`}
              className={`w-full h-full`}
            />
          </div>
        </div>
        
      </div>
    </Card>
  );
}