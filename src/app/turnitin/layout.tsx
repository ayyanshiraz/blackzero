import type { Metadata } from 'next';
import { TURNITIN_URL } from '@/lib/siteUrls';

// turnitin/page.tsx is a client component, so its SEO metadata lives here.
export const metadata: Metadata = {
  title: 'Turnitin Plagiarism & AI Checker | Black Zero',
  description:
    'Check your documents for plagiarism and AI-generated content with Black Zero’s Turnitin-style similarity and analysis reports.',
  alternates: { canonical: TURNITIN_URL },
  openGraph: {
    title: 'Turnitin Plagiarism & AI Checker | Black Zero',
    url: TURNITIN_URL,
    type: 'website',
  },
};

export default function TurnitinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}