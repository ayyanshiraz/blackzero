"use client";
import { useGSAP } from "@gsap/react";
import ClipPathTitle from "../components/ClipPathTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoPinSection from "../components/VideoPinSection";

gsap.registerPlugin(ScrollTrigger);

const BenefitSection = () => {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(`all`, () => {
        const revealTl = gsap.timeline({
          scrollTrigger: {
            trigger: `.benefit-section`,
            start: `top 80%`,
            end: `top 25%`,
            // Lowered from 1.5 → feels tighter and more responsive
            scrub: 0.8,
          },
        });

        revealTl
          .to(`.benefit-section .first-title`,  { duration: 1, opacity: 1, clipPath: `polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)`, ease: `circ.out` })
          .to(`.benefit-section .second-title`, { duration: 1, opacity: 1, clipPath: `polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)`, ease: `circ.out` }, `<0.15`)
          .to(`.benefit-section .third-title`,  { duration: 1, opacity: 1, clipPath: `polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)`, ease: `circ.out` }, `<0.15`)
          .to(`.benefit-section .fourth-title`, { duration: 1, opacity: 1, clipPath: `polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)`, ease: `circ.out` }, `<0.15`);
      });

      return () => mm.revert();
    },
    { dependencies: [], once: true }
  );

  return (
    <section className={`benefit-section relative bg-transparent z-10`}>
      <div className={`container mx-auto pt-0 md:pt-20`}>
        <div className={`col-center`}>
          {/* MODIFIED: Changed scale-[0.6] to scale-[0.75] and sm:scale-[0.8] to sm:scale-[0.85] */}
          <div className={`mt-2 md:mt-20 col-center flex flex-col gap-2 md:gap-0 scale-[0.75] sm:scale-[0.85] md:scale-100 origin-top whitespace-nowrap`}>
            <ClipPathTitle title={`Scalable Systems`}      color={`#ffffff`} bg={`#111111`} className={`first-title`}  borderColor={`#ffffff`} />
            <ClipPathTitle title={`AI Driven Solutions`}   color={`#ffffff`} bg={`#111111`} className={`second-title`} borderColor={`#ffffff`} />
            <ClipPathTitle title={`Seamless Integration`}  color={`#ffffff`} bg={`#111111`} className={`third-title`}  borderColor={`#ffffff`} />
            <ClipPathTitle title={`Next Gen Performance`}  color={`#ffffff`} bg={`#111111`} className={`fourth-title`} borderColor={`#ffffff`} />
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