'use client';
import React, { useState, useEffect, useRef } from 'react';

// --- Data defined directly in the file to avoid import errors ---
const servicesData = [
    { 
        title: "Marketing", 
        slug: "marketing",
        imageUrl: "/brand-strategy.png",
        description: "We create data-driven strategies that build brand awareness, drive traffic, and generate leads to elevate your digital footprint.",
    },
    { 
        title: "Business Analytics", 
        slug: "business-analytics",
        imageUrl: "/business-analytics.png",
        description: "Unlock the power of your data. We provide comprehensive analytics to help you make informed decisions for sustainable growth.",
    },
    { 
        title: "Animation", 
        slug: "animation",
        imageUrl: "/animation.png",
        description: "Bring your brand to life with stunning 2D and 3D animations, from explainer videos to engaging social media content.",
    },
    { 
        title: "Development", 
        slug: "development",
        imageUrl: "/development.png",
        description: "Our team builds robust, scalable, and user-friendly websites and applications using modern frameworks and technologies.",
    },
    { 
        title: "Graphic Designing", 
        slug: "graphic-designing",
        imageUrl: "/graphic designing.png",
        description: "From logos to complete branding packages, we create a cohesive and memorable brand image through stunning visuals.",
    },
    { 
        title: "Photography / Videography", 
        slug: "photo-video",
        imageUrl: "/photo-video.png",
        description: "High-quality visuals are essential. We capture your products, team, and story in the best light for all your marketing channels.",
    },
];

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

// --- Main Services Page Component ---
export default function ServicesPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const [isHeroVisible, setIsHeroVisible] = useState(false);
    const [isServicesVisible, setIsServicesVisible] = useState(false);

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
        const servicesObserver = createObserver(setIsServicesVisible);
        
        const currentHeroRef = heroRef.current;
        const currentServicesRef = servicesRef.current;

        if (currentHeroRef) heroObserver.observe(currentHeroRef);
        if (currentServicesRef) servicesObserver.observe(currentServicesRef);

        return () => {
            if (currentHeroRef) heroObserver.disconnect();
            if (currentServicesRef) servicesObserver.disconnect();
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

    const typedPart3 = useTypingEffect(part3Text, 50, isPart2Complete);

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
            
            {/* HERO SECTION (Amended) */}
            <section ref={heroRef} className="relative text-white min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden bg-black">
                <img 
                    src="/services2.jpg" 
                    alt="Abstract background" 
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 filter blur-[px]"
                />
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <div className="container mx-auto px-8 sm:px-16 md:px-24 lg:px-32 py-20 relative z-30">
                    <div className="flex flex-col md:flex-row md:items-stretch justify-between gap-12">
                        <div className="md:w-1/2 text-center md:text-left flex flex-col justify-center">
                            <div>
                                <h1 className={`text-7xl md:text-9xl font-extrabold tracking-tighter leading-none ${isHeroVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
                                    <span className="text-white">WHAT</span><br />
                                    <span>WE DO!</span>
                                </h1>
                                <p className={`text-3xl md:text-4xl font-semibold mt-2 ${isHeroVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>How We HELP!</p>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex flex-col items-center md:items-end justify-end z-10">
                            <div className={`mt-4 text-right min-h-[100px] w-full max-w-sm ${isHeroVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 0.5s ease-in 0.8s' }}>
                                <p className="text-xl md:text-2xl font-light text-white">{typedPart1}{!isPart1Complete && <span className="typing-cursor"></span>}</p>
                                {isPart1Complete && (
                                    <p className="text-lg md:text-xl text-white mt-1">
                                        <span className="font-bold">{typedPart2}</span>
                                        {typedPart3}
                                        {isPart2Complete && !typedPart3 && <span className="typing-cursor"></span>}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES GRID SECTION */}
            <section ref={servicesRef} className="bg-white py-24">
                <div className="container mx-auto px-8 md:px-16">
                    <div className={`text-center mb-16 transition-opacity duration-700 ease-in ${isServicesVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-black">Our Core Services</h2>
                        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">A complete suite of creative and technical services to build, launch, and grow your brand.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesData.map((service, index) => (
                            <a 
                                href={`/services/${service.slug}`}
                                key={index} 
                                className={`group p-6 rounded-2xl h-full flex flex-col items-start 
                                        bg-black hover:bg-white 
                                        transition-[background-color,transform,box-shadow] duration-500 ease-in-out 
                                        hover:-translate-y-2 hover:shadow-2xl hover:shadow-neutral-400/30
                                        ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="relative w-full aspect-video mb-6 overflow-hidden rounded-lg">
                                    <img
                                        src={service.imageUrl}
                                        alt={`${service.title} service`}
                                        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out grayscale group-hover:grayscale-0 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 transition-colors duration-500 ease-in-out group-hover:text-black">{service.title}</h3>
                                <p className="text-gray-400 leading-relaxed transition-colors duration-500 ease-in-out group-hover:text-gray-600">{service.description}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

