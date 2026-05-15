"use client";
import { useGSAP } from "@gsap/react";
import ClipPathTitle from "../components/ClipPathTitle";
import gsap from "gsap";
import VideoPinSection from "../components/VideoPinSection";

const BenefitSection = () => {
  useGSAP(() => {
    const revealTl = gsap.timeline({
      delay: 1, 
      scrollTrigger: {
        trigger: `.benefit-section`, 
        start: `top 60%`,
        end: `top top`,
        scrub: 1.5,
      },
    });

    revealTl
      .to(`.benefit-section .first-title`, {
        duration: 1,
        opacity: 1,
        clipPath: `polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)`,
        ease: `circ.out`,
      })
      .to(`.benefit-section .second-title`, {
        duration: 1,
        opacity: 1,
        clipPath: `polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)`,
        ease: `circ.out`,
      })
      .to(`.benefit-section .third-title`, {
        duration: 1,
        opacity: 1,
        clipPath: `polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)`,
        ease: `circ.out`,
      })
      .to(`.benefit-section .fourth-title`, {
        duration: 1,
        opacity: 1,
        clipPath: `polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)`,
        ease: `circ.out`,
      });
  });

  return (
    <section className={`benefit-section relative bg-transparent z-10`}>
      <div className={`container mx-auto pt-20`}>
        <div className={`col-center`}>
          
          {/* Added px-4 and scaled down the paragraph text slightly on mobile */}
          <p className={`text-white text-center text-sm md:text-base px-4`}>
            Unlock The Future <br />
            Explore The Key Benefits Of Partnering With BLACKZERO
          </p>

          {/* THE FIX: Added scale-[0.6] and whitespace-nowrap for mobile to forcefully shrink the entire block and prevent the text from wrapping onto two lines! */}
          <div className={`mt-10 md:mt-20 col-center flex flex-col gap-2 md:gap-0 scale-[0.6] sm:scale-[0.8] md:scale-100 origin-top whitespace-nowrap`}>
            <ClipPathTitle
              title={`Scalable Systems`}
              color={`#ffffff`}
              bg={`#111111`}
              className={`first-title`}
              borderColor={`#ffffff`}
            />
            <ClipPathTitle
              title={`AI Driven Solutions`}
              color={`#ffffff`}
              bg={`#111111`}
              className={`second-title`}
              borderColor={`#ffffff`}
            />
            <ClipPathTitle
              title={`Seamless Integration`}
              color={`#ffffff`}
              bg={`#111111`}
              className={`third-title`}
              borderColor={`#ffffff`}
            />
            <ClipPathTitle
              title={`Next Gen Performance`}
              color={`#ffffff`}
              bg={`#111111`}
              className={`fourth-title`}
              borderColor={`#ffffff`}
            />
          </div>

          <div className={`md:mt-0 mt-2 text-white`}>
            <p>Plus infinite scalability</p>
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