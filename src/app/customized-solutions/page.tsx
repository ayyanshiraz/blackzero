import CustomizedSolutionsClient from '@/components/CustomizedSolutionsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request a Custom Software Estimate | Black Zero',
  description: 'Explore tailored IT solutions, custom software, and enterprise systems designed by Black Zero Technologies to scale your business operations.',
  alternates: {
    canonical: 'https://www.blackzero.org/customized-solutions',
  },
  openGraph: {
    title: 'Request a Custom Software Estimate | Black Zero',
    description: 'Explore tailored IT solutions, custom software, and enterprise systems designed by Black Zero Technologies to scale your business operations.',
    url: 'https://www.blackzero.org/customized-solutions',
    siteName: 'Black Zero Technologies',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Customized IT Solutions & Services by Black Zero Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request a Custom Software Estimate | Black Zero',
    description: 'Explore tailored IT solutions, custom software, and enterprise systems designed by Black Zero Technologies to scale your business operations.',
    images: ['/opengraph-image.png'],
  },
};

export default function CustomizedSolutionsPage() {
  return <CustomizedSolutionsClient />;
}