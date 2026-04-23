'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ServiceType {
    title: string;
    slug: string;
    imageUrl: string;
    imgAltText?: string;
    description: string;
}

interface TeamMemberType {
    imgSrc: string;
    name: string;
    role: string;
    imgAltText?: string;
}

const ArrowRightIcon = () => (<ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" />);

const ServiceCard = ({ service }: { service: ServiceType }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
    const cardRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
            if (entry.isIntersecting) {
                setHasAnimatedIn(true);
            }
        }, { threshold: 0.2 });

        const currentCardRef = cardRef.current;
        if (currentCardRef) observer.observe(currentCardRef);

        return () => {
            if (currentCardRef) observer.disconnect();
        };
    }, []);

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
            href={`/services/${service.slug}`}
            ref={cardRef}
            className={`group p-6 rounded-2xl h-full flex flex-col items-start
                transition-all duration-700 ease-in-out
                ${mobileScrollClasses}
                md:opacity-100 md:translate-y-0 md:bg-black md:shadow-none
                md:hover:bg-white md:hover:-translate-y-2 md:hover:shadow-2xl md:hover:shadow-neutral-400/30
            `}
        >
            <div className="relative w-full aspect-video mb-6 overflow-hidden rounded-lg">
                <Image
                    src={service.imageUrl}
                    alt={service.imgAltText || service.title}
                    fill
                    className={`object-cover transition-all duration-500 ease-in-out
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

const EcommerceGraphic = ({ isVisible }: { isVisible: boolean }) => (
    <div className={`relative p-8 ${isVisible ? 'graphic-animate' : ''}`}>
        <div className="absolute inset-0 border-2 border-dashed border-gray-700 rounded-xl graphic-element" style={{ animationDelay: '0.2s' }}></div>
        <div className="relative flex flex-col items-center gap-4">
            <div className="w-24 h-24 bg-white rounded-full graphic-element" style={{ animationDelay: '0.4s' }}></div>
            <div className="flex gap-4">
                <div className="w-6 h-6 bg-white rounded-full graphic-element" style={{ animationDelay: '0.6s' }}></div>
                <div className="w-6 h-6 bg-white rounded-full graphic-element" style={{ animationDelay: '0.7s' }}></div>
                <div className="w-6 h-6 bg-white rounded-full graphic-element" style={{ animationDelay: '0.8s' }}></div>
            </div>
            <div className="flex gap-4">
                <div className="w-6 h-6 bg-white rounded-full graphic-element" style={{ animationDelay: '0.9s' }}></div>
                <div className="w-6 h-6 bg-white rounded-full graphic-element" style={{ animationDelay: '1.0s' }}></div>
                <div className="w-6 h-6 bg-gray-600 rounded-full graphic-element" style={{ animationDelay: '1.1s' }}></div>
            </div>
            <div className="flex gap-4">
                <div className="w-6 h-6 bg-black border-2 border-gray-700 rounded-full graphic-element" style={{ animationDelay: '1.2s' }}></div>
                <div className="w-6 h-6 bg-black border-2 border-gray-700 rounded-full graphic-element" style={{ animationDelay: '1.3s' }}></div>
                <div className="w-6 h-6 bg-black border-2 border-gray-700 rounded-full graphic-element" style={{ animationDelay: '1.4s' }}></div>
            </div>
        </div>
    </div>
);

const TeamMember = ({ member }: { member: TeamMemberType }) => {
    const [isVisible, setIsVisible] = useState(false);
    const memberRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, { threshold: 0.3 });

        const currentMemberRef = memberRef.current;
        if (currentMemberRef) observer.observe(currentMemberRef);

        return () => {
            if (currentMemberRef) observer.disconnect();
        };
    }, []);

    const memberClasses = isVisible
        ? 'opacity-100 translate-y-0 scale-100'
        : 'opacity-0 translate-y-10 scale-95';

    return (
        <div
            ref={memberRef}
            className={`flex flex-col items-center text-center group cursor-pointer
                transition-all duration-700 ease-in-out
                ${memberClasses}
            `}
        >
            <div className={`
                relative mb-4 overflow-hidden rounded-xl shadow-lg mx-auto
                w-full max-w-[280px] aspect-[3/4]
                md:max-w-none md:aspect-auto md:h-64 md:w-full
            `}>
                <Image
                    src={member.imgSrc}
                    alt={member.imgAltText || member.name}
                    fill
                    className="object-cover object-top transition-all duration-300 group-hover:scale-105"
                />
            </div>
            <h3 className="text-xl font-bold text-black">{member.name}</h3>
            <p className="text-black">{member.role}</p>
        </div>
    );
};

export default function HomePageClient({ services, teamMembers }: { services: ServiceType[], teamMembers: TeamMemberType[] }) {
    const [isEcommerceVisible, setIsEcommerceVisible] = useState(false);
    const [isTeamVisible, setIsTeamVisible] = useState(false);
    const ecommerceRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const teamSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const createObserver = (callback: (isVisible: boolean) => void, threshold = 0.2) => new IntersectionObserver(([entry], obs) => {
            if (entry.isIntersecting) {
                callback(true);
                obs.unobserve(entry.target);
            }
        }, { threshold });

        const observers = [
            { ref: ecommerceRef, callback: setIsEcommerceVisible, threshold: 0.2 },
            { ref: servicesRef, callback: () => {}, threshold: 0.2 },
            { ref: teamSectionRef, callback: setIsTeamVisible, threshold: 0.2 },
        ];

        const createdObservers = observers.map(obs => createObserver(obs.callback, obs.threshold));
        observers.forEach(({ ref }, index) => {
            if (ref.current) createdObservers[index].observe(ref.current);
        });

        return () => {
            createdObservers.forEach(obs => obs.disconnect());
        };
    }, []);

    const bannerBackgroundStyle = {
        backgroundColor: '#ffffff',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
        backgroundSize: `20px 20px`
    };

    const headingWords = [
    "LAUNCH",
    "YOUR",
    "<span class='text-white'>DIGITAL</span>",
    "<span class='text-white'>STOREFRONT</span>"
];

const paragraphWords = [
    "Go",
    "from",
    "concept",
    "to",
    "<span class='text-white font-semibold'>MARKET LEADER</span>",
    "with",
    "our",
    "data-driven",
    "architecture.",
    "We",
    "provide",
    "full-cycle",
    "solutions",
    "across",
    "the",
    "<span class='font-semibold'>US,</span>",
    "ensuring",
    "a",
    "smooth",
    "launch,",
    "high",
    "conversion,",
    "and",
    "<span class='font-semibold'>LONG-TERM GROWTH.</span>"
];

    return (
        <div className="bg-black font-sans">
            <style jsx>{`
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes drawLine { from { transform: scaleX(0); } to { transform: scaleX(1); } }
                .word-wrapper { display: inline-block; opacity: 0; }
                .animate-text .word-wrapper { animation: fadeInUp 0.5s ease forwards; }
            `}</style>
            <style jsx global>{`
                .graphic-element { opacity: 0; transform: scale(0.8) translateY(20px); }
                .graphic-animate .graphic-element { animation: graphicFadeInUp 0.6s ease-out forwards; }
                @keyframes graphicFadeInUp { from { opacity: 0; transform: scale(0.8) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
            `}</style>

            <div className="relative min-h-screen w-full text-white overflow-hidden flex flex-col bg-black">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    disablePictureInPicture
                    src="/intro (1) (1).mp4"
                    className="absolute inset-0 z-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-10 bg-black/60"></div>
                <div className="absolute inset-0 z-20" style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`, backgroundSize: `25px 25px` }}></div>
                <main className="relative flex-grow flex items-center justify-center text-center px-10 md:px-20 z-30">
                    <div>
                        <p className="text-2xl md:text-3xl font-light mt-20 mb-2">Your Global Tech Partner</p>
                        <h2 className="text-5xl md-text-7xl lg:text-8xl font-extrabold tracking-tighter leading-none mb-2">IT Consulting  </h2>
                        <h2 className="text-2xl md-text-4xl lg:text-6xl mt-2">and</h2>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mt-0">Business Growth</h2>
                        <div className="mt-10 mb-16 max-w-5xl mx-auto flex flex-col items-center gap-8">
                            <p className="text-sl font-light ">From engineering complex Custom App Development in the USA and scalable Web Solutions to executing ROI-focused Digital Marketing strategies, we deliver everything you need. Our team integrates Advanced AI Analytics and immersive Visual Design to provide the cutting-edge technology and data-backed strategy required to scale your business across the United States and the competitive global market.</p>
                            
                            <Link href="/contact" className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black transition-all duration-300 bg-white rounded-full hover:bg-gray-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white ring-offset-black">
                                Contact Us
                                <ArrowRightIcon />
                            </Link>
                        </div>
                    </div>
                </main>
            </div>

            <section ref={servicesRef} className="bg-white pt-12 pb-24">
                <div className="container mx-auto px-8 md:px-16">
                    <div className={`text-center mb-16 transition-opacity duration-700 ease-in ${true ? 'opacity-100' : 'opacity-0'}`}>
                        <p className="text-xl md:text-2xl text-black">
                            <span className="font-bold">BLACK ZERO</span> is a <span className="font-bold">FULL SERVICE</span> company with a
                        </p>
                        <h3 className="text-4xl md:text-6xl font-extrabold text-black tracking-tight">
                            MAJOR FOCUS ON
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={service.slug}
                                service={service}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section ref={ecommerceRef} id="ecommerce" className="bg-black text-white py-20">
                <div className="container mx-auto px-10 md:px-20">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-16">
                        <div className={`md:w-1/2 flex flex-col gap-6 text-center md:text-left ${isEcommerceVisible ? 'animate-text' : ''}`}>
                            <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight">
                                {headingWords.map((word, i) => (<span key={i} className="word-wrapper mr-2" style={{ animationDelay: `${i * 0.08}s` }} dangerouslySetInnerHTML={{ __html: word }} />))}
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {paragraphWords.map((word, i) => (<span key={i} className="word-wrapper mr-1.5" style={{ animationDelay: `${(headingWords.length * 0.08) + (i * 0.04)}s` }} dangerouslySetInnerHTML={{ __html: word }} />))}
                            </p>
                        </div>
                        <div className="md:w-1/3">
                            <EcommerceGraphic isVisible={isEcommerceVisible} />
                        </div>
                    </div>
                </div>
                <div style={bannerBackgroundStyle} className="mt-20 py-8 text-black">
                    <div className="container mx-auto px-10 md:px-20">
                        <Link href="/ecommerce-success" className="group flex items-center justify-center text-2xl font-bold uppercase tracking-widest hover:underline">
                            ACCELERATE YOUR JOURNEY TO ONLINE BUSINESS SUCCESS! 
                            <ArrowRightIcon />
                        </Link>
                    </div>
                </div>
            </section>

            <section ref={teamSectionRef} id="team" className={`bg-white text-black py-20`}>
                <div className="container mx-auto px-4 md:px-32 text-center">
                    <h2 className={`text-2xl md:text-3xl font-bold mb-12 flex flex-wrap items-center justify-center gap-2 transition-opacity duration-700 ease-in ${isTeamVisible ? 'opacity-100' : 'opacity-0'}`}>
                        THE BRAINS BEHIND BLACK ZERO
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12">
                        {teamMembers.map((member, index) => (
                            <TeamMember key={member.name + index} member={member} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}