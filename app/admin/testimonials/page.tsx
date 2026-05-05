'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowLeft, Star, Trash2, Edit, X, Save } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  feedback: string;
  project: string;
  date: string;         // formatted "January 2025"
  displayDate: string | null; // raw "YYYY-MM-DD" or null
}

export default function TestimonialsManagement() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMonth, setEditMonth] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // ✅ cache: 'no-store' ensures we always get fresh data from DB
      const res = await fetch('/api/testimonials', { cache: 'no-store' });
      const data = await res.json();
      console.log('[Admin] Fetched testimonials:', data.testimonials);
      if (data.success) {
        setTestimonials(data.testimonials);
      } else {
        setError(data.error || 'Failed to load testimonials');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Network error — could not load testimonials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
      } else {
        alert(data.error || 'Failed to delete');
      }
    } catch (err) {
      alert('Network error — could not delete');
    }
  };

  const startEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    // Pre-fill with existing displayDate sliced to "YYYY-MM", or blank
    setEditMonth(
      testimonial.displayDate ? testimonial.displayDate.slice(0, 7) : ''
    );
  };

  const saveDate = async (id: string) => {
    if (!editMonth) {
      alert('Please select a month and year first.');
      return;
    }

    setSavingId(id);
    // "2024-03" → "2024-03-01"
    const isoDate = `${editMonth}-01`;
    console.log('[Admin] Saving date:', { id, displayDate: isoDate });

    try {
      const res = await fetch('/api/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, displayDate: isoDate }),
      });

      const data = await res.json();
      console.log('[Admin] PUT response:', data);

      if (data.success) {
        // ✅ Update the card instantly using the formatted date the API sends back
        setTestimonials((prev) =>
          prev.map((t) =>
            t.id === id
              ? { ...t, date: data.date, displayDate: isoDate }
              : t
          )
        );
        setEditingId(null);
        setEditMonth('');
      } else {
        alert(`Failed to save: ${data.error}`);
      }
    } catch (err) {
      console.error('PUT error:', err);
      alert('Network error — could not save date');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 px-3 py-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 min-w-0">
          <button
            onClick={() => router.push('/admin')}
            className="text-blue-400 hover:text-blue-300 transition-colors mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-3">
            <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400 flex-shrink-0" />
            Manage Testimonials
          </h1>
          <p className="text-gray-400 mt-2">
            Click the ✏️ icon on a card to change its displayed date.
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-500/20 border border-red-500 text-red-400 rounded-lg text-sm break-words">
            {error}
          </div>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 px-4 bg-gray-800/50 rounded-xl border border-gray-700">
            <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No testimonials yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-gray-600 transition-all min-w-0"
              >
                {/* Client Info */}
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-blue-500 flex-shrink-0">
                    {testimonial.image ? (
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm sm:text-xl">
                        {testimonial.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white truncate">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400 truncate">{testimonial.role} at {testimonial.company}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Feedback */}
                <p className="text-sm text-gray-300 italic mb-4 line-clamp-3 break-words">"{testimonial.feedback}"</p>

                {/* Project */}
                <div className="break-words text-xs text-gray-500 mb-3 pb-3 border-b border-gray-700">
                  Project: {testimonial.project}
                </div>

                {/* ── Date Editor ── */}
                <div className="mb-4 pb-4 border-b border-gray-700">
                  {editingId === testimonial.id ? (
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 block">Select Month &amp; Year</label>
                      <input
                        type="month"
                        value={editMonth}
                        onChange={(e) => setEditMonth(e.target.value)}
                        className="w-full min-w-0 px-3 py-2 bg-gray-900 border border-blue-500 rounded text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex flex-col min-[380px]:flex-row gap-2 mt-2">
                        <button
                          onClick={() => saveDate(testimonial.id)}
                          disabled={savingId === testimonial.id || !editMonth}
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-green-500/20 border border-green-500 text-green-400 rounded text-xs hover:bg-green-500/30 disabled:opacity-50 transition-colors"
                        >
                          {savingId === testimonial.id ? (
                            <div className="w-3 h-3 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Save className="w-3 h-3" />
                          )}
                          {savingId === testimonial.id ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          onClick={() => { setEditingId(null); setEditMonth(''); }}
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3">
                      <span className="min-w-0 break-words text-xs text-gray-400">
                        Date: <span className="text-white font-medium">{testimonial.date}</span>
                      </span>
                      <button
                        onClick={() => startEdit(testimonial)}
                        className="flex-shrink-0 text-blue-400 hover:text-blue-300 transition-colors ml-2"
                        title="Edit date"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <p className="text-xs text-gray-400 break-words">
                    <span className="font-medium">Email:</span>{' '}
                    <a href={`mailto:${testimonial.email}`} className="break-all text-blue-400 hover:text-blue-300">
                      {testimonial.email}
                    </a>
                  </p>
                </div>

                {/* Delete */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(testimonial.id)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500 text-red-400 rounded-lg transition-all text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </motion.button>

                {/* Status */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500 text-green-400 rounded text-xs">
                    <Star className="w-3 h-3" />
                    Live on Site
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
