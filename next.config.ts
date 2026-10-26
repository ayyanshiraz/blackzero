import type { NextConfig } from "next";
import { productsData } from "./src/app/products/data";

// Subdomains served by THIS app (one deployment, several hostnames):
//   products.blackzero.org -> /products and /products/[slug]
//   turnitin.blackzero.org -> /turnitin
const productSlugs = productsData.map((p) => p.slug).join("|");

// Any path that must NOT be redirected back to the main site on a subdomain:
// Next internals, API routes, and files (anything with an extension, e.g. /products/1.webp)
const passthrough = "_next/|api/|.*\\.[a-zA-Z0-9]+$";

const MAIN = "https://www.blackzero.org";
const host = (value: string) => [{ type: "host" as const, value }];

const nextConfig: NextConfig = {
    trailingSlash: false, // This automatically redirects /about/ to /about

    // Server Actions configuration for file uploads up to 50MB
    experimental: {
        serverActions: {
            bodySizeLimit: 52428800, // 50MB limit for file uploads
        },
    },

    async rewrites() {
        return {
            beforeFiles: [
                // products.blackzero.org  ->  /products
                { source: "/", has: host("products.blackzero.org"), destination: "/products" },
                // products.blackzero.org/company-invoicer  ->  /products/company-invoicer
                { source: `/:slug(${productSlugs})`, has: host("products.blackzero.org"), destination: "/products/:slug" },
                // turnitin.blackzero.org  ->  /turnitin
                { source: "/", has: host("turnitin.blackzero.org"), destination: "/turnitin" },
            ],
        };
    },

    async redirects() {
        return [
            // ---- Old path-based URLs -> new subdomains (keeps SEO + old links alive) ----
            { source: "/products", has: host("(?:www\\.)?blackzero\\.org"), destination: "https://products.blackzero.org", permanent: true },
            { source: "/products/:slug", has: host("(?:www\\.)?blackzero\\.org"), destination: "https://products.blackzero.org/:slug", permanent: true },
            { source: "/turnitin", has: host("(?:www\\.)?blackzero\\.org"), destination: "https://turnitin.blackzero.org", permanent: true },

            // ---- Clean up duplicate paths on the subdomains themselves ----
            { source: "/products", has: host("products.blackzero.org"), destination: "https://products.blackzero.org", permanent: true },
            { source: "/products/:slug(" + productSlugs + ")", has: host("products.blackzero.org"), destination: "https://products.blackzero.org/:slug", permanent: true },
            { source: "/turnitin", has: host("turnitin.blackzero.org"), destination: "https://turnitin.blackzero.org", permanent: true },

            // ---- Any other page on a subdomain (e.g. /about from the navbar) -> main site ----
            {
                source: `/:path((?!${passthrough}|products$|products/|${productSlugs}$).+)`,
                has: host("products.blackzero.org"),
                destination: `${MAIN}/:path`,
                permanent: false,
            },
            {
                source: `/:path((?!${passthrough}|turnitin$).+)`,
                has: host("turnitin.blackzero.org"),
                destination: `${MAIN}/:path`,
                permanent: false,
            },

            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'blackzero.org',
                    },
                ],
                destination: 'https://www.blackzero.org/:path*',
                permanent: true,
            },
            // 2. Page Redirects (No need to list trailing slash versions separately)
            { source: '/portfolio', destination: '/projects', permanent: true },
            
            { source: '/our-team', destination: '/team', permanent: true },
            
            { source: '/bizvibez-about', destination: '/about', permanent: true },
            
            { source: '/mobile-application', destination: '/services/development', permanent: true },
                        
            { source: '/tag/:path*', destination: '/blogs', permanent: true }, 
            { source: '/category/:path*', destination: '/blogs', permanent: true }, 
            {
      source: "/blogs/how-to-check-ai-generated-text",
      destination: "/blogs/detect-ai-content-for-free",
      permanent: true,
    },
    {
      source: "/blogs/free-ai-plagiarism-checker-turnitin-alternative",
      destination: "/blogs/detect-ai-content-for-free",
      permanent: true,
    },
    {
      source: "/blogs/free-ai-plagiarism-checker-usa",
      destination: "/blogs/detect-ai-content-for-free",
      permanent: true,
    },
    {
      source: "/blogs/traditional-seo-vs-ai-seo-hybrid-search-formula",
      destination: "/blogs/what-is-hybrid-seo-ai-search-vs-traditional-seo-2026",
      permanent: true,
    },
    {
      source: "/blogs/free-plagiarism-checker-5000-word-pdf-guide",
      destination: "/blogs/check-plagiarism-without-turnitin",
      permanent: true,
    },
    {
      source: "/blogs/best-free-turnitin-alternative",
      destination: "/blogs/check-plagiarism-without-turnitin",
      permanent: true,
    },
    {
      source: "/blogs/cinematic-animation-digital-branding-usa",
      destination: "/blogs/3d-animated-web-design-usa",
      permanent: true,
    },
    {
      source: "/blogs/business-process-automation-operational-bottlenecks",
      destination: "/blogs/business-process-automation-strategies",
      permanent: true,
    },
    {
      source: "/blogs/deep-learning-neural-networks-enterprise-data",
      destination: "/blogs/custom-neural-networks-solve-business-problems",
      permanent: true,
    },
    {
      source: "/blogs/regulatory-compliance-explainable-ai",
      destination: "/blogs/explainable-artificial-intelligence-us-compliance",
      permanent: true,
    },
    {
      source: "/blogs/custom-business-software-vs-off-the-shelf-limits",
      destination: "/blogs/custom-vs-off-the-shelf-software",
      permanent: true,
    },
    {
      source: "/blogs/3d-web-design-trends-2026-digital-assets",
      destination: "/blogs/3d-web-design-trends-2026",
      permanent: true,
    },
    {
      source: "/blogs/high-end-3d-animation-services-usa-transform-brands",
      destination: "/blogs/high-end-3d-animation-services-usa",
      permanent: true,
    },
    {
      source: "/blogs/custom-erp-development-services-usa-sme-operations",
      destination: "/blogs/custom-erp-development-services-usa",
      permanent: true,
    },
    {
      source: "/blogs/automated-recurring-billing-software-usa-cash-flow",
      destination: "/blogs/automated-recurring-billing-software-usa",
      permanent: true,
    },
        ];
    },
};

export default nextConfig;