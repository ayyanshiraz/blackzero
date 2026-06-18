<<<<<<< HEAD
// src/components/Breadcrumbs.tsx
'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react'; // Using Chevron for separator

// Define the type for a single breadcrumb item
type BreadcrumbItem = {
  name: string;
  href: string;
};

// Define the props for the Breadcrumbs component
type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    // Adjusted padding
    <nav aria-label="Breadcrumb" className="bg-white pt-6 pb-4 sm:pt-8 sm:pb-6">
      {/* Adjusted padding */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        {/* Adjusted font size */}
        <ol className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500">
          {items.map((item, index) => (
            <li key={item.name} className="flex items-center">
              {/* Add separator for all items except the first one */}
              {index > 0 && (
                // Using ChevronRight icon as separator
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mx-1 sm:mx-1.5 flex-shrink-0" aria-hidden="true" />
              )}

              {/* Check if it's the last item in the array */}
              {index < items.length - 1 ? (
                // If not the last, render a styled link
                <Link href={item.href} className="hover:text-teal-600 transition-colors">
                  {item.name}
                </Link>
              ) : (
                // If it is the last, render as bolder, darker text (the current page)
                 // Adjusted font weight and color
                <span className="font-medium text-gray-700" aria-current="page">
                  {item.name}
                </span>
=======
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
>>>>>>> aa0485d (Fix hero section layout and padding)
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;