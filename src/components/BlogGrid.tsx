// src/components/BlogGrid.tsx
"use client"; // Marked as a Client Component

import React from "react";
import { motion, Variants } from "framer-motion";
import { BlogPost } from "@/data/blogs"; 
import BlogCard from "@/components/BlogCard"; 

// Delay between each card animation
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, 
    },
  },
};

interface BlogGridProps {
  posts: BlogPost[]; 
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible" // Force animation to run immediately on load instead of waiting for scroll
    >
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </motion.div>
  );
};

export default BlogGrid;