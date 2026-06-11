"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const MessageSection = () => {
  useGSAP(() => {
    const firstMsgSplit = SplitText.create(`.first-message`, {
      type: `words`,
    });
    const secMsgSplit = SplitText.create(`.second-message`, {
      type: `words`,
    });
    const paragraphSplit = SplitText.create(`.message-content p`, {
      type: `words, lines`,
      linesClass: `paragraph-line`,
    });

    // 1. Force the first message to go from transparent to solid black
    gsap.fromTo(
      firstMsgSplit.words,
      { color: `rgba(0, 0, 0, 0.1)` },
      {
        color: `rgba(0, 0, 0, 1)`,
        ease: `power1.in`,
        stagger: 1,
        scrollTrigger: {
          trigger: `.message-content`,
          start: `top center`,
          end: `30% center`,
          scrub: true,
        },
      }
    );

    // 2. Force the second message to go from transparent to solid black
    gsap.fromTo(
      secMsgSplit.words,
      { color: `rgba(0, 0, 0, 0.1)` },
      {
        color: `rgba(0, 0, 0, 1)`,
        ease: `power1.in`,
        stagger: 1,
        scrollTrigger: {
          trigger: `.second-message`,
          start: `top center`,
          end: `bottom center`,
          scrub: true,
        },
      }
    );

    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: `.msg-text-scroll`,
        start: `top 60%`,
      },
    });
    revealTl.to(`.msg-text-scroll`, {
      duration: 1,
      clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
      ease: `circ.inOut`,
    });

    const paragraphTl = gsap.timeline({
      scrollTrigger: {
        trigger: `.message-content p`,
        start: `top center`,
      },
    });
    paragraphTl.from(paragraphSplit.words, {
      yPercent: 300,
      rotate: 3,
      ease: `power1.inOut`,
      duration: 1,
      stagger: 0.01,
    });
  });

  return (
    <section className={`message-content bg-white relative z-10`}>
      <div className={`container mx-auto flex-center py-28 relative pointer-events-none`}>
        <div className={`w-full h-full`}>
          <div className={`msg-wrapper`}>
            
            <h1 className={`first-message text-black/10`}>Accelerate your digital transformation and</h1>

            <div
              style={{
                clipPath: `polygon(0 0, 0 0, 0 100%, 0% 100%)`,
              }}
              className={`msg-text-scroll border-black`}
            >
              <div className={`bg-black md:pb-5 pb-3 px-5`}>
                <h2 className={`text-white`}>Scale Up</h2>
              </div>
            </div>

            <h1 className={`second-message text-black/10`}>
              your business with next generation AI solutions
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;