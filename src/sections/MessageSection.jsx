"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

const MessageSection = () => {
  useGSAP(
    () => {
      const firstMsgSplit = SplitText.create(".first-message", {
        type: "words",
      });
      const secMsgSplit = SplitText.create(".second-message", {
        type: "words",
      });

      const pElement = document.querySelector(".message-content p");
      let paragraphSplit;

      if (pElement) {
        paragraphSplit = SplitText.create(".message-content p", {
          type: "words, lines",
          linesClass: "paragraph-line",
        });
      }

      // Word-by-word scroll reveal from faint gray to solid black for top text
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

      // Word-by-word scroll reveal from faint gray to solid black for bottom text
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

      // Clip-path reveal animation for the Scale Up badge
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".msg-text-scroll",
            start: "top 65%",
          },
        })
        .to(".msg-text-scroll", {
          duration: 0.85,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.inOut",
        });

      if (paragraphSplit) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".message-content p",
              start: "top center",
            },
          })
          .from(paragraphSplit.words, {
            yPercent: 250,
            rotate: 2,
            ease: "power2.out",
            duration: 0.8,
            stagger: 0.008,
          });
      }
    },
    { dependencies: [], once: true }
  );

  return (
    <section className="message-content bg-white relative z-10">
      <div className="container mx-auto flex justify-center items-start pt-4 pb-12 md:py-28 relative pointer-events-none">
        <div className="w-full h-full flex flex-col items-center -mt-23 md:mt-0 text-center">
          {/* Single semantic H1 for SEO with Scale Up placed in flex flow between both text blocks */}
          <h1 className="msg-wrapper flex flex-col items-center">
            <span className="first-message block text-black/10">
              Architect custom enterprise software and{" "}
            </span>

            <span
              style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              className="msg-text-scroll block border-black"
            >
              <span className="bg-black block md:pb-5 pb-3 px-5">
                <span className="text-white block">Scale Up </span>
              </span>
            </span>

            <span className="second-message block text-black/10">
              your operations with <br /> secure AI and custom ERP <br />{" "}
              systems
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;