import { MetadataRoute } from 'next';

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

// ── IMPORTANT: This file must be at app/sitemap.ts ──────────
// NOT inside any route group like app/(LandingPage)/sitemap.ts
// NOT in public/ folder
// After deploying, verify at: https://www.bamideleade.com.ng/sitemap.xml
// The URL /sitemap.ts appearing in analytics means someone visited
// the raw file URL — it's harmless but confirms the file is in the right place