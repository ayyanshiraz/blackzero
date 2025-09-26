'use client';
import React, { useState, useEffect, useRef, type FC } from 'react';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Custom Hook for Typing Effect ---
const useTypingEffect = (textToType: string, speed = 100, startCondition = false) => {
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        if (startCondition) {
            const intervalId = setInterval(() => {
                setTypedText(currentTypedText => {
                    if (currentTypedText.length < textToType.length) {
                        return textToType.slice(0, currentTypedText.length + 1);
                    }
                    clearInterval(intervalId);
                    return currentTypedText;
                });
            }, speed);

            return () => clearInterval(intervalId);
        }
    }, [textToType, speed, startCondition]);

    return typedText;
};

// --- SVG Icon components ---
const MapPin = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-black">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const Phone = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-black">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const Mail = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-black">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const WhatsApp = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-black">
        <path d="M16.75 13.96c.25.13.41.33.47.54.1.34.04.72-.18 1.02l-.1.12c-.22.28-.5.48-.82.64s-.68.25-1.04.17c-1.12-.25-2.19-.79-3.13-1.52s-1.68-1.58-2.22-2.62c-.15-.29-.24-.61-.26-.93s.03-.64.18-.93c.15-.29.35-.53.6-.71l.03-.02c.26-.18.56-.29.88-.3s.63.07.9.26l.4.35c.29.25.54.54.73.85s.32.65.37.99c.05.34.01.69-.12.99l-.38.88c-.08.18-.08.39.01.57s.25.33.44.4c.19.07.4.06.58-.02l.7-.3c.25-.1.53-.12.78-.07s.48.17.65.33zM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
    </svg>
);


// --- FAQ Section Components ---
const faqData = [
    { question: "What is Black Zero?", answer: "Black Zero is a full-service creative and digital agency based in Lahore. We are a team of thinkers, creators, and strategists dedicated to helping businesses grow by building powerful brand identities and effective marketing solutions." },
    { question: "Why should I choose Black Zero?", answer: "You should choose us because we become an extension of your team. We focus on building lasting relationships based on trust and transparency. Our strategies are data-driven, human-centric, and designed to deliver measurable results that align with your business goals." },
    { question: "How to contact Black Zero?", answer: "You can contact us by filling out the form on this page, calling us at +92 324 4333267, or sending an email to info@blackzero.org. We are also available on WhatsApp." },
    { question: "How can I get a quotation for my business?", answer: "To get a custom quotation, please fill out the contact form with as much detail about your project as possible. Our team will review your request and contact you to schedule a consultation to discuss your needs and provide a detailed proposal." },
    { question: "What are your services?", answer: "We offer a comprehensive suite of services including Marketing, Business Analytics, 2D/3D Animation, Web & App Development, Graphic Design, and professional Photography/Videography." },
    { question: "When did Black Zero form?", answer: "Black Zero was founded in 2024 by a team of passionate experts with a vision to create a multi-domain company that delivers exceptional results." },
    { question: "Who is the owner of Black Zero?", answer: "Black Zero is led by our CEO, Mian Hashim Haroon, who oversees the company&apos;s vision and strategic direction." },
    { question: "How do I contact the Black Zero team?", answer: "The most efficient way to reach our team is through the contact form on our website or by emailing us at info@blackzero.org. For urgent matters, you can call our office number." },
    { question: "What are the costs?", answer: "Our costs are project-dependent. We don&apos;t offer one-size-fits-all packages because we believe every business has unique needs. We provide a custom quotation after an initial consultation to ensure our services are perfectly tailored to you." },
    // ✅ AMENDED CODE: Added the 10th question
    { question: "In which countries do you operate?", answer: "Our main office is physically located in Lahore, Pakistan. However, we operate globally and have proudly served clients in 9 different countries across the world." }
];

const FaqItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void; }) => {
    return (
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="border-b border-gray-200 last:border-b-0">
            <button
                onClick={onClick}
                className="w-full group flex justify-between items-center text-left py-5 px-6 bg-black text-white font-semibold focus:outline-none transition-colors duration-300 hover:bg-white hover:text-black"
            >
                <span className="text-lg">{question}</span>
                <span className="text-2xl font-light transition-transform duration-300 group-hover:scale-110">{isOpen ? '−' : '+'}</span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.section
                        key="answer"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto' },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 bg-white text-gray-800 border-l border-r border-gray-200">
                            <p className="leading-relaxed">{answer}</p>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };

    const midpoint = Math.ceil(faqData.length / 2);
    const leftFaqs = faqData.slice(0, midpoint);
    const rightFaqs = faqData.slice(midpoint);

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
    };

    return (
      <section className="bg-white text-black pt-12 pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Globe className="w-12 h-12 mx-auto mb-4 text-black" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-black">FAQS</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our team fields common questions from people all over the globe. We believe in providing clear and straightforward answers to help you navigate the process of working with us.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-lg overflow-hidden shadow-lg border border-gray-200"
            >
              {leftFaqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => handleToggle(index)}
                />
              ))}
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-lg overflow-hidden shadow-lg border border-gray-200"
            >
              {rightFaqs.map((faq, index) => {
                const originalIndex = index + midpoint;
                return (
                  <FaqItem
                    key={originalIndex}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === originalIndex}
                    onClick={() => handleToggle(originalIndex)}
                  />
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>
    );
};


// --- Main Contact Page Component ---
const ContactPage: FC = () => {
    const [isHeroVisible, setIsHeroVisible] = useState(false);
    const heroRef = useRef<HTMLElement>(null);
    
    const [formData, setFormData] = useState({
        fullName: '', email: '', subject: '', message: '',
    });
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsHeroVisible(true);
                    observer.unobserve(entry.target);
                }
            }, { threshold: 0.2 }
        );

        const currentHeroRef = heroRef.current;
        if (currentHeroRef) {
            observer.observe(currentHeroRef);
        }

        return () => {
            if (currentHeroRef) {
                observer.unobserve(currentHeroRef);
            }
        };
    }, []);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatusMessage('');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            setStatusMessage(result.message);
            if (response.ok) {
                setFormData({ fullName: '', email: '', subject: '', message: '' });  
            }
        } catch (error) {
            setStatusMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const boldPart = "BLACK ZERO:";
    const regularPart = " The Genesis Point.";
    const tagline2 = "We build strategic marketing engines for brands that refuse to be ignored.";

    const typedBoldPart = useTypingEffect(boldPart, 70, isHeroVisible);
    const isBoldPartComplete = typedBoldPart === boldPart;
    const typedRegularPart = useTypingEffect(regularPart, 70, isBoldPartComplete);
    const isRegularPartComplete = typedRegularPart === regularPart;
    const typedTagline2 = useTypingEffect(tagline2, 40, isRegularPartComplete);
    const isTagline2Complete = typedTagline2 === tagline2;

    const formSectionBackgroundStyle = {
        backgroundColor: '#000000',
        backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: `2rem 2rem`,
    };

    return (
        <div className="bg-black text-white font-sans">
            <style jsx>{`
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s ease-out forwards; }
                @keyframes blink { 50% { opacity: 0; } }
                .typing-cursor { display: inline-block; width: 0.5em; height: 1.1em; background-color: white; animation: blink 1s steps(1) infinite; vertical-align: middle; }
            `}</style>

            <section
                ref={heroRef}
                className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: "url('/contact4.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/60 z-10 backdrop-filter backdrop-blur-[2px]"></div>
                
                <div className="relative z-20 container mx-auto px-8 sm:px-16 md:px-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 text-center md:text-left">
                        
                        <div className="md:w-1/2">
                            <h1 className={`text-7xl md:text-9xl font-extrabold tracking-tighter leading-none ${isHeroVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                                CONTACT<br />US!
                            </h1>
                            <p className={`text-xl md:text-2xl mt-4 max-w-md mx-auto md:mx-0 text-gray-200 ${isHeroVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                                Have a query? Don&apos;t hesitate to reach out. We&apos;d love to hear from you!
                            </p>
                        </div>
                        
                        <div className="md:w-1/2 md:pl-16">
                            <div className={`w-full ${isHeroVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 0.5s ease-in 0.8s' }}>
                                <p className="text-2xl md:text-3xl font-light">
                                    <span className="font-bold">{typedBoldPart}</span>{!isBoldPartComplete && <span className="typing-cursor"></span>}
                                    {typedRegularPart}{isBoldPartComplete && !isRegularPartComplete && <span className="typing-cursor"></span>}
                                </p>
                                {isRegularPartComplete && (
                                    <p className="text-lg md:text-xl text-gray-200 mt-2 max-w-md">
                                        {typedTagline2}{!isTagline2Complete && <span className="typing-cursor"></span>}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <FaqSection />

            <section style={formSectionBackgroundStyle} className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Get In Touch</h2>
                        <p className="text-gray-300 text-lg">Have a project in mind? We&apos;d love to hear about it.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-black mb-6">Send us a message</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" name="fullName" id="fullName" required value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black text-black" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black text-black" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleChange} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black text-black" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black text-black"></textarea>
                                </div>
                                {statusMessage && (
                                    <div className={`p-3 text-center rounded-md text-sm ${statusMessage.toLowerCase().includes('error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                        {statusMessage}
                                    </div>
                                )}
                                <div>
                                    <button type="submit" disabled={loading} className="w-full text-white bg-black px-6 py-3 font-semibold rounded-md transition-all duration-300 hover:bg-black-800 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed">
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                                <div className="p-4 rounded-lg flex flex-col bg-white border-2 border-transparent transition-all duration-300 hover:border-gray-200 hover:shadow-lg hover:-translate-y-1">
                                    <div className="flex justify-center mb-2"><MapPin /></div>
                                    <p className="text-black font-semibold">Our Address</p>
                                    <p className="text-gray-700 text-sm break-words">Hotel MayFair 4th floor,  50-52, E - III, Commercial Zone, Gulberg III, 54660, Lahore, Punjab..</p>
                                </div>
                                <div className="p-4 rounded-lg flex flex-col bg-white border-2 border-transparent transition-all duration-300 hover:border-gray-200 hover:shadow-lg hover:-translate-y-1">
                                    <div className="flex justify-center mb-2"><Phone /></div>
                                    <p className="text-black font-semibold">Call Us</p>
                                    <p className="text-gray-700 text-sm break-words">+92 324 4333267</p>
                                </div>
                                <div className="p-4 rounded-lg flex flex-col bg-white border-2 border-transparent transition-all duration-300 hover:border-gray-200 hover:shadow-lg hover:-translate-y-1">
                                    <div className="flex justify-center mb-2"><Mail /></div>
                                    <p className="text-black font-semibold">Email Us</p>
                                    <div className="text-gray-700 text-sm break-words">
                                        <p>info@blackzero.org</p>
                                        <p>marketinghead@blackzero.org</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg flex flex-col bg-white border-2 border-transparent transition-all duration-300 hover:border-gray-200 hover:shadow-lg hover:-translate-y-1">
                                    <div className="flex justify-center mb-2"><WhatsApp /></div>
                                    <p className="text-black font-semibold">WhatsApp</p>
                                    <a href="https://wa.me/923244333267" target="_blank" rel="noopener noreferrer" className="text-gray-700 text-sm break-words hover:text-black transition-colors">+92 324 4333267</a>
                                </div>
                            </div>
                            
                            <div className="relative rounded-lg overflow-hidden shadow-lg h-80">
                                <div className="absolute top-3 left-3 z-10 bg-white text-black p-3 rounded-md shadow-lg w-full max-w-[280px]">
                                    <h4 className="font-bold text-gray-900">BLACK ZERO</h4>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Hotel MayFair 4th floor, 50-52, E - III, Commercial Zone, Gulberg III, 54660, Lahore, Punjab.
                                    </p>
                                    <a  
                                        href="https://www.google.com/maps/place/Hotel+MayFair/@31.5095172,74.3415963,16.91z/data=!4m9!3m8!1s0x39190466e1f6734f:0x8d762a4c914a7249!5m2!4m1!1i2!8m2!3d31.5094416!4d74.3416723!16s%2Fg%2F11gb3phkj3?entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D"
                                        target="_blank"  
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center mt-2 text-xs text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1.5"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                                        Directions
                                    </a>
                                </div>
                                <iframe  
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.131143228835!2d74.34840957561937!3d31.5121471742296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905d87a584b47%3A0x24285e8a71556856!2sHotel%20MayFair!5e0!3m2!1sen!2s!4v1694773693355!5m2!1sen!2s"
                                    width="100%"  
                                    height="100%"  
                                    style={{ border: 0 }}  
                                    allowFullScreen={false}  
                                    loading="lazy"  
                                    referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;