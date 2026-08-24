"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "They transformed our legacy architecture into a seamless AI driven powerhouse. The scalability is exactly what we needed.",
    name: "Sarah Jenkins",
    role: "CTO TechNova",
  },
  {
    quote:
      "The 3D interactive portals they built increased our user engagement massively. Absolutely phenomenal design and execution.",
    name: "Marcus Thorne",
    role: "Director Creative Solutions",
  },
  {
    quote:
      "Outstanding web development and SEO pipelines. They delivered complex software that looks incredibly simple and intuitive.",
    name: "David Chen",
    role: "Founder Apex Logistics",
  },
];

const TestimonialSection = () => {
  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Background text scroll animation (Applies to all screens)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(".testimonials-section .first-title", {
      xPercent: 50,
    })
      .to(
        ".testimonials-section .sec-title",
        {
          xPercent: 15,
        },
        "<"
      )
      .to(
        ".testimonials-section .third-title",
        {
          xPercent: -30,
        },
        "<"
      );

    // Desktop Animation: Stagger all cards at once
    mm.add("(min-width: 769px)", () => {
      gsap.from(".test-card", {
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top center",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    });

    // Mobile Animation: Trigger each card individually as it enters the view
    mm.add("(max-width: 768px)", () => {
      gsap.utils.toArray(".test-card").forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // Triggers when the top of the card is 85% down the screen
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    });
  });

  return (
    <section className="testimonials-section relative overflow-hidden">
      {/* Giant Animated Background Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none opacity-20">
        <h1 className="text-white first-title whitespace-nowrap">Client</h1>
        <h1 className="text-light-brown sec-title whitespace-nowrap">Success</h1>
        <h1 className="text-white third-title whitespace-nowrap">Stories</h1>
      </div>

      {/* Foreground Testimonial Cards Container */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 py-20">
        {testimonials.map((test, index) => (
          <div
            key={index}
            className="test-card bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-2xl"
          >
            <div>
              {/* Decorative SVG Icon */}
              <svg
                className="w-10 h-10 text-light-brown mb-6 opacity-60"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              <p className="text-white/90 text-lg md:text-xl font-paragraph leading-relaxed mb-8">
                {test.quote}
              </p>
            </div>

            <div className="border-t border-white/10 pt-6 mt-auto">
              <h4 className="text-white font-bold text-lg uppercase tracking-wider">
                {test.name}
              </h4>
              <p className="text-light-brown text-sm font-medium tracking-widest uppercase mt-1">
                {test.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;