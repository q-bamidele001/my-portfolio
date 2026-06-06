import { MetadataRoute } from 'next';

// ✅ This file MUST be in app/robots.ts (not public/robots.txt)
// Next.js converts it automatically to /robots.txt
// Make sure you do NOT have a public/robots.txt file — delete it if so

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
    ],
    sitemap: 'https://www.bamideleade.com.ng/sitemap.xml',
  };
}