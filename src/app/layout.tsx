import './globals.css';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ClientSlideshow } from '@/components/ClientSlideshow';

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
      </body>
    </html>
  );
}