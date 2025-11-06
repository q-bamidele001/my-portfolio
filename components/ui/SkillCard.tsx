'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/lib/types';

interface SkillCardProps {
  skill: Skill;
}

export const SkillCard = ({ skill }: SkillCardProps) => {
  const injectedClass =
    'w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110';

  const iconElement = React.isValidElement(skill.icon)
    ? React.cloneElement(skill.icon, { className: injectedClass } as any)
    : 
      <span className={injectedClass}>{skill.icon as React.ReactNode}</span>;

  return (
    <motion.div
      whileHover={{ scale: 1.07, rotate: 1 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="group flex flex-col items-center justify-center bg-gray-800 rounded-xl p-5 sm:p-6 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer"
    >
      <div className="mb-3 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
        {iconElement}
      </div>
      <p className="text-sm sm:text-base font-medium text-gray-300 group-hover:text-white text-center">
        {skill.name}
      </p>
    </motion.div>
  );
};
