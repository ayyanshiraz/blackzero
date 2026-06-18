'use client';

import React, { useState } from 'react';
import { Minus, Plus, MessageCircle, Phone } from 'lucide-react';

interface ProductInteractionProps {
    productName: string;
    productSku: string;
}

export default function ProductInteraction({ productName, productSku }: ProductInteractionProps) {
    const [quantity, setQuantity] = useState(1);

    const decreaseQty = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQty = () => {
        setQuantity(quantity + 1);
    };

    // 1. WhatsApp link for "Get Quote" (Specific Product)
    const quoteMessage = `Hi, I am interested in purchasing ${quantity} license(s) of ${productName} (Code: ${productSku}). Please provide a quote.`;
    const quoteLink = `https://wa.me/923334888324?text=${encodeURIComponent(quoteMessage)}`;

    // 2. WhatsApp link for "Contact Sales" (General Inquiry)
    const salesMessage = `Hi, I have a query regarding ${productName}.`;
    const salesLink = `https://wa.me/923334888324?text=${encodeURIComponent(salesMessage)}`;

    return (
        // Removed 'mt-auto', kept 'pt-6' and 'border-t' for separation from Key Features
        <div className="pt-6 border-t border-gray-100 mb-8">
            {/* Quantity Selector */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    Select Quantity (Licenses)
                </label>
                <div className="inline-flex items-center border-2 border-black rounded-lg overflow-hidden">
                    <button 
                        onClick={decreaseQty}
                        className="bg-gray-100 hover:bg-gray-200 text-black w-12 h-12 flex items-center justify-center transition-colors"
                        aria-label="Decrease quantity"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <div className="w-16 h-12 flex items-center justify-center bg-white text-lg font-bold text-black border-l border-r border-gray-200">
                        {quantity}
                    </div>
                    <button 
                        onClick={increaseQty}
                        className="bg-black hover:bg-neutral-800 text-white w-12 h-12 flex items-center justify-center transition-colors"
                        aria-label="Increase quantity"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Get Quote Button */}
                <a 
                    href={quoteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-black text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                    <MessageCircle className="w-5 h-5" />
                    Get Quote for {quantity}
                </a>

                {/* Contact Sales Button */}
                <a 
                    href={salesLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white text-black border-2 border-black text-center py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                    <Phone className="w-5 h-5" />
                    Contact Sales
                </a>
            </div>
        </div>
    );
}