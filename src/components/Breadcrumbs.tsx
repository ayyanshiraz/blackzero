'use client';

import Link from 'next/link';
import React from 'react';

// Define the shape of each breadcrumb link
interface BreadcrumbItem {
  href: string;
  label: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    // Added py-4 for vertical padding (top and bottom)
    <nav aria-label="Breadcrumb" className="bg-white py-4">
      <div className="container mx-auto px-6 sm:px-12 lg:px-24">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 mx-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
              )}
              {/* The last item is the current page and shouldn't be a link */}
              {index === items.length - 1 ? (
                <span className="font-semibold text-gray-800" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:underline hover:text-gray-800 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;