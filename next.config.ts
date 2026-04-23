import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    trailingSlash: false, // This automatically redirects /about/ to /about
    
    // Server Actions configuration for file uploads up to 50MB
    experimental: {
        serverActions: {
            bodySizeLimit: 52428800, // 50MB limit for file uploads
        },
    },

    async redirects() {
        return [
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