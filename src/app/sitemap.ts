// src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { projectsData } from '@/data/projects'; // Adjust path if your data file is elsewhere
import { servicesData } from '@/data/services';   // Adjust path if your data file is elsewhere

export default function sitemap(): MetadataRoute.Sitemap {
  // Define your website's base URL
  // IMPORTANT: Replace with your actual domain, or use an environment variable
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Fallback for local dev

  // Static Pages
  const staticPages = [
    '/',
    '/about',
    '/careers',
    '/contact',
    '/ecommerce-success',
    '/projects',
    '/services',
    '/team',
    '/privacy-policy',
    // '/blogs', // Add this if you have a blogs page
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0], // Use current date, or a specific date
    // changeFrequency: 'monthly', // Optional
    // priority: route === '/' ? 1 : 0.8, // Optional
  }));

  // Dynamic Project Pages
  const projectPages = projectsData.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date().toISOString().split('T')[0], // Or use a date from project data if available
  }));

  // Dynamic Service Pages
  const servicePages = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  // Dynamic Service Sub-Section Pages
  const subServicePages = servicesData.flatMap((service) =>
    service.subSections
      .filter(subSection => subSection.slug) // Only include subsections that have a slug defined
      .map((subSection) => ({
        url: `${baseUrl}/services/${service.slug}/${subSection.slug}`,
        lastModified: new Date().toISOString().split('T')[0],
      }))
  );

  // Combine all pages
  return [
    ...staticPages,
    ...projectPages,
    ...servicePages,
    ...subServicePages,
  ];
}