'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { TestimonialForm } from '@/components/ui/TestimonialForm';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  feedback: string;
  project: string;
  date: string;
  displayDate?: string | null;
}

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) setTestimonials(data.testimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = {
    totalProjects: testimonials.length > 0 ? '10+' : '0',
    happyClients: testimonials.length > 0 ? `${testimonials.length}+` : '0',
    avgRating: testimonials.length > 0
      ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
      : '0.0',
  };

  const loopedTestimonials = testimonials.length > 0
    ? [...testimonials, ...testimonials, ...testimonials]
    : [];

  return (
    <>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          animation: marquee 30s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover { animation-play-state: paused; }
        @media (max-width: 640px) {
          .marquee-track { animation-duration: 22s; }
        }
      `}</style>

      {/* ── Carousel section ── */}
      <section id="testimonials" className="py-16 sm:py-20 bg-gray-950/35 backdrop-blur-md overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={MessageCircle} title="Client Testimonials" />
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg sm:text-xl text-gray-200 mb-2 font-medium">
              Don't just take my word for it
            </p>
            <p className="text-gray-400 text-sm sm:text-base">
              Here's what clients say about working with me
            </p>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400 text-sm">Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 px-4">
            <MessageCircle className="w-14 h-14 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No testimonials yet. Be the first to leave one!</p>
          </div>
        ) : (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
              <div className="relative">
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-16 z-10 bg-gradient-to-r from-gray-900/80 to-transparent rounded-l-xl" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-16 z-10 bg-gradient-to-l from-gray-900/80 to-transparent rounded-r-xl" />
                <div className="overflow-hidden rounded-xl">
                  <div className="marquee-track flex gap-4 sm:gap-5" style={{ width: 'max-content' }}>
                    {loopedTestimonials.map((testimonial, index) => (
                      <div
                        key={`${testimonial.id}-${index}`}
                        className="flex-shrink-0 w-[82vw] max-w-[260px] sm:w-[310px] sm:max-w-none md:w-[350px]"
                      >
                        <TestimonialCard testimonial={testimonial} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                {[
                  { value: '100%', label: 'Client Satisfaction', color: 'text-blue-400' },
                  { value: stats.totalProjects, label: 'Projects Delivered', color: 'text-green-400' },
                  { value: stats.happyClients, label: 'Happy Clients', color: 'text-purple-400' },
                  { value: stats.avgRating, label: 'Average Rating', color: 'text-yellow-400' },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="text-center p-4 rounded-2xl bg-white/[0.045] border border-white/10 shadow-lg shadow-black/10 hover:bg-white/[0.07] transition-colors"
                  >
                    <div className={`text-3xl sm:text-4xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </>
        )}
      </section>

      {/* ── Review Form section ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Section background atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-blue-950/20 to-gray-900/0 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 h-[360px] w-[360px] sm:h-[600px] sm:w-[600px] -translate-x-1/2 -translate-y-1/2 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl mx-auto">
          {/* Section label above card */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-cyan-300 mb-3">
              ✦ Leave a Review
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              Worked with me?{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
                Share it.
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-3 max-w-md mx-auto">
              Your review helps future clients make confident decisions — and means a lot to me personally.
            </p>
          </motion.div>

          {/* Card container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-cyan-400/35 via-violet-400/20 to-pink-400/25 blur-[2px]" />

            {/* Card */}
            <div className="relative bg-[#0d1525]/95 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/45">

              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400" />

              {/* Inner glow orbs — decorative only */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

              {/* Form content */}
              <div className="relative z-10 p-4 sm:p-8 md:p-10">
                <TestimonialForm />
              </div>
            </div>
          </motion.div>

          {/* Trust note below card */}
          <motion.p
            className="text-center text-xs text-gray-600 mt-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            🔒 Your email is only used to notify me — never shared or published.
          </motion.p>
        </div>
      </section>
    </>
  );
};
