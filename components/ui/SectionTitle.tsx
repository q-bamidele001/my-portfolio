'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  icon: React.ElementType;
  title: string;
}

export const SectionTitle = ({ icon: Icon, title }: SectionTitleProps) => (
  <motion.div
    className="flex items-center gap-3 sm:gap-4 mb-8"
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    viewport={{ once: true }}
  >
    <motion.div
      whileHover={{ rotate: 15, scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="flex items-center justify-center"
    >
      <Icon className="w-7 h-7 sm:w-9 sm:h-9 text-blue-500 drop-shadow-md" />
    </motion.div>
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
      {title}
    </h2>
  </motion.div>
);
