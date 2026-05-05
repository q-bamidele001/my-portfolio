'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/lib/types';

interface SkillCardProps {
  skill: Skill;
}

export const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.08, rotate: 1 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="group flex flex-col items-center justify-center gap-2 bg-gray-800 rounded-xl p-3 sm:p-4 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer"
    >
      {/* Icon rendered by TechIcons — already sized at w-7/w-8 */}
      <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
        {React.isValidElement(skill.icon)
          ? skill.icon
          : <span>{skill.icon as React.ReactNode}</span>
        }
      </div>

      {/* Name from constants.ts */}
      {skill.name && (
        <p className="text-xs font-medium text-gray-400 group-hover:text-white text-center leading-tight">
          {skill.name}
        </p>
      )}
    </motion.div>
  );
};