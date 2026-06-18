"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoPinSection = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        `.video-slide`,
        { 
          x: `100%`, 
          opacity: 0 
        },
        {
          x: `0%`,
          opacity: 1,
          duration: 1.2,
          ease: `power3.out`,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top 80%`, 
            toggleActions: `play none none reset`, 
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className={`h-[60dvh] md:h-[100dvh] w-full relative overflow-hidden bg-white`}>
      <div className={`w-full h-full video-slide`}>
        <video
          src={`/videos/handshake.mp4`}
          playsInline
          muted
          loop
          autoPlay
          preload={`auto`}
          className={`w-full h-full object-cover`} 
        />
      </div>
    </section>
  );
};

export default VideoPinSection;