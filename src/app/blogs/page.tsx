// src/app/blogs/page.tsx

import React from 'react';
// Link is not directly used here anymore, can be removed if not needed elsewhere
import Navbar from '@/components/Navbar'; // Adjust path if necessary
import { blogPostsData, BlogPost } from '@/data/blogs'; // Adjust path to your data file
import BlogGrid from '@/components/BlogGrid'; // <-- Import the new BlogGrid component
// Removed motion import

// Container variants removed from here

export default function BlogsPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[450px] flex items-center justify-center text-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("Blogs/blogs.png")' }} // Replace with your hero image
        >
          <div className="absolute inset-0 bg-black opacity-60"></div> {/* Dark overlay */}
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold uppercase">Black zero Blogs</h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-200">
             Your expert guide to the digital marketing market.
          </p>
        </div>
      </div>

      {/* Blog Grid Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          {/* Use the new BlogGrid component, passing the data */}
          <BlogGrid posts={blogPostsData} />
          {/* Optional: Add Pagination here if needed */}
        </div>
      </div>

      {/* Footer removed */}
    </>
  );
}