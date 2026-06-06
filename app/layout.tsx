import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // ← fixes FCP (prevents invisible text during font load)
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bamidele Ademola | Full Stack Developer & Cybersecurity Expert',
  description:
    'Full Stack Developer specializing in Next.js, React, TypeScript, Node.js, MongoDB and Cloud Infrastructure. Available for freelance projects worldwide.',
  keywords: [
    'Full Stack Developer',
    'Next.js Developer',
    'React Developer',
    'TypeScript',
    'Node.js',
    'MongoDB',
    'Freelance Developer Nigeria',
    'Cybersecurity',
    'Cloud Engineer',
    'Bamidele Ademola',
  ],
  authors: [{ name: 'Bamidele Ademola', url: 'https://www.bamideleade.com.ng' }],
  creator: 'Bamidele Ademola',
  metadataBase: new URL('https://www.bamideleade.com.ng'),

  // ── OpenGraph (LinkedIn, WhatsApp, Facebook previews) ──────────
  openGraph: {
    type: 'website',
    url: 'https://www.bamideleade.com.ng',
    siteName: 'Bamidele Ademola Portfolio',
    title: 'Bamidele Ademola | Full Stack Developer & Cybersecurity Expert',
    description:
      'Building secure, scalable web & mobile applications with Next.js, React, TypeScript, Node.js and AWS. Available for freelance projects worldwide.',
    images: [
      {
        // ✅ Use /og-image.jpg — a 1200×630px compressed version of your photo
        // Export from your phone at 1200×630, compress at tinypng.com < 600KB
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bamidele Ademola — Full Stack Developer & Cybersecurity Expert',
      },
    ],
    locale: 'en_US',
  },

  // ── Twitter / X card ───────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Bamidele Ademola | Full Stack Developer & Cybersecurity Expert',
    description:
      'Building secure, scalable web & mobile applications. Available for freelance projects worldwide.',
    images: ['/images/og-image.jpg'],
  },

  // ── Canonical & robots ─────────────────────────────────────────
  alternates: {
    canonical: 'https://www.bamideleade.com.ng',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/*
          Preload hero image with high fetch priority.
          Forces browser to download the image before CSS blocks render.
          This directly fights the render-blocking LCP issue on mobile.
        */}
        <link
          rel="preload"
          href="/images/bamidele01.jpg"
          as="image"
          type="image/jpeg"
          // @ts-ignore
          fetchpriority="high"
        />
        {/*
          Preconnect to Cloudinary so project images load faster.
          Saves ~150ms on mobile by establishing the connection early.
        */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}