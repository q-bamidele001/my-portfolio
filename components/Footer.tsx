'use client';
import { motion } from 'framer-motion';

interface FooterProps {
  scrollToSection: (section: string) => void;
}

export const Footer = ({ scrollToSection }: FooterProps) => {
  const currentYear = new Date().getFullYear(); // Dynamic year

  return (
    <footer className="bg-gray-950/80 border-t border-white/10 py-10 sm:py-12 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <h3 className="break-words text-lg sm:text-xl font-black tracking-wide bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent mb-2">
              BAMIDELE ADEMOLA
            </h3>
            <p className="text-gray-400 text-sm">
              Full Stack Developer specializing in building exceptional digital experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <div className="space-y-2">
              {['home', 'about', 'skills', 'testimonials', 'projects', 'contact'].map((section, i) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block text-gray-400 hover:text-cyan-300 transition-colors capitalize"
                  whileHover={{ x: 5, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 250 }}
                >
                  {section}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-3">Connect</h4>
            <div className="space-y-2 text-gray-400">
              <motion.a
                href="mailto:Q.bamidele001@gmail.com"
                className="block break-words hover:text-cyan-300 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Q.bamidele001@gmail.com
              </motion.a>
              <motion.a
                href="tel:+2347087121063"
                className="block hover:text-cyan-300 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                +234 708 712 1063
              </motion.a>
              <p>Apata, Ibadan, Nigeria</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center text-gray-400 pt-8 border-t border-white/10 px-4 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs sm:text-sm md:text-base leading-relaxed">
            © {currentYear} Bamidele Ademola. Crafted with 💙 and ⚛️ React
          </p>

          <motion.p
            className="text-[10px] sm:text-xs md:text-sm mt-2 tracking-wide text-gray-300"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Full Stack Developer | Cybersecurity Expert | Cloud Engineer
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};
