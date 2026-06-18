// src/components/BlogPostImage.tsx
'use client';

import React from 'react';
import Image from 'next/image'; // Import the next/image component

interface BlogPostImageProps {
  src: string;
  alt: string;
}

const BlogPostImage: React.FC<BlogPostImageProps> = ({ src, alt }) => {
  const placeholderUrl = `https://placehold.co/1200/e2e8f0/4a5568?text=Image+Not+Found`; // Adjusted placeholder aspect

  return (
    // --- REMOVED aspect ratio and max-height from parent ---
    <div className="relative w-full mb-12"> {/* Simpler parent, only for layout spacing */}
      <Image
        src={src}
        alt={alt}
        // --- REMOVED fill ---
        // fill
        // --- ADDED width and height (provide large values) ---
        width={1200} // Example intrinsic width or a large standard value
        height={675} // Example intrinsic height (e.g., for 16:9 ratio) or a large value
        // --- Style for responsiveness ---
        style={{
          maxWidth: '100%', // Ensure image doesn't overflow container width
          height: 'auto',   // Let height adjust based on aspect ratio
          objectFit: 'cover' // Still useful if container forces a different ratio
        }}
        className="rounded-lg shadow-md" // Keep styling
        onError={(e) => {
          if (e.currentTarget.src !== placeholderUrl) {
              e.currentTarget.onerror = null;
              e.currentTarget.srcset = placeholderUrl;
              e.currentTarget.src = placeholderUrl;
          }
        }}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
        sizes="100vw" // Simplify sizes prop for this scenario
      />
    </div>
  );
};

export default BlogPostImage;