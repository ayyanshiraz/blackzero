import { Metadata } from 'next';
import ProjectsPageClient from '@/components/ProjectsPageClient';
import { projectsData } from './data'; // 👈 Ye naya import hai

export const metadata: Metadata = {
  title: 'Our Projects | IT Solutions & Strategic Marketing | Black Zero',
  description: 'Explore Black Zero\'s portfolio of successful projects. From luxury e-commerce and real estate websites to industrial software and digital marketing campaigns.',
  keywords: ['IT solutions portfolio', 'strategic marketing case studies', 'Black Zero projects', 'software development', 'UI/UX design', 'branding portfolio', 'Lahore digital agency'],
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Our Projects | IT Solutions & Strategic Marketing | Black Zero',
    description: 'Explore Black Zero\'s portfolio of successful projects. From luxury e-commerce and real estate websites to industrial software and digital marketing campaigns.',
    url: '/projects',
    type: 'website',
    images: [
      {
        url: '/Projects/1.jpg',
        width: 1200,
        height: 630,
        alt: 'Black Zero Project Portfolio Showcase',
      },
    ],
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient projects={projectsData} />;
}