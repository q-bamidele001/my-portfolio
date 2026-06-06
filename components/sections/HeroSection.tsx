'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { VSCodeTypingEffect } from '@/components/ui/VSCodeTypingEffect';

const CAREER_START_YEAR = 2023;
const BASE_PROJECTS = 10;
const PROJECTS_PER_YEAR = 0;

function getDynamicStats() {
  const currentYear = new Date().getFullYear();
  const yearsElapsed = currentYear - CAREER_START_YEAR;
  const projects = BASE_PROJECTS + yearsElapsed * PROJECTS_PER_YEAR;
  return [
    { label: 'Years Experience', value: `${yearsElapsed}+` },
    { label: 'Projects Completed', value: `${projects}+` },
    { label: 'Technologies', value: '20+' },
    { label: 'Happy Clients', value: '100%' },
  ];
}

export const HeroSection = () => {
  const stats = getDynamicStats();

  return (
    <section
      id="home"
      className="relative pt-24 sm:pt-28 pb-16 sm:pb-20 px-3 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,0.15),rgba(15,23,42,0.6)_54%,rgba(17,24,39,0.95))] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">

        <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-10 sm:gap-12 md:gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Profile image ── */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div className="relative group w-full max-w-[82vw] min-[380px]:max-w-[300px] sm:max-w-[360px] md:max-w-full">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-violet-500/30 rounded-[2rem] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

              {/* ✅ FIXED: explicit width/height prevents CLS, priority loads eagerly */}
              <motion.div
                className="relative w-full aspect-[4/5] min-h-[260px] max-h-[340px] sm:max-h-[400px] md:h-[480px] md:max-h-none lg:h-[520px] rounded-[1.5rem] overflow-hidden border border-white/15 shadow-2xl shadow-black/40 ring-1 ring-blue-400/20"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 180 }}
              >

                <Image
                  src="/images/bamidele01.jpg"
                  alt="Bamidele Ademola — Full Stack Developer"
                  fill
                  priority          // ← keeps eager loading
                  sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, 45vw"
                  className="object-cover object-top"
                  quality={85}      // ← reduces file size ~30% with no visible difference
                  placeholder="blur"                    // ← shows a blurred preview instantly
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EACEQAAIBBAMBAQAAAAAAAAAAAAECAwQFERIhMUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Amm6k4bW8lLuMbhI45VbxLe0PBAIPgg9xpNkttJi4VFpPJLHEoRXkYMxAGBk+TjQaKUpX/9k="
                // ↑ This tiny base64 blur placeholder shows immediately while image loads
                // It eliminates the "white flash" on mobile slow connections
                />
                {/* Online dot */}
                <div className="absolute bottom-4 right-4 w-4 h-4 bg-emerald-400 border-2 border-gray-950 rounded-full shadow-lg shadow-emerald-500/40 animate-pulse" />
              </motion.div>

              {/* Available badge */}
              <motion.div
                className="absolute -bottom-5 left-1/2 max-w-[92vw] -translate-x-1/2 bg-gray-950/90 px-4 py-2 rounded-full border border-cyan-300/30 whitespace-nowrap flex items-center gap-2 backdrop-blur-xl shadow-xl shadow-black/30"
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
            className="mt-8 sm:mt-10 md:mt-0 flex items-center justify-center"
          >
            <VSCodeTypingEffect />
          </motion.div>
        </div>

        {/* ── Stats row ── */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-12 sm:mt-16 md:mt-20"
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
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative min-h-24 bg-white/[0.045] backdrop-blur rounded-2xl p-3 sm:p-5 text-center border border-white/10 hover:border-cyan-300/35 hover:bg-white/[0.075] transition-all cursor-default overflow-hidden group shadow-lg shadow-black/10"
            >
              {/* Top shimmer line on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-cyan-300 mb-1">
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