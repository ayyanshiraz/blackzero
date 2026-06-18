'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// --- Interfaces ---
interface ServiceItem {
    title: string;
    slug: string;
    imageUrl: string;
    imgAltText?: string;
    description: string;
}

// --- Custom Hook for Typing Effect ---
const useTypingEffect = (textToType: string, speed = 50, startCondition = false) => {
    const [typedText, setTypedText] = useState('');
    useEffect(() => {
        if (startCondition && textToType) {
            const intervalId = setInterval(() => {
                setTypedText(current => {
                    if (current.length < textToType.length) {
                        return textToType.slice(0, current.length + 1);
                    }
                    clearInterval(intervalId);
                    return current;
                });
            }, speed);
            return () => clearInterval(intervalId);
        }
    }, [textToType, speed, startCondition]);
    return typedText;
};

// --- ServiceCard Component ---
const ServiceCard = ({ service, index }: { service: ServiceItem, index: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
    const cardRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
            if (entry.isIntersecting) {
                setHasAnimatedIn(true);
            }
        }, { 
            threshold: 0.2
        });

        const currentCardRef = cardRef.current;
        if (currentCardRef) {
            observer.observe(currentCardRef);
        }

        return () => {
            if (currentCardRef) observer.disconnect();
        };
    }, []);

    // --- Mobile-first classes ---
    const mobileScrollClasses = isVisible 
        ? 'opacity-100 -translate-y-2 bg-white shadow-2xl shadow-neutral-400/30' 
        : hasAnimatedIn
            ? 'opacity-100 translate-y-0 bg-black' 
            : 'opacity-0 translate-y-10 bg-black';

    const mobileImageClasses = isVisible ? 'grayscale-0 scale-105' : 'grayscale';
    const mobileTextClasses = isVisible ? 'text-black' : 'text-white';
    const mobileSubTextClasses = isVisible ? 'text-gray-600' : 'text-gray-400';

    return (
        <Link 
            ref={cardRef}
            href={`/services/${service.slug}`}
            key={index} 
            className={`group p-6 rounded-2xl h-full flex flex-col items-start
                transition-all duration-700 ease-in-out 
                ${mobileScrollClasses}
                
                md:opacity-100 md:translate-y-0 md:bg-black md:shadow-none
                md:hover:bg-white md:hover:-translate-y-2 md:hover:shadow-2xl md:hover:shadow-neutral-400/30
            `}
        >
            <div className="relative w-full aspect-video mb-6 overflow-hidden rounded-lg">
                <img
                    src={service.imageUrl}
                    alt={service.imgAltText || `${service.title} service visualization`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out 
                        ${mobileImageClasses}
                        md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105
                    `}
                />
            </div>
            <h3 className={`text-2xl font-bold mb-3 transition-colors duration-500 ease-in-out 
                ${mobileTextClasses}
                md:text-white md:group-hover:text-black
            `}>
                {service.title}
            </h3>
            <p className={`leading-relaxed transition-colors duration-500 ease-in-out 
                ${mobileSubTextClasses}
                md:text-gray-400 md:group-hover:text-gray-600
            `}>
                {service.description}
            </p>
        </Link>
    );
};

// --- Main Client Component ---
export default function ServicesPageClient({ services }: { services: ServiceItem[] }) {
    const heroRef = useRef<HTMLDivElement>(null);
    const [isHeroVisible, setIsHeroVisible] = useState(false);

    useEffect(() => {
        const createObserver = (callback: (isVisible: boolean) => void) => {
            return new IntersectionObserver(([entry], obs) => {
                if (entry.isIntersecting) {
                    callback(true);
                    obs.unobserve(entry.target);
                }
            }, { threshold: 0.1 });
        };

        const heroObserver = createObserver(setIsHeroVisible);
        const currentHeroRef = heroRef.current;
        if (currentHeroRef) heroObserver.observe(currentHeroRef);

        return () => {
            if (currentHeroRef) heroObserver.disconnect();
        };
    }, []);
    
    // --- Typing Logic ---
    const part1Text = "With our extensive range of";
    const part2Text = "EXPERTISE,";
    const part3Text = " we amazingly fulfill most business needs.";

    const typedPart1 = useTypingEffect(part1Text, 50, isHeroVisible);
    const isPart1Complete = typedPart1 === part1Text;
    
    const typedPart2 = useTypingEffect(part2Text, 70, isPart1Complete);
    const isPart2Complete = typedPart2 === part2Text;

    const typedPart3 = ' ' + useTypingEffect(part3Text, 50, isPart2Complete);

    return (
        <div className="font-sans bg-black">
            <style jsx>{`
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
                .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s ease-out forwards; }
                .animate-fade-in-right { opacity: 0; animation: fadeInRight 0.8s ease-out forwards; }
                @keyframes blink { 50% { opacity: 0; } }
                .typing-cursor { display: inline-block; width: 0.5em; height: 1.1em; background-color: white; animation: blink 1s steps(1) infinite; vertical-align: middle; }
            `}</style>
            
            {/* HERO SECTION */}
            <section ref={heroRef} className="relative text-white min-h-[85vh] flex items-center overflow-hidden bg-black pt-32 pb-12 md:py-20">
                <img 
                    src="/services2.webp" 
                    alt="Abstract digital services background representing marketing and technology innovation" 
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 filter blur-[px]"
                />
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                
                <div className="container mx-auto px-6 sm:px-16 md:px-24 lg:px-32 relative z-30">
                    <div className="flex flex-col md:flex-row md:items-stretch justify-between gap-8 md:gap-12">
                        <div className="md:w-1/2 text-center md:text-left flex flex-col justify-center">
                            <div>
                                <h1 className={`text-5xl sm:text-7xl md:text-9xl font-extrabold tracking-tighter leading-none ${isHeroVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
                                    <span className="text-white">WHAT</span><br />
                                    <span>WE DO!</span>
                                </h1>
                                <p className={`text-2xl md:text-4xl font-semibold mt-4 ${isHeroVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>How We HELP!</p>
                            </div>
                        </div>
                        
                        <div className="md:w-1/2 flex flex-col items-center md:items-end justify-end z-10">
                            <div className={`mt-8 md:mt-4 text-center md:text-right w-full ${isHeroVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 0.5s ease-in 0.8s' }}>
                                <p className="text-xl md:text-2xl font-light text-white">{typedPart1}{!isPart1Complete && <span className="typing-cursor"></span>}</p>
                                {isPart1Complete && (
                                    <p className="text-lg md:text-xl text-white mt-1">
                                        <span className="font-bold">{typedPart2}</span>
                                        {typedPart3}
                                        {isPart2Complete && !typedPart3.trim() && <span className="typing-cursor"></span>}
                                    </p> 
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES GRID SECTION */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-6 md:px-16">
                    <div className="text-center mb-16 opacity-100">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-black">Our Core Services</h2>
                        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">A complete suite of creative and technical services to build, launch, and grow your brand.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                           <ServiceCard key={index} service={service} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}