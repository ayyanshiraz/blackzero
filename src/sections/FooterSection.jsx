"use client";

import { useMediaQuery } from "react-responsive";
import Link from "next/link";

const FooterSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <section 
      className="footer-section bg-black relative w-full overflow-hidden" 
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <div className="relative pt-2 md:pt-5 pb-3 flex flex-col justify-between px-5 md:px-10 max-w-[1920px] mx-auto">
        
        <div className="w-full text-center z-10 my-0">
          <h3 className="general-title text-center text-white text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none">
            BUILDING THE FUTURE
          </h3>
        </div>

        <div className="flex justify-center items-center gap-5 relative z-10 md:mt-2 mt-3">
          <Link aria-label="Facebook" className="social-btn cursor-pointer transition-transform hover:scale-105" href="https://www.facebook.com/profile.php?id=61560559093444" target="_blank">
            <img src="/images/facebook.svg" alt="Facebook" width={40} height={40} loading="lazy" />
          </Link>
          <Link aria-label="Instagram" className="social-btn cursor-pointer transition-transform hover:scale-105" href="https://www.instagram.com/blackzerofficial/" target="_blank">
            <img src="/images/insta2.svg" alt="Instagram" width={40} height={40} loading="lazy" />
          </Link>
          <Link aria-label="LinkedIn" className="social-btn cursor-pointer transition-transform hover:scale-105" href="https://www.linkedin.com/company/black-zerofficial/posts/?feedView=all" target="_blank">
            <img src="/images/linkedin.svg" alt="LinkedIn" width={40} height={40} loading="lazy" />
          </Link>
        </div>

        <div className="mt-5 md:mt-6 flex gap-10 lg:gap-16 xl:gap-20 md:flex-row flex-col justify-between text-white md:text-lg font-medium">
          
          <div className="flex items-start md:gap-12 lg:gap-20 gap-10 flex-wrap lg:flex-nowrap flex-1">
            
            <div className="flex flex-col min-w-[150px]">
              <p className="text-light-brown mb-4 font-bold uppercase tracking-wider text-sm md:text-base">Quick Links</p>
              <Link className="mb-2 text-white/80 hover:text-light-brown transition-colors w-max" href="/projects">
                Portfolio
              </Link>
              <Link className="mb-2 text-white/80 hover:text-light-brown transition-colors w-max" href="/blogs">
                Our Blogs
              </Link>
              <Link className="mb-2 text-white/80 hover:text-light-brown transition-colors w-max" href="/careers">
                Careers
              </Link>
              <Link className="mb-2 text-white/80 hover:text-light-brown transition-colors w-max" href="/customized-solutions">
                Custom Solutions
              </Link>
            </div>

            <div className="flex flex-col min-w-[150px]">
              <p className="text-light-brown mb-4 font-bold uppercase tracking-wider text-sm md:text-base">Legal</p>
              <Link className="mb-2 text-white/80 hover:text-light-brown transition-colors w-max" href="/privacy-policy">
                Privacy Policy
              </Link>
              <Link className="mb-2 text-white/80 hover:text-light-brown transition-colors w-max" href="/terms-of-service">
                Terms of Service
              </Link>
            </div>

            <div className="flex flex-col max-w-[250px]">
              <p className="text-light-brown mb-4 font-bold uppercase tracking-wider text-sm md:text-base">Contact</p>
              <p className="mb-2 text-white/80 leading-relaxed text-sm md:text-base">
                Hotel MayFair 4th floor, 50-52, E - III, Commercial Zone, Gulberg III, 54660, Lahore, Punjab.
              </p>
              <a href="tel:+923244333267" className="mb-2 text-white/80 hover:text-light-brown transition-colors w-max font-bold">
                +92 324 4333267
              </a>
              <a href="mailto:info@blackzero.org" className="mb-2 text-white/80 hover:text-light-brown transition-colors w-max font-bold">
                info@blackzero.org
              </a>
            </div>
          </div>

          <div className="w-full md:max-w-sm lg:max-w-md xl:max-w-lg mt-8 md:mt-0">
            <p className="text-white/80 leading-relaxed text-sm md:text-base">
              Subscribe to our newsletter for the latest insights in AI development scalable software and tech industry trends.
            </p>
            <div className="flex justify-between items-center border-b border-white/30 py-3 mt-4 md:mt-6">
              <input
                type="email"
                placeholder="Enter your work email"
                className="w-full bg-transparent border-none outline-none text-white placeholder:font-sans placeholder:text-white/40 focus:ring-0"
              />
              <img src="/images/arrow.svg" alt="arrow" width={24} height={24} loading="lazy" className="cursor-pointer hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        <div className="w-full text-center border-t border-white/10 pt-3 mt-5 md:mt-6">
          <p className="text-white text-sm md:text-base tracking-wide font-medium">
            Copyright © 2026 BlackZero Technologies - All Rights Reserved
          </p>
        </div>

      </div>
    </section>
  );
};

export default FooterSection;