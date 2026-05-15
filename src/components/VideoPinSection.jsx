"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoPinSection = () => {
  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add(`(min-width: 769px)`, () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: `.vd-pin-section`,
          start: `-15% top`,
          end: `200% top`,
          scrub: 1.5,
          pin: true,
        },
      });

      tl.fromTo(`.video-box`,
        { clipPath: `circle(6% at 50% 50%)` },
        { clipPath: `circle(100% at 50% 50%)`, ease: `power1.inOut` }
      );
    });

    mm.add(`(max-width: 768px)`, () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: `.vd-pin-section`,
          start: `top top`,
          end: `+=150%`, 
          scrub: 1, 
          pin: true,
          anticipatePin: 1, 
        },
      });

      tl.fromTo(`.video-box`,
        { clipPath: `circle(20% at 50% 50%)` },
        { clipPath: `circle(100% at 50% 50%)`, ease: `none` }
      );
    });

    return () => mm.revert();
  });

  return (
    <section className={`vd-pin-section h-[100dvh] w-full relative`}>
      <div className={`size-full video-box`}>
        <video src={`/videos/rrr2.mp4`} playsInline muted loop autoPlay />
        <div className={`abs-center md:scale-100 scale-200`}>
          <img src={`/images/circle-text.svg`} alt={``} className={`spin-circle`} />
          <div className={`play-btn`}>
            <img src={`/images/play.svg`} alt={``} className={`size-[3vw] ml-[.5vw]`} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPinSection;