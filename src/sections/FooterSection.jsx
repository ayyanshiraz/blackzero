"use client";

import { useMediaQuery } from "react-responsive";
import Link from "next/link";

const FooterSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <section className="footer-section bg-black relative w-full overflow-hidden">
      <div className="min-h-screen 2xl:min-h-[110vh] relative pt-[12vh] md:pt-[18vh] pb-10 flex flex-col justify-between px-5 md:px-10 max-w-[1920px] mx-auto">
        
        {/* Title Container */}
        <div className="w-full text-center z-10 my-4">
          <h1 className="general-title text-center text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none">
            BUILDING THE FUTURE
          </h1>
        </div>

        {/* Social Icons Container (Now Clickable) */}
        <div className="flex justify-center items-center gap-5 relative z-10 md:mt-12 mt-6">
          <Link href="https://www.facebook.com/profile.php?id=61560559093444" target="_blank" aria-label="Facebook" className="social-btn cursor-pointer transition-transform hover:scale-105">
            <img src="/images/facebook.svg" alt="Facebook" />
          </Link>
          <Link href="https://www.instagram.com/blackzerofficial/" target="_blank" aria-label="Instagram" className="social-btn cursor-pointer transition-transform hover:scale-105">
            <img src="/images/insta2.svg" alt="Instagram" />
          </Link>
          <Link href="https://www.linkedin.com/company/black-zerofficial/posts/?feedView=all" target="_blank" aria-label="LinkedIn" className="social-btn cursor-pointer transition-transform hover:scale-105">
            <img src="/images/linkedin.svg" alt="LinkedIn" />
          </Link>
        </div>

        {/* Links & Newsletter Columns */}
        <div className="mt-16 md:mt-24 flex gap-10 md:flex-row flex-col justify-between text-white font-paragraph md:text-lg font-medium">
          
          <div className="flex items-start md:gap-24 gap-10 flex-wrap">
            {/* Services Links column */}
            <div className="flex flex-col">
              <p className="text-light-brown mb-5 font-bold uppercase tracking-wider text-sm md:text-base">Services</p>
              <Link href="/services/ai-software-hub" className="mb-3 text-white/80 hover:text-light-brown transition-colors w-max">
                AI + Software Hub
              </Link>
              <Link href="/services/data-analytics" className="mb-3 text-white/80 hover:text-light-brown transition-colors w-max">
                Data Analytics
              </Link>
              <Link href="/services/advanced-websites" className="mb-3 text-white/80 hover:text-light-brown transition-colors w-max">
                Advanced Website and Portal systems
              </Link>
              <Link href="/services/hybrid-seo" className="mb-3 text-white/80 hover:text-light-brown transition-colors w-max">
                Hybrid SEO Services [Traditional + AI]
              </Link>
              <Link href="/services/marketing" className="mb-3 text-white/80 hover:text-light-brown transition-colors w-max">
                Marketing
              </Link>
              <Link href="/services/creative-design-and-animation-studio" className="mb-3 text-white/80 hover:text-light-brown transition-colors w-max">
                Creative Design and Animation Studio
              </Link>
            </div>

            {/* Company Links column */}
            <div className="flex flex-col">
              <p className="text-light-brown mb-5 font-bold uppercase tracking-wider text-sm md:text-base">Company</p>
              <Link href="/blogs" className="mb-3 text-white/80 hover:text-light-brown transition-colors w-max">
                Blogs
              </Link>
              <Link href="/careers" className="mb-3 text-white/80 hover:text-light-brown transition-colors w-max">
                Careers
              </Link>
              <Link href="/privacy-policy" className="mb-3 text-white/80 hover:text-light-brown transition-colors w-max">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Newsletter Input */}
          <div className="w-full md:max-w-lg mt-8 md:mt-0">
            <p className="text-white/80 leading-relaxed text-sm md:text-base">
              Subscribe to our newsletter for the latest insights in AI development scalable software and tech industry trends.
            </p>
            <div className="flex justify-between items-center border-b border-white/30 py-4 mt-6 md:mt-10">
              <input
                type="email"
                placeholder="Enter your work email"
                className="w-full bg-transparent border-none outline-none text-white placeholder:font-sans placeholder:text-white/40 focus:ring-0"
              />
              <img src="/images/arrow.svg" alt="arrow" className="cursor-pointer hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        {/* Centered Copyright Line (Updated size and color) */}
        <div className="w-full text-center border-t border-white/10 pt-8 mt-16 md:mt-24">
          <p className="text-white text-base md:text-lg tracking-wide font-medium">
            Copyright © 2026 Black Zero IT Solutions - All Rights Reserved
          </p>
        </div>

      </div>
    </section>
  );
};

export default FooterSection;