'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Star, X } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from "next/link";

// --- Types ---
export interface ProjectDetail {
    title: string;
    description: string;
    imageUrl?: string;
    videoUrl?: string;
}

export interface Project {
    slug: string;
    title: string;
    category: string;
    imageUrl: string;
    className: string;
    description: string;
    services: string[];
    gallery: string[];
    details?: ProjectDetail[];
    testimonial?: {
        quote: string;
        author: string;
        image: string;
        rating: number;
    };
}

// --- Helper Components ---

interface BreadcrumbItem { href: string; label: string; }
const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => (
    <nav aria-label="Breadcrumb" className="bg-white py-4">
        <div className="container mx-auto px-6 sm:px-12 lg:px-24">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
                {items.map((item, index) => (
                    <li key={item.href} className="flex items-center">
                        {index > 0 && (
                            <svg className="w-4 h-4 mx-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                            </svg>
                        )}
                        {index === items.length - 1 ? (
                            <span className="font-semibold text-gray-800">{item.label}</span>
                        ) : (
                            <Link href={item.href} className="hover:underline hover:text-gray-800 transition-colors">
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    </nav>
);

const ProjectDetailSection = ({ detail, isReversed }: { detail: ProjectDetail, isReversed: boolean }) => {
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
                    {detail.imageUrl && detail.imageUrl.endsWith('.mp4') ? (
                        <video src={detail.imageUrl} autoPlay loop muted playsInline className="w-full h-auto object-cover transition-all duration-500 ease-in-out group-hover:scale-105" />
                    ) : (
                        <img src={detail.imageUrl || 'https://placehold.co/600x400/eeeeee/cccccc?text=No+Image'} alt={detail.title} className="w-full h-auto object-cover transition-all duration-500 ease-in-out group-hover:scale-105" />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
            </div>
            <div className={`md:w-3/5 transition-opacity duration-1000 ${isVisible ? `opacity-100 ${textAnimation}` : 'opacity-0'}`} style={{ transitionDelay: '200ms' }}>
                <h3 className="text-3xl font-bold text-black mb-4">{detail.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: detail.description }}></p>
            </div>
        </div>
    );
};

const ImageModal = ({ images, initialIndex, onClose }: { images: string[], initialIndex: number, onClose: () => void }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const doNext = useCallback(() => setCurrentIndex(prev => (prev + 1) % images.length), [images.length]);
    const doPrev = useCallback(() => setCurrentIndex(prev => (prev - 1 + images.length) % images.length), [images.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') doNext();
            if (e.key === 'ArrowLeft') doPrev();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [doNext, doPrev, onClose]);

    return (
        <motion.div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[99999] p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
            <AnimatePresence mode="wait">
                <motion.img 
                    key={currentIndex} 
                    src={images[currentIndex]} 
                    alt="Gallery View" 
                    className="max-w-[95vw] max-h-[85vh] object-contain rounded-lg shadow-2xl" 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.95 }} 
                    transition={{ duration: 0.2 }} 
                    onClick={(e) => e.stopPropagation()} 
                />
            </AnimatePresence>
            <button onClick={onClose} className="fixed top-6 right-6 text-white bg-black/60 p-3 rounded-full hover:bg-black/90 z-[999999] border border-white/20"><X size={32} /></button>
            <button onClick={(e) => { e.stopPropagation(); doPrev(); }} className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 text-white bg-black/60 p-3 rounded-full hover:bg-black/90 z-[999999] border border-white/20"><ArrowLeft size={32} /></button>
            <button onClick={(e) => { e.stopPropagation(); doNext(); }} className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 text-white bg-black/60 p-3 rounded-full hover:bg-black/90 z-[999999] border border-white/20"><ArrowRight size={32} /></button>
        </motion.div>
    );
};

const TestimonialCard = ({ quote, author, rating }: { quote: string, author: string, rating: number }) => (
    <div className="relative max-w-4xl mx-auto pt-12 pb-12 px-8">
        <div className="relative border-2 border-white p-8">
            <div className="text-xl font-medium text-white leading-relaxed my-8 text-center">
                <p>&quot;{quote}&quot;</p>
            </div>
            <div className="flex justify-center items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className={`w-6 h-6 ${index < rating ? 'text-white fill-current' : 'text-gray-600'}`} />
                ))}
            </div>
            <p className="text-lg font-semibold text-white text-center mt-4">- {author}</p>
        </div>
    </div>
);

// --- RESTORED CAROUSEL WITH ARROWS ---
const ProjectCarousel = ({ images, onImageClick }: { images: string[], onImageClick: (index: number) => void }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!isHovering && images.length > 1) {
            interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % images.length), 4000);
        }
        return () => clearInterval(interval);
    }, [isHovering, images.length]);

    const nextSlide = () => {
        if (images.length > 1) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
    };

    const prevSlide = () => {
        if (images.length > 1) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    const getSlideStyle = (index: number): React.CSSProperties => {
        const total = images.length;
        if (total === 1) return { transform: 'translateX(-50%) translateY(-50%) scale(1.2)', opacity: 1, zIndex: 20 };

        let offset = index - currentIndex;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        if (offset === 0) return { transform: 'translateX(-50%) translateY(-50%) scale(1.2)', opacity: 1, zIndex: 20 };
        if (offset === 1 || (currentIndex === total - 1 && index === 0 && total > 2)) return { transform: 'translateX(30%) translateY(-50%) scale(0.9)', opacity: 0.6, zIndex: 10 };
        if (offset === -1 || (currentIndex === 0 && index === total - 1 && total > 2)) return { transform: 'translateX(-130%) translateY(-50%) scale(0.9)', opacity: 0.6, zIndex: 10 };
        
        // Handle 2 image case specific logic
        if (total === 2 && Math.abs(offset) === 1) {
             const sideOffset = offset === 1 ? '30%' : '-130%';
             return { transform: `translateX(${sideOffset}) translateY(-50%) scale(0.9)`, opacity: 0.6, zIndex: 10 };
        }

        return { transform: 'translateX(-50%) translateY(-50%) scale(0.8)', opacity: 0, zIndex: 0 };
    };

    if (images.length === 0) return null;

    return (
        <div className="relative w-full" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="relative" style={{ paddingTop: '45%' }}>
                <div className="absolute inset-0">
                    {images.map((img, index) => (
                        <div key={index} className="absolute left-1/2 top-1/2 w-1/2 md:w-1/3 transition-all duration-500 ease-in-out cursor-pointer" style={getSlideStyle(index)} onClick={() => index === currentIndex ? onImageClick(index) : setCurrentIndex(index)}>
                            <img src={img} alt="Gallery" className="block w-full aspect-square object-cover rounded-lg shadow-lg" />
                        </div>
                    ))}
                </div>
            </div>
            
            {/* ARROWS ADDED BACK HERE */}
            {images.length > 1 && (
                <>
                    <button onClick={prevSlide} className="absolute top-1/2 left-0 md:-left-8 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors z-30">
                        <ArrowLeft size={24} />
                    </button>
                    <button onClick={nextSlide} className="absolute top-1/2 right-0 md:-right-8 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors z-30">
                        <ArrowRight size={24} />
                    </button>
                </>
            )}
        </div>
    );
};

// --- Animations ---
const introContainerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const textItemVariants: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.7 } } };
const imageItemVariants: Variants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { ease: "easeOut", duration: 0.7, delay: 0.2 } } };
const testimonialVariants: Variants = { hidden: { opacity: 0, y: 50, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { ease: "easeOut", duration: 0.8 } } };

// --- Main Component ---
export default function ProjectClientView({ project }: { project: Project }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const breadcrumbItems = [
        { href: '/', label: 'Home' },
        { href: '/projects', label: 'Projects' },
        { href: `/projects/${project.slug}`, label: project.title },
    ];

    const remainingImages = project.gallery && project.gallery.length > 1 ? project.gallery.slice(1) : [];
    const mainImage = project.gallery && project.gallery.length > 0 ? project.gallery[0] : 'https://placehold.co/600x400/eeeeee/cccccc?text=No+Image';

    return (
        <div className="bg-white text-black font-sans">
             <style jsx global>{`
                 @keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px) rotateY(15deg); } to { opacity: 1; transform: translateX(0) rotateY(0); } }
                 @keyframes slideInRight { from { opacity: 0; transform: translateX(40px) rotateY(-15deg); } to { opacity: 1; transform: translateX(0) rotateY(0); } }
                 .animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
                 .animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
             `}</style>

            <div className="pt-24 md:pt-32">
                <Breadcrumbs items={breadcrumbItems} />
                <main className="py-16 md:py-20">
                    <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 md:mb-24" variants={introContainerVariants} initial="hidden" animate="visible">
                            <motion.div variants={textItemVariants} className="text-left md:order-1 order-2">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">{project.title}</h1>
                                <div className="text-base md:text-lg text-gray-700 leading-relaxed prose max-w-none" dangerouslySetInnerHTML={{ __html: project.description }}></div>
                            </motion.div>
                            <motion.div variants={imageItemVariants} className="flex items-center justify-center md:order-2 order-1">
                                <img src={mainImage} alt={`${project.title} main`} className="rounded-lg shadow-xl w-full h-auto object-cover max-h-[60vh]" />
                            </motion.div>
                        </motion.div>

                        {project.details && (
                            <div className="py-16 md:py-24 space-y-20 md:space-y-28">
                                {project.details.map((detail, index) => (
                                    <ProjectDetailSection key={index} detail={detail} isReversed={index % 2 !== 0} />
                                ))}
                            </div>
                        )}

                        {remainingImages.length > 0 && (
                            <div className="my-20 md:my-32">
                                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-12 md:mb-16">Project Gallery</h2>
                                 <ProjectCarousel images={remainingImages} onImageClick={(index) => setSelectedImageIndex(index)} />
                            </div>
                        )}

                        {project.testimonial && (
                            <motion.div className="my-20 md:my-32 bg-gradient-to-br from-gray-900 to-black text-white py-16 md:py-24 rounded-lg shadow-2xl overflow-hidden" variants={testimonialVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-10 md:mb-12">What Our Client Said</h2>
                                <TestimonialCard quote={project.testimonial.quote} author={project.testimonial.author} rating={project.testimonial.rating} />
                            </motion.div>
                        )}

                        <div className="text-center mt-20 md:mt-24 mb-10">
                            <Link href="/projects" className="inline-flex items-center gap-2 bg-black text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded-lg hover:bg-gray-800 transition-colors text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                <ArrowLeft size={20} /> Back to All Projects
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <ImageModal images={remainingImages} initialIndex={selectedImageIndex} onClose={() => setSelectedImageIndex(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}