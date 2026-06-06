'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiMongodb,
  SiDocker, SiTailwindcss, SiJavascript, SiExpress, SiGit,
  SiVuedotjs, SiSupabase, SiPostgresql, SiGithub, SiVercel,
  SiMysql, SiHtml5, SiCss,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { GrGraphQl } from 'react-icons/gr';

interface IconWrapperProps {
  Icon?: IconType;
  src?: string;
  color?: string;
  label: string;
}

// ✅ Icon only — no label, smaller size. Label is rendered by SkillCard.
const IconWrapper: React.FC<IconWrapperProps> = ({ Icon, src, color = '', label }) => {
  return Icon ? (
    <Icon
      className={`w-7 h-7 sm:w-8 sm:h-8 ${color} transition-transform duration-300`}
      aria-label={label}
      {...({} as any)}
    />
  ) : src ? (
    <Image
      src={src}
      alt={label}
      width={32}
      height={32}
      className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
      style={{ width: 'auto', height: 'auto' }} // ← fixes aspect ratio warning
    />
  ) : null;
};

export const TechIcons = {
  React: () => <IconWrapper Icon={SiReact} color="text-cyan-400" label="React.js" />,
  Next: () => <IconWrapper Icon={SiNextdotjs} color="text-white" label="Next.js" />,
  Vue: () => <IconWrapper Icon={SiVuedotjs} color="text-green-500" label="Vue.js" />,
  TypeScript: () => <IconWrapper Icon={SiTypescript} color="text-blue-500" label="TypeScript" />,
  Tailwind: () => <IconWrapper Icon={SiTailwindcss} color="text-sky-400" label="Tailwind CSS" />,
  GrGraphQl: () => <IconWrapper Icon={GrGraphQl} color="text-pink-500" label="GraphQL" />,
  HTML: () => <IconWrapper Icon={SiHtml5} color="text-orange-500" label="HTML5" />,
  CSS: () => <IconWrapper Icon={SiCss} color="text-blue-500" label="CSS3" />,
  JavaScript: () => <IconWrapper Icon={SiJavascript} color="text-yellow-400" label="JavaScript" />,
  Node: () => <IconWrapper Icon={SiNodedotjs} color="text-green-500" label="Node.js" />,
  Express: () => <IconWrapper Icon={SiExpress} color="text-gray-300" label="Express.js" />,
  MySQL: () => <IconWrapper Icon={SiMysql} color="text-orange-500" label="MySQL" />,
  PostgreSQL: () => <IconWrapper Icon={SiPostgresql} color="text-blue-500" label="PostgreSQL" />,
  MongoDB: () => <IconWrapper Icon={SiMongodb} color="text-green-600" label="MongoDB" />,
  Supabase: () => <IconWrapper Icon={SiSupabase} color="text-purple-500" label="Supabase" />,
  AWS: () => <IconWrapper Icon={FaAws} color="text-orange-400" label="AWS" />,
  Vercel: () => <IconWrapper Icon={SiVercel} color="text-white" label="Vercel" />,
  Docker: () => <IconWrapper Icon={SiDocker} color="text-sky-500" label="Docker" />,
  Git: () => <IconWrapper Icon={SiGit} color="text-orange-500" label="Git" />,
  GitHub: () => <IconWrapper Icon={SiGithub} color="text-gray-300" label="GitHub" />,
  ReactNative: () => <IconWrapper src="/icons/react-native.png" label="React Native" />,
  Azure: () => <IconWrapper src="/icons/azure.png" label="Azure" />,
  CICD: () => <IconWrapper src="/icons/cicd.png" label="CI/CD" />,
};