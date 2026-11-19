"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PROJECT_LINKS = [
  {
    slug: "teknora",
    title: "Teknora",
    category: "Custom Industrial Software & Web",
  },
  {
    slug: "qemaat",
    title: "Qemaat",
    category: "Custom Real Estate Portal & Listings",
  },
  {
    slug: "kb-dispatch-tools-services",
    title: "KB Dispatch Tools Services",
    category: "Custom Dispatch & Logistics Software",
  },
  {
    slug: "bizvibez-properties",
    title: "BizVibez Properties",
    category: "Custom Real Estate Web & SEO",
  },
  {
    slug: "starlight-linkers-llc",
    title: "Starlight Linkers LLC",
    category: "E-Commerce Web & Brand Identity",
  },
  {
    slug: "hsv-associates",
    title: "HSV Associates",
    category: "Web Development & Social Media",
  },
  {
    slug: "pakistan-academy",
    title: "Pakistan Academy",
    category: "EdTech Web Portal & Marketing",
  },
  {
    slug: "hair-skill-clinic",
    title: "Hair Skill Clinic",
    category: "Web Development & Performance Ads",
  },
  {
    slug: "al-madina-hijama-center",
    title: "Al Madina Hijama Center",
    category: "Web Design & Local SEO",
  },
  {
    slug: "ever-smart-emporium",
    title: "Ever Smart Emporium",
    category: "Luxury E-Commerce & Media",
  },
  {
    slug: "hotel-mayfair",
    title: "Hotel Mayfair",
    category: "Hospitality Web & Food Marketing",
  },
  {
    slug: "coronet-gold",
    title: "Coronet Gold",
    category: "Hospitality Brand Marketing",
  },
  {
    slug: "unique-studio",
    title: "Unique Studio",
    category: "Architecture & Interior Marketing",
  },
];

export default function RelatedProjects() {
  const pathname = usePathname();

  // Do not render on the main /projects listing page
  if (!pathname || pathname === "/projects" || pathname === "/projects/") {
    return null;
  }

  const currentSlug = pathname.replace(/^\/projects\//, "").replace(/\/$/, "");
  const currentIndex = PROJECT_LINKS.findIndex((p) => p.slug === currentSlug);

  if (currentIndex === -1) {
    return null;
  }

  // Pick the next 3 projects circularly so every project page receives 3 incoming links
  const related = [];
  for (let i = 1; i <= 3; i++) {
    related.push(PROJECT_LINKS[(currentIndex + i) % PROJECT_LINKS.length]);
  }

  return (
    <section
      aria-label="More Case Studies"
      className="bg-white border-t border-gray-200 py-12"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-black">
            More Client Case Studies
          </h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-gray-600 transition-colors"
          >
            <ArrowLeft size={16} />
            View All Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {related.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col justify-between hover:border-black transition-colors"
            >
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">
                  {project.category}
                </p>
                <h3 className="text-lg font-bold text-black group-hover:underline">
                  {project.title}
                </h3>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-black">
                Explore Case Study
                <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}