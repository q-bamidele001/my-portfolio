'use client';
import React from 'react';
import { Mail, Phone, MapPin, Download, Github, Linkedin, Code } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ContactForm } from '@/components/ui/ContactForm';
import { motion } from 'framer-motion';

export const ContactSection = () => {
  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionTitle icon={Mail} title="Get In Touch" />

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing</h3>
              <p className="text-gray-400 mb-6">
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
                  className="flex items-center gap-4 bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-all group hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform`} />
                  <div>
                    <div className="text-sm text-gray-400">{item.label}</div>
                    <div className="font-medium">{item.value}</div>
                  </div>
                </motion.a>
              ))}

              <motion.div
                className="flex items-center gap-4 bg-gray-800 rounded-lg p-4"
                whileHover={{ scale: 1.03 }}
              >
                <MapPin className="w-6 h-6 text-red-400" />
                <div>
                  <div className="text-sm text-gray-400">Location</div>
                  <div className="font-medium">Apata, Ibadan, Nigeria</div>
                </div>
              </motion.div>

              <motion.a
                href="images/Bamidele-AdemolaCv.pdf"
                download
                className="flex items-center gap-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg p-4 transition-all group hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
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
              className="flex gap-4 pt-4"
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
                  className={`w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transition-all hover:scale-110 ${link.color}`}
                  whileHover={{ rotate: 8 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <link.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-blue-500/20"
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
