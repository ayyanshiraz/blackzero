'use client';
import React, { useState, useEffect, useRef } from 'react';

// --- Animated Success Timeline Step Component ---
const SuccessStep = ({ number, title, description, alignLeft }: { number: string; title: string; description: string; alignLeft: boolean; }) => {
    const [isVisible, setIsVisible] = useState(false);
    const stepRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.2
            }
        );

        const currentStepRef = stepRef.current;
        if (currentStepRef) {
            observer.observe(currentStepRef);
        }

        return () => {
            if (currentStepRef) {
                observer.unobserve(currentStepRef);
            }
        };
    }, []);

    const stepPosition = alignLeft ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16';
    const textAlign = alignLeft ? 'md:text-left' : 'md:text-right';
    const initialTransform = alignLeft ? '-translate-x-10' : 'translate-x-10';

    const animationClasses = isVisible
        ? 'opacity-100 translate-x-0'
        : `opacity-0 ${initialTransform}`;

    return (
        <div ref={stepRef} className={`relative w-full md:w-1/2 my-8 flex flex-col ${stepPosition} ${alignLeft ? 'items-start' : 'md:items-end'} transition-all duration-700 ease-out ${animationClasses}`}>
            {/* Number Circle for Desktop */}
            <div className={`hidden md:flex absolute top-0 ${alignLeft ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-16 h-16 items-center justify-center bg-black border-2 border-white rounded-full text-white text-2xl font-bold`}>
                {number}
            </div>
            {/* Number Circle for Mobile */}
            <div className="md:hidden flex-shrink-0 w-16 h-16 flex items-center justify-center bg-transparent border-2 border-white rounded-full text-white text-2xl font-bold mb-4">
                {number}
            </div>
            <div className={`w-full ${textAlign}`}>
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-3">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{description}</p>
            </div>
        </div>
    );
};


export default function EcommerceSuccessPage() {
    // UPDATED: Now uses an image for the background, no grid.
    const heroBackgroundStyle = {
        backgroundColor: '#000000',
        backgroundImage: `url('/es.jpg')`, // Added background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const successStepsData = [
        { number: '01', title: 'NICHE & PRODUCT HUNTING', description: "We are here to help you find the problem-solving, game-changing evergreen products that sell regardless of the time and location. Count on us for the product hunt or niche finding we'll make you proud of your decision." },
        { number: '02', title: 'PRODUCT SOURCING', description: 'After thorough market research we pick the best product suppliers. Then we evaluate them through sampling and ensure the product quality as well as quantity. Comparing competitive market rates we help you make profits by selling the quality product at a reasonable price.' },
        { number: '03', title: 'BRANDING', description: "In the game of eCommerce, what you sell doesn't matter to thrive successfully. If you are able to make your ideal customers believe that yours is the only store they need, you win. And the best way to make that happen is eCommerce Branding. We will do your A to Z effective branding to make you stand out in a fiercely competitive ecommerce space." },
        { number: '04', title: 'TRADEMARK & BUSINESS REGISTRATION', description: "We know how hectic, complex and lengthy is the process of giving your business the legal shields. At the same, it's very vital to protect your brand's intellectual property rights." },
        { number: '05', title: 'CREATIVE DESIGNING', description: "With our talented, creative and skilled team of designers we engage, communicate and persuade the audience to sell your services/products in a way that they would love to pay for. We'll boost your marketing with the help of creative visual communication." },
        { number: '06', title: 'WEBSITE DESIGN & DEVELOPMENT', description: 'Utilizing the power of creative designing we build an eye-catching online presence of your business making it completely mobile and user friendly, SEO optimized and highly converting. We\'ll help grow your business with a website design that customers love to visit and buy.' },
        { number: '07', title: 'PERFORMANCE MARKETING', description: "The most vital part of any business is its marketing. No matter if you have the best product in the world and the best offer, no one would be willing to buy until its need is best developed and then fulfilled successfully." },
        { number: '08', title: 'STORE MANAGEMENT', description: 'Forget about the hectic store management operations and focus more on your business goals. Our expert dedicated team looks after your stock, manages abundant carts, handles your product attributes or visibility, and everything in between.' },
        { number: '09', title: 'BUSINESS ANALYSIS AND REPORTING', description: "Numbers speak and the business which can't make sense of their data face a shameful failure. We help businesses trust where they are headed by providing them with detailed analytical reports in a way they can easily understand." },
    ];
    
    const [isInvestVisible, setIsInvestVisible] = useState(false);
    const investRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInvestVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        const currentInvestRef = investRef.current;
        if (currentInvestRef) {
            observer.observe(currentInvestRef);
        }

        return () => {
            if (currentInvestRef) {
                observer.unobserve(currentInvestRef);
            }
        };
    }, []);


    return (
        <div className="bg-black text-white font-sans">
            {/* ---------- HERO SECTION (Image Added, Graphic Placeholder Removed) ---------- */}
            <div style={heroBackgroundStyle} className="relative min-h-screen w-full flex items-center overflow-hidden">
                {/* Dark overlay with blur for text readability */}
                <div className="absolute inset-0 bg-black/70 z-10 backdrop-filter backdrop-blur-[3px]"></div> 
                
                <div className="container mx-auto px-10 md:px-28 h-full flex items-center relative z-20"> {/* Added relative z-20 here */}
                    {/* Text container width reduced further to md:w-1/3 */}
                    <div className="md:w-1/3 text-center md:text-left">
                        <p className="text-2xl md:text-3xl font-light mb-4">The Time Proven Recipe For Effortless</p>
                        <h1 className="text-6xl md:text-8xl font-extrabold uppercase tracking-tighter leading-none">
                            Ecommerce Success!
                        </h1>
                        <p className="mt-6 text-lg text-gray-300 max-w-lg">This 9-step formula is the only thing you need to learn to build a successful eCommerce business from scratch.</p>
                    </div>
                </div>

                {/* Removed the separate image container to use the background image */}
                
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                    <svg className="w-12 h-12 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </div>

            {/* ---------- INTRO SECTION ---------- */}
            <section className="bg-white text-black py-20">
                <div className="container mx-auto px-10 md:px-28 pt-10">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl font-extrabold uppercase tracking-tight mb-6 text-left">
                            If you want to start your own ecommerce business, but...
                        </h2>
                        <p className="text-lg text-gray-700 mb-8 text-left">
                            Have no idea about the most lucrative niche or product... Are confused about the <span className="font-bold">BRAND NAME, LOGO DESIGN, PRODUCT PACKAGING, OR OVERALL BRANDING...</span>
                        </p>
                        <h3 className="text-3xl font-extrabold uppercase tracking-tight text-black text-left">
                            Don't worry anymore now
                        </h3>
                    </div>
                </div>
            </section>
            
            {/* ---------- SUCCESS TIMELINE SECTION ---------- */}
            <section className="bg-black text-white py-20">
                <div className="container mx-auto px-10 md:px-28">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-extrabold uppercase tracking-tight">How we help you succeed in ecommerce without you needing to lift a finger?</h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">Working with our team allows you to save time and money by eliminating going through all the standard business procedures. We will take care of everything from the research and launch of your product, website, branding, and marketing.</p>
                    </div>

                    <div className="relative flex flex-col items-center max-w-5xl mx-auto">
                        <div className="hidden md:block absolute top-8 left-1/2 w-0.5 h-full bg-gray-700 -translate-x-1/2"></div>
                        
                        {successStepsData.map((step, index) => (
                            <SuccessStep 
                                key={step.number}
                                {...step}
                                alignLeft={index % 2 === 0}
                            />
                        ))}
                    </div>
                </div>
            </section>
            
            {/* ---------- INVEST SECTION ---------- */}
            <section 
                ref={investRef} 
                className={`bg-white text-black border-b-8 border-black transition-all duration-700 ease-out ${isInvestVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <div className="container mx-auto text-center py-20 px-12 md:px-40">
                    <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
                        Just invest and leave the rest on our experienced, responsible shoulders.
                    </h2>
                </div>
            </section>
        </div>
    );
}