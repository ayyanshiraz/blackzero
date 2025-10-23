'use client';
import React from 'react';

// --- CLIENT SLIDESHOW COMPONENT ---
export const ClientSlideshow = () => {
    // NOTE: You can change the number of logos, and the animation will adapt automatically.
    const logos = Array.from({ length: 12 }, (_, i) => `/clients/${i + 1}.png`);

    return (
        <section className="bg-white py-16 text-black overflow-hidden">
            {/* ✅ AMENDED CODE: Updated CSS for a seamless loop */}
            <style jsx>{`
                @keyframes scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-90%); }
                }
                .animate-scroll {
                    display: flex;
                    width: max-content; /* Automatically size the container to fit all logos */
                    animation: scroll 40s linear infinite;
                }
               
            `}</style>
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-12">Our Trusted Clients</h2>
                <div className="relative w-full h-24 slider-container">
                    <div className="absolute top-0 left-0 flex items-center animate-scroll">
                        {/* We duplicate the logos array to create the seamless loop effect */}
                        {[...logos, ...logos].map((logo, index) => (
                            <div key={index} className="flex-shrink-0 w-48 mx-8 h-full flex items-center justify-center">
                                <img 
                                    src={logo} 
                                    alt={`Client logo`} 
                                    className="max-h-30 w-auto" 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};