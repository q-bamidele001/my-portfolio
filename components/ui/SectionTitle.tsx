'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  icon: React.ElementType;
  title: string;
}

export const SectionTitle = ({ icon: Icon, title }: SectionTitleProps) => (
  <motion.div
    className="flex min-w-0 items-center gap-3 sm:gap-4 mb-8 sm:mb-10"
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    viewport={{ once: true }}
  >
    <motion.div
      whileHover={{ rotate: 15, scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 shadow-lg shadow-blue-500/10"
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300 drop-shadow-md" />
    </motion.div>
    <h2 className="min-w-0 break-words text-2xl sm:text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-cyan-200 via-blue-300 to-violet-300 bg-clip-text text-transparent">
      {title}
    </h2>
  </motion.div>
);
