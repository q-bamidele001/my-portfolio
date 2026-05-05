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
      className="group flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] p-3 sm:p-4 shadow-lg shadow-black/10 hover:border-cyan-300/30 hover:bg-white/[0.075] transition-all duration-300 hover:shadow-cyan-500/10 cursor-pointer"
    >
      {/* Icon rendered by TechIcons — already sized at w-7/w-8 */}
      <div className="text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300">
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
