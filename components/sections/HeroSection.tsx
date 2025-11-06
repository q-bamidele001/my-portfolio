'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { VSCodeTypingEffect } from '@/components/ui/VSCodeTypingEffect';

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative pt-20 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-blue-950/30 to-gray-900 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div className="relative group w-full max-w-md sm:max-w-lg md:max-w-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-3xl opacity-40 group-hover:opacity-70 transition-opacity"></div>

              <motion.div
                className="relative w-full h-[570px] rounded-2xl overflow-hidden border-4 border-blue-500/80 shadow-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 180 }}
              >
                <Image
                  src="/images/bamidelepics.jpg"
                  alt="Ademola's Profile"
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute bottom-3 right-3 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 border-2 border-gray-900 rounded-full shadow-lg animate-pulse" />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800/90 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-blue-500 whitespace-nowrap flex items-center gap-2 backdrop-blur"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-gray-100">
                  Available for Hire
                </span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-10 md:mt-0 flex justify-center md:justify-start"
          >
            <VSCodeTypingEffect />
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 md:mt-20"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Years Experience', value: '2+' },
            { label: 'Projects Completed', value: '10+' },
            { label: 'Technologies', value: '15+' },
            { label: 'Happy Clients', value: '100%' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
              className="bg-gray-800/50 backdrop-blur rounded-lg p-5 text-center hover:bg-gray-800 hover:scale-105 transition-all cursor-pointer border border-gray-700"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-400">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
