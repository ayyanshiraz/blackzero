"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MessageSection = () => {
  useGSAP(() => {
    // Use once: true so splits are stable and don't re-run on every render
    const firstMsgSplit  = SplitText.create(".first-message",  { type: "words" });
    const secMsgSplit    = SplitText.create(".second-message", { type: "words" });
    const paragraphSplit = SplitText.create(".message-content p", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    // First headline — fade in words as user scrolls
    gsap.fromTo(
      firstMsgSplit.words,
      { color: "rgba(0,0,0,0.08)" },
      {
        color: "rgba(0,0,0,1)",
        ease: "power1.inOut",
        stagger: 0.8,
        scrollTrigger: {
          trigger: ".message-content",
          start: "top center",
          end: "30% center",
          scrub: 0.6,   // was 1 (true) — lower = more responsive
        },
      }
    );

    // Second headline
    gsap.fromTo(
      secMsgSplit.words,
      { color: "rgba(0,0,0,0.08)" },
      {
        color: "rgba(0,0,0,1)",
        ease: "power1.inOut",
        stagger: 0.8,
        scrollTrigger: {
          trigger: ".second-message",
          start: "top center",
          end: "bottom center",
          scrub: 0.6,
        },
      }
    );

    // "Scale Up" clip reveal
    gsap.timeline({
      scrollTrigger: {
        trigger: ".msg-text-scroll",
        start: "top 65%",
      },
    }).to(".msg-text-scroll", {
      duration: 0.85,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "circ.inOut",
    });

    // Paragraph words stagger in
    gsap.timeline({
      scrollTrigger: {
        trigger: ".message-content p",
        start: "top center",
      },
    }).from(paragraphSplit.words, {
      yPercent: 250,
      rotate: 2,
      ease: "power2.out",
      duration: 0.8,
      stagger: 0.008,
    });
  }, { dependencies: [], once: true });

  return (
    <section className="message-content bg-white relative z-10">
      <div className="container mx-auto flex-center py-28 relative pointer-events-none">
        <div className="w-full h-full">
          <div className="msg-wrapper">
            <h1 className="first-message text-black/10">
              Accelerate your digital transformation and
            </h1>

            <div
              style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              className="msg-text-scroll border-black"
            >
              <div className="bg-black md:pb-5 pb-3 px-5">
                <h2 className="text-white">Scale Up</h2>
              </div>
            </div>

            <h1 className="second-message text-black/10">
              your business with next generation AI solutions
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
