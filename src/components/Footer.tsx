"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";

const FooterSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section
      className={`footer-section ${isHomepage ? "bg-transparent" : "bg-[#000000]"}`}
      data-mobile={isMobile ? "true" : "false"}
    >
      <div className="min-h-screen h-auto md:pt-[15vh] pt-[10vh] flex flex-col justify-between">
        <div className="w-full">
          <h2 className="general-title text-center text-white pt-5 pb-10">
            BUILDING THE FUTURE
          </h2>
        </div>

        <div className="flex-center gap-5 md:mt-10 mt-5">
          <a
            href="https://www.facebook.com/profile.php?id=61560559093444&mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="BlackZero Technologies on Facebook"
            className="social-btn"
          >
            <img src="/images/facebook.svg" alt="Facebook" />
          </a>
          <a
            href="https://www.instagram.com/blackzerofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="BlackZero Technologies on Instagram"
            className="social-btn"
          >
            <img src="/images/insta2.svg" alt="Instagram" />
          </a>
          <a
            href="https://www.linkedin.com/company/black-zerofficial/posts/?feedView=all&viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="BlackZero Technologies on LinkedIn"
            className="social-btn"
          >
            <img src="/images/linkedin.svg" alt="LinkedIn" />
          </a>
        </div>

        <div className="mt-20 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-white font-paragraph md:text-lg font-medium pb-24">
          <div className="flex items-start md:gap-16 gap-10 flex-wrap">
            <div className="flex flex-col">
              <p className="text-light-brown mb-4 font-bold uppercase tracking-wider">
                Quick Links
              </p>
              <Link
                href="/"
                className="mb-2 hover:text-light-brown transition-colors"
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="mb-2 hover:text-light-brown transition-colors"
              >
                Portfolio
              </Link>
              <Link
                href="/blogs"
                className="mb-2 hover:text-light-brown transition-colors"
              >
                Our Blogs
              </Link>
              <Link
                href="/ecommerce-success"
                className="mb-2 hover:text-light-brown transition-colors"
              >
                Ecommerce Success
              </Link>
              <Link
                href="/careers"
                className="mb-2 hover:text-light-brown transition-colors"
              >
                Careers
              </Link>
              <Link
                href="/privacy-policy"
                className="mb-2 hover:text-light-brown transition-colors"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="flex flex-col">
              <p className="text-light-brown mb-4 font-bold uppercase tracking-wider">
                Services
              </p>
              <Link
                href="/services/custom-ai-software-development"
                className="mb-2 hover:text-light-brown transition-colors"
              >
                Custom AI &amp; Software
              </Link>
              <Link
                href="/services/data-analytics"
                className="mb-2 hover:text-light-brown transition-colors"
              >
                Data Analytics &amp; BI
              </Link>
              <Link
                href="/services/web-portal-development"
                className="mb-2 hover:text-light-brown transition-colors"
              >
                Web &amp; Portal Systems
              </Link>
              <Link
                href="/services/hybrid-seo"
                className="mb-2 hover:text-light-brown transition-colors"
              >
                Hybrid SEO, GEO &amp; AEO
              </Link>
              <Link
                href="/services/marketing"
                className="mb-2 hover:text-light-brown transition-colors"
              >
                B2B Marketing
              </Link>
              <Link
                href="/services/3d-animation-explainer-videos"
                className="mb-2 hover:text-light-brown transition-colors"
              >
                3D Animation Studio
              </Link>
            </div>
          </div>

          <div className="md:max-w-lg w-full">
            <p className="text-white/80 leading-relaxed">
              Subscribe to our newsletter for practical insights on custom AI
              systems, scalable engineering, and enterprise growth.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex justify-between items-center border-b border-white/30 py-5 md:mt-10"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                aria-label="Enter your work email"
                className="w-full placeholder:font-sans placeholder:text-white/40 bg-transparent outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="ml-3 flex-shrink-0"
              >
                <img
                  src="/images/arrow.svg"
                  alt="Submit email"
                  className="cursor-pointer hover:opacity-70 transition-opacity"
                />
              </button>
            </form>
            {subscribed && (
              <p className="mt-3 text-sm text-light-brown">
                Thanks for subscribing to BlackZero updates.
              </p>
            )}
          </div>
        </div>

        <div className="copyright-box !justify-center w-full mt-auto">
          <p className="text-center">
            Copyright © 2026 BlackZero Technologies - All Rights Reserved
          </p>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;