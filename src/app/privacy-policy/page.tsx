<<<<<<< HEAD
import type { Metadata } from 'next';
import PrivacyPolicyClient from './PrivacyPolicyClient';

export const metadata: Metadata = {
  title: "Privacy Policy | Al Madina Hijama center Lahore",
  description: "Learn how Al Madina Hijama Center Lahore protects your privacy. We ensure complete confidentiality and secure medical data for all male and female clients.",
  alternates: {
    canonical: 'https://www.almadinahijamacenter.com/privacy-policy',
  },
  openGraph: {
    title: "Privacy Policy | Al Madina Hijama center Lahore",
    description: "Learn how Al Madina Hijama Center Lahore protects your privacy. We ensure complete confidentiality and secure medical data for all male and female clients.",
    url: 'https://www.almadinahijamacenter.com/privacy-policy',
    siteName: 'Al Madina Hijama Center',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: 'https://www.almadinahijamacenter.com/privacy-policy.webp',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy - Al Madina Hijama Center',
=======
import { Metadata } from 'next';
import PrivacyPolicyClient from '@/components/PrivacyPolicyClient';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Privacy Policy & Terms of Service | Data Protection ',
  description: 'Review the Privacy Policy, Cookie Policy, and Terms of Service for Black Zero. We ensure transparency in how we handle your data for IT and Marketing services.',
  keywords: ['privacy policy', 'terms of service', 'data protection', 'cookie policy', 'Black Zero legal', 'IT company policies', 'marketing agency terms', 'GDPR compliance'],
  
  // 1. THIS IS THE FIX: Explicitly tell Google this is the master URL
  alternates: {
    canonical: 'https://www.blackzero.org/privacy-policy',
  },

  openGraph: {
    title: 'Privacy Policy & Terms of Service | Black Zero',
    description: 'Review the Privacy Policy, Cookie Policy, and Terms of Service for Black Zero. We ensure transparency in how we handle your data.',
    // 2. BEST PRACTICE: Use the full absolute URL here as well
    url: 'https://www.blackzero.org/privacy-policy',
    type: 'website',
    images: [
      {
        url: '/pp.webp',
        width: 1200,
        height: 630,
        alt: 'Black Zero Privacy Policy and Legal Terms Header',
>>>>>>> aa0485d (Fix hero section layout and padding)
      },
    ],
  },
};

<<<<<<< HEAD
export default function Page() {
=======
export default function PrivacyPolicyPage() {
>>>>>>> aa0485d (Fix hero section layout and padding)
  return <PrivacyPolicyClient />;
}