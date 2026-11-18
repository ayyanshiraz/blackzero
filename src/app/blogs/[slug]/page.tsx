import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { blogPostsData } from '@/data/blogs';
import BlogPostImage from '@/components/BlogPostImage';
import { ArrowLeft } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Blog Post Not Found | Black Zero' };
  }

  return {
    title: post.seoTitle || `${post.title} | Black Zero Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: post.seoKeywords,
    alternates: {
      canonical: `https://www.blackzero.org/blogs/${slug}`,
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      url: `https://www.blackzero.org/blogs/${slug}`,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: ['Black Zero Engineering'],
      images: [
        {
          url: `https://www.blackzero.org${post.imageUrl}`,
          alt: post.imgAltText || post.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return blogPostsData.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { href: '/', label: 'Home' },
    { href: '/blogs', label: 'Blogs' },
    { href: `/blogs/${post.slug}`, label: post.title },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": `https://www.blackzero.org${post.imageUrl}`,
    "author": {
      "@type": "Organization",
      "name": "Black Zero Engineering"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Black Zero Technologies"
    },
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString(),
    "description": post.metaDescription || post.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.blackzero.org/blogs/${slug}`
    }
  };

  const optimizedContent = post.content
    .replace(/<h3/g, '<h2')
    .replace(/<\/h3>/g, '</h2>')
    .replace(/<h4/g, '<h3')
    .replace(/<\/h4>/g, '</h3>');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-8 bg-white">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl flex flex-col gap-6">
          
          <div className="rounded-2xl overflow-hidden w-full">
            <BlogPostImage src={post.imageUrl} alt={post.imgAltText || post.title} />
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-3 leading-tight">
              {post.title}
            </h1>
            <p className="text-base text-gray-500 font-medium">
              Date: {post.date}
            </p>
            <p className="text-base text-black font-semibold mt-1">
              By: Black Zero Engineering
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
            <article
              className="prose prose-lg max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: optimizedContent }}
            />

            <div className="mt-10 text-left border-t border-gray-200 pt-6">
              <Link href="/blogs" className="inline-flex items-center gap-2 text-black font-semibold hover:text-gray-600 transition-colors">
                <ArrowLeft size={18} />
                Back to Blogs
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}