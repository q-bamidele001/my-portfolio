'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '@/lib/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="bg-gray-800 rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 animate-fadeIn"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
        <div className="relative self-center sm:self-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-blue-500">
            {testimonial.image ? (
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                {testimonial.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
            )}
          </div>
          <Quote className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 text-blue-400 bg-gray-800 rounded-full p-1" />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h4 className="font-bold text-white text-lg sm:text-xl">{testimonial.name}</h4>
          <p className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</p>
          <div className="flex justify-center sm:justify-start items-center gap-1 mt-2">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-gray-300 mb-6 italic leading-relaxed text-sm sm:text-base text-center sm:text-left"
      >
        “{testimonial.feedback}”
      </motion.p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-4 border-t border-gray-700 text-center sm:text-left">
        <span className="text-sm text-blue-400 font-medium">
          Project: {testimonial.project}
        </span>
        <span className="text-xs text-gray-500">{testimonial.date}</span>
      </div>
    </motion.div>
  );
};
