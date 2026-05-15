import { Metadata } from 'next';
import ProjectClientView from '@/components/ProjectClientView';

const projectData = {
  slug: 'starlight-linkers-llc',
  title: 'Starlight Linkers LLC',
  category: "IT Solutions",
  imageUrl: "/Projects/st1.webp",
  className: 'md:col-span-1 md:row-span-2',
  description: "Starlight Linkers LLC is a forward-thinking IT solutions provider dedicated to bridging the gap between businesses and modern technology. Specializing in digital transformation, they offer a suite of services ranging from custom software development to network infrastructure. Their brand identity reflects innovation and connectivity, symbolized by their dynamic logo and modern web interface. We partnered with Starlight Linkers to establish a robust digital footprint that showcases their technical expertise and corporate reliability. Through a sleek, high-performance website and a cohesive branding strategy, we positioned them as a go-to partner for enterprises looking to scale their digital operations.",
  services: ['Web Development', 'UI/UX Design', 'Corporate Branding'],
  gallery: [ "/Clients/13.png" ],
  details: [
      { title: "Website Development", description: "We designed and developed a high-performance corporate website, accessible at <a href='https://www.starlightlinkers.com/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>www.starlightlinkers.com</a>. The platform serves as the central digital hub for their IT services, featuring a responsive design, fast load times, and a structure optimized for both user experience and lead generation.", imageUrl: "/Projects/st5.webp" },
      { title: "Website Management", description: "Our team provides comprehensive ongoing management for <a href='https://www.starlightlinkers.com/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>www.starlightlinkers.com</a>. This includes regular security audits, content updates, server optimization, and performance monitoring to ensure the site operates at 99.9% uptime and remains a reliable asset for their global clients.", imageUrl: "/Projects/st4.webp" },
      { title: "Logo Designing", description: "We crafted a distinct visual identity centered around a modern, tech-forward logo. The design symbolizes connectivity and innovation, utilizing a color palette and typography that reflects trust, corporate professionalism, and Starlight Linkers' forward-thinking approach to IT solutions.", imageUrl: "/Projects/st3.webp" },
      { title: "Website Portal", description: "We developed a secure, internal website portal tailored to streamline their operational workflows. This custom solution allows for efficient data management, seamless client communication, and centralized project tracking, significantly enhancing their internal efficiency.", imageUrl: "/Projects/st2.webp" }
  ],
  testimonial: { quote: "Our vision for Starlight Linkers was complex, but Black Zero translated it into a digital reality that exceeded our expectations. The website's performance and design have been praised by our partners and have become a key asset in our sales process.", author: "Kamraan", image: "", rating: 5 }
};

export const metadata: Metadata = {
  title: 'Starlight Linkers | Corporate IT Branding & Web Development | Black Zero',
  description: 'See how we built a high-performance corporate website and brand identity for Starlight Linkers LLC, a leading IT solutions provider.',
  keywords: ['IT company branding', 'corporate website design', 'web portal development', 'logo design', 'Starlight Linkers', 'tech branding'],
  alternates: {
    canonical: '/projects/starlight-linkers-llc',
  },
  openGraph: {
    title: 'Starlight Linkers | Corporate IT Branding & Web Development | Black Zero',
    description: 'See how we built a high-performance corporate website and brand identity for Starlight Linkers LLC, a leading IT solutions provider.',
    url: '/projects/starlight-linkers-llc',
    siteName: 'Black Zero',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/Projects/st1.webp', alt: 'Starlight Linkers corporate website project' }],
  },
};

export default function StarlightLinkersPage() {
  return <ProjectClientView project={projectData} />;
}