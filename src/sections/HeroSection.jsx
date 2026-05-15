"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";

const HeroSection = () => {
  const isMobile = useMediaQuery({
    query: `(max-width: 768px)`,
  });

  const isTablet = useMediaQuery({
    query: `(max-width: 1024px)`,
  });

  useGSAP(() => {
    const titleSplit = SplitText.create(`.hero-title`, {
      type: `chars`,
    });

    const tl = gsap.timeline({
      delay: 1,
    });

    tl.to(`.hero-content`, {
      opacity: 1,
      y: 0,
      ease: `power1.inOut`,
    })
      .to(
        `.hero-text-scroll`,
        {
          duration: 1,
          clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
          ease: `circ.out`,
        },
        `-0.5`
      )
      .from(
        titleSplit.chars,
        {
          yPercent: 200,
          stagger: 0.02,
          ease: `power2.out`,
        },
        `-0.5`
      );

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: `.hero-container`,
        start: `1% top`,
        end: `bottom top`,
        scrub: true,
      },
    });
    
    heroTl.to(`.hero-container`, {
      rotate: 7,
      scale: 0.9,
      yPercent: 30,
      ease: `power1.inOut`,
    });
  });

  return (
    <section className={`bg-transparent w-full h-screen overflow-hidden`}>
      <div className={`hero-container relative w-full h-full bg-transparent`}>
        
        <div className={`hero-content opacity-0 pointer-events-none relative z-10`}>
          <div className={`overflow-hidden px-2`}>
            {/* FIX 1: Scaled mobile text using !text-[11.5vw] to perfectly fit any screen width */}
            <h1 className={`hero-title !text-white !mb-6 md:!mb-0 !leading-[1.1] md:!leading-[9vw] text-center !text-[11.5vw] sm:!text-[4rem] md:!text-[6.5rem] 2xl:!text-[8.5rem]`}>
              Building Intelligent Systems
            </h1>
          </div>
          
          <div
            style={{
              clipPath: `polygon(50% 0, 50% 0, 50% 100%, 50% 100%)`,
            }}
            className={`hero-text-scroll !border-white`}
          >
            <div className={`hero-subtitle !bg-[#111111]`}>
              {/* FIX 2: Scaled the badge text to match */}
              <h1 className={`!text-white !text-[9vw] sm:!text-[3rem] md:!text-[6.5rem] 2xl:!text-[8.5rem]`}>AI + Software</h1>
            </div>
          </div>

          <h2 className={`!text-gray-300 mt-4 md:mt-0 text-sm md:text-lg`}>
            Unlock the power of your data with advanced web systems and scalable portals.
          </h2>

          <div className={`hero-button pointer-events-auto !bg-white !text-black cursor-pointer`}>
            <p className={`font-bold`}>Explore Services</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;