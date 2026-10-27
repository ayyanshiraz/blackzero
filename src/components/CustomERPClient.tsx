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

  const integrations = [
    {
      category: "Legacy ERPs & Accounting",
      systems: "Oracle NetSuite, SAP S/4HANA & Business One, Microsoft Dynamics 365, QuickBooks Enterprise, Sage Intacct",
    },
    {
      category: "CRM & Revenue Platforms",
      systems: "Salesforce Enterprise, HubSpot, Custom Omnichannel CRM, Stripe, Authorize.Net, ACH Banking APIs",
    },
    {
      category: "Supply Chain, EDI & E-Commerce",
      systems: "SPS Commerce, Cleo EDI/X12 (850, 855, 856, 810), Shopify Plus, Amazon SP-API, ShipStation, FedEx/UPS/Freight APIs",
    },
    {
      category: "Identity, Cloud & Data Warehousing",
      systems: "Okta, Microsoft Entra ID (Azure AD), AWS RDS, Neon Serverless PostgreSQL, Snowflake, BigQuery",
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
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-24 px-6 md:px-12 lg:px-24 border-b border-zinc-800 overflow-hidden">
        {/* Background Image: Full 100% opacity */}
        <div 
          className="absolute inset-0 z-0 bg-[url('/erp-bg.webp')] bg-cover bg-center bg-no-repeat opacity-100"
        />
        
        {/* Lighter Gradient Overlay: Left se black aur right se transparent */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/100 via-black/50 to-transparent" />

        {/* Tech grid pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "3rem 3rem",
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-mono uppercase tracking-widest border border-zinc-700 bg-zinc-900/80 text-gray-300 rounded-full">
              Enterprise Resource Planning Architecture • Serving US Operations Teams
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.95] mb-8">
              Custom ERP Software Development for Mid-Market &amp; Enterprise Operations
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mb-10">
              Stop forcing your proprietary operational workflows into rigid, per-seat SaaS boxes. Black Zero Technologies engineers high-velocity, custom ERP platforms built on Next.js, Node.js, Prisma ORM, and PostgreSQL—giving your finance, warehouse, and production teams sub-second execution and 100% code ownership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-block text-center bg-white text-black font-bold uppercase tracking-widest px-8 py-4 rounded-full text-sm md:text-base hover:bg-gray-200 transition-all"
              >
                Book a Technical Architecture Call
              </Link>
              <a
                href="#architecture-blueprint"
                className="inline-block text-center border border-zinc-700 bg-zinc-900/60 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-full text-sm md:text-base hover:border-white transition-all"
              >
                Inspect System Architecture
              </a>
            </div>
          </motion.div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-zinc-800/80">
            <div>
              <p className="text-3xl md:text-4xl font-black text-white">&lt;150ms</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1 uppercase tracking-wider font-mono">
                PostgreSQL Query Latency
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-white">$0</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1 uppercase tracking-wider font-mono">
                Recurring Per-Seat License Tax
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-white">100%</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1 uppercase tracking-wider font-mono">
                Proprietary IP &amp; Code Ownership
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-white">EST / PST</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1 uppercase tracking-wider font-mono">
                US Timezone Engineering Overlap
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHO IT IS FOR & TRIGGER EVENTS */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white text-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mb-16"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 block mb-3">
              01 / Operational Trigger Events
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-6">
              Built for COOs, CTOs, and VPs of Operations Scaling Past Legacy Limits
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We partner with mid-market and enterprise leaders across manufacturing, wholesale distribution, multi-site healthcare, and logistics who have reached the breaking point with disconnected spreadsheets or bloated legacy ERPs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {triggerEvents.map((item, index) => (
              <motion.div
                key={item.tag}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="border-2 border-black p-8 rounded-2xl bg-gray-50 hover:bg-black hover:text-white transition-colors duration-300 group shadow-md hover:shadow-2xl cursor-pointer"
              >
                <span className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 bg-black text-white group-hover:bg-white group-hover:text-black rounded-full inline-block mb-4">
                  {item.tag}
                </span>
                <h3 className="text-2xl font-extrabold mb-3">{item.title}</h3>
                <p className="text-gray-700 group-hover:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHAT WE BUILD: MODULES & INLINE SVG ARCHITECTURE DIAGRAM */}
      <section id="architecture-blueprint" className="py-24 px-6 md:px-12 lg:px-24 bg-black text-white border-t border-zinc-800 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mb-16"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400 block mb-3">
              02 / Modular ERP Capabilities &amp; Reference Stack
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-6">
              Core Enterprise Modules Engineered Around Your Exact Business Logic
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Every module is architected as a decoupled, high-availability service backed by strict relational integrity, multi-tenant role isolation, and real-time event streaming.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {erpModules.map((mod, index) => {
              let initialX = 0;
              let initialY = 0;

              if (index === 0 || index === 1) {
                initialX = -60;
              } else if (index === 2 || index === 3) {
                initialX = 60;
              } else if (index === 4) {
                initialY = -50;
              } else if (index === 5) {
                initialY = 50;
              }

              return (
                <motion.div
                  key={mod.code}
                  initial={{ opacity: 0, x: initialX, y: initialY }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white border border-gray-200 p-8 rounded-2xl flex flex-col justify-between hover:border-black hover:shadow-2xl transition-all duration-300 cursor-pointer shadow-md"
                >
                  <div>
                    <span className="text-xs font-mono text-gray-500 block mb-3">{mod.code}</span>
                    <h3 className="text-xl font-extrabold mb-4 text-black">{mod.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-6">{mod.description}</p>
                  </div>
                  <ul className="space-y-2 pt-4 border-t border-gray-200">
                    {mod.specs.map((spec) => (
                      <li key={spec} className="text-xs font-mono text-gray-700 flex items-center">
                        <span className="w-2 h-2 bg-black rounded-full mr-2.5 flex-shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Inline Accessible Architecture SVG Diagram with Scroll Animation */}
          <motion.div
            initial={{ opacity: 0, x: -80, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-12"
          >
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">
                Reference Enterprise ERP Architecture Blueprint
              </h3>
              <p className="text-gray-400 text-sm md:text-base">
                Multi-tenant RBAC security, API gateway orchestration, ACID-compliant PostgreSQL storage, and real-time WebSocket state synchronization.
              </p>
            </div>

            <div className="w-full overflow-x-auto">
              <svg
                viewBox="0 0 1000 420"
                className="w-full min-w-[760px] h-auto"
                role="img"
                aria-label="Black Zero Custom Enterprise ERP Architecture Diagram showing Client Portals, Security Gateway, Core Microservices, and PostgreSQL Database Layer"
              >
                <rect width="1000" height="420" rx="16" fill="#09090b" stroke="#27272a" strokeWidth="2" />

                {/* Column 1: Presentation & Edge */}
                <rect x="30" y="35" width="200" height="350" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                <text x="130" y="65" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  1. CLIENT &amp; EDGE LAYER
                </text>
                <rect x="50" y="90" width="160" height="55" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="130" y="115" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Next.js 15 App Router
                </text>
                <text x="130" y="133" fill="#4b5563" fontSize="10" textAnchor="middle">
                  Executive &amp; Finance UI
                </text>

                <rect x="50" y="165" width="160" height="55" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="130" y="190" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Warehouse Terminal UI
                </text>
                <text x="130" y="208" fill="#4b5563" fontSize="10" textAnchor="middle">
                  Barcode / RFID / Tablet PWA
                </text>

                <rect x="50" y="240" width="160" height="55" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="130" y="265" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Vendor &amp; EDI Portal
                </text>
                <text x="130" y="283" fill="#4b5563" fontSize="10" textAnchor="middle">
                  Supplier ASN &amp; PO Intake
                </text>

                <rect x="50" y="315" width="160" height="50" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="130" y="344" fill="#111827" fontSize="11" fontWeight="bold" textAnchor="middle">
                  SAML 2.0 / Okta / Entra SSO
                </text>

                {/* Column 2: API & Auth Gateway */}
                <rect x="275" y="35" width="205" height="350" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                <text x="377" y="65" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  2. SECURITY &amp; API CORE
                </text>
                <rect x="295" y="95" width="165" height="75" rx="8" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5" />
                <text x="377" y="125" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  RBAC &amp; Tenant Guard
                </text>
                <text x="377" y="145" fill="#4b5563" fontSize="10" textAnchor="middle">
                  Row-Level Security &amp; JWT
                </text>

                <rect x="295" y="190" width="165" height="80" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="377" y="220" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Node.js &amp; FastAPI Bus
                </text>
                <text x="377" y="240" fill="#4b5563" fontSize="10" textAnchor="middle">
                  REST / GraphQL / WebSockets
                </text>

                <rect x="295" y="290" width="165" height="75" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="377" y="320" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Webhook &amp; EDI Engine
                </text>
                <text x="377" y="340" fill="#4b5563" fontSize="10" textAnchor="middle">
                  SAP / NetSuite / Shopify Sync
                </text>

                {/* Column 3: Business Logic Modules */}
                <rect x="525" y="35" width="210" height="350" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                <text x="630" y="65" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  3. ERP DOMAIN SERVICES
                </text>
                <rect x="545" y="90" width="170" height="55" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="630" y="115" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Chart of Accounts Engine
                </text>
                <text x="630" y="133" fill="#4b5563" fontSize="10" textAnchor="middle">
                  General Ledger &amp; AP/AR
                </text>

                <rect x="545" y="165" width="170" height="55" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="630" y="190" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  BOM &amp; Production Hub
                </text>
                <text x="630" y="208" fill="#4b5563" fontSize="10" textAnchor="middle">
                  WIP Routing &amp; Lot Tracking
                </text>

                <rect x="545" y="240" width="170" height="55" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="630" y="265" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Multi-Site Inventory
                </text>
                <text x="630" y="283" fill="#4b5563" fontSize="10" textAnchor="middle">
                  Bin Allocation &amp; 3PL Sync
                </text>

                <rect x="545" y="315" width="170" height="50" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="630" y="344" fill="#111827" fontSize="11" fontWeight="bold" textAnchor="middle">
                  AI Demand &amp; Anomaly Worker
                </text>

                {/* Column 4: Data & Audit Layer */}
                <rect x="780" y="35" width="190" height="350" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                <text x="875" y="65" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  4. DATA &amp; AUDIT STORE
                </text>
                <rect x="800" y="95" width="150" height="80" rx="8" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5" />
                <text x="875" y="125" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  PostgreSQL + Prisma
                </text>
                <text x="875" y="145" fill="#4b5563" fontSize="10" textAnchor="middle">
                  ACID Relational Transactions
                </text>

                <rect x="800" y="195" width="150" height="75" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="875" y="225" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Redis Cache &amp; Queue
                </text>
                <text x="875" y="245" fill="#4b5563" fontSize="10" textAnchor="middle">
                  Sub-Millisecond State Locks
                </text>

                <rect x="800" y="290" width="150" height="75" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="875" y="320" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Immutable Audit Log
                </text>
                <text x="875" y="340" fill="#4b5563" fontSize="10" textAnchor="middle">
                  SOC2-Ready Change History
                </text>

                {/* Connector Lines */}
                <line x1="230" y1="210" x2="275" y2="210" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="480" y1="210" x2="525" y2="210" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="735" y1="210" x2="780" y2="210" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. BUILD VS BUY COMPARISON TABLE */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 block mb-3">
              03 / Executive TCO Evaluation
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-4">
              Legacy Off-the-Shelf ERP vs. Black Zero Custom ERP Architecture
            </h2>
            <p className="text-gray-700 text-lg">
              Why mid-market CFOs and CTOs are replacing per-seat SaaS contracts with proprietary enterprise systems.
            </p>
          </div>

          <div className="overflow-x-auto border-2 border-black rounded-2xl">
            <table className="min-w-full bg-white text-left border-collapse">
              <thead>
                <tr className="bg-black text-white">
                  <th className="py-4 px-6 font-bold uppercase text-xs tracking-wider">Evaluation Criterion</th>
                  <th className="py-4 px-6 font-bold uppercase text-xs tracking-wider">Legacy SaaS ERPs (NetSuite / SAP)</th>
                  <th className="py-4 px-6 font-bold uppercase text-xs tracking-wider">Black Zero Custom Enterprise ERP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm md:text-base">
                <tr>
                  <td className="py-4 px-6 font-bold text-black">3-Year Licensing Cost (150 Users)</td>
                  <td className="py-4 px-6 text-gray-600">$350,000 – $600,000+ in recurring seat &amp; tier fees</td>
                  <td className="py-4 px-6 font-semibold text-black">$0 per-seat fees; unlimited employee &amp; vendor accounts</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 font-bold text-black">Workflow &amp; BOM Alignment</td>
                  <td className="py-4 px-6 text-gray-600">Forces operations to adapt to rigid software boxes</td>
                  <td className="py-4 px-6 font-semibold text-black">100% engineered around your exact floor &amp; ledger logic</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-black">Query &amp; Reporting Speed</td>
                  <td className="py-4 px-6 text-gray-600">Sluggish multi-second page loads on large tables</td>
                  <td className="py-4 px-6 font-semibold text-black">Sub-second PostgreSQL indexing &amp; live WebSocket updates</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 font-bold text-black">Code &amp; Database Ownership</td>
                  <td className="py-4 px-6 text-gray-600">Vendor lock-in on shared multi-tenant servers</td>
                  <td className="py-4 px-6 font-semibold text-black">Full IP assignment, private cloud hosting, &amp; raw SQL access</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-black">Third-Party API &amp; EDI Sync</td>
                  <td className="py-4 px-6 text-gray-600">Brittle connectors with steep middleware surcharges</td>
                  <td className="py-4 px-6 font-semibold text-black">Native custom webhooks, EDI/X12 parsers, &amp; REST APIs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. VISIBLE CRAWLABLE FAQ SECTION */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white text-black border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 block mb-3">
             Technical &amp; Commercial FAQs
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Custom ERP Evaluation Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={index}
                  className="border border-black rounded-2xl overflow-hidden transition-all duration-300"
                >
                  {/* Question Box (Black Bg, White Text) */}
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex justify-between items-center p-6 bg-black text-white text-left focus:outline-none cursor-pointer"
                  >
                    <h3 className="text-lg md:text-xl font-bold pr-4">{faq.q}</h3>
                    <span className="text-2xl font-light leading-none">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {/* Answer Box (White Bg, Black Text) with Smooth Animation */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="bg-white text-black"
                      >
                        <div className="p-6 border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed">{faq.a}</p>
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