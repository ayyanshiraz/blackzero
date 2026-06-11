"use client";

import React, { useEffect, useRef, useCallback, useState, useMemo, Suspense } from "react";
import { useLenis } from "lenis/react";
import SplashCursor from "../components/ui/splash-cursor";
import Link from "next/link";
import { motion } from "framer-motion";

// Three.js / React Three Fiber Imports
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const services = [
  { id: `01`, title: `AI and Software Hub`, subtitle: `Intelligent Execution`, desc: `Building Intelligent Systems for Tomorrow. AI-Powered Software, Built for Growth. From Idea to Intelligent Execution.`, cta: `Explore Service`, link: `/services/ai-software-hub`, color: `#00f2fe, #4facfe, #7000ff` },
  { id: `02`, title: `Data Analytics`, subtitle: `Unlock Your Data`, desc: `Unlock the power of your data. We provide comprehensive analytics to help you make informed decisions for sustainable growth.`, cta: `Explore Service`, link: `/services/data-analytics`, color: `#00f2fe, #4facfe, #7000ff` },
  { id: `03`, title: `Advanced Portals`, subtitle: `Scalable Platforms`, desc: `Custom Websites, 3D Experiences and Scalable Portals. We Build Interactive Web and 3D Digital Platforms.`, cta: `Explore Service`, link: `/services/advanced-websites`, color: `#00f2fe, #4facfe, #7000ff` },
  { id: `04`, title: `Hybrid SEO Services`, subtitle: `Traditional + AI`, desc: `Traditional SEO Meets AI-Powered Growth. Rank Higher with Smart SEO and AI. Data-Driven SEO for the Modern Web.`, cta: `Explore Service`, link: `/services/hybrid-seo`, color: `#00f2fe, #4facfe, #7000ff` },
  { id: `05`, title: `Marketing`, subtitle: `Data-Driven Strategy`, desc: `Data driven ads of all sorts across every platform. We create data-driven strategies that build brand awareness.`, cta: `Explore Service`, link: `/services/marketing`, color: `#00f2fe, #4facfe, #7000ff` },
  { id: `06`, title: `Animation Studio`, subtitle: `Visual Stories`, desc: `Bringing Ideas to Life in 2D and 3D. Creative Designs. Stunning Animations. From Graphics to Motion We Create It All.`, cta: `Explore Service`, link: `/services/creative-design-and-animation-studio`, color: `#00f2fe, #4facfe, #7000ff` },
];

const BASE_CONFIG = {
  itemDistance: 100, itemScale: 0.015, itemStackDistance: 18,
  stackPosition: 0.08, scaleEndPosition: 0.05, baseScale: 0.92,
};

// 3D background model sub-component
const TechModel = () => {
  const { scene } = useGLTF("/bg-tech.glb");
  const { viewport } = useThree();
  
  const modelRef = useRef();
  const copiedScene = useMemo(() => scene.clone(), [scene]);
  
  const isMobile = viewport.width < viewport.height;
  const responsiveScale = isMobile ? viewport.height * 0.35 : viewport.width * 0.2; 

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.15;
      const scrollOffset = window.scrollY;
      
      modelRef.current.position.y = (scrollOffset * 0.002) % 6 - 3; 
      modelRef.current.rotation.z = scrollOffset * 0.0005; 
    }
  });

  return (
    <primitive 
      ref={modelRef}
      object={copiedScene} 
      scale={responsiveScale} 
      position={[0, 0, 0]} 
    />
  );
};

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const cardOffsetsRef = useRef([]);
  const endOffsetRef = useRef(0);
  const stackInnerRef = useRef(null);
  const stackInnerTopRef = useRef(0);
  
  const voidContainerRef = useRef(null);
  const wheelContainerRef = useRef(null);
  const kineticWheelRef = useRef(null);
  const bgCanvasRef = useRef(null);
  
  // Ref for the philosophy section to track when it ends
  const philosophyRef = useRef(null);
  const philosophyEndRef = useRef(0);

  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener(`resize`, checkMobile);
    return () => window.removeEventListener(`resize`, checkMobile);
  }, []);

  useLenis(({ scroll }) => {
    if (!ready) return;

    const cards = cardsRef.current;
    const cardOffsets = cardOffsetsRef.current;
    const endElementTop = endOffsetRef.current;
    const stackInnerTop = stackInnerTopRef.current;
    const containerHeight = window.innerHeight;

    if (!cards.length || !cardOffsets.length) return;

    const firstCardHeight = cards[0].offsetHeight;
    const stackPositionPx = (containerHeight - firstCardHeight) / 2;
    const scaleEndPositionPx = stackPositionPx - (BASE_CONFIG.stackPosition - BASE_CONFIG.scaleEndPosition) * containerHeight;

    const lastCardTop = cardOffsets[cards.length - 1];
    const triggerEndLast = lastCardTop - scaleEndPositionPx;
    const voidStart = triggerEndLast;
    
    const runwayHeight = isMobile ? containerHeight * 1.0 : containerHeight * 1.2;
    const voidDistance = runwayHeight;
    
    let voidProgress = 0;

    if (scroll > voidStart) {
      voidProgress = Math.min(Math.max((scroll - voidStart) / voidDistance, 0), 1);
    }

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardTop = cardOffsets[i];
      const triggerStart = cardTop - stackPositionPx - BASE_CONFIG.itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = Math.max(endElementTop - containerHeight * 0.5, voidStart + voidDistance);

      let scaleProgress = 0;
      if (scroll >= triggerEnd) scaleProgress = 1;
      else if (scroll > triggerStart) scaleProgress = (scroll - triggerStart) / (triggerEnd - triggerStart);

      const targetScale = BASE_CONFIG.baseScale + i * BASE_CONFIG.itemScale;
      const scale = Number((1 - scaleProgress * (1 - targetScale)).toFixed(4));

      let translateY = 0;
      if (scroll >= pinStart && scroll <= pinEnd) translateY = scroll - cardTop + stackPositionPx + BASE_CONFIG.itemStackDistance * i;
      else if (scroll > pinEnd) translateY = pinEnd - cardTop + stackPositionPx + BASE_CONFIG.itemStackDistance * i;
    }

    const voidContainer = voidContainerRef.current;
    const stackInner = stackInnerRef.current;

    if (voidContainer && stackInner) {
      const originY = scroll + containerHeight / 2 - stackInnerTop;
      stackInner.style.perspectiveOrigin = `50% ${originY}px`;
      stackInner.style.perspective = `1500px`;

      if (voidProgress > 0) {
        if (isMobile) {
          const fadeOutProgress = Math.min(voidProgress / 0.25, 1);
          voidContainer.style.transformOrigin = `50% ${originY}px`;
          voidContainer.style.transform = `translate3d(0, 0, 0) scale(1)`;
          voidContainer.style.opacity = Math.max(0, 1 - fadeOutProgress).toFixed(3);
          voidContainer.style.visibility = fadeOutProgress >= 1 ? `hidden` : `visible`;
        } else {
          const easeScale = Math.pow(voidProgress, 1.5);
          const currentZ = -easeScale * 3000;
          const currentScale = 1 - easeScale;
          const currentOpacity = 1 - Math.pow(voidProgress, 2.5);

          voidContainer.style.transformOrigin = `50% ${originY}px`;
          voidContainer.style.transform = `translate3d(0, 0, ${currentZ}px) scale(${Math.max(0, currentScale).toFixed(4)})`;
          voidContainer.style.opacity = Math.max(0, currentOpacity).toFixed(3);
          voidContainer.style.visibility = voidProgress >= 1 ? `hidden` : `visible`;
        }
      } else {
        voidContainer.style.transformOrigin = ``;
        voidContainer.style.transform = ``;
        voidContainer.style.opacity = `1`;
        voidContainer.style.visibility = `visible`;
      }
    }

    const wheelContainer = wheelContainerRef.current;
    const kineticWheel = kineticWheelRef.current;
    const bgCanvas = bgCanvasRef.current;
    
    if (wheelContainer && kineticWheel && bgCanvas) {
      if (voidProgress > 0) {
        
        // 1. Calculate base fade in for the shared global Canvas
        let canvasOpacity = Math.min(voidProgress * 4, 1);

        // FADE OUT LOGIC: Fade out when leaving the philosophy section
        const pEnd = philosophyEndRef.current;
        const fadeOutStart = pEnd - containerHeight; 
        const fadeOutDistance = containerHeight * 0.6;

        if (scroll > fadeOutStart) {
             const exitFade = Math.min(Math.max((scroll - fadeOutStart) / fadeOutDistance, 0), 1);
             canvasOpacity = canvasOpacity * (1 - exitFade);
        }

        // Apply final opacity to the global canvas
        bgCanvas.style.opacity = canvasOpacity.toFixed(3);
        bgCanvas.style.visibility = canvasOpacity > 0 ? `visible` : `hidden`;

        // 2. Handle Kinetic Wheel text overlay logic separately
        let wheelOpacity = Math.min(voidProgress * 4, 1);
        
        if (scroll > endElementTop + containerHeight * 0.4) {
            const fadeOut = (scroll - (endElementTop + containerHeight * 0.4)) / (containerHeight * 0.6);
            wheelOpacity = Math.max(0, 1 - fadeOut);
        }

        wheelContainer.style.display = wheelOpacity <= 0 ? `none` : `block`;
        wheelContainer.style.visibility = wheelOpacity <= 0 ? `hidden` : `visible`;
        wheelContainer.style.opacity = wheelOpacity.toFixed(3);
        
        const targetRotation = 180 * (1 - voidProgress);
        kineticWheel.style.transformOrigin = `50% 100%`;
        kineticWheel.style.transform = `rotate(${targetRotation}deg)`;

      } else {
        wheelContainer.style.display = `block`;
        wheelContainer.style.opacity = `0`;
        wheelContainer.style.visibility = `hidden`;
        
        bgCanvas.style.opacity = `0`;
        bgCanvas.style.visibility = `hidden`;
      }
    }
  });

  const calculatePositions = useCallback(() => {
    setReady(false);
    const cards = Array.from(document.querySelectorAll(`.scroll-stack-card`));
    cardsRef.current = cards;
    cards.forEach(card => card.style.transform = ``);
    if (voidContainerRef.current) voidContainerRef.current.style.transform = ``;
    if (kineticWheelRef.current) kineticWheelRef.current.style.transform = ``;
    
    const scrollY = window.scrollY;
    cardOffsetsRef.current = cards.map(card => card.getBoundingClientRect().top + scrollY);
    
    const endElement = document.querySelector(`.scroll-stack-end`);
    if (endElement) endOffsetRef.current = endElement.getBoundingClientRect().top + scrollY;
    if (stackInnerRef.current) stackInnerTopRef.current = stackInnerRef.current.getBoundingClientRect().top + scrollY;
    
    // Calculate the end boundary of the Philosophy section
    if (philosophyRef.current) {
        philosophyEndRef.current = philosophyRef.current.getBoundingClientRect().bottom + scrollY;
    }

    setReady(true);
  }, []);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (i < cardsRef.current.length - 1) card.style.marginBottom = `${BASE_CONFIG.itemDistance}px`;
      card.style.willChange = `transform`;
      card.style.transformOrigin = `top center`;
    });
    calculatePositions();
    window.addEventListener(`resize`, calculatePositions);
    return () => window.removeEventListener(`resize`, calculatePositions);
  }, [calculatePositions]);

  return (
    <div className={`relative w-full bg-transparent`}>
      
      <style>{`
        @keyframes custom-star-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* GLOBAL BACKGROUND CANVAS */}
      <div 
        ref={bgCanvasRef} 
        className={`fixed inset-0 z-0 pointer-events-none`} 
        style={{ opacity: 0, visibility: `hidden`, transition: `opacity 0.3s ease-out` }}
      >
        <Canvas gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 10, 5]} intensity={1.0} />
          <Suspense fallback={null}>
            <TechModel />
          </Suspense>
        </Canvas>
      </div>

      {/* Global Splash Cursor */}
      <div className={`fixed inset-0 pointer-events-none z-10`}>
        <div className={`hidden lg:block absolute inset-0 w-full h-full`}>
          <SplashCursor />
        </div>
      </div>

      {/* =========================================
          SECTION 1: SERVICES
          ========================================= */}
      <section id={`services`} ref={sectionRef} className={`relative z-20 min-h-screen w-full -mt-[15vh] md:mt-0`}>
        <div className={`w-full h-[12vh] md:h-[30vh] lg:h-[60vh] bg-[#f6f7f8] overflow-hidden flex items-center relative z-10 mb-4 md:mb-12`}>
          <div className={`marquee-services`}>
            
            {/* Added animation duration and willChange here */}
            <div 
              className={`marquee-services__track`} 
              style={{ 
                animationDuration: `45s`, 
                willChange: `transform` 
              }}
            >
              {[0, 1, 2, 3].map((blockIndex) => (
                <div key={blockIndex} className={`marquee-services__segment`} aria-hidden={blockIndex > 0 ? `true` : undefined}>
                  <span className={`marquee-services__text text-black font-bold`} style={{ fontFamily: `Arial, sans-serif`, fontSize: `clamp(1.5rem, 3vw, 3rem)` }}>Advancing Ideas With Superior Technology</span>
                  <span className={`marquee-services__dash text-black font-bold`} style={{ fontFamily: `Arial, sans-serif`, fontSize: `clamp(1.5rem, 3vw, 3rem)` }}>—</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={stackInnerRef} className={`px-4 md:px-12 w-full`} style={{ transformStyle: `preserve-3d` }}>
          <div ref={voidContainerRef} className={`void-container relative w-full flex flex-col items-center justify-center`} style={{ willChange: `transform, opacity`, transformStyle: `preserve-3d` }}>
            
            {services.map((service) => (
              <div key={service.id} className={`scroll-stack-card relative w-[95%] md:w-[85%] max-w-[1200px] mb-12 origin-top rounded-[60px] group`}>
                <Link href={service.link} className={`absolute inset-0 z-30 rounded-[60px]`} aria-label={service.title} />

                <div 
                  className={`absolute inset-0 z-20 pointer-events-none`}
                  style={{
                    borderRadius: `60px`, padding: `2px`, 
                    WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`, mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
                    WebkitMaskComposite: `xor`, maskComposite: `exclude`, overflow: `hidden`
                  }}
                >
                  <div className={`absolute w-[200%] h-[200%] top-[-50%] left-[-50%]`} style={{ background: `conic-gradient(from 0deg, transparent, ${service.color}, transparent)`, animation: `custom-star-rotate 8s linear infinite`, filter: `blur(4px)` }} />
                </div>

                <div className={`relative z-10 w-full h-full min-h-[250px] md:min-h-[350px] rounded-[58px] bg-black backdrop-blur-xl border border-white/10 p-6 md:p-10 flex flex-col hover:bg-white/5 transition-colors duration-500`}>
                  <div className={`flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-8 gap-6`}>
                    <div className={`flex items-center gap-6`}>
                      <span className={`text-white text-5xl md:text-7xl font-black font-sans leading-none tracking-tighter drop-shadow-lg`}>{service.id}</span>
                      <div className={`flex flex-col`}>
                        <span className={`text-white text-xl md:text-3xl font-bold uppercase drop-shadow-md`}>{service.title}</span>
                        <span className={`text-gray-300 text-sm md:text-lg font-medium`}>{service.subtitle}</span>
                      </div>
                    </div>
                    
                    <div className={`shrink-0 cursor-pointer hover:scale-105 transition-transform bg-white rounded-full shadow-lg flex items-center justify-center relative z-40`}>
                      <span className={`px-6 py-3 text-xs md:text-sm font-bold uppercase text-black block tracking-widest`} style={{ fontFamily: "Arial, sans-serif" }}>{service.cta}</span>
                    </div>
                  </div>

                  <div className={`flex-1 flex items-center justify-start py-4 mt-auto`}>
                    <p className={`text-white/90 text-xl md:text-3xl leading-relaxed font-sans font-light max-w-4xl drop-shadow-md`}>{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`scroll-stack-end pointer-events-none w-full opacity-0`} style={{ height: isMobile ? `100vh` : `120vh` }} />
        </div>

        {/* KINETIC WHEEL (SVG ONLY) */}
        <div ref={wheelContainerRef} className={`wheel-container pointer-events-none`} style={{
          position: `fixed`, bottom: isMobile ? `-2vh` : `-18vh`, left: `50%`, width: isMobile ? `250vw` : `100vw`, marginLeft: isMobile ? `-125vw` : `-50vw`,
          zIndex: 10, visibility: `hidden`, opacity: 0, willChange: `opacity`,
        }}>
            <div ref={kineticWheelRef} className={`relative z-10 w-full h-full`} style={{ willChange: `transform` }}>
              <svg viewBox={`0 0 3000 1500`} className={`w-full h-auto`} style={{ overflow: `visible`, display: `block` }}>
                <path id={`arc-path`} d={`M 400,1500 A 1100,1100 0 0,1 2600,1500`} fill={`none`} stroke={`none`} />
                {[
                  { text: `ANALYZE`, offset: `15%` }, { text: `●`, offset: `27%` },
                  { text: `DESIGN`, offset: `38%` }, { text: `●`, offset: `50%` },
                  { text: `BUILD`, offset: `62%` }, { text: `●`, offset: `73%` },
                  { text: `DELIVER`, offset: `85%` },
                ].map((item, i) => (
                  <text key={i} fill={`#FFFFFF`} style={{ fontFamily: `sans-serif`, fontWeight: 800, fontSize: item.text === `●` ? `50px` : `100px`, textTransform: `uppercase` }} dy={item.text === `●` ? `-18` : `0`}>
                    <textPath href={`#arc-path`} startOffset={item.offset} textAnchor={`middle`}>{item.text}</textPath>
                  </text>
                ))}
              </svg>
            </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: SKILLS PHILOSOPHY
          ========================================= */}
      <section ref={philosophyRef} className={`min-h-[100vh] w-full bg-transparent text-white font-sans flex flex-col relative overflow-hidden z-30`}>
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10 pointer-events-none`} />
        
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

    </div>
  );
};

export default ServicesSection;