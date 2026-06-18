<<<<<<< HEAD
import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Best Hijama Center in Lahore | Sunnah Hijama in Bahria Town',
  description: 'Looking for the best hijama center near me? Visit Al Madina Hijama Center in Bahria Town Lahore for Sunnah Hijama services. 24/7 Home Service available.',
  alternates: {
    canonical: 'https://www.almadinahijamacenter.com/contact',
  },
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    'name': 'Al Madina Hijama Center',
    'image': 'https://www.almadinahijamacenter.com/contact.webp',
    'telephone': '+923007598000',
    'url': 'https://www.almadinahijamacenter.com/contact',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'MashaAllah Center, 213-A, Commercial Sector C Bahria Town',
      'addressLocality': 'Lahore',
      'postalCode': '53720',
      'addressCountry': 'PK'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '31.3685',
      'longitude': '74.1865'
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      'opens': '00:00',
      'closes': '23:59'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
=======
import { Metadata } from "next";
import ContactPageClient from "@/components/ContactPageClient";


export const metadata: Metadata = {
  title: "Contact Us | AI, Analytics & Custom Development",
  description: "Contact Black Zero for expert AI, custom development, and data analytics solutions. Reach out to build scalable tech for your enterprise in the USA and GCC.",
  keywords: ["contact us", "digital marketing agency contact", "IT company Lahore", "web development inquiry", "business analytics consultation", "Black Zero support", "hire software developers"],
  
  alternates: {
    canonical: "https://www.blackzero.org/contact",
  },

  openGraph: {
    title: "Contact Us | AI, Analytics & Custom Development",
    description: "Contact Black Zero for expert AI, custom development, and data analytics solutions. Reach out to build scalable tech for your enterprise in the USA and GCC.",
    url: "https://www.blackzero.org/contact",
    type: "website",
    images: [
      {
        url: "/contact4.webp",
        width: 1200,
        height: 630,
        alt: "Contact Black Zero support team for digital marketing and IT services",
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
>>>>>>> aa0485d (Fix hero section layout and padding)
}