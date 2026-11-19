import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { blogPostsData } from "@/data/blogs";
import BlogPostImage from "@/components/BlogPostImage";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = "https://www.blackzero.org";

function getFullImageUrl(imageUrl: string): string {
  if (!imageUrl) return `${SITE_URL}/logo.png`;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  const normalizedPath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
  return `${SITE_URL}${normalizedPath}`;
}

function getIsoDate(dateStr: string): string {
  const parsed = new Date(dateStr);
  return Number.isNaN(parsed.getTime())
    ? new Date().toISOString()
    : parsed.toISOString();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Blog Post Not Found | Black Zero" };
  }

  const canonicalUrl = `${SITE_URL}/blogs/${slug}`;
  const fullImageUrl = getFullImageUrl(post.imageUrl);
  const isoDate = getIsoDate(post.date);

  return {
    title: post.seoTitle || `${post.title} | Black Zero Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: post.seoKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      url: canonicalUrl,
      type: "article",
      publishedTime: isoDate,
      authors: ["Black Zero Engineering"],
      images: [
        {
          url: fullImageUrl,
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
  const currentIndex = blogPostsData.findIndex((p) => p.slug === slug);
  const post = currentIndex !== -1 ? blogPostsData[currentIndex] : undefined;

  if (!post) {
    notFound();
  }

  // Pick the next 3 posts circularly so every blog post gets at least 3 incoming internal links
  const relatedPosts = [];
  const totalPosts = blogPostsData.length;
  const relatedCount = Math.min(3, Math.max(0, totalPosts - 1));

  for (let i = 1; i <= relatedCount; i++) {
    relatedPosts.push(blogPostsData[(currentIndex + i) % totalPosts]);
  }

  const canonicalUrl = `${SITE_URL}/blogs/${slug}`;
  const fullImageUrl = getFullImageUrl(post.imageUrl);
  const isoDate = getIsoDate(post.date);

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
    { href: `/blogs/${post.slug}`, label: post.title },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: [fullImageUrl],
    url: canonicalUrl,
    inLanguage: "en-US",
    datePublished: isoDate,
    dateModified: isoDate,
    author: {
      "@type": "Organization",
      name: "Black Zero Engineering",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Black Zero Technologies",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  const hasH2 = /<h2[\s>]/i.test(post.content);
  const optimizedContent = hasH2
    ? post.content
    : post.content
        .replace(/<h3/g, "<h2")
        .replace(/<\/h3>/g, "</h2>")
        .replace(/<h4/g, "<h3")
        .replace(/<\/h4>/g, "</h3>");

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
            <BlogPostImage
              src={post.imageUrl}
              alt={post.imgAltText || post.title}
            />
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
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-black font-semibold hover:text-gray-600 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Blogs
              </Link>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <section
              aria-label="Related Insights"
              className="bg-gray-50 rounded-2xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-black mb-6">
                More Enterprise Engineering Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blogs/${related.slug}`}
                    className="group bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between hover:border-black transition-colors"
                  >
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-2">
                        {related.date}
                      </p>
                      <h3 className="text-base font-bold text-black leading-snug group-hover:underline">
                        {related.title}
                      </h3>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-black">
                      Read Article
                      <ArrowRight size={15} />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}