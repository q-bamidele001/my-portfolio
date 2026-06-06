'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Pencil, Check, X } from 'lucide-react';
import Image from 'next/image';

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

interface TestimonialCardProps {
  testimonial: Testimonial;
  onDateChange?: (id: string, newDate: string) => Promise<void>;
}

export const TestimonialCard = ({ testimonial, onDateChange }: TestimonialCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [monthValue, setMonthValue] = useState<string>(
    testimonial.displayDate ? testimonial.displayDate.slice(0, 7) : ''
  );
  const [isSaving, setIsSaving] = useState(false);
  const [displayedDate, setDisplayedDate] = useState(testimonial.date);

  const handleSave = async () => {
    if (!onDateChange || !monthValue) return;
    setIsSaving(true);
    try {
      await onDateChange(testimonial.id, `${monthValue}-01`);
      const [year, month] = monthValue.split('-');
      const formatted = new Date(Number(year), Number(month) - 1, 1).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });
      setDisplayedDate(formatted);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update date:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setMonthValue(testimonial.displayDate ? testimonial.displayDate.slice(0, 7) : '');
    setIsEditing(false);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      // ✅ flex flex-col + fixed height ensures all cards are same height in the row
      // No absolute positioning inside — everything flows naturally
      className="relative bg-white/[0.055] border border-white/10 rounded-2xl p-4 sm:p-5
                 shadow-xl shadow-black/20 hover:shadow-purple-500/15 hover:border-purple-400/30 hover:bg-white/[0.075]
                 transition-all duration-300 flex flex-col"
      style={{ minHeight: '220px' }}
    >
      {/* Faint background quote mark — purely decorative, non-overlapping */}
      <Quote className="absolute top-3 right-3 w-7 h-7 text-blue-500/10 pointer-events-none" />

      {/* ── Header: avatar + name/role/stars ── */}
      <div className="flex items-center gap-3 mb-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0 w-11 h-11 rounded-full overflow-hidden border-2 border-cyan-300/50 shadow-md shadow-cyan-500/10">
          {testimonial.image ? (
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              sizes="44px"
              className="object-cover"
              unoptimized={testimonial.image?.includes('blob:')} // handles preview URLs safely
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-violet-600
                            flex items-center justify-center text-white font-bold text-sm">
              {testimonial.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
          )}
        </div>

        {/* Name / role / stars — min-w-0 allows truncate to work */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-sm leading-tight truncate">
            {testimonial.name}
          </p>
          <p className="text-xs text-gray-400 leading-tight truncate">
            {testimonial.role} · {testimonial.company}
          </p>
          <div className="flex items-center gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 flex-shrink-0 ${i < testimonial.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-600'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Feedback — flex-1 so it fills available space ── */}
      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed italic flex-1 mb-3">
        "{testimonial.feedback}"
      </p>

      {/* ── Footer: project name + date ── */}
      <div className="pt-3 border-t border-white/10 mt-auto">
        {/* Project on its own line so it never collides with date */}
        <p className="text-xs text-blue-400 font-medium truncate mb-1">
          {testimonial.project}
        </p>

        {/* Date row */}
        {onDateChange && isEditing ? (
          <div className="flex items-center gap-1.5 flex-wrap">
            <input
              type="month"
              value={monthValue}
              onChange={(e) => setMonthValue(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white text-xs rounded
                         px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSave}
              disabled={isSaving || !monthValue}
              className="text-green-400 hover:text-green-300 disabled:opacity-50"
              title="Save"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCancel}
              className="text-red-400 hover:text-red-300"
              title="Cancel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">{displayedDate}</span>
            {onDateChange && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-600 hover:text-gray-400 transition-colors ml-1"
                title="Edit date"
              >
                <Pencil className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
