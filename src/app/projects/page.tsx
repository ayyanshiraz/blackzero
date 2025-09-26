'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
// ✅ FIXED: Imported the 'Project' type
import { projectsData, type Project } from '@/data/projects'; 

// --- PROJECT CARD COMPONENT ---
// ✅ FIXED: Replaced 'any' with the specific 'Project' type
const ProjectCard = ({ project }: { project: Project }) => (
    <div className="group block relative w-full h-full overflow-hidden rounded-xl shadow-lg animate-fade-in-up cursor-pointer">
        <img
            src={project.imageUrl}
            alt={project.title}
            // ADDED absolute and inset-0 to force the image to fill the container
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-50 group-hover:contrast-75"
        />
        <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500 ease-in-out flex items-center justify-center p-4">
            <div className="text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-y-0 translate-y-4">
                <h3 className="text-xl md:text-2xl font-bold tracking-wider">{project.title}</h3>
                <ArrowUpRight className="w-8 h-8 mx-auto mt-2" />
            </div>
        </div>
    </div>
);

// --- PROJECTS LIST PAGE COMPONENT ---
export default function ProjectsPage() {
    return (
        <div className="bg-white text-black min-h-screen font-sans">
            <style jsx>{`
                @keyframes fadeInUp { 
                    from { opacity: 0; transform: translateY(30px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
                .animate-fade-in-up { 
                    opacity: 0;
                    animation: fadeInUp 0.7s ease-out forwards; 
                }
            `}</style>
            <main className="pt-32 pb-24 bg-white">
                <div className="container mx-auto px-8 md:px-16 lg:px-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projectsData.map((project, index) => (
                            <Link 
                                key={project.slug}
                                href={`/projects/${project.slug}`}
                                className={project.className}
                                style={{ animationDelay: `${index * 100}ms`, minHeight: '300px' }}
                            >
                                <ProjectCard project={project} />
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}