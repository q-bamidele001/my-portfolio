'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Shield, Cloud, Server, ArrowUpRight } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';

// ✅ Simple reusable inline prop helper — no variants, no spread, no errors
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

export const AboutSection = () => {
  const expertise = [
    { icon: Code,   label: 'Full Stack Development',          desc: 'React · Next.js · Node · Vue'  },
    { icon: Shield, label: 'Cybersecurity & Ethical Hacking', desc: 'Pen Testing · Security Audits'  },
    { icon: Cloud,  label: 'Cloud Engineering',               desc: 'AWS · Azure · Vercel'           },
    { icon: Server, label: 'IT Infrastructure',               desc: 'Network Admin · DevOps · CI/CD' },
  ];

  return (
    <section
      id="about"
      className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 bg-gray-950/35 backdrop-blur-md border-y border-white/[0.06] overflow-hidden"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <SectionTitle icon={Terminal} title="About Me" />

        {/* ── Bio ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-8 sm:mt-10 mb-12 sm:mb-16 max-w-3xl space-y-5"
        >
          <div className="inline-flex max-w-full items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-semibold text-blue-400 tracking-wide">
              Available for projects
            </span>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-gray-100 leading-relaxed font-medium">
            Results-driven Software Engineer specializing in{' '}
            <span className="text-blue-400">Full Stack Web & Mobile Development</span>{' '}
            with a passion for building secure, high-performance digital products.
          </p>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            I leverage modern technologies like{' '}
            <span className="text-blue-400 font-medium">React.js</span>,{' '}
            <span className="text-blue-400 font-medium">Next.js</span>,{' '}
            <span className="text-blue-400 font-medium">Vue.js</span> and{' '}
            <span className="text-blue-400 font-medium">React Native</span>{' '}
            to craft seamless experiences. From backend architecture to cloud infrastructure
            and cybersecurity, I deliver scalable, production-ready solutions that last.
          </p>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            My work philosophy blends{' '}
            <span className="text-green-400 font-medium">clean architecture</span>,{' '}
            <span className="text-yellow-400 font-medium">security best practices</span>, and{' '}
            <span className="text-purple-400 font-medium">performance optimization</span>{' '}
            — because great software should be fast, secure, and maintainable.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group"
          >
            Let's work together
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* ── Expertise Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
          className="mb-12 sm:mb-16"
        >
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-5">
            Core Expertise
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {expertise.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative bg-white/[0.045] border border-white/[0.08] rounded-2xl p-4 sm:p-5 overflow-hidden cursor-default shadow-lg shadow-black/10 hover:bg-white/[0.07] hover:shadow-blue-500/10 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-400/10 border border-cyan-300/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-white leading-tight">
                    {item.label}
                  </h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed sm:pl-12">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Education + Experience ── */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="bg-white/[0.045] border border-blue-400/15 rounded-2xl p-5 sm:p-6 h-full hover:border-blue-400/35 hover:bg-white/[0.07] shadow-xl shadow-black/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-lg">
                  🎓
                </div>
                <h3 className="text-base sm:text-lg font-bold text-blue-400">Education</h3>
              </div>
              <div className="space-y-5">
                {[
                  {
                    degree: 'ICT Professional Diploma',
                    school: 'SQI College of ICT',
                    period: '2023 – 2024',
                    detail: 'Full Stack Development & Cybersecurity',
                  },
                  {
                    degree: 'B.Sc. Computer Science',
                    school: 'Ekiti State University',
                    period: '2012 – 2017',
                    detail: '',
                  },
                ].map((edu, i) => (
                  <div key={i} className="relative pl-4 border-l-2 border-blue-500/30">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-blue-500" />
                    <div className="text-sm sm:text-base font-semibold text-white">{edu.degree}</div>
                    <div className="text-xs sm:text-sm text-blue-400/80 mt-0.5">{edu.school}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{edu.period}</div>
                    {edu.detail && (
                      <div className="text-xs text-gray-500 mt-0.5">{edu.detail}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="bg-white/[0.045] border border-violet-400/15 rounded-2xl p-5 sm:p-6 h-full hover:border-violet-400/35 hover:bg-white/[0.07] shadow-xl shadow-black/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-lg">
                  💼
                </div>
                <h3 className="text-base sm:text-lg font-bold text-purple-400">Experience</h3>
              </div>
              <div className="relative pl-4 border-l-2 border-purple-500/30">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-purple-500" />
                <div className="text-sm sm:text-base font-semibold text-white">
                  Software Engineer & Full Stack Developer
                </div>
                <div className="inline-flex items-center gap-1.5 mt-1 mb-3">
                  <span className="text-xs text-purple-400/80">Freelance</span>
                  <span className="text-gray-600">·</span>
                  <span className="text-xs text-gray-500">2023 – Present</span>
                </div>
                <ul className="space-y-2">
                  {[
                    'Developed responsive web apps with 75% faster load times',
                    'Built cross-platform mobile applications',
                    'Implemented secure RESTful APIs and authentication',
                    'Deployed scalable cloud infrastructure on AWS',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500/60 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
