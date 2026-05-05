'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Star, Upload, X, CheckCircle2, Sparkles } from 'lucide-react';

interface TestimonialFormData {
  name: string;
  email: string;
  role: string;
  company: string;
  project: string;
  rating: number;
  feedback: string;
  image: File | null;
}

const STEPS = ['Who are you?', 'Rate the work', 'Your review'] as const;

export const TestimonialForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '', email: '', role: '', company: '',
    project: '', rating: 5, feedback: '', image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError('Image must be under 5MB'); return; }
    setError('');
    setFormData(prev => ({ ...prev, image: file }));
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Outstanding!'];

  const canAdvance = () => {
    if (step === 0) return !!(formData.name && formData.email && formData.role && formData.company && formData.project);
    if (step === 1) return formData.rating > 0;
    return formData.feedback.trim().length >= 20;
  };

  const handleSubmit = async () => {
    if (!canAdvance()) return;
    setIsSubmitting(true);
    setError('');
    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (k === 'image') { if (v) submitData.append('image', v as File); }
        else submitData.append(k, String(v));
      });
      const res = await fetch('/api/testimonials', { method: 'POST', body: submitData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed');
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success state ──
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-10 sm:py-16 px-4 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-5 shadow-lg shadow-green-500/30"
        >
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </motion.div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
          Thank you, {formData.name.split(' ')[0]}! 🎉
        </h3>
        <p className="text-gray-400 text-sm sm:text-base max-w-sm leading-relaxed">
          Your review means a lot. It'll be live on the site shortly and will help others know what working together is like.
        </p>
        <div className="flex gap-1 mt-5">
          {[...Array(formData.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full">

      {/* ── Header ── */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
          <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">
            Client Review
          </span>
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">
          How was your experience working with me?
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm mt-1.5">
          Your honest feedback helps me grow and helps future clients decide.
        </p>
      </div>

      {/* ── Step indicator ── */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8">
        {STEPS.map((label, i) => (
          <React.Fragment key={i}>
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i < step  ? 'bg-green-500 text-white' :
                i === step ? 'bg-blue-500 text-white ring-4 ring-blue-500/30' :
                'bg-gray-700 text-gray-500'
              }`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-xs hidden sm:block truncate transition-colors ${
                i === step ? 'text-white font-medium' : 'text-gray-500'
              }`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px min-w-[8px] transition-all duration-500 ${i < step ? 'bg-green-500' : 'bg-gray-700'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ── Steps ── */}
      <AnimatePresence mode="wait">

        {/* STEP 0 — Identity */}
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }}
            className="space-y-4"
          >
            <p className="text-xs sm:text-sm text-gray-400">Let's start with a bit about you</p>

            {/* Photo upload */}
            <div className="flex items-center gap-3 sm:gap-4">
              {imagePreview ? (
                <div className="relative flex-shrink-0">
                  <img src={imagePreview} alt="You" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-blue-500" />
                  <button
                    type="button"
                    onClick={() => { setImagePreview(null); setFormData(p => ({ ...p, image: null })); }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ) : (
                <label htmlFor="image" className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-800/50 group">
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                  <input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">Add your photo</p>
                <p className="text-xs text-gray-500">Optional · PNG/JPG up to 5MB</p>
              </div>
            </div>

            {/* Fields grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { name: 'name',    label: 'Your Name',      placeholder: 'Jane Smith',        type: 'text'  },
                { name: 'email',   label: 'Email Address',  placeholder: 'jane@company.com',  type: 'email' },
                { name: 'role',    label: 'Your Role',      placeholder: 'CEO, Product Manager...', type: 'text' },
                { name: 'company', label: 'Company',        placeholder: 'Acme Inc.',         type: 'text'  },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                    {f.label} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type={f.type}
                    name={f.name}
                    value={formData[f.name as keyof TestimonialFormData] as string}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              ))}
            </div>

            {/* Project field — full width */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                Which project did we work on? <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="project"
                value={formData.project}
                onChange={handleChange}
                placeholder="E-Commerce Platform, Mobile App, Dashboard..."
                required
                className="w-full px-3 sm:px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </motion.div>
        )}

        {/* STEP 1 — Rating */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }}
            className="flex flex-col items-center py-4 sm:py-6 text-center"
          >
            <p className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8">
              How would you rate the overall quality of work delivered?
            </p>

            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, rating: star }))}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  // Large touch target for mobile
                  className="p-1 sm:p-0"
                >
                  <Star className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 transition-all duration-150 ${
                    star <= (hoveredStar || formData.rating)
                      ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                      : 'text-gray-600'
                  }`} />
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={hoveredStar || formData.rating}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-base sm:text-lg font-bold text-white"
              >
                {ratingLabels[hoveredStar || formData.rating]}
              </motion.p>
            </AnimatePresence>
            <p className="text-xs text-gray-500 mt-1">{formData.rating} out of 5 stars</p>
          </motion.div>
        )}

        {/* STEP 2 — Feedback */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }}
            className="space-y-3 sm:space-y-4"
          >
            <p className="text-gray-400 text-xs sm:text-sm">
              Tell future clients what it was like. Tap a prompt to get started, or write freely.
            </p>

            {/* Prompt chips */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[
                'Communication was excellent',
                'Delivered on time',
                'Exceeded expectations',
                'Would hire again',
                'Great attention to detail',
              ].map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setFormData(p => ({
                    ...p,
                    feedback: p.feedback ? `${p.feedback} ${prompt}.` : `${prompt}.`,
                  }))}
                  className="px-2.5 sm:px-3 py-1 text-xs rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 active:scale-95 transition-all"
                >
                  + {prompt}
                </button>
              ))}
            </div>

            <div className="relative">
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                rows={5}
                maxLength={500}
                placeholder="Bamidele delivered exactly what we needed. His attention to detail and technical expertise..."
                className="w-full px-3 sm:px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-600">
                {formData.feedback.length}/500
              </div>
            </div>

            {formData.feedback.length > 0 && formData.feedback.length < 20 && (
              <p className="text-xs text-amber-400">Please write at least 20 characters.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Error ── */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-xs sm:text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 sm:px-4 py-2"
        >
          {error}
        </motion.p>
      )}

      {/* ── Navigation ── */}
      <div className="flex items-center justify-between mt-6 sm:mt-8 gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(s => s - 1)}
            className="px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-white active:scale-95 transition-all"
          >
            ← Back
          </button>
        ) : <div />}

        {step < STEPS.length - 1 ? (
          <motion.button
            type="button"
            onClick={() => { if (canAdvance()) setStep(s => s + 1); }}
            disabled={!canAdvance()}
            whileHover={{ scale: canAdvance() ? 1.03 : 1 }}
            whileTap={{ scale: 0.96 }}
            className="px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 transition-all"
          >
            Continue →
          </motion.button>
        ) : (
          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !canAdvance()}
            whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30 transition-all"
          >
            {isSubmitting ? (
              <><div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
            ) : (
              <><Send className="w-3.5 h-3.5" /> Submit Review</>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
};