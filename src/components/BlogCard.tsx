// src/components/BlogCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogPost } from '@/data/blogs'; // Adjust path if necessary
import { motion, Variants } from 'framer-motion';

// Define animation variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <motion.div
    className="bg-black text-white rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-gray-700 cursor-pointer" // Added cursor-pointer
    variants={cardVariants}
    // ✅ ADDED: whileHover prop for the pop-up effect
    whileHover={{
      scale: 1.03, // Scale up slightly (e.g., 3%)
      y: -5,       // Move up slightly (e.g., 5 pixels)
      boxShadow: "0px 10px 20px rgba(255, 255, 255, 0.1)" // Optional: enhance shadow
    }}
    // transition prop for hover can be added if you want custom timing
    // transition={{ duration: 0.2 }}
  >
    <Link href={`/blogs/${post.slug}`} className="block">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = `https://placehold.co/600x400/1a202c/e2e8f0?text=Image+Not+Found`;
        }}
       />
    </Link>
    <div className="p-6 flex flex-col flex-grow">
      <p className="text-sm text-gray-300 mb-2">{post.date}</p>
      <Link href={`/blogs/${post.slug}`} className="block mb-3">
        <h2 className="text-xl font-bold text-white transition-colors duration-200 line-clamp-2">
          {post.title}
        </h2>
      </Link>
      <p className="text-gray-200 leading-relaxed mb-4 flex-grow line-clamp-3">
        {post.excerpt}
      </p>
      <Link
        href={`/blogs/${post.slug}`}
        className="text-white font-semibold transition-colors duration-200 inline-flex items-center mt-auto"
      >
        Read More <ArrowRight size={16} className="ml-1" />
      </Link>
    </div>
  </motion.div>
);

export default BlogCard;