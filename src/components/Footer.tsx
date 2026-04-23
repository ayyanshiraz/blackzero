import React from 'react';
import Link from 'next/link';

const socialLinks = [
  { name: 'Careers', href: '/careers', isInternal: true },
  { name: 'Privacy Policy', href: '/privacy-policy', isInternal: true },
  { name: 'Blogs', href: '/blogs', isInternal: true },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61560559093444&mibextid=ZbWKwL', isInternal: false },
  { name: 'Instagram', href: 'https://www.instagram.com/blackzerofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D', isInternal: false },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/black-zerofficial/posts/?feedView=all&viewAsMember=true', isInternal: false },
];

const ArrowIcon = () => (
  <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 font-sans">
      <div className="container mx-auto px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-start md:items-center text-center md:text-left">
          
          <div className="md:col-span-1">
            <h2 className="text-4xl lg:text-5xl font-extrabold uppercase leading-tight">
              <p className="mt-4 text-white">TRANSFORMING YOUR VISION INTO GLOBAL REVENUE.</p>
            </h2>
          </div>

          <div className="md:col-span-1 md:text-right">
            <h3 className="text-lg font-bold uppercase mb-4 tracking-wider">Pakistan Office</h3>
            <address className="not-italic space-y-3 text-gray-300">
              <p>+92 324 4333267</p>
              <div>
                <p>info@blackzero.org</p>
                <p>marketinghead@blackzero.org</p>
              </div>
              <p>Hotel MayFair 4th floor, <br />50-52, E - III, Commercial Zone,<br /> Gulberg III, 54660, Lahore, Punjab.</p>
            </address>
          </div>
        </div>

        <div className="border-t border-white border-opacity-20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-4 md:mb-0">
            {socialLinks.map((link) => (
              link.isInternal ? (
                // Use Next.js Link for internal pages (faster navigation)
                <Link key={link.name} href={link.href} className="hover:underline whitespace-nowrap inline-flex items-center">
                  {link.name} <ArrowIcon />
                </Link>
              ) : (
                // Use standard <a> tag for external sites
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:underline whitespace-nowrap inline-flex items-center">
                  {link.name} <ArrowIcon />
                </a>
              )
            ))}
          </div>
          <p className="opacity-70 text-center md:text-right">Copyright © 2024 - 2025 Black Zero</p>
        </div>
      </div>
    </footer>
  );
}