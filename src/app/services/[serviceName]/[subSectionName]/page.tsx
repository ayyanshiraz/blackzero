'use client';
import { useState, useEffect, useRef } from 'react';
import { servicesData } from '@/data/services';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';

// Define a specific type for the detail section objects
interface DetailSectionItem {
    title: string;
    description: string;
    imageUrl: string;
}

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
        <div ref={ref} className={`flex flex-col md:flex-row items-center gap-12 lg:gap-16 perspective-[1000px] ${isReversed ? 'md:flex-row-reverse' : ''}`}>
            <div className={`md:w-2/5 transition-opacity duration-1000 ${isVisible ? `opacity-100 ${imageAnimation}` : 'opacity-0'}`}>
                <div className="relative group overflow-hidden rounded-lg shadow-2xl">
                    <img src={detail.imageUrl} alt={detail.title} className="w-full h-auto object-cover transition-all duration-500 ease-in-out  group-hover:scale-105 group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
            </div>
            <div className={`md:w-3/5 transition-opacity duration-1000 ${isVisible ? `opacity-100 ${textAnimation}` : 'opacity-0'}`} style={{ transitionDelay: '200ms' }}>
                <h3 className="text-3xl font-bold text-black mb-4">{detail.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{detail.description}</p>
            </div>
        </div>
    );
};

// --- RESTORED FULL DESCRIPTIONS ---
const digitalMarketingSubSections: DetailSectionItem[] = [
    {
        title: "Social Media Marketing",
        description: "We develop and execute comprehensive social media strategies designed to build your brand, foster a loyal community, and drive measurable results. By identifying the platforms where your audience is most active, we create and curate compelling content, manage advertising campaigns, and engage with your followers to build lasting relationships and turn them into brand advocates.",
        imageUrl: "/smm.png"
    },
    {
        title: "Social Media Handling",
        description: "Our team provides complete, day-to-day management of your social media profiles. This includes consistent posting based on a strategic content calendar, active community management, and responding to comments and direct messages in your brand's unique voice. We handle the daily grind of social media so you can focus on running your business, ensuring your online presence is always active, professional, and engaging.",
        imageUrl: "/smh.png"
    },
    {
        title: "Google Ads",
        description: "Capture high-intent customers at the exact moment they are searching for your products or services with expertly managed Google Ads campaigns. We handle everything from in-depth keyword research and compelling ad copywriting to strategic bid management and landing page optimization. Our goal is to maximize your return on ad spend (ROAS) by driving qualified traffic and converting clicks into valuable customers.",
        imageUrl: "/googleads.png"
    },
    {
        title: "Search Engine Optimization (SEO)",
        description: "Improve your long-term organic visibility and climb search engine rankings with our comprehensive SEO services. We focus on the three pillars of SEO: technical optimization to ensure your site is flawlessly crawlable, on-page optimization of content and keywords, and off-page strategy to build your site's authority. Our data-driven approach ensures sustainable growth in organic traffic.",
        imageUrl: "/seo.png"
    },
    {
        title: "Content Calendar",
        description: "Consistency is key to a successful content strategy. We develop a detailed, forward-thinking content calendar that maps out your topics, formats, and posting schedules across all digital channels. This strategic plan ensures a steady stream of valuable content that aligns with your marketing goals, engages your audience throughout their journey, and keeps your brand top-of-mind.",
        imageUrl: "/cc2.png"
    },
    {
        title: "Pinterest Marketing",
        description: "Tap into a powerful visual discovery engine with a targeted Pinterest marketing strategy. We create beautiful, optimized Pins and boards that showcase your products and ideas, driving significant traffic back to your website or e-commerce store. Pinterest is ideal for brands in the lifestyle, home, fashion, and DIY niches, allowing you to connect with users as they are actively planning their next purchase.",
        imageUrl: "/pinterest.png"
    },
    {
        title: "TikTok Marketing",
        description: "Engage the next generation of consumers with creative and authentic TikTok marketing. We specialize in creating compelling short-form video content that taps into current trends and resonates with the platform's unique culture. From viral challenges to influencer collaborations, we help your brand connect with a massive audience in a fun, engaging, and memorable way.",
        imageUrl: "/tiktok.png"
    },
    {
        title: "LinkedIn Marketing",
        description: "Position your brand as an industry leader and generate high-quality B2B leads with a sophisticated LinkedIn marketing strategy. We create professional content, manage targeted ad campaigns, and engage with key decision-makers to build your professional network. LinkedIn is the premier platform for B2B marketing, and we help you leverage it to its full potential.",
        imageUrl: "/linkedin.png"
    }
];

export default function SubSectionDetailPage() {
    const params = useParams();
    const serviceName = params.serviceName as string;
    const subSectionName = params.subSectionName as string;
    
    const service = servicesData.find(s => s.slug === serviceName);
    const subSection = service?.subSections.find(sub => sub.slug === subSectionName);

    useEffect(() => {
        if (service && subSection) {
            document.title = `${subSection.title} | ${service.title}`;
        } else {
            document.title = 'Not Found';
        }
    }, [service, subSection]);

    if (!service || !subSection) {
        notFound();
        return null;
    }
    
    const pageSpecificContent = subSectionName === 'digital-marketing' ? digitalMarketingSubSections : [];
    
    let contactFormOptions;

    if (subSectionName === 'digital-marketing') {
        contactFormOptions = digitalMarketingSubSections.map(sub => ({
            value: sub.title.toLowerCase().replace(/\s+/g, '-'),
            label: sub.title
        }));
    } else {
        contactFormOptions = service.subSections.map(sub => ({
            value: sub.slug || sub.title.toLowerCase().replace(/\s+/g, '-'),
            label: sub.title
        }));
    }

    const breadcrumbItems = [
        { href: '/', label: 'Home' },
        { href: '/services', label: 'Services' },
        { href: `/services/${service.slug}`, label: service.title },
        { href: `/services/${service.slug}/${subSection.slug}`, label: subSection.title },
    ];

    return (
        <div className="font-sans bg-gray-50">
            <style jsx>{`
                @keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px) rotateY(15deg); } to { opacity: 1; transform: translateX(0) rotateY(0); } }
                @keyframes slideInRight { from { opacity: 0; transform: translateX(40px) rotateY(-15deg); } to { opacity: 1; transform: translateX(0) rotateY(0); } }
                .animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
                .animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
            `}</style>
            
            <section className="relative py-48 text-white text-center flex items-center justify-center overflow-hidden bg-black">
                 {subSectionName === 'digital-marketing' ? (
                    <img 
                        src="/digitalmarketing.png"
                        alt="Digital Marketing background"
                        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
                    />
                ) : (
                    <img 
                        src={subSection.imageUrl}
                        alt={subSection.title}
                        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
                    />
                )}
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <div className="container mx-auto px-6 relative z-20">
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter">{subSection.title}</h1>
                    {/* ======== THIS IS THE NEW LINE YOU'RE ADDING ======== */}
        <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Connecting your brand with the right audience at the perfect moment online, turning clicks into customers.
        </p>
                </div>
            </section>

            <Breadcrumbs items={breadcrumbItems} />
            
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="space-y-24">
                        {pageSpecificContent.map((detail, index) => (
                           <AnimatedDetailSection 
                                key={index}
                                detail={detail}
                                isReversed={index % 2 !== 0}
                           />
                        ))}
                    </div>

                    <div className="text-center mt-24">
                        <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors">
                            <ArrowLeft size={20} />
                            Back to {service.title}
                        </Link>
                    </div>
                </div>
            </section>
            
            <section className="py-20 bg-black">
                <ContactForm 
                    title="Ready to Get Started?"
                    subtitle={`Let's talk about how our ${subSection.title} service can benefit your business.`}
                    serviceOptions={contactFormOptions}
                />
            </section>
        </div>
    );
}