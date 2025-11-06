'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Code, ExternalLink, Github } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.03 }}
    className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto"
  >
    <div className="relative h-44 sm:h-52 md:h-60 overflow-hidden">
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <Code className="w-16 h-16 sm:w-20 sm:h-20 text-white opacity-60" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
    </div>

    <div className="p-5 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {project.tech.map((tech, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs sm:text-sm hover:bg-blue-500/30 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 text-sm sm:text-base">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
          Live Demo
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <Github className="w-4 h-4 sm:w-5 sm:h-5" />
          Code
        </a>
      </div>
    </div>
  </motion.div>
);
