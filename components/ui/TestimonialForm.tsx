'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Star, Upload, X } from 'lucide-react';

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

export const TestimonialForm = () => {
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    email: '',
    role: '',
    company: '',
    project: '',
    rating: 5,
    feedback: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleRatingClick = (rating: number) => setFormData(prev => ({ ...prev, rating }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('role', formData.role);
      submitData.append('company', formData.company);
      submitData.append('project', formData.project);
      submitData.append('rating', formData.rating.toString());
      submitData.append('feedback', formData.feedback);
      
      if (formData.image) {
        submitData.append('image', formData.image);
      }

      const response = await fetch('/api/testimonials', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit testimonial');
      }

      console.log('Testimonial sent successfully:', result);
      
      setSubmitStatus('success');
      
      setFormData({
        name: '',
        email: '',
        role: '',
        company: '',
        project: '',
        rating: 5,
        feedback: '',
        image: null,
      });
      setImagePreview(null);
      
      setTimeout(() => setSubmitStatus('idle'), 5000);

    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-2xl mx-auto p-4 sm:p-6 md:p-8 bg-gray-900/50 rounded-xl shadow-lg backdrop-blur-md border border-gray-800"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid md:grid-cols-2 gap-6">
        {['name', 'email'].map((field, idx) => (
          <motion.div 
            key={field} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: idx * 0.1 }}
          >
            <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-2 capitalize">
              {field} *
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              id={field}
              name={field}
              value={formData[field as keyof TestimonialFormData] as string}
              onChange={handleChange}
              required
              placeholder={field === 'email' ? 'Email@example.com' : 'Your Name'}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white 
              placeholder-gray-500 transition-all duration-200"
            />
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {['role', 'company'].map((field, idx) => (
          <motion.div 
            key={field} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 + idx * 0.1 }}
          >
            <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-2 capitalize">
              {field} *
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field as keyof TestimonialFormData] as string}
              onChange={handleChange}
              required
              placeholder={field === 'role' ? 'CTO, Product Manager...' : 'Your Company Inc.'}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 
              focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
            />
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <label htmlFor="project" className="block text-sm font-medium text-gray-300 mb-2">
          Project Name *
        </label>
        <input
          type="text"
          id="project"
          name="project"
          value={formData.project}
          onChange={handleChange}
          required
          placeholder="E-Commerce Platform, Mobile App, etc."
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 
          focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
        />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <label className="block text-sm font-medium text-gray-300 mb-2">Your Rating *</label>
        <div className="flex flex-wrap gap-2 items-center">
          {[1, 2, 3, 4, 5].map(star => (
            <motion.button
              key={star}
              type="button"
              onClick={() => handleRatingClick(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (hoveredStar || formData.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-600'
                }`}
              />
            </motion.button>
          ))}
          <span className="ml-3 text-gray-400 text-sm">{formData.rating} stars</span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Your Photo (Optional)
          <span className="text-xs text-gray-500 ml-2">
            - Photo will be sent via email as attachment
          </span>
        </label>
        {!imagePreview ? (
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 
            border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-800/50"
          >
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-400">Click to upload photo</span>
            <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</span>
            <input 
              id="image" 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="hidden" 
            />
          </label>
        ) : (
          <div className="relative inline-block">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-32 h-32 rounded-lg object-cover border-2 border-blue-500" 
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Photo will be sent as email attachment
            </p>
          </div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        <label htmlFor="feedback" className="block text-sm font-medium text-gray-300 mb-2">
          Your Testimonial *
        </label>
        <textarea
          id="feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          rows={6}
          required
          maxLength={500}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 
          focus:ring-blue-500 text-white placeholder-gray-500 transition-all resize-none"
          placeholder="Share your experience working with me..."
        />
        <p className="text-xs text-gray-500 mt-2">
          {formData.feedback.length} / 500 characters
        </p>
      </motion.div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 
        text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 
        disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30 transition-all"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Submit Testimonial
          </>
        )}
      </motion.button>

      {submitStatus !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`px-4 py-3 rounded-lg text-center ${
            submitStatus === 'success'
              ? 'bg-green-500/20 border border-green-500 text-green-400'
              : 'bg-red-500/20 border border-red-500 text-red-400'
          }`}
        >
          {submitStatus === 'success'
            ? '✓ Thank you! Your testimonial has been sent successfully and will be reviewed soon.'
            : '✗ Oops! Something went wrong. Please try again or email me directly at Q.bamidele001@gmail.com'}
        </motion.div>
      )}
    </motion.form>
  );
};