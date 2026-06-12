"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MessageSection = () => {
  useGSAP(() => {
    const firstMsgSplit  = SplitText.create(".first-message",  { type: "words" });
    const secMsgSplit    = SplitText.create(".second-message", { type: "words" });
    const paragraphSplit = SplitText.create(".message-content p", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

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
          scrub: 0.6,
        },
      }
    );

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
      <div className="container mx-auto flex justify-center items-start pt-4 pb-12 md:py-28 relative pointer-events-none">
        <div className="w-full h-full flex flex-col items-center -mt-23 md:mt-0 text-center">
          
          <div className="msg-wrapper flex flex-col items-center">
            
            <h1 className="first-message text-black/10">
              Accelerate your digital transformation and
            </h1>

            {/* Negative margin pulls the box up to overlap the word AND */}
            <div
              style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              className="msg-text-scroll border-black relative z-20 -mt-10 md:-mt-20 lg:-mt-28 mb-4 md:mb-6"
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