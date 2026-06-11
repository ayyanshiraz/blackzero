"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { productsData } from "@/app/products/data";
import SplashCursor from "../components/ui/splash-cursor";

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
    const [isHoveringNav, setIsHoveringNav] = useState(false);
    
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
        { name: `Creative Design and Animation Studio`, href: `/services/creative-design` },
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
        `fixed top-5 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 z-[100] bg-black rounded-full border border-white/10 transition-all duration-500 font-[Arial]`,
        hasMounted && scrolled ? `shadow-2xl py-1` : `py-2`
    ].join(` `);

    return (
        <nav 
            className={navClassName}
            onMouseEnter={() => setIsHoveringNav(true)}
            onMouseLeave={() => setIsHoveringNav(false)}
        >
            {isHoveringNav && (
                <div className={`fixed inset-0 z-[110] pointer-events-none rounded-full overflow-hidden`}>
                    <SplashCursor 
                        COLOR_UPDATE_SPEED={10} 
                        BACK_COLOR={{ r: 0, g: 0, b: 0 }} 
                        SPLAT_RADIUS={0.2}
                    />
                </div>
            )}

            {/* ERROR FIXED HERE: Replaced <style jsx> with dangerouslySetInnerHTML */}
            <style dangerouslySetInnerHTML={{ __html: `
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
                            className={`w-full h-full object-cover`}
                            src={`/logovideo3.mp4`}
                            autoPlay loop muted playsInline
                            disablePictureInPicture
                            controls={false}
                            preload={`auto`}
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