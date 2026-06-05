import { Metadata } from 'next';
import ProjectClientView from '@/components/ProjectClientView';

const projectData = {
  slug: 'teknora',
  title: 'Teknora',
  category: "Industrial Manufacturing",
  imageUrl: "/Projects/t1.webp",
  className: 'md:col-span-1',
  description: "Teknora is a premier manufacturer specializing in the mass production of high-quality industrial sacks and packaging solutions. Catering to sectors such as agriculture, construction, and chemicals, Teknora delivers durability and scale. Our collaboration aimed to digitize their industrial presence, translating their massive physical production capabilities into a sleek, functional digital identity. We focused on highlighting their manufacturing precision and capacity, providing a B2B platform that instills confidence in large-scale distributors and industrial clients.",
  services: ['Web Development', '3D Visualization', 'Custom Software'],
  gallery: [ "/Clients/14.png" ],
  details: [
      { title: "Models", description: "We integrated interactive 'Models' and 3D product pop-ups within the website interface. These features allow potential clients to inspect the weave quality, dimensions, and material specifications of the sacks in high detail without navigating away from the main product catalog, significantly enhancing the user experience.", imageUrl: "/Projects/t2.webp" },
      { title: "Software", description: "We developed a custom internal software solution to streamline Teknora's inventory and order management. This system tracks raw material usage, monitors production line output in real-time, and automates order processing, bridging the gap between their factory floor and administrative offices.", imageUrl: "/Projects/t3.webp" }
  ],
  testimonial: { quote: "Black Zero brought our factory to the screen. The custom software has streamlined our operations, and the website perfectly represents the scale of our manufacturing. They truly understood the industrial sector's needs.", author: "Director, Teknora", image: "", rating: 5 }
};

export const metadata: Metadata = {
  title: 'Teknora | Custom Industrial Software & Web | Black Zero',
  description: 'Discover how Black Zero digitized Teknora\'s industrial manufacturing with a custom B2B website, 3D product visualization, and inventory management software.',
  keywords: ['industrial web design', 'manufacturing software', 'B2B website development', 'inventory management system', 'Teknora', '3D product visualization'],
  alternates: {
    canonical: '/projects/teknora',
  },
  openGraph: {
    title: 'Teknora | Custom Industrial Software & Web | Black Zero',
    description: 'Discover how Black Zero digitized Teknora\'s industrial manufacturing with a custom B2B website, 3D product visualization, and inventory management software.',
    url: '/projects/teknora',
    siteName: 'Black Zero',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/Projects/t1.webp', alt: 'Teknora industrial manufacturing project' }],
  },
};

export default function TeknoraPage() {
  return <ProjectClientView project={projectData} />;
}