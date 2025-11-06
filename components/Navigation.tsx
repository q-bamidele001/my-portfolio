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
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-800'
          : 'bg-gray-900/90 border-b border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent cursor-pointer select-none"
            onClick={() => scrollToSection('home')}
          >
            BAMIDELE ADEMOLA
          </motion.div>

          <div className="hidden md:flex gap-8">
            {navItems.map((section) => (
              <motion.button
                key={section}
                whileHover={{ scale: 1.05 }}
                onClick={() => scrollToSection(section)}
                className={`capitalize relative transition-colors ${activeSection === section
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-blue-400'
                  }`}
              >
                {section}
                {activeSection === section && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <button
            className="md:hidden text-gray-300 hover:text-blue-400 transition-colors"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
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
            className="md:hidden bg-gray-900 border-t border-gray-800 px-4 pt-4 pb-6 space-y-2"
          >
            {navItems.map((section) => (
              <motion.button
                key={section}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  scrollToSection(section);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-lg capitalize transition-all duration-200 ${activeSection === section
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-blue-400'
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
