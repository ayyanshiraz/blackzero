'use client';
import React from 'react';
import Navbar from '@/components/Navbar';

export default function PrivacyPolicyClient() {
  return (
    <>
      <Navbar />

      <div className="relative h-[400px] flex items-center justify-center overflow-hidden border-b border-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/pp.webp")' }}
          role="img"
          aria-label="Black Zero Privacy Policy and Legal Terms Header" // Added accessible Alt text equivalent
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <h1 className="relative z-10 text-5xl font-extrabold uppercase text-center text-white">PRIVACY POLICY</h1>
      </div>

      <div className="bg-white">
        <div className="container mx-auto px-6 py-16 max-w-4xl text-gray-900">

          <p className="mb-6 text-sm text-gray-600">Last Updated: October 22, 2025</p>

          <p className="mb-6 leading-relaxed">
            Welcome to Black zero. We are committed to protecting your privacy and providing a transparent understanding of how we operate.
            This page outlines our policies regarding data collection, use, and your rights when you interact with our website (https://blackzero.org/).
          </p>

          <h2 className="text-3xl font-bold mb-6 mt-12">1. Privacy Policy</h2>
          <p className="mb-6 leading-relaxed">
            This Privacy Policy describes how Black zero (we, us, or our) collects, uses, and shares information about you when you visit our Website.
          </p>

          <h3 className="text-2xl font-semibold mb-4 mt-6">Information We Collect</h3>
          <p className="mb-4 leading-relaxed">
            We may collect the following types of information:
          </p>
          <ul className="list-disc pl-8 space-y-3 leading-relaxed text-gray-800 mb-6">
            <li>
              <strong className="font-semibold text-gray-900">Personal Information:</strong> This is information you voluntarily provide to us, such as your name, email address, phone number, and company details when you fill out our contact form, subscribe to a newsletter, or inquire about our services.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">Usage Data:</strong> We automatically collect information when you access our Website. This may include your IP address, browser type, operating system, referring URLs, pages viewed, and the dates/times of your visit.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">Client Data:</strong> When engaging our services (IT and Marketing, Business Analytics, Development, etc.), we will collect information necessary to fulfill our contractual obligations. This is governed by a separate client agreement.
            </li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4 mt-6">How We Use Your Information</h3>
          <p className="mb-4 leading-relaxed">
            We use the information we collect for several purposes:
          </p>
          <ul className="list-disc pl-8 space-y-3 leading-relaxed text-gray-800 mb-6">
            <li>
              <strong className="font-semibold text-gray-900">To Provide Services:</strong> To respond to your inquiries, provide quotes, and deliver the services you request.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">To Communicate:</strong> To send you updates, IT and Marketing communications (where you have opted-in), and important notices.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">To Improve Our Website:</strong> To analyze how users interact with our site (using tools like Business Analytics) so we can enhance user experience and improve our service offerings.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">For Legal & Security Purposes:</strong> To protect our rights, prevent fraud, and comply with legal obligations.
            </li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4 mt-6">Data Sharing and Disclosure</h3>
          <p className="mb-4 leading-relaxed">
            We do not sell your personal information. We may share your information in the following limited circumstances:
          </p>
          <ul className="list-disc pl-8 space-y-3 leading-relaxed text-gray-800 mb-6">
            <li>
              <strong className="font-semibold text-gray-900">With Service Providers:</strong> We may share information with third-party vendors who assist us in operating our website, conducting our business, or providing services to you (e.g., web hosting, analytics providers), so long as those parties agree to keep this information confidential.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">For Legal Reasons:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.
            </li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4 mt-6">Data Security</h3>
          <p className="mb-6 leading-relaxed">
            We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, use, or disclosure. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h3 className="text-2xl font-semibold mb-4 mt-6">Your Rights</h3>
          <p className="mb-6 leading-relaxed">
            You have the right to request access to, correction of, or deletion of your personal information held by us. You may also have the right to object to or restrict certain processing. To exercise these rights, please contact us at info@blackzero.org.
          </p>

          <h2 className="text-3xl font-bold mb-6 mt-12">2. Cookie Policy</h2>
          <p className="mb-6 leading-relaxed">
            Our Website uses cookies to enhance your browsing experience.
          </p>

          <h3 className="text-2xl font-semibold mb-4 mt-6">What are Cookies?</h3>
          <p className="mb-6 leading-relaxed">
            Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit a website.
          </p>

          <h3 className="text-2xl font-semibold mb-4 mt-6">How We Use Cookies</h3>
          <p className="mb-4 leading-relaxed">
            We use cookies to:
          </p>
          <ul className="list-disc pl-8 space-y-3 leading-relaxed text-gray-800 mb-6">
            <li>
              <strong className="font-semibold text-gray-900">Analyze Traffic:</strong> Understand how visitors use our site (e.g., which pages are most popular) to improve its performance.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">Remember Preferences:</strong> Store your preferences to personalize your return visits.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">Support IT and Marketing:</strong> Help us measure the effectiveness of our IT and Marketing campaigns.
            </li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4 mt-6">Your Choices</h3>
          <p className="mb-6 leading-relaxed">
            Most web browsers are set to accept cookies by default. You can usually modify your browser settings to decline cookies if you prefer. Please note that disabling cookies may affect the functionality of our Website.
          </p>

          <h2 className="text-3xl font-bold mb-6 mt-12">3. Terms of Service</h2>
          <p className="mb-6 leading-relaxed">
            By accessing and using our Website, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h3 className="text-2xl font-semibold mb-4 mt-6">Use of Website</h3>
          <p className="mb-6 leading-relaxed">
            You agree to use this Website for lawful purposes only. You may not use our Website in any way that could damage the site, impair its availability, or in connection with any fraudulent or harmful activity.
          </p>

          <h3 className="text-2xl font-semibold mb-4 mt-6">Intellectual Property</h3>
          <p className="mb-6 leading-relaxed">
            All content on this Website, including text, graphics, logos, images, and the MAGICAL 9 STEP ecommerce success formula, is the property of Black zero or its content suppliers and is protected by international copyright and trademark laws. The   name and logo are trademarks of Black zero.
          </p>

          <h3 className="text-2xl font-semibold mb-4 mt-6">Disclaimer of Warranties</h3>
          <p className="mb-6 leading-relaxed">
            This Website is provided as is. Black zero makes no representations or warranties of any kind, express or implied, as to the operation of the site or the information, content, or materials included on it. You expressly agree that your use of this site is at your sole risk.
          </p>

          <h3 className="text-2xl font-semibold mb-4 mt-6">Limitation of Liability</h3>
          <p className="mb-6 leading-relaxed">
            Black zero will not be liable for any damages of any kind arising from the use of this site or from any information, content, or services included on or otherwise made available to you through this site, including, but not limited to direct, indirect, incidental, punitive, and consequential damages.
          </p>

          <h3 className="text-2xl font-semibold mb-4 mt-6">Governing Law</h3>
          <p className="mb-6 leading-relaxed">
            These terms shall be governed by and construed in accordance with the laws of Pakistan, with jurisdiction in Lahore, Punjab, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-3xl font-bold mb-6 mt-12">4. Changes to These Policies</h2>
          <p className="mb-6 leading-relaxed">
            We may update our policies from time to time. We will notify you of any changes by posting the new policies on this page and updating the Last Updated date at the top.
          </p>

          <h2 className="text-3xl font-bold mb-6 mt-12">5. Contact Us</h2>
          <p className="mb-4 leading-relaxed">
            If you have any questions about these policies, please contact us:
          </p>
          <ul className="list-none pl-0 space-y-2 leading-relaxed text-gray-800">
            <li><strong className="font-semibold text-gray-900">Black Zero Company</strong></li>
            <li>Email: info@blackzero.org</li>
            <li>Phone: +92 324 4333267</li>
            <li>Address: Hotel MayFair 4th floor, 50-52, E - III, Commercial Zone, Gulberg III, 54660, Lahore, Punjab.</li>
          </ul>

        </div>
      </div>
    </>
  );
}