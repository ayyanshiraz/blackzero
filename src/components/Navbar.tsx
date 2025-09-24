'use client';
import React, { useState, useEffect } from 'react';

// --- Dropdown Menu Component ---
const Dropdown = ({ title, items, mainHref }: { title: string; items: { name: string; href: string }[]; mainHref: string; }) => {
    return (
        <div className="relative group">
            <a
                href={mainHref}
                className="px-5 py-2 rounded-md flex items-center transition-colors duration-300 text-white hover:bg-white hover:text-black"
            >
                {title}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </a>

            <div className="absolute top-full left-0 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible z-50">
                <div className="w-56 bg-black border border-gray-700 rounded-md shadow-lg py-1">
                    {items.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white hover:text-black"
                        >
                            {item.name}
                        </a>
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
        setHasMounted(true); // Keep for nav shadow logic
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        document.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const servicesItems = [
        { name: 'Marketing', href: '/services/marketing' },
        { name: 'Business Analytics', href: '/services/business-analytics' },
        { name: 'Animation', href: '/services/animation' },
        { name: 'Development', href: '/services/development' },
        { name: 'Graphic Designing', href: '/services/graphic-designing' },
        { name: 'Photography / Videography', href: '/services/photo-video' },
    ];

    const aboutItems = [
        { name: 'Our Team', href: '/team' },
    ];

    const navClassName = `fixed top-0 left-0 right-0 z-50 bg-black transition-all duration-300 ${hasMounted && scrolled ? 'shadow-lg' : ''}`;

    return (
        <nav className={navClassName}>
            {/* New styles for looping animation */}
            <style jsx>{`
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
            `}</style>
            
            <div className="container mx-auto flex items-center justify-between px-10 md:px-20 py-4">
                {/* Logo with looping animation */}
                <a href="/" className="text-white flex items-center gap-3">
                    <div className="w-15 h-18 overflow-hidden rounded-full flex items-center justify-center">
                        <video
                            className="w-full h-full object-cover"
                            src="/logovideo3.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                        />
                    </div>
                    <div className="overflow-hidden relative h-17 w-32"> {/* Container to define animation area */}
                        <h1
                            className="absolute text-4xl font-extrabold tracking-tighter animate-black-loop"
                        >
                            BLACK
                        </h1>
                        <p
                            className="absolute bottom-0 text-2xl font-light tracking-widest animate-zero-loop"
                        >
                            ZERO
                        </p>
                    </div>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-2 text-white">
                    <a href="/" className="px-5 py-2 rounded-md transition-colors duration-300 hover:bg-white hover:text-black">Home</a>
                    <Dropdown title="About" items={aboutItems} mainHref="/about" />
                    <Dropdown title="Services" items={servicesItems} mainHref="/services" />
                    <a href="/projects" className="px-5 py-2 rounded-md transition-colors duration-300 hover:bg-white hover:text-black">Projects</a>
                    <a href="/contact" className="px-5 py-2 rounded-md transition-colors duration-300 hover:bg-white hover:text-black">Contact</a>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-black text-white py-4 absolute top-full left-0 w-full">
                    <a href="/" className="block text-center py-2 text-lg">Home</a>
                    <p className="text-center py-2 text-lg font-bold mt-2">About</p>
                    <a href="/about" className="block text-center py-1 text-gray-200 font-semibold">All About</a>
                    {aboutItems.map(item => (
                        <a key={item.name} href={item.href} className="block text-center py-1 text-gray-400">{item.name}</a>
                    ))}
                    <p className="text-center py-2 text-lg font-bold mt-2">Services</p>
                    <a href="/services" className="block text-center py-1 text-gray-200 font-semibold">All Services</a>
                    {servicesItems.map(item => (
                        <a key={item.name} href={item.href} className="block text-center py-1 text-gray-400">{item.name}</a>
                    ))}
                    <a href="/projects" className="block text-center py-2 text-lg">Projects</a>
                    <a href="/contact" className="block text-center py-2 text-lg">Contact</a>
                </div>
            )}
        </nav>
    );
}