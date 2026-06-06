'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import dynamic from 'next/dynamic';

// ── Global Components (always needed, load normally) ──────────
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { WhatsAppWidget } from '@/components/ui/WhatsAppWidget';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

// ── Above the fold — load immediately ─────────────────────────
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';

// ── Below the fold — lazy load to reduce initial JS bundle ────
// This is the key fix for "Reduce unused JavaScript (66KB)"
// and "Render-blocking requests (560ms)"
const SkillsSection = dynamic(
  () => import('@/components/sections/SkillsSection').then(m => ({ default: m.SkillsSection })),
  { 
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
);

const ProjectsSection = dynamic(
  () => import('@/components/sections/ProjectsSection').then(m => ({ default: m.ProjectsSection })),
  { 
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
);

const TestimonialsSection = dynamic(
  () => import('@/components/sections/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })),
  { 
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
);

const ContactSection = dynamic(
  () => import('@/components/sections/ContactSection').then(m => ({ default: m.ContactSection })),
  { 
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
);

// ── Lightweight skeleton shown while lazy sections load ───────
const SectionSkeleton = () => (
  <div className="py-20 px-4 flex items-center justify-center min-h-[200px]">
    <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

// ── Animation variants ────────────────────────────────────────
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.35, ease: [0.4, 0.0, 0.2, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sectionIds = ['home', 'about', 'skills', 'projects', 'testimonials', 'contact'];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_34%),linear-gradient(135deg,#030712_0%,#0f172a_45%,#111827_100%)] text-white flex flex-col selection:bg-blue-500/30 selection:text-white">
      <AnimatePresence mode="wait">
        <motion.main
          key="portfolio"
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.6 }}
          className="flex-grow w-full overflow-hidden"
        >
          <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
          <WhatsAppWidget />
          <ScrollToTop />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col"
          >
            {/* ── Above fold — no Suspense needed ── */}
            <motion.section id="home" variants={fadeInUp} viewport={{ once: true, amount: 0.2 }}>
              <HeroSection />
            </motion.section>

            <motion.section id="about" variants={fadeInUp} viewport={{ once: true, amount: 0.2 }}>
              <AboutSection />
            </motion.section>

            {/* ── Below fold — wrapped in Suspense for lazy loading ── */}
            <motion.section id="skills" variants={fadeInUp} viewport={{ once: true, amount: 0.2 }}>
              <Suspense fallback={<SectionSkeleton />}>
                <SkillsSection />
              </Suspense>
            </motion.section>

            <motion.section id="projects" variants={fadeInUp} viewport={{ once: true, amount: 0.2 }}>
              <Suspense fallback={<SectionSkeleton />}>
                <ProjectsSection />
              </Suspense>
            </motion.section>

            <motion.section id="testimonials" variants={fadeInUp} viewport={{ once: true, amount: 0.2 }}>
              <Suspense fallback={<SectionSkeleton />}>
                <TestimonialsSection />
              </Suspense>
            </motion.section>

            <motion.section id="contact" variants={fadeInUp} viewport={{ once: true, amount: 0.2 }}>
              <Suspense fallback={<SectionSkeleton />}>
                <ContactSection />
              </Suspense>
            </motion.section>
          </motion.div>

          <Footer scrollToSection={scrollToSection} />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}