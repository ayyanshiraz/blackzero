<<<<<<< HEAD
// src/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Service links for the dropdown
const serviceLinks = [
  { name: 'Wet Cupping (Hijama)', href: '/services/wet-cupping' },
  { name: 'Dry & Massage Cupping', href: '/services/dry-cupping' },
  { name: 'Hijama for Pain Relief', href: '/services/hijama-for-pain-relief' },
  { name: 'Hijama for Internal Health', href: '/services/hijama-for-internal-health' },
  { name: 'Hijama for Sports Recovery', href: '/services/hijama-for-sports-recovery' },
  { name: 'Hijama for Detox & Wellness', href: '/services/hijama-for-detox' },
  { name: 'Fire Cupping', href: '/services/fire-cupping' },
  { name: 'Female Face Hijama (Jonk)', href: '/services/female-face-hijama' },
  { name: 'Beauty Hijama', href: '/services/beauty-hijama' },
  { name: 'Hijama for Breast Cysts', href: '/services/breast-cysts' },
  { name: 'Hijama for Baldness', href: '/services/hijama-for-baldness' },
  { name: 'Hijama for Fistula', href: '/services/hijama-for-fistula' },
  { name: 'Hijama for PCOS', href: '/services/pcos' },
];

// Main navigation links
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services', subLinks: serviceLinks },
  { name: 'Blogs', href: '/blog' }, // Added Blogs Section here
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false); // For mobile dropdown
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false); // For desktop dropdown

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    // Close mobile menu on resize if screen becomes larger
    const handleResize = () => {
        if (window.innerWidth >= 768) { // md breakpoint
            setIsMenuOpen(false);
            setIsServicesOpen(false);
        }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
    }
  }, []);

  const showBackground = isScrolled || isMenuOpen || isDesktopServicesOpen;

  // Function to close all menus
  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsDesktopServicesOpen(false); // Also close desktop dropdown if needed
  };


  return (
    <header
      // Added min-h-[60px] or similar if needed to prevent layout shift when bg appears
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out ${
        showBackground ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      {/* Adjusted padding */}
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand Name - Responsive Text Size */}
          <Link href="/" onClick={closeAllMenus} className={`text-xl sm:text-2xl font-bold transition-colors ${showBackground ? 'text-gray-800' : 'text-white'}`}>
            Al Madina Hijama Center
          </Link>

          {/* Desktop Navigation */}
          {/* Adjusted spacing */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group" // Use group hover for dropdown
                onMouseEnter={() => link.subLinks && setIsDesktopServicesOpen(true)}
                onMouseLeave={() => link.subLinks && setIsDesktopServicesOpen(false)}
              >
                <Link
                  href={link.href}
                  onClick={() => !link.subLinks && closeAllMenus()} // Close if not a dropdown trigger
                  // Adjusted text size and hover effect
                  className={`transition-colors text-base lg:text-lg flex items-center py-1 ${
                    showBackground ? 'text-gray-600 hover:text-teal-600' : 'text-gray-200 hover:text-white'
                  }`}
                >
                  {link.name}
                  {link.subLinks && <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDesktopServicesOpen ? 'rotate-180' : ''}`} />}
                </Link>
                {/* Desktop Dropdown */}
                {link.subLinks && (
                  <AnimatePresence>
                    {isDesktopServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        // Adjusted width and positioning
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white rounded-md shadow-lg overflow-hidden ring-1 ring-black ring-opacity-5"
                      >
                        <div className="flex flex-col py-1">
                          {link.subLinks.map((subLink) => (
                            <Link
                              key={subLink.name}
                              href={subLink.href}
                              onClick={closeAllMenus} // Close all menus on sublink click
                              // Adjusted padding and text size
                              className="px-4 py-2 text-sm text-gray-700 hover:bg-teal-600 hover:text-white transition-colors"
                            >
                              {subLink.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            {/* Call Us Button - Responsive Styles */}
            <a
              href="tel:+923007598000"
              // Adjusted padding and text size
              className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-[#FF6900] text-white text-sm sm:text-base font-semibold rounded-lg shadow-md hover:brightness-90 transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Call Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          {/* Adjusted padding/margin if needed */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`transition-colors p-1 ${showBackground ? 'text-gray-800' : 'text-white'}`}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />} {/* Adjusted size */}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            // Ensure background color is set when open
            className="md:hidden mt-2 bg-white rounded-lg shadow-xl overflow-hidden"
          >
            {/* THIS IS THE FIXED LINE:
              We added max-h-[80vh] (or another value like 70vh) to limit the height.
              We added overflow-y-auto to allow scrolling if the content is taller than the max-height.
            */}
            <div className="flex flex-col items-stretch divide-y divide-gray-100 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.name} className="w-full text-center">
                  {link.subLinks ? (
                    <>
                      {/* Container for Link + Toggle Button */}
                      {/* Adjusted padding */}
                      <div className="flex justify-between items-center w-full px-4 py-3">
                        {/* Link for the text part - Navigates to /services */}
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)} // Close menu on navigation
                          // Adjusted text size
                          className="text-gray-700 hover:text-teal-600 text-base font-medium flex-grow text-center mr-2"
                        >
                          {link.name}
                        </Link>
                        {/* Button ONLY for the icon - Toggles dropdown */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsServicesOpen(!isServicesOpen);
                          }}
                          className="text-gray-700 hover:text-teal-600 p-1 flex-shrink-0"
                          aria-label="Toggle services submenu"
                        >
                          <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      {/* Mobile Submenu Dropdown */}
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden bg-gray-50 border-t border-gray-100" // Background for dropdown items
                          >
                            <div className="flex flex-col items-stretch space-y-0 py-2"> {/* Removed space-y */}
                              {link.subLinks.map((subLink) => (
                                <Link
                                  key={subLink.name}
                                  href={subLink.href}
                                  onClick={closeAllMenus} // Close menu when sub-link clicked
                                  // Adjusted text size and padding
                                  className="text-gray-600 hover:text-white hover:bg-teal-600 text-sm py-2.5 px-4 text-center transition-colors"
                                >
                                  {subLink.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    // Regular link rendering (Home, About Us, Contact)
                    // Adjusted text size and padding
                    <Link
                      href={link.href}
                      onClick={closeAllMenus}
                      className="text-gray-700 hover:text-teal-600 text-base font-medium py-3 block w-full"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              {/* Call Us Button for Mobile Menu */}
              <div className="p-4">
                  <a
                    href="tel:+923007598000"
                    // Adjusted padding and text size
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-[#FF6900] text-white text-base font-semibold rounded-lg shadow-md hover:brightness-90 transition-colors duration-300"
                    onClick={closeAllMenus} // Close menu on click
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us Now
                  </a>
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
=======
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { productsData } from "@/app/products/data";
// SplashCursor removed from Navbar — the hero section owns the single shared instance

const Dropdown = ({ title, items, mainHref }: { title: string; items: { name: string; href: string }[]; mainHref: string; }) => {
    return (
        <div className={`relative group`}>
            <Link
                href={mainHref}
                className={`px-4 py-2 text-white/90 text-base font-bold hover:text-white transition-colors duration-300 flex items-center`}
            >
                {title}
                <svg className={`w-3.5 h-3.5 ml-1.5 opacity-60 transition-transform group-hover:rotate-180`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`} xmlns={`http://www.w3.org/2000/svg`}>
                    <path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2.5`} d={`M19 9l-7 7-7-7`}></path>
                </svg>
            </Link>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 pt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 invisible group-hover:visible z-50 transform translate-y-2 group-hover:translate-y-0`}>
                <div className={`w-72 bg-black border border-white/10 rounded-[2rem] shadow-2xl py-6 px-2`}>
                    {items.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group/item flex items-center px-6 py-2.5 text-white/70 text-base font-bold transition-all duration-200 hover:text-white`}
                        >
                            <span className={`w-0 h-[1.5px] bg-white mr-0 transition-all duration-300 group-hover/item:w-4 group-hover/item:mr-3 opacity-0 group-hover/item:opacity-100`}></span>
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    
    useEffect(() => {
        setHasMounted(true);
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };
        document.addEventListener(`scroll`, handleScroll);
        handleScroll();
        return () => {
            document.removeEventListener(`scroll`, handleScroll);
        };
    }, []);

    const handleMobileLinkClick = () => {
        setMobileMenuOpen(false);
    };

    const servicesItems = [
        { name: `AI and Software Hub`, href: `/services/ai-software-hub` },
        { name: `Data Analytics`, href: `/services/data-analytics` },
        { name: `Advanced Website and Portal Systems`, href: `/services/advanced-websites` },
        { name: `Hybrid SEO Services`, href: `/services/hybrid-seo` },
        { name: `Marketing`, href: `/services/marketing` },
        { name: `Creative Design and Animation Studio`, href: `/services/creative-design-and-animation-studio` },
    ];

    const aboutItems = [
        { name: `About Us`, href: `/about` },
        { name: `Our Team`, href: `/team` },
    ];

    const productsItems = [
        ...(productsData ? productsData.map(product => ({
            name: product.name,
            href: [`/products/`, product.slug].join(``)
        })) : [])
    ];

    // Floating pill shape styles
    const navClassName = [
        `fixed top-5 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 z-[100] bg-black rounded-full border border-white/10 transition-all duration-500 force-arial`,
        hasMounted && scrolled ? `shadow-2xl py-1` : `py-2`
    ].join(` `);

    return (
        <nav className={navClassName}>
            {/* Added .force-arial rule to strictly override global link/button fonts */}
            <style dangerouslySetInnerHTML={{ __html: `
                .force-arial, .force-arial * {
                    font-family: Arial, Helvetica, sans-serif !important;
                }
                @keyframes slideInFromLeft {
                    0%, 100% { transform: translateX(-110%); opacity: 0; }
                    15%, 85% { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideUpFromBottom {
                    0%, 100% { transform: translateY(110%); opacity: 0; }
                    15%, 85% { transform: translateY(0); opacity: 1; }
                }
                .animate-black-loop {
                    animation: slideInFromLeft 5s ease-in-out infinite;
                }
                .animate-zero-loop {
                    animation: slideUpFromBottom 5s ease-in-out infinite;
                    animation-delay: 0.2s;
                }
            `}} />
            
            <div className={`container mx-auto flex items-center justify-between px-6 md:px-8 lg:px-10 h-14 md:h-16 relative z-[120]`}>
                
                {/* Logo Area */}
                <Link href={`/`} className={`text-white flex items-center gap-3 transition-transform duration-300 hover:scale-105`}>
                    <div className={`w-10 h-10 md:w-11 md:h-11 overflow-hidden rounded-full flex items-center justify-center`}>
                        <video
                            className={`w-full h-full object-cover pointer-events-none`}
                            src={`/logovideo3.mp4`}
                            autoPlay loop muted playsInline
                            disablePictureInPicture
                            controls={false}
                            preload={`auto`}
                            tabIndex={-1}
                        />
                    </div>
                    
                    <div className={`overflow-hidden relative h-12 w-28 md:h-14 md:w-32 flex flex-col justify-center`}>
                        <div className={`absolute top-0 text-lg md:text-xl font-extrabold tracking-tighter animate-black-loop`}>
                            BLACK
                        </div>
                        <p className={`absolute bottom-0 text-lg md:text-xl font-extrabold tracking-[0.2em] animate-zero-loop`}>
                            ZERO
                        </p>
                    </div>
                </Link>

                {/* Desktop Nav Items */}
                <div className={`hidden lg:flex items-center justify-center flex-grow gap-4 xl:gap-6`}>
                    <Dropdown title={`Services`} items={servicesItems} mainHref={`/services`} />
                    <Link href={`/turnitin`} className={`px-3 py-2 text-white/90 text-base font-bold hover:text-white transition-colors duration-300`}>Turnitin</Link>
                    <Dropdown title={`Products`} items={productsItems} mainHref={`/products`} />
                    <Dropdown title={`About`} items={aboutItems} mainHref={`/about`} />
                    <Link href={`/portfolio`} className={`px-3 py-2 text-white/90 text-base font-bold hover:text-white transition-colors duration-300`}>Portfolio</Link>
                </div>

                {/* Contact and Customized Buttons */}
                <div className={`hidden lg:flex items-center justify-end gap-3`}>
                    <Link href={`/customized-solutions`} className={`bg-white text-black px-7 py-2.5 rounded-full text-base font-bold hover:bg-gray-200 transition-all duration-300 active:scale-95`}>
                        Customized Solutions
                    </Link>
                    <Link href={`/contact`} className={`bg-white text-black px-7 py-2.5 rounded-full text-base font-bold hover:bg-gray-200 transition-all duration-300 active:scale-95`}>
                        Contact Us
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className={`lg:hidden`}>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`text-white p-2 z-50 relative`}>
                        <div className={[`h-0.5 w-6 bg-white transition-all duration-300`, mobileMenuOpen ? `rotate-45 translate-y-1` : `mb-1.5`].join(` `)}></div>
                        <div className={[`h-0.5 w-6 bg-white transition-all duration-300`, mobileMenuOpen ? `-rotate-45 -translate-y-1` : ``].join(` `)}></div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className={`lg:hidden bg-black/95 backdrop-blur-2xl text-white py-8 absolute top-[calc(100%+1rem)] left-0 w-full max-h-[70vh] overflow-y-auto flex flex-col items-center border border-white/10 rounded-[2.5rem] shadow-2xl z-[120]`}>
                    <Link href={`/services`} className={`py-4 text-xl font-bold`} onClick={handleMobileLinkClick}>Services</Link>
                    <Link href={`/turnitin`} className={`py-4 text-xl font-bold`} onClick={handleMobileLinkClick}>Turnitin</Link>
                    <Link href={`/products`} className={`py-4 text-xl font-bold`} onClick={handleMobileLinkClick}>Products</Link>
                    <Link href={`/about`} className={`py-4 text-xl font-bold`} onClick={handleMobileLinkClick}>About</Link>
                    <Link href={`/portfolio`} className={`py-4 text-xl font-bold`} onClick={handleMobileLinkClick}>Portfolio</Link>
                    <Link href={`/customized-solutions`} onClick={handleMobileLinkClick} className={`mt-6 bg-white text-black px-12 py-4 rounded-full font-bold text-base`}>
                        Customized Solutions
                    </Link>
                    <Link href={`/contact`} onClick={handleMobileLinkClick} className={`mt-4 bg-white text-black px-12 py-4 rounded-full font-bold text-base`}>
                        Contact Us
                    </Link>
                </div>
            )}
        </nav>
    );
}
>>>>>>> aa0485d (Fix hero section layout and padding)
