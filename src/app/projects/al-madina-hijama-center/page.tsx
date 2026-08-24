import { Metadata } from 'next';
import ProjectClientView from '@/components/ProjectClientView';

const projectData = {
  slug: 'al-madina-hijama-center',
  title: 'Al Madina Hijama Center',
  category: "Healthcare & Wellness",
  imageUrl: "/Projects/h1.webp",
  className: 'md:col-span-1',
  description: "Al Madina Hijama Center is a trusted name in traditional holistic therapy, offering professional Cupping (Hijama) services to promote wellness and detoxification. Their digital presence, anchored by <a href='https://www.almadinahijamacenter.com/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>almadinahijamacenter.com</a>, educates patients on the Sunnah benefits of Hijama while providing an easy avenue for appointment booking. The brand emphasizes hygiene, professional certification, and patient care, positioning itself as a leader in natural healing. We developed a comprehensive digital strategy to highlight their certified therapists and sterile environment, building trust within the community and making holistic health accessible to a wider audience.",
  services: ['Web Development', 'SEO Optimization', 'Branding'],
  gallery: [ "/Projects/h4.webp" ],
  details: [
      { title: "Website Development", description: "We built a clean, calming, and responsive website, <a href='https://www.almadinahijamacenter.com/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>www.almadinahijamacenter.com</a>, that serves as an educational hub and booking platform. The site features detailed explanations of Hijama benefits, practitioner profiles, and a seamless appointment scheduling system to improve patient convenience.", imageUrl: "/Projects/h2.webp" },
      { title: "Website Management", description: "We provide comprehensive ongoing management for <a href='https://www.almadinahijamacenter.com/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>www.almadinahijamacenter.com</a>. This includes keeping the site secure, ensuring fast load times, updating content about new therapies, and maintaining the booking system to ensure a smooth experience for every patient.", imageUrl: "/Projects/h3.webp" },
      { title: "Search Engine Optimization (SEO)", description: "To ensure those seeking natural therapy could find the center easily, we implemented a robust Local SEO strategy. By optimizing for keywords like 'Hijama center near me' and 'cupping therapy,' we significantly improved their search engine rankings, driving organic traffic and new patient inquiries.", imageUrl: "/Projects/h5.webp" }
  ],
  testimonial: { quote: "Black Zero understood the sensitivity and importance of our services. They created a professional website that perfectly communicates our commitment to hygiene and Sunnah. The increase in appointments since the launch has been remarkable.", author: "Jameel ur Rehmaan", image: "", rating: 5 }
};

export const metadata: Metadata = {
  title: 'Al Madina Hijama Center | Web & Local SEO | Black Zero',
  description: 'Discover how Black Zero helped Al Madina Hijama Center increase patient appointments through a calming website design and targeted Local SEO strategy.',
  keywords: ['wellness website design', 'local SEO for clinics', 'Hijama center marketing', 'healthcare web development', 'Al Madina Hijama'],
  alternates: {
    canonical: '/projects/al-madina-hijama-center',
  },
  openGraph: {
    title: 'Al Madina Hijama Center | Web & Local SEO | Black Zero',
    description: 'Discover how Black Zero helped Al Madina Hijama Center increase patient appointments through a calming website design and targeted Local SEO strategy.',
    url: '/projects/al-madina-hijama-center',
    siteName: 'Black Zero',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/Projects/h1.webp', alt: 'Al Madina Hijama Center wellness project' }],
  },
};

export default function AlMadinaHijamaPage() {
  return <ProjectClientView project={projectData} />;
}