'use client';
import React, { useState, useEffect, useRef } from 'react';
import { OrganogramConnectors } from '@/components/OrganogramConnectors';

// --- Interfaces ---
interface TeamMemberData {
    id: string;
    name: string;
    position: string;
    avatar: string;
    imgAltText: string;
    ringColor: string;
    size: string;
    delay: string;
}

interface TeamStructure {
    level1: TeamMemberData[];
    level2: TeamMemberData[];
    level3: TeamMemberData[];
}

// --- Organogram Member Component ---
const OrganogramMember = ({ 
    data, 
    startAnimation 
}: { 
    data: TeamMemberData; 
    startAnimation: boolean; 
}) => {
    return (
        <div 
            id={data.id} 
            className={`flex flex-col items-center p-2 w-48 text-center transition-all duration-700 ease-out ${startAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: data.delay }}
        >
            <div id={`${data.id}-shape`} className={`relative rounded-2xl p-2 border-4 ${data.ringColor} ${data.size} flex items-center justify-center bg-white`}>
                <img 
                    src={data.avatar} 
                    alt={data.imgAltText} 
                    className="rounded-2xl w-full h-full object-cover bg-gray-200"
                    onError={(e) => { (e.target as HTMLImageElement).src='https://placehold.co/150x150/d1d5db/4b5563?text=User'; }}
                />
            </div>
            <div className="relative mt-4 text-center bg-white z-10 px-2">
                <p className="text-lg font-bold text-black">{data.name}</p>
                <p className="text-base text-gray-600">{data.position}</p>
            </div>
        </div>
    );
};

// --- Main Client Component ---
export default function TeamPageClient({ teamStructure }: { teamStructure: TeamStructure }) {
    const [isMounted, setIsMounted] = useState(false);
    const [isOrganogramVisible, setIsOrganogramVisible] = useState(false);
    const organogramRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsOrganogramVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        const currentOrganogramRef = organogramRef.current;
        if (currentOrganogramRef) {
            observer.observe(currentOrganogramRef);
        }
        
        return () => {
            if (currentOrganogramRef) {
                observer.disconnect();
            }
        };
    }, []);

    return (
        <div className="bg-black text-white font-sans min-h-screen">
            <section className="relative py-40 text-center overflow-hidden">
                <img 
                    src="/team1.webp" 
                    alt="Black Zero Team Background"
                    className="absolute inset-0 w-full h-full object-cover z-0 filter blur-[1px]"
                />
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <div className="relative z-20 container mx-auto px-6">
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-white">
                        Meet Our Team
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                        The creative minds and strategic thinkers dedicated to elevating your brand to the next level.
                    </p>
                </div>
            </section>

            <section ref={organogramRef} className="py-24 bg-white text-black">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-20 text-black">Our Leadership Structure</h2>

                    <div id="organogram-container" className="relative">
                        {isMounted && <OrganogramConnectors isReady={isMounted} startAnimation={isOrganogramVisible} />}
                        
                        <div className="relative z-10 space-y-16 md:space-y-24">
                            {/* LEVEL 1: Top Leadership */}
                            <div className="flex flex-wrap justify-center items-start gap-16 md:gap-64">
                                {teamStructure.level1.map((member) => (
                                    <OrganogramMember key={member.id} data={member} startAnimation={isOrganogramVisible} />
                                ))}
                            </div>

                            {/* LEVEL 2: Central Manager */}
                            <div className="flex justify-center">
                                {teamStructure.level2.map((member) => (
                                    <OrganogramMember key={member.id} data={member} startAnimation={isOrganogramVisible} />
                                ))}
                            </div>

                            {/* LEVEL 3: Team Leads */}
                            <div className="flex flex-wrap justify-center gap-x-16 md:gap-x-32">
                                {teamStructure.level3.map((member) => (
                                    <OrganogramMember key={member.id} data={member} startAnimation={isOrganogramVisible} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}