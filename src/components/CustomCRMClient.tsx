"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

/* --- PREMIUM HERO ANIMATION VARIANTS --- */
const heroContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, y: 150, rotateX: 25, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 },
  },
};
/* ------------------------------------------- */

export default function CustomCRMClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const triggerEvents = [
    {
      tag: "TRIGGER 01",
      title: "Escalating Salesforce or HubSpot Per-Seat Taxes",
      description:
        "As your sales, support, and account management teams expand, tier upgrades, contact-tier overages, and mandatory add-on licenses drain hundreds of thousands of dollars annually.",
    },
    {
      tag: "TRIGGER 02",
      title: "Fragmented Omnichannel Buyer Conversations",
      description:
        "High-intent B2B leads slip through the cracks because reps switch between disconnected WhatsApp Business tabs, Instagram DMs, Facebook Messenger, LinkedIn, and corporate email.",
    },
    {
      tag: "TRIGGER 03",
      title: "Low Sales Rep Adoption Due to Cluttered UI",
      description:
        "Generic CRMs force account executives to click through dozens of irrelevant fields and slow-loading tabs just to log a call, resulting in dirty pipeline data and inaccurate revenue forecasts.",
    },
    {
      tag: "TRIGGER 04",
      title: "Disconnected ERP, Inventory & CPQ Billing Logic",
      description:
        "Sales reps quote custom pricing or delivery timelines without live visibility into warehouse stock, Bill of Materials lead times, or credit limits stored in your backend ERP.",
    },
  ];

  const crmModules = [
    {
      code: "CRM-01",
      title: "Unified Omnichannel Messaging Inbox",
      description:
        "Aggregate WhatsApp, Meta, SMS, and IMAP email into a single real-time WebSocket inbox with zero tab switching.",
      specs: ["Real-Time WebSocket Threads", "WhatsApp & Meta Graph API", "SLA Response Timer Alerts"],
      image: "/inbox-crm.jpg",
    },
    {
      code: "CRM-02",
      title: "B2B Deal Pipeline & Meeting Conversion",
      description:
        "High-velocity kanban pipeline engineered for complex B2B sales cycles and automated calendar-to-deal tracking.",
      specs: ["Multi-Pipeline Stage Gates", "Automated Follow-Up Tasks", "Win/Loss Velocity Telemetry"],
    },
    {
      code: "CRM-03",
      title: "AI Triage & Lead Scoring Copilot",
      description:
        "Embedded LLM agents that summarize threads, score lead readiness, and route opportunities to the right executive.",
      specs: ["Automated Thread Summaries", "Predictive Intent Scoring", "Smart Round-Robin Routing"],
      image: "/chatbot-crm.jpg",
    },
    {
      code: "CRM-04",
      title: "Custom CPQ & ERP Ledger Sync",
      description:
        "CPQ modules connected directly to your ERP inventory generating multi-tier B2B quotes and automated invoices.",
      specs: ["Live ERP Inventory Lookup", "Dynamic Tiered Pricing", "Automated Stripe & ACH Billing"],
      image: "/reports-crm.jpg",
    },
    {
      code: "CRM-05",
      title: "Dedicated-IP Outbound Email Engine",
      description:
        "Own your outbound infrastructure with automated multi-step drip sequences and dedicated IP reputation control.",
      specs: ["Zero Per-Contact Surcharges", "Automated Drip Sequences", "Dedicated IP Deliverability"],
    },
    {
      code: "CRM-06",
      title: "Multi-Tenant RBAC & Revenue BI",
      description:
        "SAML 2.0 Single Sign-On, compliance logs, and dark-mode executive attribution dashboards tracking CAC and LTV.",
      specs: ["Territory & Team RBAC", "Offline Ad Conversion Sync", "Real-Time Cohort Attribution"],
    },
  ];

  const faqs = [
    {
      q: "How much does custom CRM software development cost?",
      a: "Focused custom CRM deployments—including a unified omnichannel inbox, B2B deal pipeline management, and automated outbound sequences—typically range from $35,000 to $75,000. Full enterprise CRM ecosystems featuring bi-directional ERP inventory sync, custom Configure-Price-Quote (CPQ) workflows, and private AI triage agents range from $80,000 to $160,000+. Every build is billed across verified milestones with zero recurring per-seat licensing fees.",
    },
    {
      q: "How long does it take to build and migrate to a custom CRM?",
      a: "We ship in agile milestones so your revenue teams gain value fast. Architecture discovery and data schema design take 2 weeks. A production-ready Phase 1 CRM typically launches in 10 to 14 weeks, while comprehensive enterprise rollouts involving multi-year Salesforce or HubSpot data migration and ERP integration complete in 16 to 24 weeks.",
    },
    {
      q: "Why build a custom CRM instead of buying Salesforce or HubSpot?",
      a: "Commercial SaaS CRMs are built for generic mass-market use cases and penalize your growth with per-user seat fees, contact-volume tiers, and mandatory add-ons that easily exceed $120,000 to $300,000 over three years. A custom CRM engineered by Black Zero Technologies eliminates per-seat licensing permanently, cuts screen clutter so reps actually use the system, and gives your company 100% ownership of its customer data and codebase.",
    },
    {
      q: "How do you migrate historical deals, contacts, and emails without disrupting active sales?",
      a: "We use a 4-stage parallel cut-over protocol. Our engineers write automated Python and Node.js ETL pipelines that map, deduplicate, and import your legacy accounts, deal histories, notes, and email attachments into a staging PostgreSQL database. Bi-directional webhooks keep your old CRM and new custom CRM synchronized in real time while your sales reps complete User Acceptance Testing (UAT) with zero downtime.",
    },
    {
      q: "Can our custom CRM integrate directly with WhatsApp, Instagram, and our internal ERP?",
      a: "Yes. Unlike generic CRMs that rely on brittle, paid third-party plugins for messaging and ERP sync, we engineer native webhook listeners for the official WhatsApp Cloud API, Meta Graph API, Twilio, and IMAP email, alongside direct REST/GraphQL connectors to your ERP inventory and billing ledgers.",
    },
    {
      q: "Who owns the intellectual property, and how do you support US time zones?",
      a: "Your enterprise retains 100% intellectual property (IP) and source code ownership upon milestone completion, protected under a strict US-enforceable NDA. Our engineering leads maintain daily working-hours overlap across US Eastern (EST), Central (CST), and Pacific (PST) time zones for live sprint reviews, Slack/Teams communication, and ongoing SLA support.",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#0066FF] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-0 px-6 md:px-12 lg:px-24 flex flex-col items-center overflow-hidden bg-white text-gray-900">
        
        {/* Vertical Striped Background Pattern */}
        <div 
          className="absolute top-0 left-0 right-0 h-[65%] z-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(0,0,0,0.03) 60px, rgba(0,0,0,0.03) 120px)"
          }}
        />

        <div className="relative z-30 w-full max-w-[1400px] px-4 mx-auto text-center flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={heroContainer} className="w-full max-w-[1200px]">
            
            <motion.div variants={heroItem}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[10px] sm:text-xs font-mono uppercase tracking-widest border border-gray-200 bg-gray-50 text-black rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                </span>
                Enterprise Revenue &amp; Omnichannel Architecture • Serving US Operations Teams
              </span>
            </motion.div>
            
            <motion.h1 variants={heroItem} className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-[4.5rem] font-black uppercase tracking-tighter leading-[1.05] mb-6 text-[#0f172a]">
              Custom CRM Software Development <br className="hidden md:block" /> for High-Velocity Revenue Teams
            </motion.h1>
            
            <motion.p variants={heroItem} className="text-sm md:text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed font-medium">
              Eliminate bloated per-seat SaaS renewals and fragmented communication silos. Black Zero Technologies engineers bespoke B2B CRM platforms, unified omnichannel inboxes, and AI-assisted pipeline engines using Next.js, Node.js, WebSockets, Prisma ORM, and PostgreSQL.
            </motion.p>
            
            <motion.div variants={heroItem} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-black text-white font-bold uppercase tracking-widest px-12 py-5 rounded-full text-sm md:text-base lg:text-lg transition-all duration-300 shadow-lg w-full sm:w-auto hover:-translate-y-1 hover:scale-105 hover:bg-zinc-800 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              >
                Get a Custom CRM Estimate
              </Link>
            </motion.div>

          </motion.div>
        </div>

        {/* IMAGE-BASED DASHBOARD MOCKUP WITH 3D TILT & CONTINUOUS FLOAT */}
        <div 
          className="relative z-10 w-full max-w-[1400px] mx-auto -mt-16 sm:-mt-24 md:-mt-32 lg:-mt-40 -mb-24 sm:-mb-32 md:-mb-48 lg:-mb-64"
          style={{ perspective: 1500 }}
        >
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={imageReveal}
            className="w-full flex justify-center px-2 sm:px-6 md:px-12 relative transform-style-preserve-3d"
          >
            <div className="absolute inset-0 bg-black/15 blur-[100px] max-w-5xl mx-auto rounded-full z-0 pointer-events-none" style={{ transform: 'translateY(15%)', height: '70%' }}></div>
            
            <motion.img 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              src="/covercrm.webp" 
              alt="Black Zero Custom CRM Dashboard showing Revenue and Omnichannel Analytics" 
              className="w-full max-w-7xl lg:max-w-[1300px] h-auto object-contain rounded-xl md:rounded-3xl relative z-20 drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. WHO IT IS FOR & TRIGGER EVENTS */}
      <section className="py-12 lg:py-24 px-6 md:px-12 lg:px-24 bg-white text-black overflow-hidden relative z-30">
        <div className="max-w-7xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: -30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-6 text-[#0f172a]">
              Engineered for VPs of Sales, RevOps Leaders, and CTOs <br></br> Tired of SaaS Bloat.<span className="text-black italic font-mono font-bold"> </span>
            </h2>
            <p className="text-black text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              We build custom CRM systems for mid-market and enterprise organizations where off-the-shelf platforms have become an expensive bottleneck rather than a revenue accelerator.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-stretch">
            {triggerEvents.map((item, index) => (
              <motion.div
                key={item.tag}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between p-6 lg:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-full w-full group"
              >
               <div>
                 <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 bg-black text-white shadow-md">
                    {index === 0 && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    )}
                    {index === 1 && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    )}
                    {index === 2 && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                    )}
                    {index === 3 && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                    )}
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-[#0f172a]">{item.title}</h3>
               </div>
                
                <p className="text-sm text-black leading-relaxed mt-auto">
                  {item.description}
                </p>
                
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHAT WE BUILD: MODULES */}
      <section id="crm-modules" className="py-12 lg:py-24 px-6 md:px-12 lg:px-24 bg-white text-black border-t border-gray-200 relative z-30">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            <div className="w-full lg:sticky lg:top-32 self-start z-10 mb-12 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="w-full flex items-center justify-center rounded-2xl bg-white">
                   <img 
                     src="/crmsec 1.png" 
                     alt="CRM Architecture Preview" 
                     className="w-full h-auto object-contain" 
                   />
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-12 lg:pb-20">
              
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-8"
              >
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-6 text-black">
                  Core Omnichannel &amp; Pipeline Modules Tailored to Your Sales Motion
                </h2>
                <p className="text-black text-lg leading-relaxed">
                  Every custom CRM we architect combines sub-second frontend responsiveness with event-driven webhook ingestion, AI lead triage, and strict role-based security.
                </p>
              </motion.div>

              {crmModules.map((mod, index) => {
                return (
                  <motion.div
                    key={mod.code}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="flex flex-col text-black"
                  >
                    <div>
                      <span className="text-xs font-mono text-black block mb-2">{mod.code}</span>
                      <h3 className="text-2xl font-extrabold mb-3 text-black">{mod.title}</h3>
                      <p className="text-black text-base leading-relaxed mb-4">{mod.description}</p>
                    </div>
                    <ul className="space-y-2 pt-4 border-t border-gray-200 mt-auto">
                      {mod.specs.map((spec) => (
                        <li key={spec} className="text-sm font-mono text-black flex items-center">
                          <span className="w-1.5 h-1.5 bg-black rounded-full mr-3 flex-shrink-0" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 4. FAQ SECTION (2-Column Match) */}
      <section className="pt-20 pb-32 px-6 md:px-12 lg:px-24 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-black block mb-3">
              Technical &amp; Commercial FAQs
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#0f172a]">
              Custom CRM Evaluation Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={index}
                  className="bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex justify-between items-center p-6 bg-white text-black text-left focus:outline-none cursor-pointer"
                  >
                    <h3 className="text-base md:text-lg font-bold pr-4">{faq.q}</h3>
                    <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold leading-none">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="bg-white text-black"
                      >
                        <div className="p-6 pt-0 border-t border-gray-100 mt-2">
                          <p className="text-gray-700 text-sm md:text-base leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}