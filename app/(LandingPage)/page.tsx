
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// Global Components
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { WhatsAppWidget } from '@/components/ui/WhatsAppWidget';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

// Section Components
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
    },
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
    transition: {
      staggerChildren: 0.15,
    },
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
    const sectionIds = ['home', 'about', 'skills', 'testimonials', 'projects', 'contact'];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 text-white flex flex-col">
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

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col">
            <motion.section id="home" variants={fadeInUp} viewport={{ once: true, amount: 0.2 }}>
              <HeroSection />
            </motion.section>

            <motion.section id="about" variants={fadeInUp} viewport={{ once: true, amount: 0.2 }}>
              <AboutSection />
            </motion.section>

            <motion.section id="skills" variants={fadeInUp} viewport={{ once: true, amount: 0.2 }}>
              <SkillsSection />
            </motion.section>

            <motion.section id="projects" variants={fadeInUp} viewport={{ once: true, amount: 0.2 }}>
              <ProjectsSection />
            </motion.section>

            <motion.section id="testimonials" variants={fadeInUp} viewport={{ once: true, amount: 0.2 }}>
              <TestimonialsSection />
            </motion.section>

            <motion.section id="contact" variants={fadeInUp} viewport={{ once: true, amount: 0.2 }}>
              <ContactSection />
            </motion.section>
          </motion.div>

          <Footer scrollToSection={scrollToSection} />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
