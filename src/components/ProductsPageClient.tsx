'use client';

import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, ShoppingBag, Users, FileText, BarChart, Calculator, TrendingUp, Mail, Phone, Target } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion'; 

interface Product {
    id: number;
    sku: string;
    name: string;
    slug: string;
    category: string;
    brand: string;
    shortDescription: string;
    fullDescription: string;
    features: string[];
    imageSrc: string;
    imgAltText?: string;
}

// --- ANIMATION VARIANTS ---
const sentenceVariants: Variants = {
    hidden: { opacity: 0 },
    visible: ({ delay = 0, stagger = 0.1 } = {}) => ({
        opacity: 1,
        transition: { 
            delayChildren: delay, 
            staggerChildren: stagger 
        },
    }),
};

const wordVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { 
            staggerChildren: 0.05 
        },
    },
};

const letterVariants: Variants = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 10, transition: { type: "spring", damping: 12, stiffness: 100 } },
};

const gridContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { type: "spring", stiffness: 60, damping: 15 } 
    },
    hover: {
        y: -10,
        scale: 1.02,
        boxShadow: "0px 15px 30px rgba(0,0,0,0.4)",
        borderColor: "rgba(100,100,100,0.8)",
        transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    tap: { scale: 0.98 }
};

// --- HELPER COMPONENT ---
const TypingText = ({ text, className, delayStart = 0 }: { text: string, className?: string, delayStart?: number }) => {
    const words = text.split(" ");
    
    return (
        <motion.div
            variants={sentenceVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={{ delay: delayStart }}
            className={`${className} flex flex-wrap justify-center gap-x-1.5 gap-y-1`}
        >
            {words.map((word, i) => (
                <motion.span 
                    key={i} 
                    variants={wordVariants}
                    className="inline-block whitespace-nowrap"
                >
                    {Array.from(word).map((char, index) => (
                        <motion.span 
                            key={index} 
                            variants={letterVariants} 
                            className="inline-block"
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.span>
            ))}
        </motion.div>
    );
};

const categories = ['All', 'HR Tech', 'Finance', 'Marketing', 'Sales Tools', 'Education'];

export default function ProductsPageClient({ products }: { products: Product[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 9;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);

    // --- SEARCH ENGINE ---
    const filteredProducts = products.filter(product => {
        const lowerTerm = searchTerm.toLowerCase();
        const matchesSearch = 
            product.name.toLowerCase().includes(lowerTerm) || 
            product.sku.toLowerCase().includes(lowerTerm) ||
            product.category.toLowerCase().includes(lowerTerm) ||
            product.brand.toLowerCase().includes(lowerTerm);

        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // --- ICONS ---
    const getCategoryIcon = (cat: string) => {
        switch(cat) {
            case 'HR Tech': return <Users className="w-5 h-5" />;
            case 'Finance': return <TrendingUp className="w-5 h-5" />;
            case 'Marketing': return <BarChart className="w-5 h-5" />;
            case 'Sales Tools': return <Target className="w-5 h-5" />;
            case 'Education': return <Calculator className="w-5 h-5" />;
            default: return <ShoppingBag className="w-5 h-5" />;
        }
    };

    const getProductIcon = (name: string, cat: string) => {
        if (name.includes('Email')) return <Mail className="w-5 h-5" />;
        if (name.includes('Phone')) return <Phone className="w-5 h-5" />;
        if (name.includes('Invoicer')) return <FileText className="w-5 h-5" />;
        return getCategoryIcon(cat);
    };

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-white text-black pt-16 pb-12 font-sans relative">
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* --- HERO SECTION --- */}
            <section className="relative h-80 md:h-96 w-full flex items-center justify-center overflow-hidden">
                <img src="/product.webp" alt="Black Zero Products Background" className="absolute inset-0 w-full h-full object-cover object-center opacity-70" />
                <div className="absolute inset-0 bg-black/60"></div>
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative z-10 text-center px-4"
                >
                    <h1 className="text-3xl md:text-7xl font-extrabold tracking-tighter leading-none text-white">
                        INNOVATIVE <span className="text-white">SOFTWARE</span>
                    </h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="mt-4 text-base md:text-xl text-white max-w-3xl mx-auto"
                    >
                        Cutting-edge digital tools designed to accelerate your business growth.
                    </motion.p>
                </motion.div>
            </section>

            {/* --- HEADER SECTION --- */}
            <div className="container mx-auto px-4 md:px-12 mt-12 mb-10 text-center max-w-full">
                <TypingText 
                    text="OUR PRODUCTS" 
                    className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-black"
                />
                <div className="w-full">
                    <TypingText 
                        text="Explore our suite of specialized software solutions, from IT and Marketing automation to financial forecasting."
                        className="text-gray-600 max-w-4xl mx-auto text-center text-base md:text-lg leading-relaxed px-2"
                        delayStart={1.2}
                    />
                </div>
            </div>

            {/* --- CONTROLS SECTION --- */}
            <div className="container mx-auto px-4 md:px-12 mb-10 max-w-full">
                <div className="flex flex-col md:flex-row gap-5 justify-between bg-gray-100 p-4 md:p-6 rounded-2xl border border-gray-200 w-full">
                    
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full bg-white border border-gray-300 text-black rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-gray-400 text-base"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="w-full md:w-auto flex flex-wrap md:flex-nowrap gap-2 justify-center md:justify-start">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-300 border
                                    ${selectedCategory === cat 
                                        ? 'bg-black text-white border-black' 
                                        : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400 hover:text-black'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- PRODUCTS GRID --- */}
            <div className="container mx-auto px-4 md:px-12 min-h-[400px] w-full max-w-full">
                {filteredProducts.length > 0 ? (
                    <motion.div 
                        variants={gridContainerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence mode='popLayout'>
                            {currentItems.map((product) => (
                                <motion.div 
                                    key={product.id}
                                    layout 
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    whileHover="hover" 
                                    whileTap="tap"
                                    className="group relative bg-black border border-neutral-800 rounded-xl p-6 transition-colors duration-300 flex flex-col cursor-pointer shadow-lg"
                                >
                                    <Link href={`/products/${product.slug}`} className="absolute inset-0 z-0" aria-label={`View details for ${product.name}`} />

                                    <div className="flex justify-between items-start mb-4 relative z-0 pointer-events-none">
                                        <span className="bg-neutral-900 text-gray-300 text-[10px] md:text-xs font-bold px-3 py-1 rounded-md border border-neutral-800 uppercase tracking-wider">
                                            {product.brand}
                                        </span>
                                        <div className="text-gray-500 group-hover:text-white transition-colors">
                                            {getProductIcon(product.name, product.category)}
                                        </div>
                                    </div>
                                    
                                    <div className="mb-4 flex-grow relative z-0 pointer-events-none">
                                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-snug line-clamp-2 group-hover:text-gray-200">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-white font-mono">
                                            Code: <span className="text-white">{product.sku}</span>
                                        </p>
                                        <p className="text-xs text-white mt-1 mb-3">
                                            Category: {product.category}
                                        </p>
                                    </div>
                                    
                                    <div className="relative z-10 pointer-events-auto mb-4">
                                        <motion.a 
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            href={`https://wa.me/923334888324?text=Hi, I am interested in ${encodeURIComponent(product.name)} (Code: ${product.sku}). Please provide a quote.`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-bold transition-colors"
                                        >
                                            Get a Quote
                                        </motion.a>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-neutral-800 flex items-center justify-between relative z-0 pointer-events-none">
                                        <div className="flex items-center gap-2">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                            <span className="text-white text-[10px] md:text-xs font-medium uppercase tracking-wider">Available</span>
                                        </div>
                                        <span className="text-[10px] md:text-xs font-medium text-white hover:text-gray-300 transition-colors flex items-center gap-1">
                                            View Details <ChevronRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200 border-dashed"
                    >
                        <div className="text-gray-400 mb-4 text-center w-full flex justify-center">
                            <Search className="w-12 h-12" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700">No products found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
                        <button 
                            onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                            className="mt-6 px-6 py-2 bg-black text-white rounded-md font-bold hover:bg-gray-800 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                )}
            </div>

            {/* --- PAGINATION --- */}
            {filteredProducts.length > itemsPerPage && (
                <div className="container mx-auto px-4 md:px-12 mt-12 flex justify-center w-full max-w-full">
                    <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg border border-gray-200">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-md text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        
                        <span className="px-4 text-sm font-mono text-gray-500">
                            Page <span className="text-black font-bold">{currentPage}</span> of {totalPages}
                        </span>

                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-md text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}