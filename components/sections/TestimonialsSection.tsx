'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { TestimonialForm } from '@/components/ui/TestimonialForm';
import { testimonials } from '@/lib/constants';

export const TestimonialsSection = () => {
  return (
    <>
      <section
        id="testimonials"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={MessageCircle} title="Client Testimonials" />

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl text-gray-200 mb-2 font-medium">
              Don’t just take my word for it
            </p>
            <p className="text-gray-400 text-sm md:text-base">
              Here’s what clients say about working with me
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1, duration: 0.6 }}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {[
              { value: '100%', label: 'Client Satisfaction', color: 'text-blue-400' },
              { value: '10+', label: 'Projects Delivered', color: 'text-green-400' },
              { value: '7+', label: 'Happy Clients', color: 'text-purple-400' },
              { value: '5.0', label: 'Average Rating', color: 'text-yellow-400' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-center"
              >
                <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-4">
              Share Your Experience
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              Worked with me? I'd love to hear about your experience! Your feedback helps me
              improve and helps others make informed decisions.
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 sm:p-10 border border-purple-500/20 hover:border-purple-500/40 shadow-lg transition-all"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <TestimonialForm />
          </motion.div>
        </div>
      </section>
    </>
  );
};
