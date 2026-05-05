'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Shield } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SkillCard } from '@/components/ui/SkillCard';
import { skills, securitySkills } from '@/lib/constants';

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 bg-gray-950/25 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <SectionTitle icon={Code} title="Technologies & Skills" />

        <div className="mb-12 sm:mb-16">
          <h3 className="text-xl md:text-2xl font-bold mb-8 text-cyan-300 text-center md:text-left">
            Development Stack
          </h3>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-5 lg:gap-6"
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
          className="bg-white/[0.045] rounded-2xl p-6 sm:p-8 md:p-10 border border-red-400/15 shadow-2xl shadow-black/20 hover:border-red-400/35 hover:bg-white/[0.065] transition-all"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-6">
            <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-2">
              <Shield className="w-6 h-6 text-red-300" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-red-300">Cybersecurity Expertise</h3>
          </div>

          <p className="text-gray-300 mb-8 text-sm md:text-base leading-relaxed">
            As an ethical hacker and cybersecurity professional, I specialize in identifying vulnerabilities,
            securing infrastructure, and implementing robust security measures to protect digital assets.
          </p>

          <motion.div
            className="grid grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {securitySkills.map((skill, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-red-500/10 border border-red-400/20 rounded-xl px-4 py-3 text-center text-sm md:text-base text-gray-200 hover:bg-red-400/15 hover:border-red-300/40 hover:text-red-200 transition-all cursor-pointer shadow-sm shadow-black/10"
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
