'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { BsWhatsapp } from 'react-icons/bs';
import type { IconBaseProps } from 'react-icons';

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '2348149917230';
  const message = 'Hello Bamidele! I found your portfolio and would like to connect.';

  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-1/7 right-6 z-50 flex flex-col items-end">
      <motion.button
        aria-label="Open WhatsApp chat"
        onClick={() => setIsOpen((s) => !s)}
        whileHover={{ scale: 1.07, rotate: 3 }}
        whileTap={{ scale: 0.96 }}
        className="relative bg-green-500 hover:bg-green-600 text-white rounded-full p-3 sm:p-4 shadow-2xl transition-all duration-200 flex items-center justify-center"
      >
        <BsWhatsapp
          {...({ className: 'w-6 h-6 sm:w-7 sm:h-7' } as unknown as IconBaseProps)}
          aria-hidden="true"
        />

        <motion.span
          className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.35, 1] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeInOut' }}
            className="mt-3 w-64 sm:w-72 bg-white text-gray-800 rounded-xl shadow-2xl p-3 sm:p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                BA
              </div>
              <div>
                <div className="font-semibold text-sm">Bamidele Ademola</div>
                <div className="text-xs text-gray-500">Typically replies instantly</div>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-3 leading-relaxed">
              Hi there! 👋 <br /> How can I help you today?
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={openWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 text-sm font-medium transition-colors"
            >
              Start Chat
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
