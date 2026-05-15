"use client";
import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Service2Model from "../components/Service2Model";
import TechCoreSection from "./TechCoreSection";

const SkillsPhilosophy = () => {
  return (
    // Exactly 200vh tall to hold both the quote and the robot
    <section className="h-[200vh] w-full bg-black text-white font-sans flex flex-col relative overflow-hidden">

      {/* ONE Shared Background Canvas spanning the entire 200vh */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Environment preset="city" />
          <Suspense fallback={null}>
            <Service2Model />
          </Suspense>
        </Canvas>
        <div className="absolute inset-0 bg-black/60 z-10"></div>
      </div>

      {/* Section 1: Philosophy Quote (Top 100vh) */}
      <div className="relative z-20 w-full h-[100vh] px-6 md:px-12 lg:px-16 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl text-center"
        >
          <blockquote className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight">
            “The function of good software is to make the complex appear to be simple.”
          </blockquote>
          <p className="mt-8 text-xl md:text-2xl font-bold uppercase tracking-widest text-white/70">
            — Black Zero IT Solutions
          </p>
        </motion.div>
      </div>

      {/* Section 2: Nutrition Robot (Bottom 100vh) */}
      <div className="relative z-20 w-full h-[100vh]">
        <TechCoreSection />
      </div>

    </section>
  );
};

export default SkillsPhilosophy;