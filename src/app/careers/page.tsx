'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Users, Rocket, Sparkles, Mail } from 'lucide-react';

// --- Job Data ---
const jobOpenings = [
    {
        title: "2D / 3D Animator",
        location: "Lahore, Pakistan",
        type: "Full-time",
        responsibilities: [
            "Create high-quality 2D and 3D animations for various projects including commercials, explainer videos, and social media content.",
            "Collaborate with the creative team to develop storyboards and concepts.",
            "Model, rig, and texture 3D assets.",
            "Ensure final animations align with the project's artistic direction."
        ],
        requirements: [
            "Proven experience as an Animator.",
            "Proficiency in animation software such as After Effects, Blender, Maya, or Cinema 4D.",
            "A strong portfolio showcasing a range of animation skills.",
            "Ability to work in a fast-paced, collaborative environment."
        ],
        benefits: ["Competitive Salary", "Creative work environment", "Performance Bonus"]
    },
    {
        title: "App Developer",
        location: "Lahore, Pakistan",
        type: "Full-time",
        responsibilities: [
            "Design and build advanced applications for the iOS and Android platforms.",
            "Collaborate with cross-functional teams to define, design, and ship new features.",
            "Unit-test code for robustness, including edge cases, usability, and general reliability.",
            "Work on bug fixing and improving application performance."
        ],
        requirements: [
            "Proven software development experience and Android/iOS skills development.",
            "Experience with Swift, Kotlin, or cross-platform frameworks like React Native/Flutter.",
            "Experience working with remote data via REST and JSON.",
            "Solid understanding of the full mobile development life cycle."
        ],
        benefits: ["Competitive Salary", "Flexible work hours", "Performance Bonus"]
    }
];

// --- Benefits Data ---
const benefits = [
    { icon: BrainCircuit, title: "Creative Freedom", description: "We trust our team. You'll have the autonomy to innovate and bring your best ideas to the table without micromanagement." },
    { icon: Rocket, title: "Career Growth", description: "Your development matters. We provide opportunities for learning, skill enhancement, and clear paths for advancement within the company." },
    { icon: Users, title: "Collaborative Culture", description: "Work alongside a diverse team of passionate experts in a supportive environment where great ideas can come from anywhere." },
    { icon: Sparkles, title: "Impactful Work", description: "The projects you work on will directly contribute to the success of top-tier brands, making a real and visible impact." }
];

// --- Main Career Page Component ---
export default function CareerPage() {

    return (
        <div className="bg-white font-sans text-black">
            {/* HERO SECTION */}
            <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative min-h-screen flex flex-col items-center justify-center text-center text-white p-6 overflow-hidden bg-black"
            >
                <img 
                    src="/careers.jpg" 
                    alt="Our team working together"
                    className="absolute inset-0 w-full h-full object-cover z-0 filter blur-[3px]"
                />
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <div className="relative z-20">
                    <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter text-white relative inline-block">
                        CAREERS!
                    </h1>
                </div>
                <p className="mt-6 text-xl md:text-2xl max-w-3xl leading-relaxed relative z-20">
                    We are on a constant outlook for rebels who love to break the norms and instead of going out-of-the-box they have <b className="font-extrabold text-white">NO BOX</b> at all.
                </p>
            </motion.section>

            {/* Join Fun, Growth, and Work SECTION */}
            <section className="pt-12 pb-12 bg-white">
                <div className="container mx-auto px-6 max-w-6xl flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl"
                    >
                        <h2 className="text-5xl font-extrabold text-black leading-tight">
                            JOIN FUN, GROWTH<br/>AND WORK!
                        </h2>
                        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                            Potential candidates must possess the ability to go beyond the limits while <b className="text-black">solving problems</b>, a sharp mind, and a <b className="text-black">hunger for growth</b>.
                        </p>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl font-extrabold text-black text-center mt-12">
                        OPEN POSITIONS!
                    </motion.h2>
                </div>
            </section>

            {/* JOB OPENINGS SECTION */}
            <section className="pb-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {jobOpenings.map((job, index) => (
                            <motion.div
                                key={job.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-black text-white p-8 rounded-lg shadow-lg h-full flex flex-col"
                            >
                                <h3 className="text-2xl font-bold">{job.title}</h3>
                                <div className="flex items-center gap-4 text-gray-300 mt-1">
                                    <span>Location: {job.location}</span>
                                </div>
                                <div className="mt-6 space-y-4 flex-grow">
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">Responsibilities:</h4>
                                        <ul className="space-y-1 pl-5 list-disc">
                                            {job.responsibilities.map((item, i) => (
                                                <li key={i} className="text-gray-300">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">Requirements:</h4>
                                        <ul className="space-y-1 pl-5 list-disc">
                                            {job.requirements.map((item, i) => (
                                                <li key={i} className="text-gray-300">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                     <div>
                                        <h4 className="font-bold text-lg mb-2">Benefits:</h4>
                                        <ul className="space-y-1 pl-5 list-disc">
                                            {job.benefits.map((item, i) => (
                                                <li key={i} className="text-gray-300">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-6 text-left">
                                     <a href="https://docs.google.com/forms/d/e/1FAIpQLSfOnV1439kkii-UmJeAGsp-mECdMDXQk2Bb2_IxMdZg6Bvn5g/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-black font-semibold py-3 px-8 rounded-md hover:bg-gray-200 transition-colors">
                                        Apply Now
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* WHY JOIN US SECTION */}
            <section className="pt-12 pb-24 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold">Why Join Black Zero?</h2>
                        <p className="mt-4 text-lg text-gray-600">We're more than just a workplace. We're a launchpad.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                // ✅ AMENDED CODE: Added hover animation and transition
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-white p-8 rounded-lg text-center border border-gray-200 shadow-lg transition-shadow hover:shadow-2xl"
                            >
                                <benefit.icon className="w-12 h-12 mx-auto mb-6 text-black" />
                                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-black py-20 text-white">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Mail className="w-12 h-12 mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-extrabold">Don't See a Fit?</h2>
                        <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                            We're always looking for exceptional talent. If you believe you have what it takes to be a rebel at Black Zero, send us your resume and tell us why you'd be a great addition to our team.
                        </p>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfOnV1439kkii-UmJeAGsp-mECdMDXQk2Bb2_IxMdZg6Bvn5g/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-white text-black font-bold py-4 px-10 rounded-lg hover:bg-gray-200 transition-colors text-lg">
                            Send Us Your Resume
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

