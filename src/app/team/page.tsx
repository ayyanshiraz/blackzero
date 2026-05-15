import { Metadata } from "next";
import TeamPageClient from "@/components/TeamPageClient";


const teamStructure = {
  level1: [
    {
      id: "org-ceo",
      name: "MIAN HASHIM HAROON",
      position: "Chief Executive Officer",
      avatar: "/Team/CEO[2].webp",
      imgAltText: "Mian Hashim Haroon, CEO of Black Zero",
      ringColor: "border-black",
      size: "w-52 h-52",
      delay: "0.2s"
    },
    {
      id: "org-cofounder",
      name: "DR. ABDULLAH HAROON",
      position: "Chief Operating Officer",
      avatar: "/Team/coo3.webp",
      imgAltText: "Dr. Abdullah Haroon, COO of Black Zero",
      ringColor: "border-black",
      size: "w-52 h-52",
      delay: "0.3s"
    }
  ],
  level2: [
    {
      id: "org-manager",
      name: "AYYAN SHIRAZ",
      position: "Marketing Head",
      avatar: "/Team/ayyan.webp",
      imgAltText: "Ayyan Shiraz, Marketing Head at Black Zero",
      ringColor: "border-gray-700",
      size: "w-52 h-52",
      delay: "0.5s"
    }
  ],
  level3: [
    {
      id: "org-lead1",
      name: "YASIR IRSHAD",
      position: "IT Manager",
      avatar: "/Team/yasir2.webp",
      imgAltText: "Yasir Irshad, IT Manager at Black Zero",
      ringColor: "border-gray-500",
      size: "w-52 h-52",
      delay: "0.8s"
    },
    {
      id: "org-lead2",
      name: "AJWA ARSHAD",
      position: "Software Architect",
      avatar: "/Team/ajwa4.webp",
      imgAltText: "Ajwa Arshad, Software Architect at Black Zero",
      ringColor: "border-gray-500",
      size: "w-52 h-52",
      delay: "0.9s"
    },
    {
      id: "org-lead3",
      name: "ALISHBA ZIA",
      position: "Project Manager",
      avatar: "/Team/alishba2.webp",
      imgAltText: "Alishba Zia, Project Manager at Black Zero",
      ringColor: "border-gray-500",
      size: "w-52 h-52",
      delay: "1.0s"
    }
  ]
};

export const metadata: Metadata = {
  title: "Meet Our Team | Leadership & Creative Minds | Black Zero",
  description: "Meet the creative minds and strategic thinkers at Black Zero. Our leadership team is dedicated to elevating your brand through IT and Marketing innovation.",
  keywords: ["Black Zero team", "IT leadership", "marketing experts", "software architects", "creative agency team", "Lahore digital studio", "Mian Hashim Haroon"],
  
  alternates: {
    canonical: "https://www.blackzero.org/team",
  },

  openGraph: {
    title: "Meet Our Team | Leadership & Creative Minds | Black Zero",
    description: "Meet the creative minds and strategic thinkers at Black Zero. Our leadership team is dedicated to elevating your brand through IT and Marketing innovation.",
    url: "https://www.blackzero.org/team",
    type: "website",
    images: [
      {
        url: "/team1.webp",
        width: 1200,
        height: 630,
        alt: "Black Zero Team Leadership",
      },
    ],
  },
};

export default function TeamPage() {
  return <TeamPageClient teamStructure={teamStructure} />;
}