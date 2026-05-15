import { Metadata } from 'next';
import ProjectClientView from '@/components/ProjectClientView';

const projectData = {
  slug: 'pakistan-academy',
  title: 'Pakistan Academy',
  category: "Education",
  imageUrl: "/Projects/26.jpg",
  className: 'md:col-span-1',
  description: `Pakistan Academy, a leading educational institution accessible online at <a href='https://pakistanacademy.org/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>pakistanacademy.org</a> and on Instagram at <a href='https://www.instagram.com/pakistanacademy10/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>@pakistanacademy10</a>, is dedicated to academic excellence. Positioning itself as the "Best Online Academy & Home Tutors in Pakistan," the academy provides top-tier tutoring services for crucial qualifications, including O/A Levels and IELTS. Their flexible hybrid model offers both personalized in-home tuition and comprehensive online learning options, making quality education accessible to students nationwide. Their digital strategy focuses on building a trustworthy and professional brand image, showcasing their experienced faculty and student success stories. Through a robust online presence, Pakistan Academy effectively connects with students and parents, providing them with the resources and support needed to achieve their academic goals.`,
  services: ['Web Development', 'Content Management', 'SEO'],
  gallery: [ "/Projects/pa.png", "/Projects/22.jpg", "/Projects/23.jpg", "/Projects/24.jpg", "/Projects/25.jpg", "/Projects/26.jpg", "/Projects/27.jpg", "/Projects/28.jpg", "/Projects/29.jpg", "/Projects/30.jpg" ],
  details: [
      { title: "Website Management", description: "We provided ongoing management for the <a href='https://pakistanacademy.org/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>pakistanacademy.org</a> portal, ensuring all course information, tutor profiles, and schedules were kept up-to-date. Our role included regular security checks, performance optimization, and content updates to maintain a professional and reliable online resource for students and parents.", imageUrl: "/Projects/s19.webp" },
      { title: "Website Development", description: "Our team developed their educational website, <a href='https://pakistanacademy.org/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>pakistanacademy.org</a>, from the ground up, focusing on a clean, user-friendly interface. The site was built to be fully responsive and SEO-friendly, featuring easy navigation, a clear presentation of their course offerings, and a streamlined process for student inquiries and enrollment.", imageUrl: "/Projects/s20.webp" },
      { title: "Social Media Marketing", description: "We executed targeted social media marketing campaigns during key admission cycles. These campaigns on Facebook and Instagram were designed to reach parents and students searching for quality tutoring for O/A Levels and IELTS. By promoting success stories and highlighting their unique teaching methods, we generated a significant volume of qualified leads.", imageUrl: "/Projects/s21.webp" },
      { title: "Social Media Handling", description: "Our team managed the day-to-day operations of the Pakistan Academy social media profiles. This involved creating and scheduling a consistent stream of informative and engaging content, from educational tips to student testimonials. We also handled all community interactions, promptly responding to inquiries to build a supportive and trusted online presence.", imageUrl: "/Projects/s22.webp" },
      { title: "Photography", description: "To build a visual identity of trust and professionalism, we conducted photoshoots to create a bank of high-quality images. This included professional headshots of the tutors and branded graphics used across their website and social media, ensuring a cohesive and reputable brand image.", imageUrl: "/Projects/s23.webp" },
      { title: "Videography", description: "We produced a range of video content to enhance their marketing efforts. This included an introductory video explaining the academy's mission and teaching philosophy, short, engaging educational clips for social media, and powerful video testimonials from past students to build credibility and attract new enrollments.", imageUrl: "/Projects/s24.webp" }
  ],
  testimonial: { quote: "Black Zero's targeted marketing strategies significantly boosted our online visibility, connecting us with students across Pakistan seeking quality education. Their team understood our mission and crafted a digital campaign that dramatically increased our student enrollment.", author: "Mirza Zahid Baig", image: "", rating: 5 }
};

export const metadata: Metadata = {
  title: 'Pakistan Academy | EdTech Web Development & Marketing | Black Zero',
  description: 'Case study: Developing a robust online portal and marketing strategy for Pakistan Academy to drive student enrollments for O/A Levels and IELTS.',
  keywords: ['education marketing', 'online academy website', 'EdTech development', 'SEO for schools', 'Pakistan Academy', 'tutor marketing'],
  alternates: {
    canonical: '/projects/pakistan-academy',
  },
  openGraph: {
    title: 'Pakistan Academy | EdTech Web Development & Marketing | Black Zero',
    description: 'Case study: Developing a robust online portal and marketing strategy for Pakistan Academy to drive student enrollments for O/A Levels and IELTS.',
    url: '/projects/pakistan-academy',
    siteName: 'Black Zero',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/Projects/26.jpg', alt: 'Pakistan Academy educational project' }],
  },
};

export default function PakistanAcademyPage() {
  return <ProjectClientView project={projectData} />;
}