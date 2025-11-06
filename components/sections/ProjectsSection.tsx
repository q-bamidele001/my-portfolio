'use client';
import { motion } from 'framer-motion';
import { Code, Github } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projects } from '@/lib/constants';

export const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle icon={Code} title="Featured Projects" />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <a
            href="https://github.com/q-bamidele001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40"
          >
            <Github className="w-5 h-5" />
            <span>View All Projects on GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
