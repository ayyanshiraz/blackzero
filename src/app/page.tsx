'use client';
import React, { useState, useEffect, useRef } from 'react';
// MODIFIED: Removed ArrowDown icon as it's no longer used
import { ArrowRight, Megaphone, BarChartBig, Film, TerminalSquare, Palette, Camera } from 'lucide-react';

// --- DATA DEFINITION (Moved from external file to resolve import error) ---
const servicesData = [
    { 
        title: "Marketing", 
        slug: "marketing",
        icon: Megaphone,
        imageUrl: "/brand-strategy.png",
        description: "We create data-driven strategies that build brand awareness, drive traffic, and generate leads to elevate your digital footprint.",
    },
    { 
        title: "Business Analytics", 
        slug: "business-analytics",
        icon: BarChartBig,
        imageUrl: "/business-analytics.png",
        description: "Unlock the power of your data. We provide comprehensive analytics to help you make informed decisions for sustainable growth.",
    },
    { 
        title: "Animation", 
        slug: "animation",
        icon: Film,
        imageUrl: "/animation.png",
        description: "Bring your brand to life with stunning 2D and 3D animations, from explainer videos to engaging social media content.",
    },
    { 
        title: "Development", 
        slug: "development",
        icon: TerminalSquare,
        imageUrl: "/development.png",
        description: "Our team builds robust, scalable, and user-friendly websites and applications using modern frameworks and technologies.",
    },
    { 
        title: "Graphic Designing", 
        slug: "graphic-designing",
        icon: Palette,
        imageUrl: "/graphic designing.png",
        description: "From logos to complete branding packages, we create a cohesive and memorable brand image through stunning visuals.",
    },
    { 
        title: "Photography / Videography", 
        slug: "photo-video",
        icon: Camera,
        imageUrl: "/photo-video.png",
        description: "High-quality visuals are essential. We capture your products, team, and story in the best light for all your marketing channels.",
    },
];


const ArrowRightIcon = () => (<ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" />);

// --- Main Service Card Component ---
const ServiceCard = ({ service, isVisible, index }: { service: any, isVisible: boolean, index: number }) => (
    <a 
        href={`/services/${service.slug}`}
        className={`group p-6 rounded-2xl h-full flex flex-col items-start 
                  bg-black hover:bg-white 
                  transition-[background-color,transform,box-shadow] duration-500 ease-in-out 
                  hover:-translate-y-2 hover:shadow-2xl hover:shadow-neutral-400/30
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ transitionDelay: `${index * 150}ms` }}
    >
        <div className="relative w-full aspect-video mb-6 overflow-hidden rounded-lg">
            <img
                src={service.imageUrl}
                alt={`${service.title} service`}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out grayscale group-hover:grayscale-0 group-hover:scale-105"
            />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3 transition-colors duration-500 ease-in-out group-hover:text-black">{service.title}</h3>
        <p className="text-gray-400 leading-relaxed transition-colors duration-500 ease-in-out group-hover:text-gray-600">{service.description}</p>
    </a>
);


interface EcommerceGraphicProps { isVisible: boolean; }
const EcommerceGraphic: React.FC<EcommerceGraphicProps> = ({ isVisible }) => (
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

interface TeamMemberProps { imgSrc: string; name: string; role: string; }
const TeamMember: React.FC<TeamMemberProps> = ({ imgSrc, name, role }) => (
  <div className="flex flex-col items-center text-center group cursor-pointer">
    <div className="w-full h-64 aspect-square mb-4 relative overflow-hidden"> 
      <img src={imgSrc} alt={name} width={300} height={400} className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"/>
    </div>
    <h3 className="text-xl font-bold text-black">{name}</h3>
    <p className="text-black">{role}</p>
  </div>
);

export default function HomePage() {
    const [isEcommerceVisible, setIsEcommerceVisible] = useState(false);
    const [isServicesVisible, setIsServicesVisible] = useState(false);
    const [isTeamVisible, setIsTeamVisible] = useState(false);
    const ecommerceRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const createObserver = (callback: (isVisible: boolean) => void) => new IntersectionObserver(([entry], obs) => {
            if (entry.isIntersecting) {
                callback(true);
                obs.unobserve(entry.target);
            }
        }, { threshold: 0.2 });

        const observers = [
            { ref: ecommerceRef, callback: setIsEcommerceVisible },
            { ref: servicesRef, callback: setIsServicesVisible },
            { ref: teamRef, callback: setIsTeamVisible },
        ];

        const createdObservers = observers.map(obs => createObserver(obs.callback));
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
    
    const teamMembers = [
        { imgSrc: '/Team/ceo2.png', name: 'MIAN HASHIM HAROON', role: 'CEO' }, 
        { imgSrc: '/Team/coo3.png', name: 'DR. ABDULLAH HAROON', role: 'COO' }, 
        { imgSrc: '/Team/ayyan.jpg', name: 'AYYAN SHIRAZ', role: 'Marketing Head' }, 
        { imgSrc: '/Team/yasir.jpg', name: 'YASIR IRSHAD', role: 'IT Manager' }, 
        { imgSrc: '/Team/ajwa4.png', name: 'AJWA ARSHAD', role: 'Social Media Manager' },
        { imgSrc: '/Team/alishba2.png', name: 'ALISHBA ZIA', role: 'Project Manager' },
    ];

    const headingWords = ["Break", "<span class='text-white'>Free</span>", "From", "All", "The", "<span class='text-white'>Hassle</span>", "of", "Starting", "Ecommerce", "Business"];
    const paragraphWords = ["Discover", "our", "powerful,", "revolutionary,", "time-proven", "<span class='text-white font-semibold'>MAGICAL 9 STEP</span>", "ecommerce", "success", "formula.", "That", "helps", "you", "end-to-end", "to", "build", "a", "<span class='font-semibold'>SUCCESSFUL</span>", "ecommerce", "business.", "Without", "you", "needing", "to", "lift", "a", "<span class='font-semibold'>FINGER!!</span>"];

    return (
        <div className="bg-black font-sans">
              <style jsx>{`
                  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                  @keyframes drawLine { from { transform: scaleX(0); } to { transform: scaleX(1); } }
                  .service-grid-item, .team-member-item { opacity: 0; }
                  .animate-services .service-grid-item, .animate-team .team-member-item { animation: fadeInUp 0.6s ease-out forwards; }
                  .word-wrapper { display: inline-block; opacity: 0; }
                  .animate-text .word-wrapper { animation: fadeInUp 0.5s ease forwards; }
              `}</style>
              <style jsx global>{`
                  .graphic-element { opacity: 0; transform: scale(0.8) translateY(20px); }
                  .graphic-animate .graphic-element { animation: graphicFadeInUp 0.6s ease-out forwards; }
                  @keyframes graphicFadeInUp { from { opacity: 0; transform: scale(0.8) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
              `}</style>
              
              <div className="relative min-h-screen w-full text-white overflow-hidden flex flex-col bg-black">
                  {/* MODIFIED: Replaced <img> with <video> tag */}
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    src="/intro.mp4" 
                    className="absolute inset-0 z-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 z-10 bg-black/60"></div>
                  <div className="absolute inset-0 z-20" style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`, backgroundSize: `25px 25px` }}></div>
                  <main className="relative flex-grow flex items-center justify-center text-center px-10 md:px-20 z-30">
                      <div>
                          <p className="text-2xl md:text-3xl font-light mb-2">Your Partner In</p>
                          <h2 className="text-5xl md-text-7xl lg:text-8xl font-extrabold tracking-tighter leading-none">CREATING and GROWING</h2>
                          <h2 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter">BRANDS !</h2>
                          {/* MODIFIED: Decreased top margin and increased text size */}
                          <div className="mt-8 max-w-xs mx-auto">
                              <p className="text-lg font-light leading-relaxed">We Help Businesses Thrive and grow by crafting the post <span className="font-semibold">Human-Centric</span> solutions</p>
                          </div>
                      </div>
                  </main>
                  {/* MODIFIED: Bouncing arrow removed from here */}
              </div>

              <section ref={servicesRef} className="bg-white pt-12 pb-24">
                  <div className="container mx-auto px-8 md:px-16">
                      <div className={`text-center mb-16 transition-opacity duration-700 ease-in ${isServicesVisible ? 'opacity-100' : 'opacity-0'}`}>
                          <p className="text-xl md:text-2xl text-black">
                              <span className="font-bold">BLACK ZERO</span> is a <span className="font-bold">FULL SERVICE</span> agency with a
                          </p>
                          <h3 className="text-4xl md:text-6xl font-extrabold text-black tracking-tight">
                              MAJOR FOCUS ON
                          </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {servicesData.map((service, index) => (
                              <ServiceCard 
                                  key={service.slug}
                                  service={service}
                                  isVisible={isServicesVisible}
                                  index={index}
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
                          <a href="/ecommerce-success" className="group flex items-center justify-center text-2xl font-bold uppercase tracking-widest hover:underline">
                              Get to the ladder of ecommerce success!
                              <ArrowRightIcon />
                          </a>
                      </div>
                  </div>
              </section>

              <section ref={teamRef} id="team" className={`bg-white text-black py-20 ${isTeamVisible ? 'animate-team' : ''}`}>
                <div className="container mx-auto px-16 md:px-32 text-center">
                  <h2 className="text-3xl font-bold mb-12 flex items-center justify-center">THE BRAINS BEHIND BLACK ZERO<svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12">
                    {teamMembers.map((member, index) => (<div key={member.name + index} className="team-member-item" style={{ animationDelay: `${index * 0.15}s` }}><TeamMember {...member} /></div>))}
                  </div>
                </div>
              </section>
        </div>
    );
}

