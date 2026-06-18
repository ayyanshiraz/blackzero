"use client";
import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import TechModel from "@/components/TechModel";

const SkillsPhilosophy = () => {
  return (
    <section className={`min-h-screen w-full bg-transparent text-white font-sans flex flex-col relative overflow-hidden z-30`}>

      <div className={`absolute inset-0 w-full h-full z-0 pointer-events-none`}>
        <Canvas gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 10, 5]} intensity={1.0} />
          <Suspense fallback={null}>
            <TechModel />
          </Suspense>
        </Canvas>
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10`} />
      </div>

      <div className={`relative z-20 w-full h-full min-h-screen px-6 md:px-12 lg:px-16 flex justify-center items-center`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`max-w-6xl text-center`}
        >
          <blockquote className={`text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight`}>
            The function of good software is to make the complex appear to be simple.
          </blockquote>
          <p className={`mt-8 text-xl md:text-2xl font-bold uppercase tracking-widest text-white/70`}>
            — Black Zero IT Solutions
          </p>
        </motion.div>
      </div>

    </section>
  );
};

export default SkillsPhilosophy;