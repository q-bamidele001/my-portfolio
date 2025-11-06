'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Shield, Cloud, Server } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';

export const AboutSection = () => {
  const expertise = [
    { icon: Code, text: 'Full Stack Development' },
    { icon: Shield, text: 'Cybersecurity & Ethical Hacking' },
    { icon: Cloud, text: 'Cloud Engineering (AWS/Azure)' },
    { icon: Server, text: 'IT Infrastructure & Network Admin' },
  ];

  return (
    <section
      id="about"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/60 backdrop-blur-md border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle icon={Terminal} title="About Me" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8"
        >
          <div className="space-y-3 sm:space-y-4 text-gray-300 leading-relaxed">
            <p className="text-base sm:text-lg md:text-xl text-gray-200">
              Results-driven Software Engineer specializing in Full Stack Web & Mobile Development with a passion for
              building secure, high-performance digital products.
            </p>
            <p className="text-sm sm:text-base md:text-lg">
              I leverage modern technologies like <span className="text-blue-400">React.js</span>,{' '}
              <span className="text-blue-400">Next.js</span>, and{' '}
              <span className="text-blue-400">React Native</span> to create seamless experiences. From backend
              architecture to cloud infrastructure and cybersecurity, I deliver scalable, production-ready solutions.
            </p>
            <p className="text-sm sm:text-base md:text-lg">
              My work philosophy blends <span className="text-green-400">clean architecture</span>,{' '}
              <span className="text-yellow-400">security best practices</span>, and{' '}
              <span className="text-purple-400">performance optimization</span> to produce applications that last.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-800/70 rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-700 hover:border-blue-500/40 shadow-xl transition-all"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-5 sm:mb-6 text-blue-400">
              Expertise Areas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {expertise.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  <span className="text-sm sm:text-base">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-12 sm:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-5 sm:p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 text-blue-400">
              <span className="text-xl sm:text-2xl">🎓</span> Education
            </h3>
            <div className="space-y-4 sm:space-y-5">
              <div>
                <div className="font-semibold text-blue-400 text-sm sm:text-base">ICT Professional Diploma</div>
                <div className="text-xs sm:text-sm text-gray-400">SQI College of ICT (2024 - 2025)</div>
                <div className="text-xs sm:text-sm text-gray-500">Full Stack Development & Cybersecurity</div>
              </div>
              <div>
                <div className="font-semibold text-blue-400 text-sm sm:text-base">B.Sc. Computer Science</div>
                <div className="text-xs sm:text-sm text-gray-400">Ekiti State University (2012 - 2017)</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-5 sm:p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 text-purple-400">
              <span className="text-xl sm:text-2xl">💼</span> Experience
            </h3>
            <div>
              <div className="font-semibold text-purple-400 text-sm sm:text-base">
                Software Engineer & Full Stack Developer
              </div>
              <div className="text-xs sm:text-sm text-gray-400 mb-2">Freelance | 2024 - 2025</div>
              <ul className="text-xs sm:text-sm text-gray-300 space-y-1 list-disc list-inside">
                <li>Developed responsive web apps with 75% faster load times</li>
                <li>Built cross-platform mobile applications</li>
                <li>Implemented secure RESTful APIs and authentication</li>
                <li>Deployed scalable cloud infrastructure on AWS</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
