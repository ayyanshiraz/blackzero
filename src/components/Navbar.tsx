"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { productsData } from "@/app/products/data";
<<<<<<< HEAD
// SplashCursor removed from Navbar — the hero section owns the single shared instance
=======
>>>>>>> 049a88de9658d0dfd1f3fb068e364d71a6776604

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
            
<<<<<<< HEAD
            {/* Dropdown Menu */}
=======
>>>>>>> 049a88de9658d0dfd1f3fb068e364d71a6776604
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

<<<<<<< HEAD
=======
const MobileDropdown = ({ title, items, mainHref, onLinkClick }: { title: string; items: { name: string; href: string }[]; mainHref: string; onLinkClick: () => void; }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`flex flex-col items-center w-full`}>
            {/* The relative container below keeps the text perfectly centered, while the absolute button places the icon to the side without affecting alignment */}
            <div className={`relative flex items-center justify-center`}>
                <Link href={mainHref} className={`py-4 text-xl font-bold`} onClick={onLinkClick}>{title}</Link>
                <button onClick={() => setIsOpen(!isOpen)} className={`absolute left-full ml-1 p-2 text-white/70`}>
                    <svg className={[`w-5 h-5 transition-transform duration-300`, isOpen ? `rotate-180` : ``].join(` `)} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`} xmlns={`http://www.w3.org/2000/svg`}>
                        <path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2.5`} d={`M19 9l-7 7-7-7`}></path>
                    </svg>
                </button>
            </div>
            <div className={[`flex flex-col items-center w-full overflow-hidden transition-all duration-300`, isOpen ? `max-h-96 opacity-100 mb-2` : `max-h-0 opacity-0`].join(` `)}>
                {items.map((item) => (
                    <Link key={item.name} href={item.href} className={`py-2.5 text-base font-medium text-white/70`} onClick={onLinkClick}>
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

>>>>>>> 049a88de9658d0dfd1f3fb068e364d71a6776604
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

<<<<<<< HEAD
    
=======
>>>>>>> 049a88de9658d0dfd1f3fb068e364d71a6776604
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

<<<<<<< HEAD
    // Floating pill shape styles
=======
>>>>>>> 049a88de9658d0dfd1f3fb068e364d71a6776604
    const navClassName = [
        `fixed top-5 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 z-[100] bg-black rounded-full border border-white/10 transition-all duration-500 force-arial`,
        hasMounted && scrolled ? `shadow-2xl py-1` : `py-2`
    ].join(` `);

    return (
        <nav className={navClassName}>
<<<<<<< HEAD
            {/* Added .force-arial rule to strictly override global link/button fonts */}
=======
>>>>>>> 049a88de9658d0dfd1f3fb068e364d71a6776604
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
                
<<<<<<< HEAD
                {/* Logo Area */}
=======
>>>>>>> 049a88de9658d0dfd1f3fb068e364d71a6776604
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

<<<<<<< HEAD
                {/* Desktop Nav Items */}
=======
>>>>>>> 049a88de9658d0dfd1f3fb068e364d71a6776604
                <div className={`hidden lg:flex items-center justify-center flex-grow gap-4 xl:gap-6`}>
                    <Dropdown title={`Services`} items={servicesItems} mainHref={`/services`} />
                    <Link href={`/turnitin`} className={`px-3 py-2 text-white/90 text-base font-bold hover:text-white transition-colors duration-300`}>Turnitin</Link>
                    <Dropdown title={`Products`} items={productsItems} mainHref={`/products`} />
                    <Dropdown title={`About`} items={aboutItems} mainHref={`/about`} />
                    <Link href={`/portfolio`} className={`px-3 py-2 text-white/90 text-base font-bold hover:text-white transition-colors duration-300`}>Portfolio</Link>
                </div>

<<<<<<< HEAD
                {/* Contact and Customized Buttons */}
=======
>>>>>>> 049a88de9658d0dfd1f3fb068e364d71a6776604
                <div className={`hidden lg:flex items-center justify-end gap-3`}>
                    <Link href={`/customized-solutions`} className={`bg-white text-black px-7 py-2.5 rounded-full text-base font-bold hover:bg-gray-200 transition-all duration-300 active:scale-95`}>
                        Customized Solutions
                    </Link>
                    <Link href={`/contact`} className={`bg-white text-black px-7 py-2.5 rounded-full text-base font-bold hover:bg-gray-200 transition-all duration-300 active:scale-95`}>
                        Contact Us
                    </Link>
                </div>

<<<<<<< HEAD
                {/* Mobile Toggle */}
=======
>>>>>>> 049a88de9658d0dfd1f3fb068e364d71a6776604
                <div className={`lg:hidden`}>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`text-white p-2 z-50 relative`}>
                        <div className={[`h-0.5 w-6 bg-white transition-all duration-300`, mobileMenuOpen ? `rotate-45 translate-y-1` : `mb-1.5`].join(` `)}></div>
                        <div className={[`h-0.5 w-6 bg-white transition-all duration-300`, mobileMenuOpen ? `-rotate-45 -translate-y-1` : ``].join(` `)}></div>
                    </button>
                </div>
            </div>

<<<<<<< HEAD
            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className={`lg:hidden bg-black/95 backdrop-blur-2xl text-white py-8 absolute top-[calc(100%+1rem)] left-0 w-full max-h-[70vh] overflow-y-auto flex flex-col items-center border border-white/10 rounded-[2.5rem] shadow-2xl z-[120]`}>
                    <Link href={`/services`} className={`py-4 text-xl font-bold`} onClick={handleMobileLinkClick}>Services</Link>
                    <Link href={`/turnitin`} className={`py-4 text-xl font-bold`} onClick={handleMobileLinkClick}>Turnitin</Link>
                    <Link href={`/products`} className={`py-4 text-xl font-bold`} onClick={handleMobileLinkClick}>Products</Link>
                    <Link href={`/about`} className={`py-4 text-xl font-bold`} onClick={handleMobileLinkClick}>About</Link>
=======
            {mobileMenuOpen && (
                <div className={`lg:hidden bg-black/95 backdrop-blur-2xl text-white py-8 absolute top-[calc(100%+1rem)] left-0 w-full max-h-[70vh] overflow-y-auto flex flex-col items-center border border-white/10 rounded-[2.5rem] shadow-2xl z-[120]`}>
                    <MobileDropdown title={`Services`} items={servicesItems} mainHref={`/services`} onLinkClick={handleMobileLinkClick} />
                    <Link href={`/turnitin`} className={`py-4 text-xl font-bold`} onClick={handleMobileLinkClick}>Turnitin</Link>
                    <MobileDropdown title={`Products`} items={productsItems} mainHref={`/products`} onLinkClick={handleMobileLinkClick} />
                    <MobileDropdown title={`About`} items={aboutItems} mainHref={`/about`} onLinkClick={handleMobileLinkClick} />
>>>>>>> 049a88de9658d0dfd1f3fb068e364d71a6776604
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