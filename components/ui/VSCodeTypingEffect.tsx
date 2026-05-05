'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Auto-updating values (matches HeroSection) ────────────────────────────
const CAREER_START_YEAR = 2023;
function getYears() { return new Date().getFullYear() - CAREER_START_YEAR; }
// ─────────────────────────────────────────────────────────────────────────

const TYPING_SPEED = 35;   // ms per character
const LINE_PAUSE   = 700;  // ms pause after each line finishes

// Full code block — rendered line by line
const CODE_LINES = [
  // imports
  { type: 'import', content: `import { Developer } from 'bamidele-ademola';` },
  { type: 'import', content: `import { React, NextJS, Node } from 'stack';` },
  { type: 'blank',  content: '' },
  // object declaration
  { type: 'keyword', content: `const profile = {` },
  { type: 'field',   content: `  name:     "Bamidele Quayum Ademola",` },
  { type: 'field',   content: `  title:    "Full Stack Developer",` },
  { type: 'field',   content: `  focus:    "Cybersecurity & Cloud Engineering",` },
  { type: 'field',   content: `  location: "Ibadan, Nigeria 🇳🇬",` },
  { type: 'field',   content: `  open:      true,   // available for hire ✅` },
  { type: 'keyword', content: `};` },
  { type: 'blank',   content: '' },
  // skills array
  { type: 'keyword', content: `const stack = {` },
  { type: 'field',   content: `  frontend: ["React", "Next.js", "Vue", "TypeScript"],` },
  { type: 'field',   content: `  backend:  ["Node.js", "Express", "MongoDB", "REST"],` },
  { type: 'field',   content: `  mobile:   ["React Native", "Cross-platform"],` },
  { type: 'field',   content: `  security: ["Pen Testing", "Ethical Hacking"],` },
  { type: 'field',   content: `  cloud:    ["AWS", "Azure", "Docker", "CI/CD"],` },
  { type: 'keyword', content: `};` },
  { type: 'blank',   content: '' },
  // comment footer
  { type: 'comment', content: `// 🚀 10+ projects · 100% client satisfaction` },
];

// Syntax-highlight a rendered line into coloured spans
function highlight(line: { type: string; content: string }) {
  const { type, content } = line;

  if (type === 'blank') return <span>&nbsp;</span>;

  if (type === 'comment') {
    return <span className="text-gray-500 italic">{content}</span>;
  }

  if (type === 'import') {
    // "import" keyword blue, string orange, rest gray
    return (
      <span>
        <span className="text-blue-400">import</span>
        <span className="text-gray-300">
          {content.slice(6, content.indexOf(' from '))}
        </span>
        <span className="text-blue-400"> from </span>
        <span className="text-orange-300">
          {content.slice(content.indexOf(' from ') + 6)}
        </span>
      </span>
    );
  }

  if (type === 'keyword') {
    // "const" purple, identifier green, rest white
    if (content.startsWith('const')) {
      const eq = content.indexOf('=');
      return (
        <span>
          <span className="text-purple-400">const </span>
          <span className="text-green-400">{content.slice(6, eq).trim()}</span>
          <span className="text-white"> {content.slice(eq)}</span>
        </span>
      );
    }
    return <span className="text-white">{content}</span>;
  }

  if (type === 'field') {
    // key: teal, string value: orange, array brackets: gray
    const colon = content.indexOf(':');
    const key   = content.slice(0, colon).trimStart();
    const rest  = content.slice(colon + 1).trimStart();
    const indent = content.slice(0, content.indexOf(key.trimStart()[0]));

    return (
      <span>
        <span className="text-gray-400">{indent}</span>
        <span className="text-teal-300">{key.trim()}</span>
        <span className="text-gray-400">: </span>
        {rest.startsWith('"') || rest.startsWith("'") ? (
          <span className="text-orange-300">{rest}</span>
        ) : rest.startsWith('[') ? (
          <>
            <span className="text-gray-400">[</span>
            {rest.slice(1, -2).split(',').map((item, i, arr) => (
              <span key={i}>
                <span className="text-orange-300">{item.trim()}</span>
                {i < arr.length - 1 && <span className="text-gray-400">, </span>}
              </span>
            ))}
            <span className="text-gray-400">]{rest.slice(-1)}</span>
          </>
        ) : (
          <span className="text-blue-300">{rest}</span>
        )}
      </span>
    );
  }

  return <span className="text-gray-300">{content}</span>;
}

export const VSCodeTypingEffect = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [currentChar, setCurrentChar]   = useState(0);
  const [cursorOn, setCursorOn]         = useState(true);
  const [done, setDone]                 = useState(false);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorOn(p => !p), 530);
    return () => clearInterval(id);
  }, []);

  // Typing engine
  useEffect(() => {
    if (done) return;
    if (visibleLines >= CODE_LINES.length) { setDone(true); return; }

    const lineLen = CODE_LINES[visibleLines].content.length;

    if (CODE_LINES[visibleLines].type === 'blank') {
      // Blank lines appear instantly
      const id = setTimeout(() => {
        setVisibleLines(p => p + 1);
        setCurrentChar(0);
      }, 120);
      return () => clearTimeout(id);
    }

    if (currentChar < lineLen) {
      const id = setTimeout(() => setCurrentChar(p => p + 1), TYPING_SPEED);
      return () => clearTimeout(id);
    } else {
      const id = setTimeout(() => {
        setVisibleLines(p => p + 1);
        setCurrentChar(0);
      }, LINE_PAUSE);
      return () => clearTimeout(id);
    }
  }, [visibleLines, currentChar, done]);

  const years = getYears();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      className="w-full min-w-0 max-w-full sm:max-w-[560px] md:max-w-[600px] lg:max-w-[680px] mx-auto"
    >
      {/* ── Editor window ── */}
      <div className="bg-[#0d1117]/95 rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden ring-1 ring-blue-400/10">

        {/* Title bar */}
        <div className="flex items-center justify-between gap-2 px-2.5 sm:px-4 py-2.5 bg-[#161b22]/95 border-b border-white/10">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all" />
          </div>

          {/* Tab */}
          <div className="flex min-w-0 items-center gap-1.5 bg-[#0d1117] px-2 sm:px-3 py-1 rounded-lg border border-white/10 shadow-inner shadow-white/5">
            <div className="w-2 h-2 rounded-sm bg-blue-400" />
            <span className="truncate text-[10px] sm:text-xs text-gray-400 font-mono">portfolio.tsx</span>
          </div>

          {/* Status dots */}
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-gray-500 font-mono hidden sm:block">TypeScript</span>
          </div>
        </div>

        {/* ── Editor body ── */}
        <div className="flex overflow-hidden">
          {/* Gutter */}
          <div className="flex-shrink-0 w-7 sm:w-9 bg-black/10 border-r border-white/5 pt-3 pb-4 flex flex-col items-end pr-1.5 sm:pr-2 select-none">
            {CODE_LINES.slice(0, Math.max(visibleLines + 1, 1)).map((_, i) => (
              <div
                key={i}
                className={`text-[9px] sm:text-[11px] leading-5 sm:leading-6 font-mono ${
                  i === visibleLines - 1 ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code area */}
          <div className="flex-1 overflow-x-auto p-2.5 sm:p-4 min-h-[240px] sm:min-h-[320px] bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_40%)]">
            <div className="space-y-0 font-mono text-[10px] sm:text-[12px] md:text-[13px] leading-5 sm:leading-6">

              {/* Fully typed lines */}
              {CODE_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                  className="whitespace-pre flex"
                >
                  {highlight(line)}
                </motion.div>
              ))}

              {/* Currently typing line */}
              {!done && visibleLines < CODE_LINES.length && (
                <div className="whitespace-pre flex">
                  {CODE_LINES[visibleLines].type === 'blank' ? (
                    <span>&nbsp;</span>
                  ) : (
                    <>
                      {highlight({
                        ...CODE_LINES[visibleLines],
                        content: CODE_LINES[visibleLines].content.slice(0, currentChar),
                      })}
                      <span
                        className={`inline-block w-[2px] h-[1em] bg-blue-400 ml-px align-middle transition-opacity duration-100 ${
                          cursorOn ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </>
                  )}
                </div>
              )}

              {/* Idle cursor after done */}
              {done && (
                <span
                  className={`inline-block w-[2px] h-[1em] bg-blue-400 ml-px align-middle transition-opacity duration-100 ${
                    cursorOn ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}
            </div>
          </div>
        </div>

        {/* ── Status bar ── */}
        <div className="flex items-center justify-between gap-2 px-2.5 sm:px-4 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-[9px] sm:text-[11px] font-mono">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span>⎇ main</span>
            <span className="hidden sm:block">✓ No errors</span>
          </div>
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span className="hidden sm:block">{years}+ yrs exp</span>
            <span>TypeScript</span>
            <span>UTF-8</span>
          </div>
        </div>
      </div>

      {/* ── Minimap stat pills ── */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mt-4"
          >
            {[
              { label: 'Projects', value: '10+',    color: 'border-blue-500/40 text-blue-400'   },
              { label: 'Clients',  value: '4+',     color: 'border-green-500/40 text-green-400' },
              { label: 'Stack',    value: '20+ Tech',color: 'border-purple-500/40 text-purple-400' },
              { label: 'Uptime',   value: '100%',   color: 'border-yellow-500/40 text-yellow-400' },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border bg-gray-950/70 backdrop-blur text-[10px] sm:text-xs font-mono shadow-lg shadow-black/20 ${p.color}`}
              >
                <span className="font-bold">{p.value}</span>
                <span className="text-gray-500">{p.label}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
