'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { Variants } from 'framer-motion';

interface NavigationProps {
  activeSection: string;
  scrollToSection: (section: string) => void;
}

export const Navigation = ({ activeSection, scrollToSection }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['home', 'about', 'skills', 'projects', 'testimonials', 'contact'];

  const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: [0.4, 0.0, 0.2, 1] },
    },
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-gray-950/80 backdrop-blur-xl shadow-2xl shadow-black/25 border-b border-white/10'
        : 'bg-gray-950/55 backdrop-blur-md border-b border-white/[0.04]'
        }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="max-w-[72vw] md:max-w-[28vw] lg:max-w-none truncate text-sm sm:text-lg md:text-xl font-black tracking-[0.08em] sm:tracking-[0.16em] bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent cursor-pointer select-none"
            onClick={() => scrollToSection('home')}
          >
            BAMIDELE ADEMOLA
          </motion.div>

          <div className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 shadow-inner shadow-white/5">
            {navItems.map((section) => (
              <motion.button
                key={section}
                whileHover={{ scale: 1.05 }}
                onClick={() => scrollToSection(section)}
                className={`capitalize relative rounded-full px-2.5 lg:px-3 py-2 text-xs lg:text-sm font-medium transition-all ${activeSection === section
                  ? 'bg-blue-500/15 text-cyan-200 shadow-sm shadow-blue-500/20'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
              >
                {section}
                {activeSection === section && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-cyan-300"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>


          <button
            className="md:hidden rounded-full border border-white/10 bg-white/5 p-2 text-gray-200 hover:border-blue-400/40 hover:text-blue-300 transition-colors"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden border-t border-white/10 bg-gray-950/95 px-4 pt-4 pb-6 space-y-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            {navItems.map((section) => (
              <motion.button
                key={section}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  scrollToSection(section);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl capitalize transition-all duration-200 ${activeSection === section
                  ? 'bg-blue-500/15 text-cyan-200 ring-1 ring-blue-400/20'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
              >
                {section}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
