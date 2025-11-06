'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { ContactFormData } from '@/lib/types';

export const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="space-y-6 w-full max-w-2xl mx-auto px-4 sm:px-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { label: 'Your Name *', id: 'name', type: 'text', placeholder: 'John Doe' },
          { label: 'Your Email *', id: 'email', type: 'email', placeholder: 'john@example.com' },
        ].map((field) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              value={(formData as any)[field.id]}
              onChange={handleChange}
              required
              placeholder={field.placeholder}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          placeholder="Project Inquiry"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
          focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Tell me about your project..."
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
          focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 
          transition-all resize-none"
        />
      </motion.div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
        text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 
        transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/50"
      >
        {isSubmitting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            ></motion.div>
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg"
          >
            ✓ Message sent successfully! I'll get back to you soon.
          </motion.div>
        )}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg"
          >
            ✗ Something went wrong. Please try again or contact me directly.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
};