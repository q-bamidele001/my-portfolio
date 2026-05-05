'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderKanban, 
  MessageSquare, 
  LogOut,
  TrendingUp,
  Users,
  Star
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTestimonials: 0,
    pendingTestimonials: 0,
    averageRating: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, testimonialsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/testimonials'),
      ]);

      const projectsData = await projectsRes.json();
      const testimonialsData = await testimonialsRes.json();

      const totalRating = testimonialsData.testimonials?.reduce(
        (sum: number, t: any) => sum + t.rating, 
        0
      ) || 0;
      const avgRating = testimonialsData.testimonials?.length 
        ? (totalRating / testimonialsData.testimonials.length).toFixed(1)
        : 0;

      setStats({
        totalProjects: projectsData.projects?.length || 0,
        totalTestimonials: testimonialsData.testimonials?.length || 0,
        pendingTestimonials: 0, // You can add this logic later
        averageRating: Number(avgRating),
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-blue-400" />
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Manage your portfolio content</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500 text-red-400 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Total Projects',
              value: stats.totalProjects,
              icon: FolderKanban,
              color: 'blue',
              gradient: 'from-blue-500 to-cyan-500',
            },
            {
              label: 'Testimonials',
              value: stats.totalTestimonials,
              icon: MessageSquare,
              color: 'purple',
              gradient: 'from-purple-500 to-pink-500',
            },
            {
              label: 'Average Rating',
              value: `${stats.averageRating} ⭐`,
              icon: Star,
              color: 'yellow',
              gradient: 'from-yellow-500 to-orange-500',
            },
            {
              label: 'Active Status',
              value: 'Live',
              icon: TrendingUp,
              color: 'green',
              gradient: 'from-green-500 to-emerald-500',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.gradient} bg-opacity-20`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-blue-400" />
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/admin/projects')}
              className="flex items-center gap-4 p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl hover:border-blue-500/50 transition-all"
            >
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <FolderKanban className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">Manage Projects</h3>
                <p className="text-sm text-gray-400">Add, edit or delete projects</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/admin/testimonials')}
              className="flex items-center gap-4 p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl hover:border-purple-500/50 transition-all"
            >
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <MessageSquare className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">Manage Testimonials</h3>
                <p className="text-sm text-gray-400">Review and manage testimonials</p>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Back to Site */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => router.push('/')}
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
          >
            ← Back to Portfolio Site
          </button>
        </motion.div>
      </div>
    </div>
  );
}