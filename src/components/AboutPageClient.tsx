'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ImageContent {
    imageUrl: string;
    alt: string;
}

interface AboutPageContent {
    hero: ImageContent;
    ceo: ImageContent;
    story: ImageContent;
    vision: ImageContent;
    mission: ImageContent;
    approach: ImageContent;
    values: ImageContent;
}

const SectionArrowIcon = ({ color = 'black' }: { color?: string }) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 38V10" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 26L24 38L36 26" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TitleArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-2">
        <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default function AboutPageClient({ content }: { content: AboutPageContent }) {
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
        backgroundImage: `url('${content.hero.imageUrl}')`,
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

    const mainDescription = "We engineer custom ERP, CRM, and AI automation solutions to scale operations for mid-market and enterprise teams across the US.";
    
    const credoItems = [
        { num: '01', title: 'NEVER STOP LEARNING', desc: 'With curiosity in our hearts & minds we constantly keep evolving & learning.' },
        { num: '02', title: 'NOT A PROBLEM', desc: 'We take the problem as a problem rather than a challenge to go out of the box for its solutions.' },
        { num: '03', title: 'PERSEVERE', desc: 'Its not about just one long race, rather many short races one after the other.' },
        { num: '04', title: 'COMMITMENT', desc: 'Commitment means a STOP to freedom of action. Its the commitment that backs our every action.' },
        { num:'05', title: 'HONESTY', desc: 'Honesty fosters trust and respect, which is what we strive for. It is hard for us to have an effect unless we are honest.' },
        { num: '06', title: 'THINK BIG', desc: 'We never settle for short-term achievements rather focus on the bigger picture to go beyond the limits.' },
    ];

    const valuesContent = [
        { title: 'Innovation:', text: 'We explore the latest enterprise AI tools and data architectures. Our scalable solutions meet modern industrial needs internationally.' },
        { title: 'Security:', text: 'Data integrity and secure cloud infrastructure are at our core. We build robust systems that protect your corporate assets.' },
        { title: 'Collaboration:', text: 'Close coordination with your technical leads ensures open communication. Seamless integration is a key part of every software rollout.' },
        { title: 'Results Focus:', text: 'Our focus is on achieving measurable operational efficiency. We align all development efforts with your specific business goals.' },
        { title: 'Integrity:', text: 'Honest engineering practices guide our work. We build lasting trust through transparent communication and clean codebases.' },
    ];

    return (
        <div className="font-sans overflow-hidden">
            <style jsx>{`
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

            <div style={heroBackgroundStyle} className="relative text-white">
                <div className="absolute inset-0 bg-black/60 z-10 backdrop-filter backdrop-blur-[2px]"></div> 
                
                <main className="relative z-20 container mx-auto px-8 flex items-center justify-center min-h-screen">
                    <div className={`max-w-4xl text-center transition-all duration-1000 ease-out transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                    <h2 className={`text-3xl md:text-4xl font-extrabold text-black uppercase tracking-wider headline-shadow transition-all duration-1000 ease-out delay-200 ${isStudioSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        Custom Enterprise Software<br/>& AI Automation Firm
                    </h2>
                    <p className={`mt-6 max-w-5xl text-gray-700 uppercase text-base md:text-lg transition-all duration-1000 ease-out delay-300 ${isStudioSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        We are a team of elite software engineers and data scientists, ready to modernize your operational infrastructure via secure, scalable enterprise solutions. We create high-performance custom ERP, CRM, and AI architectures across a variety of US corporate sectors.
                    </p>
                </div>
            </section>

            <section ref={ceoMessageRef} className="bg-white text-black py-24 overflow-hidden">
                <div className="container mx-auto px-8 sm:px-16 md:px-24 flex flex-col md:flex-row items-center justify-center gap-16">
                    <div className={`md:w-1/2 text-left transition-all duration-1000 ease-out ${isCeoMessageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">CEO Message</h2>
                        <p className="mt-4 text-gray-800 text-lg leading-relaxed max-w-2xl">
                            "At BlackZero Technologies, we believe in the power of robust engineering. Our journey began with a simple vision: to create an enterprise software firm that not only delivers scalable technical architecture but also builds lasting relationships based on trust and data security. We are more than just an agency; we are an extension of your IT operations, dedicated to resolving operational bottlenecks and automating your growth. Thank you for entrusting us with your digital infrastructure. We look forward to scaling together."
                        </p>
                    </div>
                    <div className={`md:w-1/2 flex justify-center transition-all duration-1000 ease-out ${isCeoMessageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
                        <Image src={content.ceo.imageUrl} alt={content.ceo.alt} width={800} height={800} className="rounded-xl shadow-xl w-full max-w-md h-auto object-cover image-pop-on-hover "/>
                    </div>
                </div>
            </section>
            
            <section ref={credoSectionRef} style={credoBackgroundStyle} className="py-24 text-white">
                <div className="container mx-auto px-12 md:px-24 lg:px-32">
                    <h2 className={`text-2xl font-bold text-center tracking-widest uppercase transition-all duration-1000 ease-out ${isCredoSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        THE BlackZero Technologies DOCTRINE <TitleArrowIcon />
                    </h2>
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-16">
                        {credoItems.map((item, index) => (
                            <div 
                                key={item.num} 
                                className={`py-12 text-left ${index < 4 ? 'border-b border-gray-700' : ''} transition-all duration-1000 ease-out ${isCredoSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
                                style={{ transitionDelay: `${200 + (index * 100)}ms` }}
                            >
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
                        <Image src={content.story.imageUrl} alt={content.story.alt} width={800} height={600} className="rounded-xl shadow-xl w-full max-w-lg h-auto object-cover image-pop-on-hover "/>
                    </div>
                    <div className={`md:w-1/2 text-left transition-all duration-1000 ease-out ${isStorySectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
                        <h2 className="text-black text-4xl md:text-5xl font-extrabold leading-tight mb-6">Our Story</h2>
                        <p className="mt-4 text-gray-800 text-lg leading-relaxed max-w-2xl">BlackZero Technologies was launched with one clear purpose: to help mid-market and enterprise businesses scale through high-performance software engineering. Our team combines deep technical expertise in custom development, secure database architecture, and machine learning models to solve complex operational bottlenecks. Since day one, we have collaborated with organizations across the US to build resilient digital infrastructures. By understanding complex workflows, we engineer bespoke solutions that streamline enterprise operations and ensure long-term stability.</p>
                    </div>
                </div>
            </section>

            <section ref={visionSectionRef} className="bg-black text-white py-24 overflow-hidden">
                <div className="container mx-auto px-8 sm:px-16 md:px-24 flex flex-col md:flex-row items-center justify-center gap-16">
                    <div className={`md:w-1/2 text-left transition-all duration-1000 ease-out ${isVisionSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <h2 className="text-white text-4xl md:text-5xl font-extrabold leading-tight mb-6">Our Vision</h2>
                        <p className="mt-4 text-gray-300 text-lg leading-relaxed max-w-2xl">At BlackZero Technologies, we envision reshaping enterprise digital infrastructure globally. We strive to become the most trusted technology partner by delivering secure, scalable software architectures that fuel long-term growth and operational efficiency for every business. Our purpose is to empower organizations with automation, enabling them to build a flawless digital foundation, compete effectively in fast-paced markets, and innovate with cutting-edge AI technologies. We are the engineering team businesses count on to execute flawless deployments and achieve lasting technical superiority.</p>
                    </div>
                    <div className={`md:w-1/2 flex justify-center transition-all duration-1000 ease-out ${isVisionSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
                        <Image src={content.vision.imageUrl} alt={content.vision.alt} width={800} height={600} className="rounded-xl shadow-xl w-full max-w-lg h-auto object-cover image-pop-on-hover border-2 border-gray-700 "/>
                    </div>
                </div>
            </section>

            <section ref={missionSectionRef} className="bg-white text-black py-24 overflow-hidden">
                <div className="container mx-auto px-8 sm:px-16 md:px-24 flex flex-col md:flex-row items-center justify-center gap-16">
                    <div className={`md:w-1/2 flex justify-center transition-all duration-1000 ease-out ${isMissionSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <Image src={content.mission.imageUrl} alt={content.mission.alt} width={800} height={600} className="rounded-xl shadow-xl w-full max-w-lg h-auto object-cover image-pop-on-hover border-2 border-gray-300 "/>
                    </div>
                    <div className={`md:w-1/2 text-left transition-all duration-1000 ease-out ${isMissionSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
                        <h2 className="text-black text-4xl md:text-5xl font-extrabold leading-tight mb-6">Our Mission</h2>
                        <p className="mt-4 text-gray-800 text-lg leading-relaxed max-w-2xl">BlackZero Technologies is a specialized software engineering firm dedicated to helping mid-market and enterprise operations scale. We specialize in Custom ERP, Enterprise CRM solutions, AI automation, and secure data analytics to unify fragmented workflows. Our goal is to provide engineering services that drive tangible performance, based on rigorous architectural standards. Founded to bridge the gap between legacy systems and modern cloud capabilities, our team builds custom tools designed around your specific operational logic and business objectives.</p>
                    </div>
                </div>
            </section>

            <section ref={approachSectionRef} className="bg-black text-white py-24 overflow-hidden">
                <div className="container mx-auto px-8 sm:px-16 md:px-24 flex flex-col md:flex-row items-center justify-center gap-16">
                    <div className={`md:w-1/2 text-left transition-all duration-1000 ease-out ${isApproachSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <h2 className="text-white text-4xl md:text-5xl font-extrabold leading-tight mb-6">Our Approach</h2>
                        <p className="mt-4 text-gray-300 text-lg leading-relaxed max-w-2xl">As a leading enterprise technology partner, we deliver exceptional custom software and automation architectures. Our approach is driven by data-backed engineering that enhances system performance, eliminates administrative friction, and builds a secure digital ecosystem for corporate organizations. Whether it is deploying private local LLMs, integrating complex third-party APIs, or migrating legacy databases, our goal is to achieve flawless execution. We partner closely with IT directors to guarantee every deployment aligns with enterprise security standards, helping you dominate your market through technological excellence.</p>
                    </div>
                    <div className={`md:w-1/2 flex justify-center transition-all duration-1000 ease-out ${isApproachSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
                        <Image src={content.approach.imageUrl} alt={content.approach.alt} width={800} height={600} className="rounded-xl shadow-xl w-full max-w-lg h-auto object-cover image-pop-on-hover "/>
                    </div>
                </div>
            </section>

            <section ref={valuesSectionRef} className="bg-white text-black py-24 overflow-hidden">
                <div className="container mx-auto px-8 sm:px-16 md:px-24 flex flex-col md:flex-row items-center justify-center gap-16">
                    <div className={`md:w-1/2 flex justify-center transition-all duration-1000 ease-out ${isValuesSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <Image src={content.values.imageUrl} alt={content.values.alt} width={800} height={600} className="rounded-xl shadow-xl w-full max-w-lg h-auto object-cover image-pop-on-hover border-2 border-gray-200 "/>
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