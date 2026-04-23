'use client';
import React from 'react';

export const ClientSlideshow = () => {
    // NOTE: You can change the number of logos, and the animation will adapt automatically.
    const logos = Array.from({ length: 14 }, (_, i) => `/Clients/${i + 1}.png`);

    return (
        <section className="bg-white py-16 text-black overflow-hidden">
            
            <style jsx>{`
                @keyframes scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); } /* Seamless loop logic */
                }
                .animate-scroll {
                    display: flex;
                    width: max-content;
                    animation: scroll 30s linear infinite;
                }
            `}</style>
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-12">Our Trusted Clients</h2>
                
                {/* Added mask-image for a professional fade effect on left/right edges */}
                <div 
                    className="relative w-full h-32 slider-container overflow-hidden"
                    style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
                >
                    <div className="flex items-center animate-scroll h-full">
                        {/* We duplicate the logos array to create the seamless loop effect */}
                        {[...logos, ...logos].map((logo, index) => (
                            <div key={index} className="flex-shrink-0 w-48 mx-8 flex items-center justify-center">
                                <img 
                                    src={logo} 
                                    alt={`Client logo`} 
                                    // Removed grayscale, opacity, and hover classes
                                    className="max-h-27 w-auto object-contain" 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};