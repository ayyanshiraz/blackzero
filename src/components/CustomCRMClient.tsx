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
        "Aggregate WhatsApp Cloud API, Instagram DMs, Facebook Messenger, SMS/Twilio, live web chat, and two-way IMAP/SMTP email into a single real-time WebSocket inbox with zero tab switching.",
      specs: ["Real-Time WebSocket Threads", "WhatsApp & Meta Graph API", "SLA Response Timer Alerts"],
    },
    {
      code: "CRM-02",
      title: "B2B Deal Pipeline & Meeting Conversion Engine",
      description:
        "High-velocity kanban and tabular opportunity management engineered for complex multi-stakeholder B2B sales cycles, automated stage gates, and calendar-to-deal conversion tracking.",
      specs: ["Multi-Pipeline Stage Gates", "Automated Follow-Up Tasks", "Win/Loss Velocity Telemetry"],
    },
    {
      code: "CRM-03",
      title: "AI Triage, Lead Scoring & Conversation Copilot",
      description:
        "Embedded LLM agents that automatically summarize long buyer threads, classify inbound intent, score lead readiness, and route high-value opportunities to the right account executive.",
      specs: ["Automated Thread Summaries", "Predictive Intent Scoring", "Smart Round-Robin Routing"],
    },
    {
      code: "CRM-04",
      title: "Custom CPQ, Proposals & ERP Ledger Sync",
      description:
        "Configure-Price-Quote (CPQ) modules connected directly to your ERP inventory and Chart of Accounts—generating multi-tier B2B quotes, digital contracts, and automated recurring invoices.",
      specs: ["Live ERP Inventory Lookup", "Dynamic Tiered Pricing", "Automated Stripe & ACH Billing"],
    },
    {
      code: "CRM-05",
      title: "Dedicated-IP Outbound & Unlimited Email Engine",
      description:
        "Own your outbound infrastructure with unlimited contact storage, automated multi-step drip sequences, real-time SMTP/DNS email verification, and dedicated IP reputation control.",
      specs: ["Zero Per-Contact Surcharges", "Automated Drip Sequences", "Dedicated IP Deliverability"],
    },
    {
      code: "CRM-06",
      title: "Multi-Tenant RBAC, Audit Logs & Revenue BI",
      description:
        "Territory-based data isolation, SAML 2.0 Single Sign-On, immutable compliance logs, and dark-mode executive attribution dashboards tracking CAC, LTV, and rep quota attainment.",
      specs: ["Territory & Team RBAC", "Offline Ad Conversion Sync", "Real-Time Cohort Attribution"],
    },
  ];

  const integrations = [
    {
      category: "Messaging, Telephony & Social Channels",
      systems: "WhatsApp Cloud API, Meta Graph API (Instagram & Messenger), Twilio Voice & SMS, SendGrid, Amazon SES, Custom SMTP/IMAP",
    },
    {
      category: "Legacy CRMs & Marketing Attribution",
      systems: "Salesforce Enterprise, HubSpot CRM, Zoho, Microsoft Dynamics 365, Google Ads Offline Conversion API, Meta Conversions API",
    },
    {
      category: "ERP, Accounting & Payment Gateways",
      systems: "Custom Enterprise ERP, Oracle NetSuite, SAP, QuickBooks Enterprise, Stripe Webhooks, Authorize.Net, DocuSign API",
    },
    {
      category: "Identity, Calendar & Data Infrastructure",
      systems: "Okta, Microsoft Entra ID (Azure AD), Google Workspace & Outlook Calendar APIs, Neon PostgreSQL, Redis, Snowflake",
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
    <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
      {/* 1. HERO SECTION */}
     {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-24 px-6 md:px-12 lg:px-24 border-b border-zinc-800 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-[url('/crm-bg.webp')] bg-cover bg-center bg-no-repeat opacity-100"
        />

        {/* 1. Left-to-Right Dark Gradient: Left text area ko dark rakhega aur right laptop screen ko clear */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/95 via-black/75 to-black/10" />

        {/* 2. Bottom-to-Top Dark Gradient: Neeche wale metrics strip ke peeche dark contrast banayega */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

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
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-mono uppercase tracking-widest border border-zinc-700 bg-zinc-900/90 text-gray-200 rounded-full">
              Enterprise Revenue &amp; Omnichannel Architecture • Serving US Operations Teams
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.95] mb-8 drop-shadow-md">
              Custom CRM Software Development for High-Velocity Revenue Teams
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mb-10 drop-shadow">
              Eliminate bloated per-seat SaaS renewals and fragmented communication silos. Black Zero Technologies engineers bespoke B2B CRM platforms, unified omnichannel inboxes, and AI-assisted pipeline engines using Next.js, Node.js, WebSockets, Prisma ORM, and PostgreSQL.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-block text-center bg-white text-black font-bold uppercase tracking-widest px-8 py-4 rounded-full text-sm md:text-base hover:bg-gray-200 transition-all shadow-lg"
              >
                Book a Call
              </Link>
              <a
                href="#crm-architecture-blueprint"
                className="inline-block text-center border border-zinc-500 bg-black/70 backdrop-blur-sm text-white font-bold uppercase tracking-widest px-8 py-4 rounded-full text-sm md:text-base hover:border-white transition-all"
              >
                Inspect System Architecture
              </a>
            </div>
          </motion.div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-zinc-700/80">
            <div>
              <p className="text-3xl md:text-4xl font-black text-white drop-shadow">Unlimited</p>
              <p className="text-xs md:text-sm text-gray-200 mt-1 uppercase tracking-wider font-mono">
                Seats &amp; Contact Storage ($0 Tax)
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-white drop-shadow">&lt;100ms</p>
              <p className="text-xs md:text-sm text-gray-200 mt-1 uppercase tracking-wider font-mono">
                WebSocket Omnichannel Sync
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-white drop-shadow">100%</p>
              <p className="text-xs md:text-sm text-gray-200 mt-1 uppercase tracking-wider font-mono">
                Source Code &amp; Database IP
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-white drop-shadow">EST / PST</p>
              <p className="text-xs md:text-sm text-gray-200 mt-1 uppercase tracking-wider font-mono">
                US Timezone Engineering Overlap
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHO IT IS FOR & TRIGGER EVENTS */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white text-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header Animation: once: false kar diya taake har scroll par chale */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mb-16"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 block mb-3">
              01 / Revenue &amp; Operations Trigger Events
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-6">
              Engineered for VPs of Sales, RevOps Leaders, and CTOs Tired of SaaS Bloat
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We build custom CRM systems for mid-market and enterprise organizations where off-the-shelf platforms have become an expensive bottleneck rather than a revenue accelerator.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {triggerEvents.map((item, index) => (
              <motion.div
                key={item.tag}
                // once: false ki wajah se yeh animation har scroll par repeat hogi
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
      <section id="crm-architecture-blueprint" className="py-24 px-6 md:px-12 lg:px-24 bg-black text-white border-t border-zinc-800 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mb-16"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400 block mb-3">
              02 / Modular CRM Capabilities &amp; Reference Stack
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-6">
              Core Omnichannel &amp; Pipeline Modules Tailored to Your Sales Motion
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Every custom CRM we architect combines sub-second frontend responsiveness with event-driven webhook ingestion, AI lead triage, and strict role-based security.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {crmModules.map((mod, index) => {
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
                Reference Omnichannel CRM Architecture Blueprint
              </h3>
              <p className="text-gray-400 text-sm md:text-base">
                Multi-channel webhook ingestion, WebSocket real-time inbox streaming, AI triage copilot, and bi-directional ERP/PostgreSQL persistence.
              </p>
            </div>

            <div className="w-full overflow-x-auto">
              <svg
                viewBox="0 0 1000 420"
                className="w-full min-w-[760px] h-auto"
                role="img"
                aria-label="Black Zero Custom Enterprise CRM Architecture Diagram showing Omnichannel Ingestion, WebSocket Gateway, AI Triage and Pipeline Core, and PostgreSQL Database Layer"
              >
                <rect width="1000" height="420" rx="16" fill="#09090b" stroke="#27272a" strokeWidth="2" />

                {/* Column 1: Omnichannel Sources */}
                <rect x="30" y="35" width="200" height="350" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                <text x="130" y="65" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  1. OMNICHANNEL INGEST
                </text>
                <rect x="50" y="90" width="160" height="55" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="130" y="115" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  WhatsApp Cloud API
                </text>
                <text x="130" y="133" fill="#4b5563" fontSize="10" textAnchor="middle">
                  Two-Way Business Messaging
                </text>

                <rect x="50" y="165" width="160" height="55" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="130" y="190" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Meta Graph &amp; Social
                </text>
                <text x="130" y="208" fill="#4b5563" fontSize="10" textAnchor="middle">
                  Instagram DMs &amp; Messenger
                </text>

                <rect x="50" y="240" width="160" height="55" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="130" y="265" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Custom SMTP &amp; IMAP
                </text>
                <text x="130" y="283" fill="#4b5563" fontSize="10" textAnchor="middle">
                  Two-Way Email &amp; Sequences
                </text>

                <rect x="50" y="315" width="160" height="50" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="130" y="344" fill="#111827" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Twilio VoIP / SMS / WebChat
                </text>

                {/* Column 2: Real-Time Event & Auth Gateway */}
                <rect x="275" y="35" width="205" height="350" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                <text x="377" y="65" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  2. REAL-TIME GATEWAY
                </text>
                <rect x="295" y="95" width="165" height="75" rx="8" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5" />
                <text x="377" y="125" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Webhook Normalizer
                </text>
                <text x="377" y="145" fill="#4b5563" fontSize="10" textAnchor="middle">
                  Node.js &amp; Express Queue
                </text>

                <rect x="295" y="190" width="165" height="80" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="377" y="220" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  WebSocket Streamer
                </text>
                <text x="377" y="240" fill="#4b5563" fontSize="10" textAnchor="middle">
                  Sub-100ms Live Inbox Push
                </text>

                <rect x="295" y="290" width="165" height="75" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="377" y="320" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  SAML 2.0 &amp; RBAC Guard
                </text>
                <text x="377" y="340" fill="#4b5563" fontSize="10" textAnchor="middle">
                  Territory &amp; Rep Isolation
                </text>

                {/* Column 3: CRM Core & AI Triage */}
                <rect x="525" y="35" width="210" height="350" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                <text x="630" y="65" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  3. CRM &amp; AI TRIAGE CORE
                </text>
                <rect x="545" y="90" width="170" height="55" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="630" y="115" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Next.js 15 Unified Inbox
                </text>
                <text x="630" y="133" fill="#4b5563" fontSize="10" textAnchor="middle">
                  Single-Screen Agent Console
                </text>

                <rect x="545" y="165" width="170" height="55" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="630" y="190" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  LLM Triage &amp; Lead Scorer
                </text>
                <text x="630" y="208" fill="#4b5563" fontSize="10" textAnchor="middle">
                  Intent &amp; Summary Copilot
                </text>

                <rect x="545" y="240" width="170" height="55" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="630" y="265" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Pipeline &amp; CPQ Engine
                </text>
                <text x="630" y="283" fill="#4b5563" fontSize="10" textAnchor="middle">
                  Deal Stages &amp; Live Quotes
                </text>

                <rect x="545" y="315" width="170" height="50" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="630" y="344" fill="#111827" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Offline Ad Conversion Sync
                </text>

                {/* Column 4: Persistence & ERP Bridge */}
                <rect x="780" y="35" width="190" height="350" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                <text x="875" y="65" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  4. DATA &amp; ERP BRIDGE
                </text>
                <rect x="800" y="95" width="150" height="80" rx="8" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5" />
                <text x="875" y="125" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  PostgreSQL + Prisma
                </text>
                <text x="875" y="145" fill="#4b5563" fontSize="10" textAnchor="middle">
                  Unified Customer Graph
                </text>

                <rect x="800" y="195" width="150" height="75" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="875" y="225" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Bi-Directional ERP Sync
                </text>
                <text x="875" y="245" fill="#4b5563" fontSize="10" textAnchor="middle">
                  Inventory &amp; Ledger Parity
                </text>

                <rect x="800" y="290" width="150" height="75" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
                <text x="875" y="320" fill="#111827" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Redis &amp; Audit Vault
                </text>
                <text x="875" y="340" fill="#4b5563" fontSize="10" textAnchor="middle">
                  SLA Timers &amp; Security Logs
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

      {/* 7. VISIBLE CRAWLABLE FAQ SECTION */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white text-black border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 block mb-3">
             Technical &amp; Commercial FAQs
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Custom CRM Evaluation Questions
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