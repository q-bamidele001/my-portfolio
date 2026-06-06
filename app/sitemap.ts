import { MetadataRoute } from 'next';

// ✅ This file MUST be in app/sitemap.ts (not app/sitemap.xml)
// Next.js converts it automatically to /sitemap.xml
// Make sure you do NOT have a public/sitemap.xml file — delete it if so

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.bamideleade.com.ng',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}