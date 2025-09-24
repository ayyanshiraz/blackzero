'use client';
import React from 'react';

// --- CLIENT SLIDESHOW COMPONENT ---
export const ClientSlideshow = () => {
    // NOTE: You need to add your client logos to the `public/images/clients/` folder
    // For example: public/images/clients/1.png, public/g/clients/2.png, etc.
    const logos = Array.from({ length: 12 }, (_, i) => `/clients/${i + 1}.png`);

    return (
        <section className="bg-white py-16 text-black overflow-hidden">
            <style jsx>{`
                @keyframes scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-100%); }
                }
                .animate-scroll {
                    animation: scroll 60s linear infinite;
                    width: calc(240px * 20); /* item width (w-48 + mx-4) * number of items (10*2) */
                }
            `}</style>
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-12">Our Trusted Clients</h2>
                <div className="relative w-full h-24">
                    <div className="absolute top-0 left-0 flex items-center animate-scroll">
                        {[...logos, ...logos].map((logo, index) => (
                            <div key={index} className="flex-shrink-0 w-48 mx-4 h-full flex items-center justify-center">
                                <img src={logo} alt={`Client logo ${index + 1}`} className="max-h-30 w-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

