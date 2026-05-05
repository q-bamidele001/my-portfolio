'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  const [hovered, setHovered] = useState(false);

  const accents = [
    { border: 'from-blue-500 to-cyan-400',    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',       arrow: 'text-blue-400'    },
    { border: 'from-purple-500 to-pink-500',  badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30', arrow: 'text-purple-400'  },
    { border: 'from-emerald-500 to-teal-400', badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', arrow: 'text-emerald-400' },
    { border: 'from-orange-500 to-amber-400', badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30', arrow: 'text-orange-400'  },
    { border: 'from-rose-500 to-pink-400',    badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30',       arrow: 'text-rose-400'    },
    { border: 'from-sky-500 to-blue-400',     badge: 'bg-sky-500/20 text-sky-400 border-sky-500/30',         arrow: 'text-sky-400'     },
  ];
  const accent = accents[index % accents.length];

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="relative group w-full"
    >
      {/* Gradient border glow on hover */}
      <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${accent.border} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]`} />

      <div className="relative bg-[#0f1629] rounded-2xl overflow-hidden border border-white/5 shadow-xl shadow-black/40 flex flex-col h-full">

        {/* ── Image + overlay ── */}
        <div className="relative h-48 sm:h-52 overflow-hidden flex-shrink-0">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`}
              priority={false}
            />
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${accent.border} flex items-center justify-center`}>
              <Code className="w-16 h-16 text-white opacity-40" />
            </div>
          )}

          {/* Dark gradient at bottom of image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1629] via-[#0f1629]/40 to-transparent" />

          {/* Hover overlay with action buttons */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center gap-4"
              >
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg text-sm font-semibold hover:bg-white/20 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source
                  </motion.a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-1 p-5 sm:p-6">

          {/* Title + arrow */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
              {project.title}
            </h3>
            <ArrowUpRight className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-all duration-300 ${hovered ? accent.arrow + ' translate-x-0.5 -translate-y-0.5' : 'text-gray-600'}`} />
          </div>

          {/* ✅ Full description — no line-clamp */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* Divider */}
          <div className={`h-px w-full bg-gradient-to-r ${accent.border} opacity-20 mb-4`} />

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 5).map((tech, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${accent.badge} transition-colors`}
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border border-white/10 text-gray-500">
                +{project.tech.length - 5}
              </span>
            )}
          </div>

          {/* Footer links */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};