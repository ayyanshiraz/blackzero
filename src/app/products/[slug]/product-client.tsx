'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, ShoppingBag, Users, FileText, BarChart, Calculator, TrendingUp, Mail, Phone, Target } from 'lucide-react';
import ProductInteraction from './product-interaction';

const getCategoryIcon = (cat: string) => {
    switch(cat) {
        case 'HR Tech': return <Users className="w-6 h-6" />;
        case 'Finance': return <TrendingUp className="w-6 h-6" />;
        case 'Marketing': return <BarChart className="w-6 h-6" />;
        case 'Sales Tools': return <Target className="w-6 h-6" />;
        case 'Education': return <Calculator className="w-6 h-6" />;
        default: return <ShoppingBag className="w-6 h-6" />;
    }
};

const getProductIcon = (name: string, cat: string) => {
    if (name.includes('Email')) return <Mail className="w-6 h-6" />;
    if (name.includes('Phone')) return <Phone className="w-6 h-6" />;
    if (name.includes('Invoicer')) return <FileText className="w-6 h-6" />;
    return getCategoryIcon(cat);
};

interface ProductProps {
    product: {
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
        seoTitle: string;
        metaDescription: string;
        seoKeywords: string[];
    }
}

export default function ProductDetailClient({ product }: ProductProps) {
    return (
        <div className="min-h-screen bg-white text-black font-sans pt-28 md:pt-44 pb-12 w-full relative">
            
            <div className="w-full max-w-7xl mx-auto px-4 md:px-0 mb-8">
                
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative">
                    
                    <div className="w-full md:w-2/5">
                        <div className="group bg-black rounded-2xl aspect-square relative flex flex-col items-center justify-center shadow-2xl overflow-hidden md:sticky md:top-24 transition-all duration-500 ease-out hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:scale-[1.02] z-10">
                            {product.imageSrc ? (
                                <Image 
                                    src={product.imageSrc} 
                                    alt={product.imgAltText || product.name} 
                                    fill 
                                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center p-8 text-white">
                                    <div className="mb-6 text-gray-400 transform scale-150 transition-transform duration-500 group-hover:scale-[1.8] group-hover:text-white">
                                        {getProductIcon(product.name, product.category)}
                                    </div>
                                    <h1 className="text-xl md:text-2xl font-bold text-center">{product.name}</h1>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full md:w-3/5 flex flex-col min-w-0">
                        <div className="mb-4">
                            <span className="bg-black text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                {product.brand}
                            </span>
                        </div>
                        
                        <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-4 leading-tight break-words">
                            {product.name}
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500 mb-6 font-mono border-b border-gray-100 pb-6">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                                Code: <span className="text-black font-bold">{product.sku}</span>
                            </span>
                            <span className="hidden md:inline">|</span>
                            <span className="flex items-center gap-2">
                                Category: <span className="text-black font-bold">{product.category}</span>
                            </span>
                        </div>

                        <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed font-normal break-words">
                            {product.shortDescription}
                        </p>

                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8 w-full">
                            <h3 className="text-lg font-bold mb-4 flex items-center text-black">
                                Key Features
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {product.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 font-medium text-sm md:text-base break-words">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full">
                             <ProductInteraction productName={product.name} productSku={product.sku} />
                        </div>

                        <div className="mb-8 border-t border-gray-100 pt-8 w-full">
                            <h2 className="text-xl font-bold mb-4 text-black">Detailed Description</h2>
                            <p className="text-sm md:text-base text-gray-600 leading-relaxed text-justify break-words">
                                {product.fullDescription}
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}