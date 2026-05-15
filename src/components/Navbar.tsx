"use client";

import React, { useState, useEffect } from "react";

const navLinks = [
  { name: `Home`, href: `/` },
  { name: `Services`, href: `/services` },
  { name: `About`, href: `/about` },
  { name: `Our Products`, href: `/products` },
  { name: `Customized Solutions`, href: `/customized-solutions` },
  { name: `Turnitin`, href: `/turnitin` },
  { name: `Our Projects`, href: `/projects` },
  { name: `Contact`, href: `/contact` },

];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        setIsOpen(false);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener(`scroll`, handleScroll);
    return () => window.removeEventListener(`scroll`, handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled 
          ? `bg-transparent border-transparent` 
          : `border-b border-white/5 bg-black/10 backdrop-blur-md`
      }`}
    >
      <div 
        className={`container mx-auto transition-all duration-500 flex justify-between items-center h-16 md:h-[72px] ${
          isScrolled ? `px-3 md:px-9` : `px-6 md:px-12`
        }`}
      >
        
        {/* Logo Section */}
        <div className={`flex items-center cursor-pointer h-full`}>
          <h1 
            className={`text-white whitespace-nowrap transition-all duration-500 ease-out flex items-center h-full ${
              isScrolled 
                ? `opacity-100 translate-x-0 pointer-events-auto` 
                : `opacity-0 -translate-x-8 pointer-events-none`
            }`} 
            style={{
              fontFamily: `cursive, "Brush Script MT", "Lucida Handwriting"`,
              fontSize: `1.8rem`,
              fontWeight: `700`,
              textShadow: `2px 2px 0px #222123, 0px 4px 10px rgba(0,0,0,0.5)`,
              letterSpacing: `-1px`
            }}
          >
            BlackZero
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div 
          className={`flex items-center transition-all duration-500 ${
            isScrolled ? `opacity-0 pointer-events-none translate-y-[-10px]` : `opacity-100 translate-y-0`
          }`}
        >
          <div className={`hidden md:flex items-center gap-10`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-white text-sm font-bold uppercase tracking-widest hover:text-light-brown transition-colors duration-300 flex items-center`}
              >
                {link.name}
              </a>
            ))}
            
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden text-white flex flex-col gap-1.5 ml-auto`} 
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={`h-0.5 w-6 bg-white transition-transform ${isOpen ? `rotate-45 translate-y-2` : ``}`}></div>
            <div className={`h-0.5 w-6 bg-white transition-opacity ${isOpen ? `opacity-0` : `opacity-100`}`}></div>
            <div className={`h-0.5 w-6 bg-white transition-transform ${isOpen ? `-rotate-45 -translate-y-2` : ``}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl transition-all duration-500 overflow-hidden ${isOpen && !isScrolled ? `max-h-screen border-b border-white/10` : `max-h-0`}`}>
        <div className={`flex flex-col items-center py-10 gap-8`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-white text-xl font-bold uppercase tracking-widest flex items-center`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className={`mt-4 bg-light-brown text-white px-10 py-4 rounded-full font-bold uppercase`}>
            Start A Project
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;