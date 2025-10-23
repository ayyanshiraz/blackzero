// src/app/layout.tsx
import './globals.css';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ClientSlideshow } from '@/components/ClientSlideshow';
// REMOVE: import CookieConsent from "react-cookie-consent";
import CookieBanner from '@/components/CookieBanner'; // Import your new wrapper component

export const metadata = {
  title: 'Black Zero',
  description: 'Your Partner in Creating and Growing Brands',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // prettier-ignore
    <html lang="en" className="scroll-smooth">
      <body>
        <Navbar />
        <main>{children}</main>
        <ClientSlideshow />
        <Footer />

        {/* --- USE YOUR WRAPPER COMPONENT --- */}
        <CookieBanner />
        {/* --- END COOKIE CONSENT BANNER --- */}

      </body>
    </html>
  );
}