'use client';

import * as React from 'react';
import Link from 'next/link';
import { productsData } from '@/app/products/data';

// --- Dropdown Menu Component ---
const Dropdown = ({ title, items, mainHref }: { title: string; items: { name: string; href: string }[]; mainHref: string; }) => {
    return (
        <div className="relative group">
            <Link
                href={mainHref}
                className="px-5 py-2 rounded-md flex items-center transition-colors duration-300 text-white hover:bg-white hover:text-black"
            >
                {title}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </Link>
            <div className="absolute top-full left-0 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible z-50">
                <div className="w-56 bg-black border border-gray-700 rounded-md shadow-lg py-1">
                    {items.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white hover:text-black"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function Navbar() {
    const [scrolled, setScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [hasMounted, setHasMounted] = React.useState(false);
    
    const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
    const [mobileAboutOpen, setMobileAboutOpen] = React.useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = React.useState(false);


    React.useEffect(() => {
        setHasMounted(true);
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

    const handleMobileLinkClick = () => {
        setMobileMenuOpen(false);
        setMobileServicesOpen(false);
        setMobileAboutOpen(false);
        setMobileProductsOpen(false);
    };

    const servicesItems = [
        { name: `AI and Software Hub`, href: `/services/ai-software-hub` },
        { name: `Data Analytics`, href: `/services/data-analytics` },
        { name: `Advanced Website and Portal Systems`, href: `/services/advanced-websites` },
        { name: `Hybrid SEO Services (Traditional + AI)`, href: `/services/hybrid-seo` },
        { name: `Marketing`, href: `/services/marketing` },
        { name: `Creative Design and Animation Studio`, href: `/services/creative-design-and-animation-studio` },
    ];

    const aboutItems = [
        { name: `About Us`, href: `/about` },
        { name: `Our Team`, href: `/team` },
    ];

    const productsItems = [
        ...productsData.map(product => ({
            name: product.name,
            href: `/products/${product.slug}`
        })),
        { name: `Customized Solutions`, href: `/customized-solutions` },
    ];

    const navClassName = `fixed top-0 left-0 right-0 z-50 bg-black transition-all duration-300 ${hasMounted && scrolled ? 'shadow-lg' : ''}`;

    return (
        <nav className={navClassName}>
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
            
            <div className="container mx-auto flex items-center justify-between px-4 md:px-10 lg:px-20 py-4">
                <Link href="/" className="text-white flex items-center gap-3">
                    <div className="w-15 h-18 overflow-hidden rounded-full flex items-center justify-center">
                        <video
                            className="w-full h-full object-cover"
                            src="/logovideo3.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            disablePictureInPicture
                            controls={false}
                            preload="auto"
                        />
                    </div>
                    <div className="overflow-hidden relative h-17 w-32">
                        <div className="absolute text-4xl font-extrabold tracking-tighter animate-black-loop">                            
                            BLACK
                        </div>
                        <p className="absolute bottom-0 text-2xl font-light tracking-widest animate-zero-loop">
                            ZERO
                        </p>
                    </div>
                </Link>

                <div className="hidden md:flex items-center space-x-2 text-white">
                    <Link href="/" className="px-5 py-2 rounded-md transition-colors duration-300 hover:bg-white hover:text-black">Home</Link>
                    <Dropdown title="Services" items={servicesItems} mainHref="/services" />
                    <Dropdown title="About" items={aboutItems} mainHref="/about" />
                    <Dropdown title="Our Products" items={productsItems} mainHref="/products" />
                    <Link href="/turnitin" className="px-5 py-2 rounded-md transition-colors duration-300 hover:bg-white hover:text-black">Turnitin</Link>
                    <Link href="/projects" className="px-5 py-2 rounded-md transition-colors duration-300 hover:bg-white hover:text-black">Our Projects</Link>
                    <Link href="/contact" className="px-5 py-2 rounded-md transition-colors duration-300 hover:bg-white hover:text-black">Contact</Link>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden bg-black text-white py-4 absolute top-full left-0 w-full max-h-[calc(100vh-6.5rem)] overflow-y-auto flex flex-col items-center">
                    <Link href="/" className="block py-2 text-lg" onClick={handleMobileLinkClick}>Home</Link>
                    
                    <div className="w-full flex items-center justify-center py-1">
                        <div className="w-8"></div>
                        <Link href="/services" className="text-lg font-bold" onClick={handleMobileLinkClick}>
                            Services
                        </Link>
                        <button
                            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                            className="w-8 flex items-center justify-center p-2"
                            aria-label="Toggle Services submenu"
                        >
                            <svg className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>
                    {mobileServicesOpen && (
                        <div className="bg-black py-2"> 
                            {servicesItems.map(item => (
                                <Link key={item.name} href={item.href} className="block text-center py-1 text-white" onClick={handleMobileLinkClick}>{item.name}</Link>
                            ))}
                        </div>
                    )}
                    
                    <div className="w-full flex items-center justify-center py-1">
                        <div className="w-8"></div>
                        <Link href="/about" className="text-lg font-bold" onClick={handleMobileLinkClick}>
                            About
                        </Link>
                        <button
                            onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                            className="w-8 flex items-center justify-center p-2"
                            aria-label="Toggle About submenu"
                        >
                            <svg className={`w-4 h-4 transition-transform ${mobileAboutOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>
                    {mobileAboutOpen && (
                        <div className="bg-black py-2">
                            {aboutItems.map(item => (
                                <Link key={item.name} href={item.href} className="block text-center py-1 text-white" onClick={handleMobileLinkClick}>{item.name}</Link>
                            ))}
                        </div>
                    )}

                    <div className="w-full flex items-center justify-center py-1">
                        <div className="w-8"></div>
                        <Link href="/products" className="text-lg font-bold" onClick={handleMobileLinkClick}>
                            Our Products
                        </Link>
                        <button
                            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                            className="w-8 flex items-center justify-center p-2"
                            aria-label="Toggle Our Products submenu"
                        >
                            <svg className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>
                    {mobileProductsOpen && (
                        <div className="bg-black py-2">
                            {productsItems.map(item => (
                                <Link key={item.name} href={item.href} className="block text-center py-1 text-white" onClick={handleMobileLinkClick}>{item.name}</Link>
                            ))}
                        </div>
                    )}

                    <Link href="/turnitin" className="block py-2 text-lg" onClick={handleMobileLinkClick}>Turnitin</Link>
                    <Link href="/projects" className="block py-2 text-lg" onClick={handleMobileLinkClick}>Our Projects</Link>
                    <Link href="/contact" className="block py-2 text-lg" onClick={handleMobileLinkClick}>Contact</Link>
                </div>
            )}
        </nav>
    );
}