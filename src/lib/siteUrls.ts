// Central place for the subdomain URLs used across the site.
// Override per environment with NEXT_PUBLIC_PRODUCTS_URL / NEXT_PUBLIC_TURNITIN_URL
// (e.g. http://products.localhost:3000 for local testing).
export const MAIN_URL = process.env.NEXT_PUBLIC_MAIN_URL ?? 'https://www.blackzero.org';
export const PRODUCTS_URL = process.env.NEXT_PUBLIC_PRODUCTS_URL ?? 'https://products.blackzero.org';
export const TURNITIN_URL = process.env.NEXT_PUBLIC_TURNITIN_URL ?? 'https://turnitin.blackzero.org';

export const productUrl = (slug: string) => `${PRODUCTS_URL}/${slug}`;