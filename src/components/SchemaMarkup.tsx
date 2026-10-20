import React from 'react';

export default function SchemaMarkup() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.blackzero.org/#organization",
        "name": "BlackZero Technologies",
        "url": "https://www.blackzero.org",
        "logo": "https://www.blackzero.org/logo.png",
        "sameAs": [
          "https://www.facebook.com/profile.php?id=61560559093444",
          "https://www.instagram.com/blackzerofficial/",
          "https://www.linkedin.com/company/black-zerofficial/"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+92-324-4333267",
          "contactType": "customer support",
          "email": "info@blackzero.org",
          "areaServed": ["US", "AE", "PK", "SA"],
          "availableLanguage": ["English", "Urdu"]
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.blackzero.org/#localBusiness",
        "name": "BlackZero Technologies",
        "url": "https://www.blackzero.org",
        "telephone": "+923244333267",
        "email": "info@blackzero.org",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Hotel MayFair 4th floor, 50-52, E - III, Commercial Zone, Gulberg III",
          "addressLocality": "Lahore",
          "addressRegion": "Punjab",
          "postalCode": "54660",
          "addressCountry": "PK"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 31.5094416,
          "longitude": 74.3416723
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}