"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { useLenis } from "lenis/react";
import Link from "next/link";

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

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const cardOffsetsRef = useRef([]);
  const endOffsetRef = useRef(0);
  const stackInnerRef = useRef(null);

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
    const containerHeight = window.innerHeight;

    if (!cards.length || !cardOffsets.length) return;

    const firstCardHeight = cards[0].offsetHeight;
    const stackPositionPx = (containerHeight - firstCardHeight) / 2;
    const scaleEndPositionPx = stackPositionPx - (BASE_CONFIG.stackPosition - BASE_CONFIG.scaleEndPosition) * containerHeight;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardTop = cardOffsets[i];
      const triggerStart = cardTop - stackPositionPx - BASE_CONFIG.itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - containerHeight * 0.5;

      let scaleProgress = 0;
      if (scroll >= triggerEnd) scaleProgress = 1;
      else if (scroll > triggerStart) scaleProgress = (scroll - triggerStart) / (triggerEnd - triggerStart);

      const targetScale = BASE_CONFIG.baseScale + i * BASE_CONFIG.itemScale;
      const scale = Number((1 - scaleProgress * (1 - targetScale)).toFixed(4));

      let translateY = 0;
      if (scroll >= pinStart && scroll <= pinEnd) translateY = scroll - cardTop + stackPositionPx + BASE_CONFIG.itemStackDistance * i;
      else if (scroll > pinEnd) translateY = pinEnd - cardTop + stackPositionPx + BASE_CONFIG.itemStackDistance * i;
    }
  });

  const calculatePositions = useCallback(() => {
    setReady(false);
    const cards = Array.from(document.querySelectorAll(`.scroll-stack-card`));
    cardsRef.current = cards;
    cards.forEach(card => card.style.transform = ``);
    
    const scrollY = window.scrollY;
    cardOffsetsRef.current = cards.map(card => card.getBoundingClientRect().top + scrollY);
    
    const endElement = document.querySelector(`.scroll-stack-end`);
    if (endElement) endOffsetRef.current = endElement.getBoundingClientRect().top + scrollY;

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
    <div className={`relative w-full bg-transparent pb-12`}>
      
      <style>{`
        @keyframes custom-star-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <section id={`services`} ref={sectionRef} className={`relative z-20 min-h-screen w-full -mt-[15vh] md:mt-0`}>
        
        <div className={`w-full py-8 md:py-12 bg-white overflow-hidden flex items-center relative z-10 mb-4 md:mb-12`}>
          <div className={`marquee-services`}>
            
            <div 
              className={`marquee-services__track`} 
              style={{ 
                animationDuration: `35s`, 
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

        <div ref={stackInnerRef} className={`px-4 md:px-12 w-full`}>
          <div className={`relative w-full flex flex-col items-center justify-center`}>
            
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
                      <span className={`px-6 py-3 text-xs md:text-sm font-bold uppercase text-black block tracking-widest`} style={{ fontFamily: `Arial, sans-serif` }}>{service.cta}</span>
                    </div>
                  </div>

                  <div className={`flex-1 flex items-center justify-start py-4 mt-auto`}>
                    <p className={`text-white/90 text-xl md:text-3xl leading-relaxed font-sans font-light max-w-4xl drop-shadow-md`}>{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`scroll-stack-end pointer-events-none w-full opacity-0`} />
        </div>
      </section>
    </div>
  );
};

export default ServicesSection;