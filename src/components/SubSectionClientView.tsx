'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';

// Interface for the detailed items (e.g., SEO, PPC inside Digital Marketing)
interface DetailSectionItem {
  title: string;
  description: string;
  imageUrl: string;
}

// Interface for the props passed from the Server Component
interface ClientProps {
  serviceTitle: string;
  serviceSlug: string;
  subSection: {
    title: string;
    slug: string;
    description: string;
    imageUrl: string;
  };
  details: DetailSectionItem[]; // The list of items to show
  contactOptions: { value: string; label: string }[];
}

// --- Animated Detail Row Component ---
const AnimatedDetailSection = ({ detail, isReversed }: { detail: DetailSectionItem, isReversed: boolean }) => {
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
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.disconnect(); };
  }, []);

  const imageAnimation = isReversed ? 'animate-slide-in-right' : 'animate-slide-in-left';
  const textAnimation = isReversed ? 'animate-slide-in-left' : 'animate-slide-in-right';

  return (
    <div ref={ref} className={`group flex flex-col md:flex-row items-center gap-12 lg:gap-16 perspective-[1000px] ${isReversed ? 'md:flex-row-reverse' : ''}`}>
      <div className={`md:w-2/5 transition-opacity duration-1000 ${isVisible ? `opacity-100 ${imageAnimation}` : 'opacity-0'}`}>
        <div className="relative overflow-hidden rounded-lg shadow-2xl">
          <img 
            src={detail.imageUrl} 
            alt={detail.title} 
            className="w-full h-auto object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-active:scale-105" 
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/10 transition-colors duration-300"></div>
        </div>
      </div>
      <div className={`md:w-3/5 transition-opacity duration-1000 ${isVisible ? `opacity-100 ${textAnimation}` : 'opacity-0'}`} style={{ transitionDelay: '200ms' }}>
        <h3 className="text-3xl font-bold text-black mb-4">{detail.title}</h3>
        <p className="text-lg text-gray-600 leading-relaxed text-justify whitespace-pre-line">{detail.description}</p>
      </div>
    </div>
  );
};

export default function SubSectionClientView({ serviceTitle, serviceSlug, subSection, details, contactOptions }: ClientProps) {
  const breadcrumbItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: `/services/${serviceSlug}`, label: serviceTitle },
    { href: `/services/${serviceSlug}/${subSection.slug}`, label: subSection.title },
  ];

  return (
    <div className="font-sans bg-gray-50">
      <style jsx global>{`
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px) rotateY(15deg); } to { opacity: 1; transform: translateX(0) rotateY(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(40px) rotateY(-15deg); } to { opacity: 1; transform: translateX(0) rotateY(0); } }
        .animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
      `}</style>
      
      {/* Hero Section */}
      <section className="relative py-48 text-white text-center flex items-center justify-center overflow-hidden bg-black">
         <img 
            src={subSection.imageUrl}
            alt={`${subSection.title} background`}
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
         />
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="container mx-auto px-6 relative z-20">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter">{subSection.title}</h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
             {subSection.description}
          </p>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbItems} />
      
      {/* Content List */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="space-y-24">
            {details.length > 0 ? (
                details.map((detail, index) => (
                    <AnimatedDetailSection 
                        key={index}
                        detail={detail}
                        isReversed={index % 2 !== 0}
                    />
                ))
            ) : (
                <div className="text-center py-20">
                    <p className="text-2xl text-gray-400">Detailed breakdown coming soon.</p>
                </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Contact Form */}
      <section className="py-20 bg-black">
        <ContactForm 
          title="Ready to Get Started?"
          subtitle={`Lets talk about how our ${subSection.title} service can benefit your business.`}
          serviceOptions={contactOptions}
          serviceName={subSection.title}
        />
      </section>

      {/* Footer Navigation */}
      <section className="py-20 bg-white">
        <div className="text-center">
          <Link href={`/services/${serviceSlug}`} className="inline-flex items-center gap-2 bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 active:bg-gray-800 transition-colors">
            <ArrowLeft size={20} />
            Back to {serviceTitle}
          </Link>
        </div>
      </section>
    </div>
  );
}