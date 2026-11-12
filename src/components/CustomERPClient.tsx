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

export default function CustomERPClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const triggerEvents = [
    {
      tag: "TRIGGER 01",
      title: "Outgrowing Fragmented Spreadsheets & QuickBooks",
      description:
        "Finance, warehouse, and purchasing teams spend dozens of hours every week reconciling conflicting CSV exports, leading to stockouts, delayed month-end closes, and manual accounting errors.",
    },
    {
      tag: "TRIGGER 02",
      title: "Hitting Rigid NetSuite, SAP, or Dynamics 365 Limits",
      description:
        "Off-the-shelf ERP vendors force your operations to bend around rigid templates while charging steep annual seat licenses and six-figure consulting fees for basic workflow changes.",
    },
    {
      tag: "TRIGGER 03",
      title: "Post-Acquisition (M&A) Multi-Entity Consolidation",
      description:
        "Merging multiple subsidiaries, regional warehouses, or disparate legacy databases requires a unified Chart of Accounts and centralized inventory visibility without breaking local branch operations.",
    },
    {
      tag: "TRIGGER 04",
      title: "Complex BOM & Multi-Stage Production Bottlenecks",
      description:
        "Standard commercial platforms fail to track multi-level Bill of Materials (BOM), raw material yield loss, work-in-progress (WIP) routing, and real-time shop-floor telemetry.",
    },
  ];

  const erpModules = [
    {
      code: "MOD-01",
      title: "Chart of Accounts & Automated Financial Ledgers",
      description:
        "ACID-compliant double-entry accounting engine featuring multi-entity general ledgers, automated accounts payable/receivable (AP/AR) three-way PO matching, real-time cash flow forecasting, and automated US multi-state tax reconciliation.",
      specs: ["Multi-Entity Consolidation", "Automated 3-Way PO Matching", "Audit-Ready General Ledger"],
    },
    {
      code: "MOD-02",
      title: "Bill of Materials (BOM) & Production Tracking",
      description:
        "End-to-end manufacturing execution modules that track multi-tier assemblies, raw material lot traceability, machine capacity scheduling, scrap variance, and real-time cost-of-goods-sold (COGS) calculations.",
      specs: ["Multi-Tier BOM Trees", "Work-In-Progress (WIP) Routing", "Real-Time COGS & Scrap Tracking"],
    },
    {
      code: "MOD-03",
      title: "Multi-Warehouse Inventory & Fulfillment Hub",
      description:
        "Sub-second inventory synchronization across distributed fulfillment centers, 3PL partners, and retail channels. Includes barcode/RFID scanner interfaces, automated reorder points, and bin-level stock allocation.",
      specs: ["Sub-Second Stock Sync", "Barcode & RFID Scanner UI", "Automated Reorder Thresholds"],
    },
    {
      code: "MOD-04",
      title: "Procurement, Vendor Portals & EDI/X12 Automation",
      description:
        "Self-service supplier portals with automated RFQ workflows, vendor lead-time scoring, ASN (856) and invoice (810) EDI parsing, and AI-assisted contract discrepancy alerts.",
      specs: ["Automated EDI 850/856/810", "Vendor SLA Scorecards", "Dynamic Approval Workflows"],
    },
    {
      code: "MOD-05",
      title: "Role-Based Access Control (RBAC) & Workforce Ops",
      description:
        "Granular permission matrices isolating departmental views, shift scheduling, contractor time-tracking, and immutable compliance audit trails for every record mutation.",
      specs: ["SAML 2.0 / OIDC Single Sign-On", "Field-Level RBAC Policies", "Immutable Compliance Logs"],
    },
    {
      code: "MOD-06",
      title: "Executive BI Dashboards & Predictive AI Analytics",
      description:
        "Live operational command centers with natural-language querying, margin erosion alerts, demand forecasting pipelines, and instant board-ready financial exports.",
      specs: ["Live WebSocket KPI Streams", "Python Demand Forecasting", "Custom Drill-Down Reports"],
    },
  ];

  const faqs = [
    {
      q: "How much does custom ERP software development cost for a mid-market firm?",
      a: "Focused core ERP deployments—such as unified multi-warehouse inventory, procurement, and financial ledger automation—typically range from $45,000 to $95,000. Comprehensive multi-facility enterprise architectures with custom manufacturing BOM engines and legacy EDI integrations range from $100,000 to $220,000+. All engagements are billed across verified milestones with zero recurring per-seat licensing fees.",
    },
    {
      q: "What is the typical timeline to build and deploy a custom ERP?",
      a: "We deliver in structured phases so your operations see immediate ROI. Architecture discovery and database schema modeling take 2 to 3 weeks. A production-ready Phase 1 core system ships in 12 to 16 weeks, while full enterprise rollouts involving multi-year historical data migration and parallel cut-overs complete within 20 to 32 weeks.",
    },
    {
      q: "When should an enterprise build a custom ERP instead of buying NetSuite or SAP?",
      a: "Buying off-the-shelf software makes sense if your business follows generic workflows. However, if your operations team relies on dozens of external spreadsheets to bridge software gaps, pays $100,000+ annually in escalating per-user seat licenses, or has unique manufacturing, distribution, or multi-entity billing logic, a custom ERP pays for itself within 14 to 24 months while giving you 100% IP ownership.",
    },
    {
      q: "How do you prevent operational downtime during legacy ERP data migration?",
      a: "We never execute risky overnight switch-overs. Our engineering team builds automated Python and Node.js ETL pipelines that extract, cleanse, and deduplicate your legacy records into a staging PostgreSQL cluster. We then run your new custom ERP in parallel with your existing system via bi-directional webhooks until your finance and warehouse teams verify 100% ledger accuracy during User Acceptance Testing (UAT).",
    },
    {
      q: "Who owns the source code, database schema, and intellectual property?",
      a: "Your organization retains 100% ownership of all source code, database schemas, custom documentation, and deployment pipelines upon milestone completion. Everything is governed by a strict US-enforceable Non-Disclosure Agreement (NDA) and full IP assignment contract with zero vendor lock-in.",
    },
    {
      q: "How do your engineering teams handle US time zones and ongoing SLA support?",
      a: "Our engineering leads and project architects maintain dedicated daily overlap hours with US Eastern (EST), Central (CST), and Pacific (PST) time zones for live sprint reviews, Slack/Teams collaboration, and architectural standups. Post-launch, we provide tiered SLA support with 24/7 automated database health monitoring.",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
      
      {/* 1. HERO SECTION (Centered B&W layout with 3-Line Text & Black Subheading) */}
      <section className="relative pt-32 pb-0 px-6 md:px-12 lg:px-24 bg-white text-gray-900 overflow-hidden flex flex-col items-center text-center">
        
        {/* Vertical Striped Background Pattern */}
        <div 
          className="absolute top-0 left-0 right-0 h-[65%] z-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(0,0,0,0.03) 60px, rgba(0,0,0,0.03) 120px)"
          }}
        />

        <div className="max-w-7xl mx-auto w-full relative z-30 flex flex-col items-center">
          {/* Expanded max-w wrapper */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full max-w-6xl flex flex-col items-center">
            
            {/* Heading - Size decreased to 4rem and structured into exactly 3 lines on desktop */}
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-black uppercase tracking-tighter text-[#0f172a] leading-[1.1] mb-8 w-full">
              Custom ERP Software Development 
              For Mid-Market &amp; 
              Enterprise Operations
            </h1>

            {/* Subheading - Font color changed to solid black with medium weight for readability */}
            <p className="text-lg md:text-xl text-black font-medium mb-10 leading-relaxed max-w-4xl">
              Stop forcing your proprietary operational workflows into rigid, per-seat SaaS boxes. Black Zero Technologies engineers high-velocity, custom ERP platforms built on Next.js, Node.js, Prisma ORM, and PostgreSQL giving your finance, warehouse, and production teams sub-second execution and 100% code ownership.
            </p>

            {/* Buttons - Size increased via px-10 and text-base */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
              <Link
                href="/contact"
                className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-base hover:bg-gray-800 transition-colors shadow-lg shadow-black/20 flex items-center gap-3"
              >
                {/* Live Pulse Indicator */}
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Book a Free ERP Scoping Call
              </Link>
            </div>
          </motion.div>

          {/* Centered Dashboard Image */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-7xl mx-auto mt-4"
          >
            <div className="relative z-10 bg-white rounded-t-2xl shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.1)] overflow-hidden border-t border-l border-r border-gray-200">
              <img 
                src="/cccc1.webp" 
                alt="Dashboard Interface" 
                className="w-full h-auto object-cover block"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHO IT IS FOR & TRIGGER EVENTS (Equal Size Grid Layout) */}
      <section className="pt-24 pb-12 px-6 md:px-12 lg:px-24 bg-white text-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Centered Heading Layout */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 max-w-4xl text-black">
              Built for COOs, CTOs, and VPs of Operations Scaling Past Legacy Limits
            </h2>
            <p className="text-black text-lg leading-relaxed max-w-3xl font-medium mt-4">
              We partner with mid-market and enterprise leaders across manufacturing, wholesale distribution, multi-site healthcare, and logistics who have reached the breaking point with disconnected spreadsheets or bloated legacy ERPs.
            </p>
          </motion.div>

          {/* Equal Size Cards Grid (items-stretch + h-full) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12 items-stretch">
            {triggerEvents.map((item, index) => {
              const icons = [
                <svg key={1} className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
                <svg key={2} className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>,
                <svg key={3} className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
                <svg key={4} className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
              ];

              return (
                <motion.div
                  key={item.tag}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className="flex flex-col justify-between text-center h-full p-6 lg:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 w-full mx-auto relative group"
                >
                  <div>
                    {/* Black Circular Icon Container */}
                    <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-6 mx-auto shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {icons[index]}
                    </div>
                    
                    {/* Centered Content */}
                    <h3 className="text-lg lg:text-xl font-bold text-black mb-3">{item.title}</h3>
                  </div>
                  <p className="text-black text-xs lg:text-sm leading-relaxed font-medium mt-auto">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEW SECTION: UNIFIED ERP DASHBOARD */}
      <section className="pt-12 pb-24 px-6 md:px-12 lg:px-24 bg-white text-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4 max-w-3xl text-black">
              Unify Your Entire Operation In One Place
            </h2>
            <p className="text-black text-lg max-w-2xl font-medium">
              All your inventory, finance, and production workflows come together in a single, high-velocity source of truth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="max-w-6xl mx-auto bg-gray-50/50 rounded-[2rem] p-8 md:p-12 lg:p-16 border border-gray-100 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Left Image */}
            <div className="flex-1 w-full relative">
              <div className="rounded-xl overflow-hidden border border-gray-200/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] bg-white">
                <img src="/dddd.png" alt="Enterprise Command Center Dashboard" className="w-full h-auto object-cover block" />
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 w-full">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">Real-Time Operational Command Center</h3>
              <p className="text-black mb-8 leading-relaxed font-medium">
                Monitor multi-warehouse inventory, track complex manufacturing BOMs, and reconcile financial ledgers instantly—without paying per-seat SaaS taxes.
              </p>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3 text-black font-semibold text-sm">
                  <div className="mt-0.5 bg-black rounded-full p-0.5 shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  Eliminates manual CSV reconciliation and data silos.
                </li>
                <li className="flex items-start gap-3 text-black font-semibold text-sm">
                  <div className="mt-0.5 bg-black rounded-full p-0.5 shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  Sub-second database querying and real-time state sync.
                </li>
              </ul>

              <Link href="/contact" className="bg-black text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors shadow-md inline-block">
                Get Started
              </Link>
            </div>
            
          </motion.div>

        </div>
      </section>

      {/* 3. WHAT WE BUILD: MODULES & INLINE SVG ARCHITECTURE DIAGRAM */}
      <section id="architecture-blueprint" className="pt-24 pb-12 md:pb-24 px-6 md:px-12 lg:px-24 bg-white text-black border-t border-gray-200 relative z-30">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            <div className="lg:sticky top-32 self-start w-full z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="w-full flex items-center justify-center rounded-2xl bg-white">
                   <img 
                     src="/eeee.png" 
                     alt="ERP Architecture Preview" 
                     className="w-full h-auto object-contain" 
                   />
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-12 pb-8 md:pb-20 overflow-x-hidden">
              
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-8"
              >
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-6 text-black">
                  Core Enterprise Modules Engineered Around Your Exact Business Logic
                </h2>
                <p className="text-black text-lg leading-relaxed">
                  Every module is architected as a decoupled, high-availability service backed by strict relational integrity, multi-tenant role isolation, and real-time event streaming.
                </p>
              </motion.div>

              {erpModules.map((mod, index) => {
                let initialX = 0;
                let initialY = 0;

                if (index % 2 === 0) {
                  initialX = -40;
                } else {
                  initialX = 40;
                }

                return (
                  <motion.div
                    key={mod.code}
                    initial={{ opacity: 0, x: initialX, y: initialY }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="flex flex-col text-black border-b border-gray-200 pb-8 last:border-0"
                  >
                    <div>
                      <span className="text-xs font-mono text-black block mb-2 font-bold">{mod.code}</span>
                      <h3 className="text-2xl font-extrabold mb-3 text-black">{mod.title}</h3>
                      <p className="text-black text-base leading-relaxed mb-4">{mod.description}</p>
                    </div>
                    <ul className="space-y-2 pt-2">
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

      {/* 7. 2-COLUMN FAQ SECTION (Matching the Reference Style) */}
      <section className="pt-20 pb-32 px-6 md:px-12 lg:px-24 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-black block mb-3">
              Technical &amp; Commercial FAQs
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#0f172a]">
              Custom ERP Evaluation Questions
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