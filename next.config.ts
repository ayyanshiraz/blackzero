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
        ];
    },
};

export default nextConfig;