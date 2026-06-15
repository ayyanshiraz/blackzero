import { Metadata } from 'next';
import ProjectsPageClient from '@/components/ProjectsPageClient';
import { projectsData } from './data'; 

export const metadata: Metadata = {
  title: 'Our Projects | AI, Dev & Analytics | Black Zero',
  description: 'Discover Black Zero\'s successful projects across the USA. From custom enterprise software and real estate portals to advanced AI and data analytics solutions.',
  keywords: ['IT solutions portfolio', 'strategic marketing case studies', 'Black Zero projects', 'software development', 'UI/UX design', 'branding portfolio', 'IT consulting agency'],
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Our Projects | AI, Dev & Analytics | Black Zero',
    description: 'Discover Black Zero\'s successful projects across the USA. From custom enterprise software and real estate portals to advanced AI and data analytics solutions.',
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