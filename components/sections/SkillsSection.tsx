'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Shield } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SkillCard } from '@/components/ui/SkillCard';
import { skills, securitySkills } from '@/lib/constants';

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <SectionTitle icon={Code} title="Technologies & Skills" />

        <div className="mb-16">
          <h3 className="text-xl md:text-2xl font-semibold mb-8 text-blue-400 text-center md:text-left">
            Development Stack
          </h3>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-2xl p-8 md:p-10 border border-red-500/20 shadow-lg hover:border-red-500/40 transition-all"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-red-400" />
            <h3 className="text-2xl md:text-3xl font-bold text-red-400">Cybersecurity Expertise</h3>
          </div>

          <p className="text-gray-300 mb-8 text-sm md:text-base leading-relaxed">
            As an ethical hacker and cybersecurity professional, I specialize in identifying vulnerabilities,
            securing infrastructure, and implementing robust security measures to protect digital assets.
          </p>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {securitySkills.map((skill, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-3 text-center text-sm md:text-base text-gray-200 hover:bg-red-900/30 hover:text-red-300 transition-all cursor-pointer"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
