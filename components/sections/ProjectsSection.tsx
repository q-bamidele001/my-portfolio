'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Github } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ProjectCard } from '@/components/ui/ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
}

// ── Skeleton shown while fetching ──────────────────────────────
const ProjectSkeleton = () => (
  <div className="bg-[#0f1629]/95 rounded-2xl overflow-hidden border border-white/10 animate-pulse">
    <div className="h-52 bg-gray-800/60" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-gray-700/60 rounded w-3/4" />
      <div className="h-4 bg-gray-700/60 rounded w-full" />
      <div className="h-4 bg-gray-700/60 rounded w-5/6" />
      <div className="flex gap-2 pt-1">
        <div className="h-5 bg-gray-700/60 rounded-full w-16" />
        <div className="h-5 bg-gray-700/60 rounded-full w-20" />
        <div className="h-5 bg-gray-700/60 rounded-full w-14" />
      </div>
    </div>
  </div>
);

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) setProjects(data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 bg-gray-950/35 backdrop-blur-md border-y border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle icon={Code} title="Featured Projects" />

        {/* Skeleton while loading */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mt-8">
            {[...Array(3)].map((_, i) => <ProjectSkeleton key={i} />)}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No projects yet.</div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden:   { opacity: 0, y: 30 },
                  visible:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
                }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  priority={index === 0} // ← first card loads eagerly (fixes LCP)
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* GitHub CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="https://github.com/q-bamidele001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-5 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold shadow-xl shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40 hover:from-blue-600 hover:to-violet-700"
          >
            <Github className="w-5 h-5" />
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};