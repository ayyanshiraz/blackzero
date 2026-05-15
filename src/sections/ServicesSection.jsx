"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { useLenis } from "lenis/react";
import StarBorder from "../components/StarBorder";
import SplashCursor from "../components/SplashCursor";

const services = [
  { id: "01", title: "AI and Software Hub", subtitle: "Intelligent Execution", desc: "Building Intelligent Systems for Tomorrow. AI-Powered Software, Built for Growth. From Idea to Intelligent Execution.", cta: "Explore Service", color: "#00f2fe, #4facfe, #7000ff" },
  { id: "02", title: "Data Analytics", subtitle: "Unlock Your Data", desc: "Unlock the power of your data. We provide comprehensive analytics to help you make informed decisions for sustainable growth.", cta: "Explore Service", color: "#00f2fe, #4facfe, #7000ff" },
  { id: "03", title: "Advanced Portals", subtitle: "Scalable Platforms", desc: "Custom Websites, 3D Experiences and Scalable Portals. We Build Interactive Web and 3D Digital Platforms.", cta: "Explore Service", color: "#00f2fe, #4facfe, #7000ff" },
  { id: "04", title: "Hybrid SEO Services", subtitle: "Traditional + AI", desc: "Traditional SEO Meets AI-Powered Growth. Rank Higher with Smart SEO and AI. Data-Driven SEO for the Modern Web.", cta: "Explore Service", color: "#00f2fe, #4facfe, #7000ff" },
  { id: "05", title: "Marketing", subtitle: "Data-Driven Strategy", desc: "Data driven ads of all sorts across every platform. We create data-driven strategies that build brand awareness.", cta: "Explore Service", color: "#00f2fe, #4facfe, #7000ff" },
  { id: "06", title: "Animation Studio", subtitle: "Visual Stories", desc: "Bringing Ideas to Life in 2D and 3D. Creative Designs. Stunning Animations. From Graphics to Motion We Create It All.", cta: "Explore Service", color: "#00f2fe, #4facfe, #7000ff" },
];

const BASE_CONFIG = {
  itemDistance: 100, itemScale: 0.015, itemStackDistance: 18,
  stackPosition: 0.08, scaleEndPosition: 0.05, baseScale: 0.92,
};

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const cardOffsetsRef = useRef([]);
  const endOffsetRef = useRef(0);
  const stackInnerRef = useRef(null);
  const stackInnerTopRef = useRef(0);
  
  const voidContainerRef = useRef(null);
  const kineticWheelRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
    
    // FIX 1: Sync the animation distance with the physical runway gap
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
      stackInner.style.perspective = "1500px";

      if (voidProgress > 0) {
        if (isMobile) {
          const fadeOutProgress = Math.min(voidProgress / 0.25, 1);
          voidContainer.style.transformOrigin = `50% ${originY}px`;
          voidContainer.style.transform = "translate3d(0, 0, 0) scale(1)";
          voidContainer.style.opacity = Math.max(0, 1 - fadeOutProgress).toFixed(3);
          voidContainer.style.visibility = fadeOutProgress >= 1 ? "hidden" : "visible";
        } else {
          const easeScale = Math.pow(voidProgress, 1.5);
          const currentZ = -easeScale * 3000;
          const currentScale = 1 - easeScale;
          const currentOpacity = 1 - Math.pow(voidProgress, 2.5);

          voidContainer.style.transformOrigin = `50% ${originY}px`;
          voidContainer.style.transform = `translate3d(0, 0, ${currentZ}px) scale(${Math.max(0, currentScale).toFixed(4)})`;
          voidContainer.style.opacity = Math.max(0, currentOpacity).toFixed(3);
          voidContainer.style.visibility = voidProgress >= 1 ? "hidden" : "visible";
        }
      } else {
        voidContainer.style.transformOrigin = "";
        voidContainer.style.transform = "";
        voidContainer.style.opacity = "1";
        voidContainer.style.visibility = "visible";
      }
    }

    const kineticWheel = kineticWheelRef.current;
    if (kineticWheel) {
      // FIX 2: Hide the wheel just after the box takes over the screen
      if (scroll > endElementTop + (isMobile ? containerHeight * 1.1 : containerHeight * 1.4)) {
        kineticWheel.style.display = "none";
        kineticWheel.style.visibility = "hidden";
      } else if (voidProgress > 0) {
        kineticWheel.style.display = "block";
        kineticWheel.style.visibility = "visible";

        let wheelOpacity = Math.min(voidProgress * 4, 1);

        // FIX 3: Smoothly fade out the Text Arc on mobile just as the black VectorBridge box 
        // hits the center of the screen, preventing any ugly text overlaps!
        if (isMobile && scroll > endElementTop + containerHeight * 0.4) {
            const fadeOut = (scroll - (endElementTop + containerHeight * 0.4)) / (containerHeight * 0.6);
            wheelOpacity = Math.max(0, 1 - fadeOut);
        }

        kineticWheel.style.opacity = wheelOpacity.toFixed(3);
        const targetRotation = 180 * (1 - voidProgress);
        kineticWheel.style.transformOrigin = "50% 100%";
        kineticWheel.style.transform = `rotate(${targetRotation}deg)`;

      } else {
        kineticWheel.style.display = "block";
        kineticWheel.style.opacity = "0";
        kineticWheel.style.visibility = "hidden";
      }
    }
  });

  const calculatePositions = useCallback(() => {
    setReady(false);
    const cards = Array.from(document.querySelectorAll(".scroll-stack-card"));
    cardsRef.current = cards;
    cards.forEach(card => card.style.transform = "");
    if (voidContainerRef.current) voidContainerRef.current.style.transform = "";
    if (kineticWheelRef.current) kineticWheelRef.current.style.transform = "";
    
    const scrollY = window.scrollY;
    cardOffsetsRef.current = cards.map(card => card.getBoundingClientRect().top + scrollY);
    
    const endElement = document.querySelector(".scroll-stack-end");
    if (endElement) endOffsetRef.current = endElement.getBoundingClientRect().top + scrollY;
    if (stackInnerRef.current) stackInnerTopRef.current = stackInnerRef.current.getBoundingClientRect().top + scrollY;
    
    setReady(true);
  }, []);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (i < cardsRef.current.length - 1) card.style.marginBottom = `${BASE_CONFIG.itemDistance}px`;
      card.style.willChange = "transform";
      card.style.transformOrigin = "top center";
    });
    calculatePositions();
    window.addEventListener("resize", calculatePositions);
    return () => window.removeEventListener("resize", calculatePositions);
  }, [calculatePositions]);

  return (
    <section id="services" ref={sectionRef} className="bg-transparent min-h-screen w-full relative z-20 -mt-[15vh] md:mt-0">
      
      <style>{`
        @keyframes custom-star-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="hidden lg:block w-full h-full">
          <SplashCursor />
        </div>
      </div>

      <div className="relative z-10 w-full h-full">
        <div className="w-full h-[12vh] md:h-[30vh] lg:h-[60vh] overflow-hidden flex items-center relative z-10 mb-4 md:mb-12">
          <div className="marquee-services">
            <div className="marquee-services__track">
              {[0, 1, 2, 3].map((blockIndex) => (
                <div key={blockIndex} className="marquee-services__segment" aria-hidden={blockIndex > 0 ? "true" : undefined}>
                  <span className="marquee-services__text text-white">Tech Solutions</span>
                  <span className="marquee-services__dash text-white">—</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={stackInnerRef} className="px-4 md:px-12 w-full" style={{ transformStyle: "preserve-3d" }}>
          <div ref={voidContainerRef} className="void-container relative w-full flex flex-col items-center justify-center" style={{ willChange: "transform, opacity", transformStyle: "preserve-3d" }}>
            
            {services.map((service) => (
              <div 
                key={service.id} 
                className="scroll-stack-card relative w-[95%] md:w-[85%] max-w-[1200px] mb-12 origin-top rounded-[60px]"
              >
                <div 
                  className="absolute inset-0 z-0 pointer-events-none"
                  style={{
                    borderRadius: '60px',
                    padding: '2px', 
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    overflow: 'hidden'
                  }}
                >
                  <div 
                    className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%]"
                    style={{
                      background: `conic-gradient(from 0deg, transparent, ${service.color}, transparent)`,
                      animation: 'custom-star-rotate 8s linear infinite',
                      filter: 'blur(4px)'
                    }}
                  />
                </div>

                <div className="relative z-10 w-full h-full min-h-[250px] md:min-h-[350px] rounded-[58px] bg-black/20 backdrop-blur-xl border border-white/5 p-6 md:p-10 flex flex-col">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-8 gap-6">
                    <div className="flex items-center gap-6">
                      <span className="text-white text-5xl md:text-7xl font-black font-sans leading-none tracking-tighter drop-shadow-lg">{service.id}</span>
                      <div className="flex flex-col">
                        <span className="text-white text-xl md:text-3xl font-bold uppercase drop-shadow-md">{service.title}</span>
                        <span className="text-gray-300 text-sm md:text-lg font-medium">{service.subtitle}</span>
                      </div>
                    </div>
                    <StarBorder as="button" className="shrink-0" color="#ffffff, #444444, #ffffff" speed="3s">
                      <span className="px-6 py-2 text-xs md:text-sm font-bold uppercase text-white block">{service.cta}</span>
                    </StarBorder>
                  </div>

                  <div className="flex-1 flex items-center justify-start py-4 mt-auto">
                    <p className="text-white/90 text-xl md:text-3xl leading-relaxed font-sans font-light max-w-4xl drop-shadow-md">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* FIX 4: Restored the physical space (100vh) for the mobile Text Arc to rotate within before VectorBridge starts */}
          <div className="scroll-stack-end pointer-events-none w-full opacity-0" style={{ height: isMobile ? "100vh" : "120vh" }} />
        </div>

        <div ref={kineticWheelRef} className="kinetic-wheel pointer-events-none" style={{
          position: "fixed",
          bottom: isMobile ? "-2vh" : "-18vh",
          left: "50%",
          width: isMobile ? "250vw" : "100vw",
          marginLeft: isMobile ? "-125vw" : "-50vw",
          zIndex: 0,
          visibility: "hidden",
          opacity: 0,
          willChange: "transform, opacity",
        }}>
            <svg viewBox="0 0 3000 1500" className="w-full h-auto" style={{ overflow: "visible", display: "block" }}>
              <path id="arc-path" d="M 400,1500 A 1100,1100 0 0,1 2600,1500" fill="none" stroke="none" />
              {[
                { text: "ANALYZE", offset: "15%" }, { text: "●", offset: "27%" },
                { text: "DESIGN", offset: "38%" }, { text: "●", offset: "50%" },
                { text: "BUILD", offset: "62%" }, { text: "●", offset: "73%" },
                { text: "DELIVER", offset: "85%" },
              ].map((item, i) => (
                <text key={i} fill="#ffffff" style={{ fontFamily: "sans-serif", fontWeight: 800, fontSize: item.text === "●" ? "50px" : "100px", textTransform: "uppercase" }} dy={item.text === "●" ? "-18" : "0"}>
                  <textPath href="#arc-path" startOffset={item.offset} textAnchor="middle">{item.text}</textPath>
                </text>
              ))}
            </svg>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;