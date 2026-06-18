<<<<<<< HEAD
'use client';

import { Facebook, Instagram, Phone, Mail, MapPin, ChevronRight, Youtube, } from 'lucide-react';
import Link from 'next/link';
import React from 'react'; // Import React for component props

const footerNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blogs', href: '/blog' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
];

const serviceLinks = [
  { name: 'Wet Cupping (Hijama)', href: '/services/wet-cupping' },
  { name: 'Dry & Massage Cupping', href: '/services/dry-cupping' },
  { name: 'Pain Relief', href: '/services/hijama-for-pain-relief' },
  { name: 'Internal Health', href: '/services/hijama-for-internal-health' },
  { name: 'Sports Recovery', href: '/services/hijama-for-sports-recovery' },
  { name: 'Detox & Wellness', href: '/services/hijama-for-detox' },
  { name: 'Fire Cupping', href: '/services/fire-cupping' },
  { name: 'Female Face Hijama (Jonk)', href: '/services/female-face-hijama' },
  { name: 'Beauty Hijama', href: '/services/beauty-hijama' },
  { name: 'Hijama for Breast Cysts', href: '/services/breast-cysts' },
  { name: 'Hijama for Baldness', href: '/services/hijama-for-baldness' },
  { name: 'Hijama for Fistula', href: '/services/hijama-for-fistula' },
  { name: 'Hijama for PCOS', href: '/services/pcos' },
];

// Split serviceLinks into two halves
const halfwayPoint = Math.ceil(serviceLinks.length / 2);
const serviceLinksCol1 = serviceLinks.slice(0, halfwayPoint);
const serviceLinksCol2 = serviceLinks.slice(halfwayPoint);


// --- Custom TikTok Icon SVG (FIXED FOR STYLE) ---
const TikTokIcon = ({
  size = 18, // Default size to match your other icons
  strokeWidth = 2, // Default strokeWidth to match Lucide
  color = "currentColor", // Default color
  ...props
}: React.SVGProps<SVGSVGElement> & {
  size?: number;
  strokeWidth?: number;
  color?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8.04A6 6 0 0 0 12 4v12a4 4 0 1 1-4-4h4" />
  </svg>
);


const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/BestHijamaLahore?rdid=lOFIErwGIK5tyV8I&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AeM63Loxk%2F#', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/almadinahijmacenter/?igsh=MWQybGtiaTBpZmRwYw%3D%3D#', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/@almadinahijamacenter4985', label: 'Youtube' },
  { icon: TikTokIcon, href: 'https://www.tiktok.com/@jameel.ur.rehman81?_t=ZS-90wcqirdBcF&_r=1', label: 'TikTok' },
];

const Footer = () => {
  return (
    <footer className="bg-[#1E4137] text-white pt-12 sm:pt-16 pb-8">
      {/* Container padding 'px-4' will provide the space on the edges for mobile. */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-8 items-start">

          {/* Column 1: Brand Info & Socials (3/12 columns on LG) */}
          {/*
            CHANGES HERE:
            1. 'items-center' (mobile) and 'sm:items-start' (desktop).
            2. 'text-center' (mobile) and 'sm:text-left' (desktop).
          */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left lg:col-span-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-wide">Al Madina Hijama Center</h2>
            <div className="mt-2 max-w-xs">
              <p className="text-base sm:text-lg font-light text-gray-200">
                Prophetic Healing for a Modern World.
              </p>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                Reviving the Sunnah of natural healing.
              </p>
            </div>

            {/* 'mx-auto sm:mx-0' centers blockquote on mobile */}
            <blockquote className="mt-4 sm:mt-6 border-l-4 border-orange-500 pl-3 sm:pl-4 text-left w-full max-w-xs mx-auto sm:mx-0">
              <p className="italic text-gray-300 text-xs sm:text-sm">Whoever performs Hijama on the 17th, 19th or 21st of the lunar month, it is a cure, by Allahs permission.</p>
              <cite className="mt-1 sm:mt-2 block text-xs text-gray-400 not-italic">(Sunan Abi Dawud, 3861)</cite>
            </blockquote>

            <div className="flex space-x-3 sm:space-x-4 mt-4 sm:mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FF6900] p-1.5 rounded-full text-white hover:brightness-90 transition-all transform hover:scale-110"
                >
                  <social.icon size={18} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (2/12 columns on LG) */}
          {/*
            CHANGES HERE:
            1. 'items-center' (mobile) and 'sm:items-start' (desktop).
          */}
          <div className="flex flex-col items-center sm:items-start lg:col-span-2">
            <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wider mb-3 sm:mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2 sm:space-y-3">
              {/* 'justify-center' (mobile) and 'sm:justify-start' (desktop). */}
              {footerNavLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Services (5/12 columns on LG) */}
          {/*
            CHANGES HERE:
            1. 'items-center' (mobile) and 'sm:items-start' (desktop).
          */}
          <div className="flex flex-col items-center sm:items-start lg:col-span-5">
            <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wider mb-3 sm:mb-4">Our Services</h3>
            <nav className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 sm:gap-y-3 w-full">
                {/* Column 1 of Services */}
                <div className="flex flex-col space-y-2 sm:space-y-3">
                    {/* 'justify-center' (mobile) and 'sm:justify-start' (desktop). */}
                    {serviceLinksCol1.map((link) => (
                        <Link key={link.name} href={link.href} className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span>{link.name}</span>
                        </Link>
                    ))}
                </div>
                {/* Column 2 of Services */}
                <div className="flex flex-col space-y-2 sm:space-y-3">
                    {/* 'justify-center' (mobile) and 'sm:justify-start' (desktop). */}
                    {serviceLinksCol2.map((link) => (
                        <Link key={link.name} href={link.href} className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span>{link.name}</span>
                        </Link>
                    ))}
                </div>
            </nav>
          </div>

          {/* Column 4: Hijama Center Contact (2/12 columns on LG) */}
          {/*
            CHANGES HERE:
            1. 'items-center' (mobile) and 'sm:items-start' (desktop).
          */}
          <div className="flex flex-col items-center sm:items-start lg:col-span-2">
            <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wider mb-3 sm:mb-4">Contact Us</h3>
            <div className="flex flex-col space-y-4 sm:space-y-3 text-sm sm:text-base text-gray-300">
              {/* 'justify-center' (mobile) and 'sm:justify-start' (desktop). Set mobile 'gap-3'. */}
              <a href="tel:+923007598000" className="hover:text-white transition-colors flex items-center justify-center sm:justify-start gap-3 sm:gap-2">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"/>
                <span>+92 300 7598000</span>
              </a>
              {/* 'justify-center' (mobile) and 'sm:justify-start' (desktop). Set mobile 'gap-3'. */}
              <a href="mailto:info@almadinahijamacenter.com" className="hover:text-white transition-colors flex items-center justify-center sm:justify-start gap-3 sm:gap-2 break-all">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"/>
                <span>info@almadinahijamacenter.com</span>
              </a>
              
              {/* 'justify-center' (mobile) and 'sm:justify-start' (desktop). */}
             {/* 'justify-center' (mobile) and 'sm:justify-start' (desktop). */}
              <a 
                href={`https://maps.google.com/?q=Al+Madina+Hijama+Center,+Bahria+Town,+Lahore`}
                target={`_blank`}
                rel={`noopener noreferrer`}
                className={`flex items-start justify-center sm:justify-start gap-1 pt-1 hover:text-[#e55e00] transition-colors cursor-pointer`}
              >
                <MapPin className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 sm:mt-1 flex-shrink-0`} />
                {/* text-center (mobile) and sm:text-left (desktop). */}
                <span className={`text-center sm:text-left`}>
                  <span>MashaAllah Center, 213-A, opp. Car Parking Grand Mosque,</span><br className={`sm:hidden`} />
                  <span>Commercial Sector C Bahria Town, Lahore, 53720</span>
                </span>
              </a>
=======
"use client";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";

const FooterSection = () => {
  const isMobile = useMediaQuery({
    query: `(max-width: 768px)`,
  });
  
  const pathname = usePathname();
  const isHomepage = pathname === `/`;

  return (
    <section className={`footer-section ` + (isHomepage ? `bg-transparent` : `bg-[#000000]`)}>
      <div className={`min-h-screen h-auto relative md:pt-[15vh] pt-[10vh] flex flex-col justify-between`}>
        
        <div className={`relative z-10 w-full`}>
          <h2 className={`general-title text-center text-white pt-5 pb-10`}>
            BUILDING THE FUTURE
          </h2>
        </div>

        <div className={`flex-center gap-5 relative z-10 md:mt-10 mt-5`}>
          <a href={`https://www.facebook.com/profile.php?id=61560559093444&mibextid=ZbWKwL`} className={`social-btn`}>
            <img src={`/images/facebook.svg`} alt={`Facebook`} />
          </a>
          <a href={`https://www.instagram.com/blackzerofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D`} className={`social-btn`}>
            <img src={`/images/insta2.svg`} alt={`Instagram`} />
          </a>
          <a href={`https://www.linkedin.com/company/black-zerofficial/posts/?feedView=all&viewAsMember=true`} className={`social-btn`}>
            <img src={`/images/linkedin.svg`} alt={`LinkedIn`} />
          </a>
        </div>

        <div className={`mt-20 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-white font-paragraph md:text-lg font-medium pb-24`}>
          
          <div className={`flex items-start md:gap-24 gap-10 flex-wrap`}>
            <div className={`flex flex-col`}>
              <p className={`text-light-brown mb-4 font-bold uppercase tracking-wider`}>Services</p>
              <a href={`/services/ai-software-hub`} className={`mb-2 hover:text-light-brown transition-colors`}>AI and Software Hub</a>
              <a href={`/services/data-analytics`} className={`mb-2 hover:text-light-brown transition-colors`}>Data Analytics</a>
              <a href={`/services/advanced-websites`} className={`mb-2 hover:text-light-brown transition-colors`}>Advanced Website and Portal Systems</a>
              <a href={`/services/hybrid-seo`} className={`mb-2 hover:text-light-brown transition-colors`}>Hybrid SEO Services (Traditional + AI)</a>
              <a href={`/services/marketing`} className={`mb-2 hover:text-light-brown transition-colors`}>Marketing</a>
              <a href={`/services/creative-design-and-animation-studio`} className={`mb-2 hover:text-light-brown transition-colors`}>Creative Design and Animation Studio</a>
            </div>

            <div className={`flex flex-col`}>
              <p className={`text-light-brown mb-4 font-bold uppercase tracking-wider`}>Company</p>
              <a href={`/blogs`} className={`mb-2 hover:text-light-brown transition-colors`}>Blogs</a>
              <a href={`/careers`} className={`mb-2 hover:text-light-brown transition-colors`}>Careers</a>
              <a href={`/privacy-policy`} className={`mb-2 hover:text-light-brown transition-colors`}>Privacy Policy</a>
            </div>
          </div>

          <div className={`md:max-w-lg`}>
            <p className={`text-white/80 leading-relaxed`}>
              Subscribe to our newsletter for the latest insights in AI development scalable software and tech industry trends.
            </p>
            <div className={`flex justify-between items-center border-b border-white/30 py-5 md:mt-10`}>
              <input
                type={`email`}
                placeholder={`Enter your work email`}
                className={`w-full placeholder:font-sans placeholder:text-white/40 bg-transparent outline-none`}
              />
              <button>
                <img src={`/images/arrow.svg`} alt={`arrow`} className={`cursor-pointer hover:opacity-70 transition-opacity`} />
              </button>
>>>>>>> aa0485d (Fix hero section layout and padding)
            </div>
          </div>

        </div>

<<<<<<< HEAD
        <div className="mt-16 sm:mt-12 pt-8 sm:pt-4 border-t border-gray-200/20 text-center text-xs sm:text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Al Madina Hijama Center - All Rights Reserved</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
=======
        <div className={`copyright-box !justify-center w-full mt-auto relative z-20`}>
          <p className={`text-center`}>Copyright © 2026 Black Zero IT Solutions - All Rights Reserved</p>
        </div>

      </div>
    </section>
  );
};

export default FooterSection;
>>>>>>> aa0485d (Fix hero section layout and padding)
