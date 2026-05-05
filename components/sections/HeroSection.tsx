'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { VSCodeTypingEffect } from '@/components/ui/VSCodeTypingEffect';

const CAREER_START_YEAR = 2023;
const BASE_PROJECTS     = 10;
const PROJECTS_PER_YEAR = 0;

function getDynamicStats() {
  const currentYear  = new Date().getFullYear();
  const yearsElapsed = currentYear - CAREER_START_YEAR;
  const projects     = BASE_PROJECTS + yearsElapsed * PROJECTS_PER_YEAR;
  return [
    { label: 'Years Experience',   value: `${yearsElapsed}+` },
    { label: 'Projects Completed', value: `${projects}+`     },
    { label: 'Technologies',       value: '20+'              },
    { label: 'Happy Clients',      value: '100%'             },
  ];
}

export const HeroSection = () => {
  const stats = getDynamicStats();

  return (
    <section
      id="home"
      className="relative pt-20 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-blue-950/30 to-gray-900 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">

        {/*
          ── Two-column grid ──
          Mobile:  single column, image on top, editor below
          Desktop: two equal columns side by side, vertically centred
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 lg:gap-12 items-center">

          {/* ── LEFT: Profile image ── */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div className="relative group w-full max-w-[300px] sm:max-w-[340px] md:max-w-full">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

              {/* Image — height is responsive: shorter on mobile, taller on desktop */}
              <motion.div
                className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden border-4 border-blue-500/70 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 180 }}
              >
                <Image
                  src="/images/bamidele01.jpg"
                  alt="Bamidele Ademola"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="object-cover object-top"
                />
                {/* Online dot */}
                <div className="absolute bottom-3 right-3 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full shadow-lg animate-pulse" />
              </motion.div>

              {/* Available badge */}
              <motion.div
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-gray-800/95 px-4 py-1.5 rounded-full border border-blue-500/80 whitespace-nowrap flex items-center gap-2 backdrop-blur shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                <span className="text-xs font-semibold text-gray-100 tracking-wide">
                  Available for Hire
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* ── RIGHT: VSCode editor ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
            viewport={{ once: true }}
            // mt-8 gives space below the badge on mobile; removed on md+
            className="mt-8 sm:mt-10 md:mt-0 flex items-center justify-center"
          >
            <VSCodeTypingEffect />
          </motion.div>
        </div>

        {/* ── Stats row ── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mt-14 sm:mt-16 md:mt-20"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden:  { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative bg-gray-800/50 backdrop-blur rounded-xl p-4 sm:p-5 text-center border border-gray-700 hover:border-blue-500/40 hover:bg-gray-800/80 transition-all cursor-default overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 rounded-xl" />
              <div className="relative">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 leading-tight">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};