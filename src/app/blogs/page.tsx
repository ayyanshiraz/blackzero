import React from 'react';
import Navbar from '@/components/Navbar';
import { blogPostsData } from '@/data/blogs';
import BlogGrid from '@/components/BlogGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Black Zero Blogs | Expert Guide to IT & Marketing',
  description: 'Stay ahead with Black Zero blogs. Expert insights on digital marketing, e-commerce success, marketing ROI, and the latest IT trends.',
  keywords: ['IT blogs', 'digital marketing insights', 'ecommerce success guides', 'marketing trends 2025', 'Black Zero blog', 'business tips'],
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    title: 'Black Zero Blogs | Expert Guide to IT & Marketing',
    description: 'Your expert guide to the IT and Marketing market. Read our latest articles on growth strategies and technology.',
    url: '/blogs',
    type: 'website',
    images: [
      {
        url: '/Blogs/blogs.webp',
        width: 1200,
        height: 630,
        alt: 'Black Zero Blogs - IT and Marketing Insights',
      },
    ],
  },
};

export default function BlogsPage() {
  return (
    <>

      <div className="relative h-[450px] flex items-center justify-center text-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("Blogs/blogs.webp")' }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold uppercase">Black Zero Blogs</h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-200">
            Your expert guide to the IT and Marketing market.
          </p>
        </div>
      </div>

      <div className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <BlogGrid posts={blogPostsData} />
        </div>
      </div>
    </>
  );
}