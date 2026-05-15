// src/components/BlogGrid.tsx
'use client'; // <-- Mark this component as a Client Component

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BlogPost } from '@/data/blogs'; // Adjust path if necessary
import BlogCard from '@/components/BlogCard'; // Adjust path if necessary

// Stagger container variants (moved here from the page)
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // Delay between each card animation
    },
  },
};

interface BlogGridProps {
  posts: BlogPost[]; // Accept posts as a prop
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
  return (
    // This motion.div is now inside a Client Component
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" // Animate when the grid comes into view
      viewport={{ once: true, amount: 0.1 }} // Trigger slightly earlier
    >
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </motion.div>
  );
};

export default BlogGrid;