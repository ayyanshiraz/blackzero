// src/app/blogs/[slug]/page.tsx

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar'; // Adjust path if necessary
import Breadcrumbs from '@/components/Breadcrumbs'; // Adjust path if necessary
import { blogPostsData } from '@/data/blogs'; // Adjust path if necessary
import BlogPostImage from '@/components/BlogPostImage'; // Import the image component
import { ArrowLeft } from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPostsData.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { href: '/', label: 'Home' },
    { href: '/blogs', label: 'Blogs' },
    { href: `/blogs/${post.slug}`, label: post.title },
  ];

  return (
    <>
      <Navbar />

      {/* Spacing and Breadcrumbs */}
      <div className="pt-8 bg-white">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Main Blog Content */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Title and Date */}
          <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-2">{post.title}</h1>
              <p className="text-sm text-gray-500">{post.date}</p>
          </div>

          {/* Blog Post Image */}
          <BlogPostImage src={post.imageUrl} alt={post.title} />

          {/* Blog Post Content (Text is rendered here) */}
          <article
            className="prose prose-lg max-w-none text-gray-800 mt-8" // Tailwind Typography styles
            dangerouslySetInnerHTML={{ __html: post.content }} // Assumes content might have HTML
          />

          {/* Back Link */}
          <div className="mt-16 text-left">
            <Link href="/blogs" className="inline-flex items-center gap-2 text-black font-semibold hover:text-gray-700 transition-colors">
              <ArrowLeft size={18} />
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}