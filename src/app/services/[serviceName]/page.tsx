'use client';
import { useState, useEffect, useRef } from 'react';
import { servicesData, SubSection } from '@/data/services';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, ArrowRight } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';

// A self-contained, animated sub-section component
const AnimatedSubSection = ({ subsection, isReversed, isClickable }: { subsection: SubSection, isReversed: boolean, isClickable: boolean }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.2 });

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return () => { if (currentRef) observer.disconnect(); };
    }, []);

    const imageAnimation = isReversed ? 'animate-slide-in-right' : 'animate-slide-in-left';
    const textAnimation = isReversed ? 'animate-slide-in-left' : 'animate-slide-in-right';

    return (
        <div ref={ref} className={`flex flex-col md:flex-row items-center gap-12 lg:gap-16 perspective-[1000px] ${isReversed ? 'md:flex-row-reverse' : ''}`}>
            <div className={`md:w-2/5 transition-opacity duration-1000 ${isVisible ? `opacity-100 ${imageAnimation}` : 'opacity-0'}`}>
                <div className="relative group overflow-hidden rounded-lg shadow-2xl">
                    {/* Hover effect now only on the image */}
                    <img src={subsection.imageUrl} alt={subsection.title} className="w-full h-auto object-cover transition-all duration-500 ease-in-out group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
            </div>
            <div className={`md:w-3/5 transition-opacity duration-1000 ${isVisible ? `opacity-100 ${textAnimation}` : 'opacity-0'}`} style={{ transitionDelay: '200ms' }}>
                <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-black">{subsection.title}</h2>
                    {isClickable && <ArrowUpRight className="w-7 h-7 text-gray-400" />}
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">{subsection.description}</p>

                {isClickable && (
                    <div className="mt-6">
                        <div className="inline-flex items-center gap-2 bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                            <span>Click To Discover More</span>
                            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function ServiceDetailPage() {
    const params = useParams();
    const serviceName = params.serviceName as string;
    const service = servicesData.find(s => s.slug === serviceName);

    useEffect(() => {
        if (service) { document.title = `${service.title} | Black Zero Services`; } 
        else { document.title = 'Service Not Found'; }
    }, [service]);

    if (!service) {
        notFound();
    }

    const contactFormOptions = service.subSections.map(sub => ({
        value: sub.slug || sub.title.toLowerCase().replace(/\s+/g, '-'),
        label: sub.title
    }));

    const breadcrumbItems = [
        { href: '/', label: 'Home' },
        { href: '/services', label: 'Services' },
        { href: `/services/${service.slug}`, label: service.title },
    ];

    return (
        <div className="bg-white text-black font-sans">
            <style jsx>{`
                @keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px) rotateY(15deg); } to { opacity: 1; transform: translateX(0) rotateY(0); } }
                @keyframes slideInRight { from { opacity: 0; transform: translateX(40px) rotateY(-15deg); } to { opacity: 1; transform: translateX(0) rotateY(0); } }
                .animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
                .animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
            `}</style>

            <section className="relative py-40 text-white text-center flex flex-col items-center justify-center overflow-hidden bg-black">
                <img src={service.imageUrl} alt={`${service.title} background`} className="absolute inset-0 w-full h-full object-cover z-0 opacity-50" />
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <div className="container mx-auto px-6 relative z-20">
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter">{service.title}</h1>
                    <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">{service.description}</p>
                </div>
            </section>

            <Breadcrumbs items={breadcrumbItems} />

            <section className="py-20 md:py-28 bg-gray-50">
                <div className="container mx-auto px-6 sm:px-12 lg:px-24 space-y-24">
                    {service.subSections.map((subsection, index) => {
                        const isClickable = !!subsection.slug;
                        if (isClickable) {
                            return (
                                <Link 
                                    key={index}
                                    href={`/services/${service.slug}/${subsection.slug}`}
                                    className="block focus:outline-none rounded-lg" // Removed hover scale from Link
                                >
                                    <AnimatedSubSection 
                                        subsection={subsection} 
                                        isReversed={index % 2 !== 0} 
                                        isClickable={isClickable} 
                                    />
                                </Link>
                            );
                        }
                        return (
                            <div key={index}>
                                <AnimatedSubSection 
                                    subsection={subsection} 
                                    isReversed={index % 2 !== 0} 
                                    isClickable={isClickable}
                                />
                            </div>
                        );
                    })}
                </div>
            </section>
            
            <section className="py-20 bg-black">
                <ContactForm 
                    title="Have a Project in Mind?"
                    subtitle={`Let's discuss how our ${service.title} services can elevate your business.`}
                    serviceOptions={contactFormOptions}
                />
            </section>

            <section className="py-20 bg-white">
               <div className="text-center">
                    <Link href="/services" className="inline-flex items-center gap-2 bg-black text-white font-bold py-4 px-10 rounded-lg hover:bg-gray-800 transition-colors text-lg">
                        <ArrowLeft size={20} />
                        Back to All Services
                    </Link>
                </div>
            </section>
        </div>
    );
}