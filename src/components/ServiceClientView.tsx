'use client';

// Imports mein sirf standard quotes use hotay hain
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';

// --- Interfaces (Mirrored from Data) ---
interface SubSection {
  title: string;
  slug?: string;
  description: string;
  imageUrl: string;
}

interface Service {
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
  subSections: SubSection[];
}

// --- Animated Sub-Section Component ---
const AnimatedSubSection = ({ subsection, isReversed, isClickable, parentSlug }: { subsection: SubSection, isReversed: boolean, isClickable: boolean, parentSlug: string }) => {
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

  const imageAnimation = isReversed ? `animate-slide-in-right` : `animate-slide-in-left`;
  const textAnimation = isReversed ? `animate-slide-in-left` : `animate-slide-in-right`;

  return (
    <div ref={ref} className={`group flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 perspective-[1000px] ${isReversed ? `md:flex-row-reverse` : ``}`}>
      <div className={`w-full md:w-2/5 transition-opacity duration-1000 ${isVisible ? `opacity-100 ${imageAnimation}` : `opacity-0`}`}>
        <div className={`relative overflow-hidden rounded-lg shadow-2xl`}>
          <img src={subsection.imageUrl} alt={subsection.title} className={`w-full h-auto object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-active:scale-105`} />
          <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/10 transition-colors duration-300`}></div>
        </div>
      </div>
      <div className={`w-full md:w-3/5 transition-opacity duration-1000 ${isVisible ? `opacity-100 ${textAnimation}` : `opacity-0`}`} style={{ transitionDelay: `200ms` }}>
        <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4`}>{subsection.title}</h2>
        {/* whitespace-pre-line lazmi hai line breaks ke liye */}
        <p className={`text-base md:text-lg text-gray-700 leading-relaxed text-justify whitespace-pre-line`}>{subsection.description}</p>
        
        {/* CONDITIONAL RENDERING: Only show if isClickable is true */}
        {isClickable && (
          <div className={`mt-6`}>
            <div className={`inline-flex items-center gap-2 bg-black text-white font-bold py-3 px-6 rounded-lg group-hover:bg-gray-800 group-active:bg-gray-800 transition-colors cursor-pointer text-sm md:text-base`}>
              <span>Click To Discover More</span>
              <ArrowRight size={20} className={`transition-transform group-hover:translate-x-1 group-active:translate-x-1`} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Client View ---
export default function ServiceClientView({ service }: { service: Service }) {
  const contactFormOptions = service.subSections.map(sub => ({
    value: sub.slug || sub.title.toLowerCase().replace(/\s+/g, `-`),
    label: sub.title
  }));

  const breadcrumbItems = [
    { href: `/`, label: `Home` },
    { href: `/services`, label: `Services` },
    { href: `/services/${service.slug}`, label: service.title },
  ];

  return (
    <div className={`bg-white text-black font-sans`}>
      <style jsx global>{`
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px) rotateY(15deg); } to { opacity: 1; transform: translateX(0) rotateY(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(40px) rotateY(-15deg); } to { opacity: 1; transform: translateX(0) rotateY(0); } }
        .animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
      `}</style>

      {/* Hero Section */}
      <section className={`relative pt-32 pb-20 md:py-40 text-white text-center flex flex-col items-center justify-center overflow-hidden bg-black`}>
        <img src={service.imageUrl} alt={`${service.title} services by Black Zero`} className={`absolute inset-0 w-full h-full object-cover z-0 opacity-50`} />
        <div className={`absolute inset-0 bg-black/60 z-10`}></div>
        <div className={`container mx-auto px-6 relative z-20`}>
          <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter uppercase break-words`}>
            {service.title}
          </h1>
          <p className={`mt-4 text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto whitespace-pre-line`}>
            {service.description}
          </p>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbItems} />

      {/* Sub-Services List */}
      <section className={`py-16 md:py-28 bg-gray-50`}>
        <div className={`container mx-auto px-6 sm:px-12 lg:px-24 space-y-20 md:space-y-24`}>
          {service.subSections.map((subsection, index) => {
            
            const isDigitalMarketing = subsection.slug === `digital-marketing`;
            const isClickable = isDigitalMarketing;

            const content = (
              <AnimatedSubSection 
                subsection={subsection} 
                isReversed={index % 2 !== 0} 
                isClickable={isClickable}
                parentSlug={service.slug}
              />
            );

            return isClickable ? (
              <Link key={index} href={`/services/${service.slug}/${subsection.slug}`} className={`block focus:outline-none rounded-lg`}>
                {content}
              </Link>
            ) : (
              <div key={index}>{content}</div>
            );
          })}
        </div>
      </section>
      
      {/* Contact Form */}
      <section className={`py-20 bg-black`}>
        <ContactForm 
          title={`Have a Project in Mind?`}
          subtitle={`Lets discuss how our ${service.title} services can elevate your business.`}
          serviceOptions={contactFormOptions}
          serviceName={service.title}
        />
      </section>

      {/* Footer Navigation */}
      <section className={`py-20 bg-white`}>
       <div className={`text-center`}>
          <Link href={`/services`} className={`inline-flex items-center gap-2 bg-black text-white font-bold py-4 px-10 rounded-lg hover:bg-gray-800 active:bg-gray-800 transition-colors text-lg`}>
            <ArrowLeft size={20} />
            Back to All Services
          </Link>
       </div>
      </section>
    </div>
  );
}