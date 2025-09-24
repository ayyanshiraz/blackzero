'use client';
import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { ArrowLeft, Star, X } from 'lucide-react';
import Link from 'next/link';
import { projectsData } from '@/data/projects';
import Breadcrumbs from '@/components/Breadcrumbs';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- NEW IMAGE MODAL COMPONENT ---
interface ImageModalProps {
    imageUrl: string;
    onClose: () => void;
}
const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // Close modal on background click
        >
            <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
            >
                <img
                    src={imageUrl}
                    alt="Full screen project gallery"
                    className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
                />
            </motion.div>
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                aria-label="Close image view"
            >
                <X size={32} />
            </button>
        </motion.div>
    );
};

// --- TESTIMONIAL CARD COMPONENT (No changes here) ---
interface TestimonialProps {
    quote: string;
    author: string;
    image: string;
    rating: number;
}
const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, rating }) => (
    <div className="relative max-w-4xl mx-auto pt-4 pb-12 px-8">
        <div className="relative">
            <div className="absolute inset-0 bg-black -m-4"></div>
            <div className="relative border-2 border-white p-8">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 flex items-center gap-4">
                    <div className="h-0.5 w-12 bg-white"></div>
                    <svg width="40" height="30" viewBox="0 0 40 30" fill="white"><path d="M0 30V15.2174C0 10.1522 1.44928 6.19565 4.34783 3.34783C7.24638 0.5 10.942 0 15.4348 0V7.17391C12.4348 7.17391 10.1304 7.91304 8.52174 9.3913C6.91304 10.8696 6.1087 12.8261 6.1087 15.2609V16.3043H16.5217V30H0ZM23.4783 30V15.2174C23.4783 10.1522 24.9275 6.19565 27.8261 3.34783C30.7246 0.5 34.4203 0 38.913 0V7.17391C35.913 7.17391 33.6087 7.91304 32 9.3913C30.3913 10.8696 29.587 12.8261 29.587 15.2609V16.3043H40V30H23.4783Z"/></svg>
                    <div className="h-0.5 w-12 bg-white"></div>
                </div>
                <div className="text-xl font-medium text-white leading-relaxed my-8 text-center">
                    <p>"{quote}"</p>
                </div>
                <div className="flex justify-center items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className={`w-6 h-6 ${index < rating ? 'text-white fill-current' : 'text-gray-600'}`} />
                    ))}
                </div>
                <p className="text-lg font-semibold text-white text-center mt-4">- {author}</p>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-black px-4 flex items-center gap-4">
                    <div className="h-0.5 w-12 bg-white"></div>
                    <svg width="40" height="30" viewBox="0 0 40 30" fill="white" className="transform rotate-180"><path d="M0 30V15.2174C0 10.1522 1.44928 6.19565 4.34783 3.34783C7.24638 0.5 10.942 0 15.4348 0V7.17391C12.4348 7.17391 10.1304 7.91304 8.52174 9.3913C6.91304 10.8696 6.1087 12.8261 6.1087 15.2609V16.3043H16.5217V30H0ZM23.4783 30V15.2174C23.4783 10.1522 24.9275 6.19565 27.8261 3.34783C30.7246 0.5 34.4203 0 38.913 0V7.17391C35.913 7.17391 33.6087 7.91304 32 9.3913C30.3913 10.8696 29.587 12.8261 29.587 15.2609V16.3043H40V30H23.4783Z"/></svg>
                    <div className="h-0.5 w-12 bg-white"></div>
                </div>
            </div>
        </div>
    </div>
);

// Animation variants
const introContainerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const textItemVariants: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.7 } } };
const imageItemVariants: Variants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { ease: "easeOut", duration: 0.7, delay: 0.2 } } };
const testimonialVariants: Variants = { hidden: { opacity: 0, y: 50, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { ease: "easeOut", duration: 0.8, delayChildren: 0.3, staggerChildren: 0.2 } } };
const testimonialHeaderVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } } };
const testimonialCardVariants: Variants = { hidden: { opacity: 0, y: 20, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { ease: "easeOut", duration: 0.7 } } };

// --- MAIN PROJECT DETAIL PAGE ---
export default function ProjectDetailPage() {
    const params = useParams();
    const projectName = params.projectName as string;
    const project = projectsData.find(p => p.slug === projectName);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!project) {
        notFound();
    }

    const breadcrumbItems = [
        { href: '/', label: 'Home' },
        { href: '/projects', label: 'Projects' },
        { href: `/projects/${project.slug}`, label: project.title },
    ];

    return (
        <div className="bg-white text-black font-sans">
            <Navbar />
            <div className="pt-24">
                <div className="pt-4">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>
                <main className="py-16 md:py-20">
                    <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16"
                            variants={introContainerVariants}
                            initial="hidden"
                            animate="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <motion.div variants={textItemVariants} className="text-left">
                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{project.title}</h1>
                                <p className="text-base text-gray-600 leading-relaxed">{project.description}</p>
                            </motion.div>
                            <motion.div variants={imageItemVariants} className="flex items-center justify-center">
                                <img 
                                    src={project.gallery[0]} 
                                    alt={`${project.title} main image`} 
                                    className="rounded-lg shadow-xl w-full h-auto object-cover max-h-[500px]"
                                />
                            </motion.div>
                        </motion.div>

                        {/* PROJECT GALLERY SECTION HAS BEEN REMOVED */}

                        {project.testimonial && (
                            <motion.div
                                className="my-24"
                                variants={testimonialVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.4 }}
                            >
                                <motion.h2
                                    className="text-3xl md:text-4xl font-extrabold text-center mb-4"
                                    variants={testimonialHeaderVariants}
                                >
                                    What Our Client Said
                                </motion.h2>
                                <motion.div variants={testimonialCardVariants}>
                                    <TestimonialCard 
                                        quote={project.testimonial.quote}
                                        author={project.testimonial.author}
                                        image={project.testimonial.image}
                                        rating={project.testimonial.rating}
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                        
                        <div className="text-center mt-24">
                            <Link href="/projects" className="inline-flex items-center gap-2 bg-black text-white font-bold py-4 px-10 rounded-lg hover:bg-gray-800 transition-colors text-lg">
                                <ArrowLeft size={20} />
                                Back to All Projects
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
            {/* Conditionally render the modal */}
            <AnimatePresence>
                {selectedImage && (
                    <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}