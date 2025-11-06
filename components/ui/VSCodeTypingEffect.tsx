
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

export const VSCodeTypingEffect = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  const lines = [
    { tag: 'h1', text: 'My name is Bamidele Quayum Ademola', color: 'text-blue-400' },
    { tag: 'h2', text: 'Full Stack Developer & Cybersecurity Expert', color: 'text-green-400' },
    { tag: 'div', text: 'Building secure, scalable web & mobile solutions', color: 'text-yellow-400' },
    { tag: 'h2', text: 'React • Next.js • Node.js • AWS • Ethical Hacking', color: 'text-purple-400' },
    { tag: 'p', text: 'Transforming ideas into production-ready applications', color: 'text-cyan-400' },
  ];

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentLine >= lines.length) return;
    const fullText = `<${lines[currentLine].tag}>${lines[currentLine].text}</${lines[currentLine].tag}>`;

    if (displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
        setDisplayedText('');
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, currentLine]);

  const easeCurve = [0.22, 0.61, 0.36, 1];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: easeCurve as any }, 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easeCurve as any }}
      viewport={{ once: true }}
      className="
        bg-[#1e1e1e] rounded-xl sm:rounded-2xl shadow-2xl
        px-2 py-3 xs:px-3 sm:p-4 md:p-6 font-mono
        text-[9px] xs:text-[10px] sm:text-[10px] md:text-sm
        overflow-hidden border border-gray-700
        w-[96%] xs:w-[92%] sm:w-[70%] md:w-[550px] lg:w-[650px] xl:w-[750px]
        mx-auto mt-2 sm:mt-4 transition-all duration-300
        overflow-x-auto
      "
    >
      <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-400 text-xs sm:text-sm ml-2 truncate">about-me.tsx</span>
        </div>
        <Code2 className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      <div className="space-y-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="space-y-2">
          {lines.slice(0, currentLine).map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: easeCurve as any }}
              className={`${line.color} flex gap-2 whitespace-pre-wrap`}
            >
              <span className="text-gray-500 select-none w-6 text-right">{idx + 1}</span>
              <span>&lt;{line.tag}&gt;{line.text}&lt;/{line.tag}&gt;</span>
            </motion.div>
          ))}

          {currentLine < lines.length && (
            <div className={`${lines[currentLine].color} flex gap-2`}>
              <span className="text-gray-500 select-none w-6 text-right">{currentLine + 1}</span>
              <span>
                {displayedText}
                <span
                  className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
                >
                  |
                </span>
              </span>
            </div>
          )}
        </div>

        {currentLine >= lines.length && (
          <motion.div
            className="mt-6 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, ease: easeCurve as any }}
          >
            <div className="flex gap-2 text-gray-400">
              <span className="text-gray-500 select-none w-6 text-right">{lines.length + 1}</span>
              <span className="text-gray-500">{'// Core Competencies'}</span>
            </div>

            <div className="flex gap-2 text-green-400">
              <span className="text-gray-500 select-none w-6 text-right">{lines.length + 2}</span>
              <span>
                <span className="text-purple-400">const</span> skills = [
              </span>
            </div>

            {[
              "'Frontend: React, Next.js, TypeScript',",
              "'Backend: Node.js, Express, MongoDB',",
              "'Mobile: React Native, Cross-platform',",
              "'Security: Penetration Testing, Ethical Hacking',",
              "'Cloud: AWS, Azure, Docker, CI/CD'",
            ].map((skill, i) => (
              <div key={i} className="flex gap-2 text-orange-400 ml-6">
                <span className="text-gray-500 select-none w-6 text-right">
                  {lines.length + 3 + i}
                </span>
                <span>{skill}</span>
              </div>
            ))}

            <div className="flex gap-2 text-green-400">
              <span className="text-gray-500 select-none w-6 text-right">{lines.length + 8}</span>
              <span>];</span>
            </div>

            <div className="flex gap-2 text-gray-500 mt-4">
              <span className="select-none w-6 text-right">{lines.length + 9}</span>
              <span>{'// 💼 2+ years building production applications'}</span>
            </div>
            <div className="flex gap-2 text-gray-500">
              <span className="select-none w-6 text-right">{lines.length + 10}</span>
              <span>{'// 🚀 10+ projects delivered with 100% client satisfaction'}</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
