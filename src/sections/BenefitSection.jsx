"use client";
import { useGSAP } from "@gsap/react";
import ClipPathTitle from "../components/ClipPathTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoPinSection from "../components/VideoPinSection";

gsap.registerPlugin(ScrollTrigger);

const BenefitSection = () => {
  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add(`all`, () => {
      const revealTl = gsap.timeline({
        delay: 0.5,
        scrollTrigger: {
          trigger: `.benefit-section`,
          start: `top 75%`,
          end: `top 20%`,
          scrub: 1.5,
        },
      });

      revealTl
        .to(`.benefit-section .first-title`, { duration: 1, opacity: 1, clipPath: `polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)`, ease: `circ.out` })
        .to(`.benefit-section .second-title`, { duration: 1, opacity: 1, clipPath: `polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)`, ease: `circ.out` }, `<0.2`)
        .to(`.benefit-section .third-title`, { duration: 1, opacity: 1, clipPath: `polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)`, ease: `circ.out` }, `<0.2`)
        .to(`.benefit-section .fourth-title`, { duration: 1, opacity: 1, clipPath: `polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)`, ease: `circ.out` }, `<0.2`);
    });

    return () => mm.revert();
  });

  return (
    <section className={`benefit-section relative bg-transparent z-10`}>
      <div className={`container mx-auto pt-20`}>
        <div className={`col-center`}>
          
          {/* Animated Titles */}
          <div className={`mt-10 md:mt-20 col-center flex flex-col gap-2 md:gap-0 scale-[0.6] sm:scale-[0.8] md:scale-100 origin-top whitespace-nowrap`}>
            <ClipPathTitle title={`Scalable Systems`} color={`#ffffff`} bg={`#111111`} className={`first-title`} borderColor={`#ffffff`} />
            <ClipPathTitle title={`AI Driven Solutions`} color={`#ffffff`} bg={`#111111`} className={`second-title`} borderColor={`#ffffff`} />
            <ClipPathTitle title={`Seamless Integration`} color={`#ffffff`} bg={`#111111`} className={`third-title`} borderColor={`#ffffff`} />
            <ClipPathTitle title={`Next Gen Performance`} color={`#ffffff`} bg={`#111111`} className={`fourth-title`} borderColor={`#ffffff`} />
          </div>

        </div>
      </div>

      <div className={`relative overlay-box bg-transparent`}>
        <VideoPinSection />
      </div>
    </section>
  );
};

export default BenefitSection;