'use client';
import React, { useState, useEffect, useRef } from 'react';

// --- AnimatedNumber Component ---
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

// --- Main Stats Section Component ---
export default function StatsSection() {
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
                        {/* Changed text-gray-600 to text-black for the numbers */}
                        <div className="text-5xl md:text-6xl font-extrabold text-black mb-2">
                            <AnimatedNumber endValue={stat.number} isVisible={isStatsSectionVisible} />
                            {stat.suffix}
                        </div>
                        {/* Labels remain text-gray-600 */}
                        <span className="text-lg md:text-xl text-gray-600">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}