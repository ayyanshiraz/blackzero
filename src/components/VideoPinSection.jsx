"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoPinSection = () => {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ─── Desktop ───────────────────────────────────────────────────────────
      mm.add("(min-width: 769px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".vd-pin-section",
            start: "-15% top",
            end: "200% top",
            scrub: 0.8,   // Snappier reveal
            pin: true,
            anticipatePin: 1,
          },
        });
        tl.fromTo(
          ".video-box",
          { clipPath: "circle(6% at 50% 50%)" },
          { clipPath: "circle(100% at 50% 50%)", ease: "power2.inOut" }
        );
      });

      // ─── Mobile ────────────────────────────────────────────────────────────
      mm.add("(max-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".vd-pin-section",
            start: "top top",
            end: "+=150%",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });
        tl.fromTo(
          ".video-box",
          { clipPath: "circle(20% at 50% 50%)" },
          { clipPath: "circle(100% at 50% 50%)", ease: "none" }
        );
      });

      return () => mm.revert();
    },
    { dependencies: [], once: true }
  );

  return (
    <section className="vd-pin-section h-[100dvh] w-full relative">
      <div className="size-full video-box">
        <video
          src="/videos/handshake.mp4"
          playsInline
          muted
          loop
          autoPlay
          preload="none" // Defer load until the section is in view
          className="w-full h-full object-cover" // Added classes to completely fill the container
        />
      </div>
    </section>
  );
};

export default VideoPinSection;