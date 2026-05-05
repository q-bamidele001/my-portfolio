'use client';
import React from 'react';
import { Mail, Phone, MapPin, Download, Github, Linkedin, Code } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ContactForm } from '@/components/ui/ContactForm';
import { motion } from 'framer-motion';

export const ContactSection = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto overflow-hidden">
        <SectionTitle icon={Mail} title="Get In Touch" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight">Let's Build Something Amazing</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  href: 'mailto:Q.bamidele001@gmail.com',
                  icon: Mail,
                  color: 'text-blue-400',
                  label: 'Email',
                  value: 'Q.bamidele001@gmail.com',
                },
                {
                  href: 'tel:+2347087121063',
                  icon: Phone,
                  color: 'text-green-400',
                  label: 'Phone',
                  value: '+234 708 712 1063',
                },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  className="flex min-w-0 items-center gap-3 sm:gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-3 sm:p-4 hover:border-blue-300/25 hover:bg-white/[0.075] transition-all group hover:scale-105 shadow-lg shadow-black/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform`} />
                  <div className="min-w-0">
                    <div className="text-sm text-gray-400">{item.label}</div>
                    <div className="break-words font-medium">{item.value}</div>
                  </div>
                </motion.a>
              ))}

              <motion.div
                className="flex min-w-0 items-center gap-3 sm:gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-3 sm:p-4 shadow-lg shadow-black/10"
                whileHover={{ scale: 1.03 }}
              >
                <MapPin className="w-6 h-6 text-red-400" />
                <div className="min-w-0">
                  <div className="text-sm text-gray-400">Location</div>
                  <div className="font-medium">Apata, Ibadan, Nigeria</div>
                </div>
              </motion.div>

              <motion.a
                href="images/Bamidele-AdemolaCv.pdf"
                download
                className="flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 rounded-2xl p-3 sm:p-4 transition-all group hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
                whileHover={{ scale: 1.07 }}
              >
                <Download className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-sm text-white/80">Resume</div>
                  <div className="font-semibold text-white">Download CV</div>
                </div>
              </motion.a>
            </div>

            <motion.div
              className="flex flex-wrap gap-3 sm:gap-4 pt-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {[
                { href: 'https://github.com/q-bamidele001', icon: Github, color: 'hover:bg-blue-600' },
                { href: 'https://linkedin.com/in/bamidele-quayum', icon: Linkedin, color: 'hover:bg-blue-600' },
                { href: 'https://bamideleademola.dev', icon: Code, color: 'hover:bg-purple-600' },
              ].map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-11 h-11 sm:w-12 sm:h-12 bg-white/[0.055] border border-white/10 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-black/10 ${link.color}`}
                  whileHover={{ rotate: 8 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <link.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.045] p-4 sm:p-6 shadow-2xl shadow-black/20 ring-1 ring-blue-400/10"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h3 className="text-xl font-bold mb-4">Send Me a Message</h3>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
