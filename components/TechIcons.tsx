'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiAmazon,
  SiDocker,
  SiTailwindcss,
  SiJavascript,
  SiExpress,
  SiGit,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

interface IconWrapperProps {
  Icon?: IconType;
  src?: string;
  color?: string;
  label: string;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ Icon, src, color = '', label }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: Math.random() > 0.5 ? 5 : -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className="flex flex-col items-center justify-center text-center gap-1"
    >
      {Icon ? (
        <Icon
          className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 ${color} transition-transform duration-300`}
          {...({} as any)}
        />
      ) : (
        src && (
          <Image
            src={src}
            alt={label}
            width={56}
            height={56}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain transition-transform duration-300"
          />
        )
      )}
      <span className="text-xs sm:text-sm md:text-base text-gray-300 font-medium">
        {label}
      </span>
    </motion.div>
  );
};

export const TechIcons = {
  React: () => <IconWrapper Icon={SiReact} color="text-cyan-400" label="React.js" />,
  Next: () => <IconWrapper Icon={SiNextdotjs} color="text-white" label="Next.js" />,
  TypeScript: () => <IconWrapper Icon={SiTypescript} color="text-blue-500" label="TypeScript" />,
  Tailwind: () => <IconWrapper Icon={SiTailwindcss} color="text-sky-400" label="Tailwind CSS" />,
  JavaScript: () => <IconWrapper Icon={SiJavascript} color="text-yellow-400" label="JavaScript" />,
  Node: () => <IconWrapper Icon={SiNodedotjs} color="text-green-500" label="Node.js" />,
  Express: () => <IconWrapper Icon={SiExpress} color="text-gray-300" label="Express.js" />,
  MongoDB: () => <IconWrapper Icon={SiMongodb} color="text-green-600" label="MongoDB" />,
  AWS: () => <IconWrapper Icon={SiAmazon} color="text-orange-400" label="AWS" />,
  Docker: () => <IconWrapper Icon={SiDocker} color="text-sky-500" label="Docker" />,
  Git: () => <IconWrapper Icon={SiGit} color="text-orange-500" label="Git" />,
  ReactNative: () => <IconWrapper src="/icons/react-native.png" label="React Native" />,
  Azure: () => <IconWrapper src="/icons/azure.png" label="Azure" />,
  CICD: () => <IconWrapper src="/icons/cicd.png" label="CI/CD" />,
};
