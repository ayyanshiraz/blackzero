'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; // Import the Next.js Image component

// --- Arrow Icon Component for Hero ---
const SectionArrowIcon = ({ color = 'black' }: { color?: string }) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 38V10" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 26L24 38L36 26" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// --- Arrow for Credo Title ---
const TitleArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-2">
        <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// --- AnimatedNumber Component (Moved from StatsSection.tsx)---
const AnimatedNumber = ({ endValue, duration = 2000, isVisible }: { endValue: number; duration?: number; isVisible: boolean; }) => {
    const [currentValue, setCurrentValue] = useState(0);
    const frameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isVisible) return;
        const animate = (timestamp: number) => {
            if (startTimeRef.current === null) startTimeRef.current = timestamp;
            const elapsedTime = timestamp - (startTimeRef.current || timestamp);
            const progress = Math.min(elapsedTime / duration, 1);
            const value = Math.floor(progress * endValue);
            setCurrentValue(value);
            if (progress < 1) frameRef.current = requestAnimationFrame(animate);
        };
        frameRef.current = requestAnimationFrame(animate);
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [isVisible, endValue, duration]);

    return <span>{currentValue.toLocaleString()}</span>;
};

// --- Main Stats Section Component (Moved from StatsSection.tsx)---
const StatsSection = () => {
    const [isStatsSectionVisible, setStatsSectionVisible] = useState(false);
    const statsSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStatsSectionVisible(true);
                    observer.unobserve(entry.target);
                }
            }, { threshold: 0.2 }
        );
        const currentRef = statsSectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return () => {
            if (currentRef) observer.disconnect();
        };
    }, []);

    const statsData = [
        { number: 50, suffix: '+', label: 'Registered Clients' },
        { number: 100, suffix: 'M+', label: 'Worth of Sales' },
        { number: 9, suffix: '', label: 'Countries Covered' },
    ];

    return (
        <section ref={statsSectionRef} className="bg-white py-16">
            <div className={`container mx-auto px-8 sm:px-16 md:px-24 grid grid-cols-1 sm:grid-cols-3 gap-y-12 text-center transition-opacity duration-1000 ${isStatsSectionVisible ? 'opacity-100' : 'opacity-0'}`}>
                {statsData.map((stat, index) => (
                    <div 
                        key={index} 
                        className={`
                            flex flex-col items-center justify-center px-4
                            ${index < statsData.length - 1 ? 'sm:border-r sm:border-gray-300' : ''}
                        `} 
                    >
                        <div className="text-5xl md:text-6xl font-extrabold text-black mb-2">
                            <AnimatedNumber endValue={stat.number} isVisible={isStatsSectionVisible} />
                            {stat.suffix}
                        </div>
                        <span className="text-lg md:text-xl text-gray-600">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};


// --- Main About Page Component ---
export default function AboutPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [isStudioSectionVisible, setStudioSectionVisible] = useState(false);
    const [isCeoMessageVisible, setIsCeoMessageVisible] = useState(false);
    const [isCredoSectionVisible, setCredoSectionVisible] = useState(false);
    const [isStorySectionVisible, setStorySectionVisible] = useState(false);
    const [isVisionSectionVisible, setVisionSectionVisible] = useState(false);
    const [isMissionSectionVisible, setMissionSectionVisible] = useState(false);
    const [isApproachSectionVisible, setApproachSectionVisible] = useState(false);
    const [isValuesSectionVisible, setValuesSectionVisible] = useState(false);

    const studioSectionRef = useRef<HTMLDivElement>(null);
    const ceoMessageRef = useRef<HTMLDivElement>(null);
    const credoSectionRef = useRef<HTMLDivElement>(null);
    const storySectionRef = useRef<HTMLDivElement>(null);
    const visionSectionRef = useRef<HTMLDivElement>(null);
    const missionSectionRef = useRef<HTMLDivElement>(null);
    const approachSectionRef = useRef<HTMLDivElement>(null);
    const valuesSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);

        const createObserver = (callback: React.Dispatch<React.SetStateAction<boolean>>) => {
            return new IntersectionObserver(
                ([entry], obs) => {
                    if (entry.isIntersecting) {
                        callback(true);
                        obs.unobserve(entry.target);
                    }
                }, { threshold: 0.2 }
            );
        };

        const refsToObserve = [
            { ref: studioSectionRef, callback: setStudioSectionVisible },
            { ref: ceoMessageRef, callback: setIsCeoMessageVisible },
            { ref: credoSectionRef, callback: setCredoSectionVisible },
            { ref: storySectionRef, callback: setStorySectionVisible },
            { ref: visionSectionRef, callback: setVisionSectionVisible },
            { ref: missionSectionRef, callback: setMissionSectionVisible },
            { ref: approachSectionRef, callback: setApproachSectionVisible },
            { ref: valuesSectionRef, callback: setValuesSectionVisible },
        ];

        const observers = refsToObserve.map(({ callback }) => createObserver(callback));

        refsToObserve.forEach(({ ref }, index) => {
            if (ref.current) {
                observers[index].observe(ref.current);
            }
        });

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, []);

    const heroBackgroundStyle = {
        backgroundColor: '#000000',
        backgroundImage: `url('/team.jpg')`, // Hero background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
    
    const credoBackgroundStyle = {
        backgroundColor: '#000000',
        backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.07) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.07) 2px, transparent 2px)
        `,
        backgroundSize: '2rem 2rem',
    };

    const mainDescription = "We provide all the nourishment that any business needs to grow and succeed. Hence we are your partner in building brands, creating experience and transforming business.";
    
    // ✅ AMENDED CODE: Fixed unescaped apostrophes
    const credoItems = [
        { num: '01', title: 'NEVER STOP LEARNING', desc: 'With curiosity in our hearts & minds we constantly keep evolving & learning.' },
        { num: '02', title: 'NOT A PROBLEM', desc: 'We take the problem as a problem rather than a challenge to go out of the box for its solutions.' },
        { num: '03', title: 'PERSEVERE', desc: 'It&apos;s not about just one long race, rather many short races one after the other.' },
        { num: '04', title: 'COMMITMENT', desc: 'Commitment means a STOP to freedom of action. It&apos;s the commitment that backs our every action.' },
        { num: '05', title: 'HONESTY', desc: 'Honesty fosters trust and respect, which is what we strive for. It is hard for us to have an effect unless we are honest.' },
        { num: '06', title: 'THINK BIG', desc: 'We never settle for short-term achievements rather focus on the bigger picture to go beyond the limits.' },
    ];

    const valuesContent = [
        { title: 'Innovation:', text: 'We explore the latest digital marketing tools. Our fresh and effective solutions meet modern industry needs in Lahore.' },
        { title: 'Creativity:', text: 'Original content and innovative ideas are at our core. Engaging visuals strengthen your brand identity.' },
        { title: 'Collaboration:', text: 'Close coordination with every client ensures open communication. Seamless teamwork is a key part of every project.' },
        { title: 'Results Focus:', text: 'Our focus is on achieving measurable outcomes. We align all efforts with your specific business goals.' },
        { title: 'Integrity:', text: 'Honest marketing practices guide our work. We build lasting trust through transparent communication.' },
    ];

    return (
        <div className="font-sans overflow-hidden">
            <style jsx>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                .fade-in-up {
                    opacity: 0;
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                .headline-shadow {
                    text-shadow: 2px 2px 0px rgba(128, 128, 128, 0.3);
                }
                .image-pop-on-hover {
                    transition: transform 0.3s ease-in-out;
                }
                .image-pop-on-hover:hover {
                    transform: scale(1.05);
                }
            `}</style>

            {/* ---------- HERO SECTION (Image Added, Graphic & Right Text Removed, Left Text Centered) ---------- */}
            <div style={heroBackgroundStyle} className="relative text-white">
                {/* Dark overlay with blur for text readability */}
                <div className="absolute inset-0 bg-black/60 z-10 backdrop-filter backdrop-blur-[2px]"></div> 
                
                <main className="relative z-20 container mx-auto px-8 flex items-center justify-center min-h-screen">
                    <div className={`max-w-4xl text-center ${isMounted ? 'fade-in-up' : 'opacity-0'}`}>
                        <h1 className="text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-none mb-8">
                            ABOUT US
                        </h1>
                        <p className="text-lg md:text-xl leading-relaxed">
                            {mainDescription}
                        </p>
                    </div>
                </main>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                    <SectionArrowIcon color="white" />
                </div>
            </div>

            <section ref={studioSectionRef} className="bg-white text-black py-20">
                <div className="container mx-auto px-8 lg:px-48 text-center flex flex-col items-center">
                    {/* ✅ AMENDED CODE: Fixed unescaped apostrophe */}
                    <h2 className={`text-3xl md:text-4xl font-extrabold text-black uppercase tracking-wider headline-shadow ${isStudioSectionVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                        We&apos;re a Multidisciplinary<br/>Creative & Digital Studio!
                    </h2>
                    {/* ✅ AMENDED CODE: Fixed unescaped apostrophe */}
                    <p className={`mt-6 max-w-5xl text-gray-700 uppercase text-base md:text-lg ${isStudioSectionVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                        We are a team of out-of-the-box thinkers, creators & groundbreakers, ready to boost your brand&apos;s image and impression via new and inventive marketing techniques. We create novel yet actionable concepts across a variety of BUSINESS TYPES.
                    </p>
                </div>
            </section>

            {/* ---------- CEO MESSAGE SECTION ---------- */}
            <section ref={ceoMessageRef} className="bg-white text-black py-24 overflow-hidden">
                <div className="container mx-auto px-8 sm:px-16 md:px-24 flex flex-col md:flex-row items-center justify-center gap-16">
                    <div className={`md:w-1/2 text-left transition-all duration-1000 ease-out ${isCeoMessageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">CEO Message</h2>
                        <p className="mt-4 text-gray-800 text-lg leading-relaxed max-w-2xl">
                            "At Black Zero, we believe in the power of partnership. Our journey began with a simple vision: to create a multi domain company that not only delivers exceptional results but also builds lasting relationships based on trust and transparency. We are more than just a service provider; we are an extension of your team, dedicated to understanding your challenges and achieving your goals. Thank you for entrusting us with your vision. We look forward to growing together."
                        </p>
                    </div>
                    <div className={`md:w-1/2 flex justify-center transition-all duration-1000 ease-out ${isCeoMessageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
                        {/* ✅ AMENDED CODE: Replaced <img> with <Image> */}
                        <Image src="/Team/ceo1.png" alt="CEO of Black Zero" width={800} height={800} className="rounded-xl shadow-xl w-full max-w-md h-auto object-cover image-pop-on-hover "/>
                    </div>
                </div>
            </section>
            
            <section ref={credoSectionRef} style={credoBackgroundStyle} className="py-24 text-white">
                <div className="container mx-auto px-12 md:px-24 lg:px-32">
                    <h2 className={`text-2xl font-bold text-center tracking-widest uppercase ${isCredoSectionVisible ? 'fade-in-up' : 'opacity-0'}`}>
                        THE BLACK ZERO DOCTRINE <TitleArrowIcon />
                    </h2>
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-16">
                        {credoItems.map((item, index) => (
                            <div key={item.num} className={`py-12 text-left ${index < 4 ? 'border-b border-gray-700' : ''} ${isCredoSectionVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-full flex-shrink-0 flex items-center justify-center text-black font-bold text-xl">{item.num}</div>
                                    <h3 className="text-xl font-extrabold uppercase tracking-wider">{item.title}</h3>
                                </div>
                                <p className="mt-4 text-gray-300 max-w-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section ref={storySectionRef} className="bg-white py-24 overflow-hidden">
                <div className="container mx-auto px-8 sm:px-16 md:px-24 flex flex-col md:flex-row items-center justify-center gap-16">
                    <div className={`md:w-1/2 flex justify-center transition-all duration-1000 ease-out ${isStorySectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        {/* ✅ AMENDED CODE: Replaced <img> with <Image> */}
                        <Image src="/ourstory.png" alt="Our Story" width={800} height={600} className="rounded-xl shadow-xl w-full max-w-lg h-auto object-cover image-pop-on-hover "/>
                    </div>
                    <div className={`md:w-1/2 text-left transition-all duration-1000 ease-out ${isStorySectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
                        <h2 className="text-black text-4xl md:text-5xl font-extrabold leading-tight mb-6">Our Story</h2>
                        <p className="mt-4 text-gray-800 text-lg leading-relaxed max-w-2xl">Black Zero was launched in Lahore with one clear purpose: to help businesses grow through effective digital marketing. Our team combines hands-on experience in content strategy, design, and technical skills to connect brands with their ideal audience online. Since day one, we&apos;ve collaborated with startups and businesses across Pakistan and all over the world to build a stronger digital presence. By understanding market needs and business goals, we develop data-driven strategies that enhance online visibility and earn lasting customer trust.</p>
                    </div>
                </div>
            </section>

            <StatsSection />
            
            <section ref={visionSectionRef} className="bg-black text-white py-24 overflow-hidden">
                <div className="container mx-auto px-8 sm:px-16 md:px-24 flex flex-col md:flex-row items-center justify-center gap-16">
                    <div className={`md:w-1/2 text-left transition-all duration-1000 ease-out ${isVisionSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <h2 className="text-white text-4xl md:text-5xl font-extrabold leading-tight mb-6">Our Vision</h2>
                        <p className="mt-4 text-gray-300 text-lg leading-relaxed max-w-2xl">At Black Zero, we envision reshaping the digital marketing landscape in Lahore and throughout Pakistan. We strive to become the most trusted agency by delivering high-impact strategies that fuel long-term growth and deep customer engagement for every business, from startups to large enterprises. Our purpose is to empower Pakistani brands, enabling them to build a strong online presence, compete effectively in global markets, and innovate with cutting-edge marketing techniques. We are the reliable partner businesses can count on to consistently provide measurable outcomes, overcome digital challenges, and achieve lasting success.</p>
                    </div>
                    <div className={`md:w-1/2 flex justify-center transition-all duration-1000 ease-out ${isVisionSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
                        {/* ✅ AMENDED CODE: Replaced <img> with <Image> */}
                        <Image src="/ourvision.png" alt="Our Vision" width={800} height={600} className="rounded-xl shadow-xl w-full max-w-lg h-auto object-cover image-pop-on-hover border-2 border-gray-700 "/>
                    </div>
                </div>
            </section>

            <section ref={missionSectionRef} className="bg-white text-black py-24 overflow-hidden">
                <div className="container mx-auto px-8 sm:px-16 md:px-24 flex flex-col md:flex-row items-center justify-center gap-16">
                    <div className={`md:w-1/2 flex justify-center transition-all duration-1000 ease-out ${isMissionSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        {/* ✅ AMENDED CODE: Replaced <img> with <Image> */}
                        <Image src="/ourmission.png" alt="Our Mission" width={800} height={600} className="rounded-xl shadow-xl w-full max-w-lg h-auto object-cover image-pop-on-hover border-2 border-gray-300 "/>
                    </div>
                    <div className={`md:w-1/2 text-left transition-all duration-1000 ease-out ${isMissionSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
                        <h2 className="text-black text-4xl md:text-5xl font-extrabold leading-tight mb-6">Our Mission</h2>
                        <p className="mt-4 text-gray-800 text-lg leading-relaxed max-w-2xl">Black Zero is a professional digital marketing company in Lahore, dedicated to helping businesses, organizations, and political campaigns grow online. We specialize in expert SEO, social media marketing, content strategy, and paid advertising to connect clients with their ideal audience. Our goal is to provide services that drive tangible growth, based on extensive research and industry experience. Founded to bridge the gap between digital platforms and business goals, our team creates custom solutions. Every campaign is built around your specific audience and business objectives.</p>
                    </div>
                </div>
            </section>

            <section ref={approachSectionRef} className="bg-black text-white py-24 overflow-hidden">
                <div className="container mx-auto px-8 sm:px-16 md:px-24 flex flex-col md:flex-row items-center justify-center gap-16">
                    <div className={`md:w-1/2 text-left transition-all duration-1000 ease-out ${isApproachSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <h2 className="text-white text-4xl md:text-5xl font-extrabold leading-tight mb-6">Our Approach</h2>
                        <p className="mt-4 text-gray-300 text-lg leading-relaxed max-w-2xl">A leading digital marketing company in Lahore, we deliver exceptional digital marketing, PR, and brand activations. Our approach is driven by data-backed strategies that enhance brand visibility, foster customer engagement, and build a powerful online presence for businesses and public figures across Pakistan. Whether it&apos;s launching impactful social media campaigns, handling public relations for strong reputation management, or executing unique on-ground activations, our goal is to achieve measurable marketing results. We partner closely with clients to guarantee every strategy aligns with their brand objectives, helping them succeed in a competitive market and form lasting customer relationships.</p>
                    </div>
                    <div className={`md:w-1/2 flex justify-center transition-all duration-1000 ease-out ${isApproachSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
                        {/* ✅ AMENDED CODE: Replaced <img> with <Image> */}
                        <Image src="/ourapproach.png" alt="Our Approach" width={800} height={600} className="rounded-xl shadow-xl w-full max-w-lg h-auto object-cover image-pop-on-hover "/>
                    </div>
                </div>
            </section>

            <section ref={valuesSectionRef} className="bg-white text-black py-24 overflow-hidden">
                <div className="container mx-auto px-8 sm:px-16 md:px-24 flex flex-col md:flex-row items-center justify-center gap-16">
                    <div className={`md:w-1/2 flex justify-center transition-all duration-1000 ease-out ${isValuesSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        {/* ✅ AMENDED CODE: Replaced <img> with <Image> */}
                        <Image src="/ourvalues.png" alt="Our Values" width={800} height={600} className="rounded-xl shadow-xl w-full max-w-lg h-auto object-cover image-pop-on-hover border-2 border-gray-200 "/>
                    </div>
                    <div className={`md:w-1/2 text-left transition-all duration-1000 ease-out ${isValuesSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
                        <h2 className="text-black text-4xl md:text-5xl font-extrabold leading-tight mb-6">Our Values</h2>
                        <ul className="space-y-4 text-lg text-gray-800 leading-relaxed max-w-2xl">
                            {valuesContent.map((item, index) => (
                                <li key={index}>
                                    <span className="font-bold text-black">{item.title}</span> {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}