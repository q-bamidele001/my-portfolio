import React from 'react';
import { TechIcons } from '@/components/TechIcons';
import { Skill } from './types';

export const skills: Skill[] = [
  { name: 'React.js',     icon: <TechIcons.React />,       category: 'frontend' },
  { name: 'Next.js',      icon: <TechIcons.Next />,        category: 'frontend' },
  { name: 'Vue.js',       icon: <TechIcons.Vue />,         category: 'frontend' },
  { name: 'TypeScript',   icon: <TechIcons.TypeScript />,  category: 'frontend' },
  { name: 'Tailwind CSS', icon: <TechIcons.Tailwind />,    category: 'frontend' },
  { name: 'GraphQL',      icon: <TechIcons.GrGraphQl />,   category: 'frontend' },
  { name: 'HTML5',        icon: <TechIcons.HTML />,        category: 'frontend' },
  { name: 'CSS3',         icon: <TechIcons.CSS />,         category: 'frontend' },
  { name: 'JavaScript',   icon: <TechIcons.JavaScript />,  category: 'frontend' },
  { name: 'MySQL',        icon: <TechIcons.MySQL />,       category: 'backend'  },
  { name: 'PostgreSQL',   icon: <TechIcons.PostgreSQL />,  category: 'backend'  },
  { name: 'Node.js',      icon: <TechIcons.Node />,        category: 'backend'  },
  { name: 'Express.js',   icon: <TechIcons.Express />,     category: 'backend'  },
  { name: 'MongoDB',      icon: <TechIcons.MongoDB />,     category: 'backend'  },
  { name: 'Supabase',     icon: <TechIcons.Supabase />,    category: 'backend'  },
  { name: 'React Native', icon: <TechIcons.ReactNative />, category: 'mobile'   },
  { name: 'AWS',          icon: <TechIcons.AWS />,         category: 'cloud'    },
  { name: 'Vercel',       icon: <TechIcons.Vercel />,      category: 'cloud'    },
  { name: 'Azure',        icon: <TechIcons.Azure />,       category: 'cloud'    },
  { name: 'Docker',       icon: <TechIcons.Docker />,      category: 'devops'   },
  { name: 'Git',          icon: <TechIcons.Git />,         category: 'devops'   },
  { name: 'GitHub',       icon: <TechIcons.GitHub />,      category: 'devops'   },
  { name: 'CI/CD',        icon: <TechIcons.CICD />,        category: 'devops'   },
];

export const securitySkills = [
  'Penetration Testing', 'Network Security', 'Vulnerability Assessment',
  'Ethical Hacking', 'Cloud Security', 'IT Infrastructure',
  'Network Administration', 'Security Audits', 'Incident Response',
];

export const projects = [];
export const testimonials = [];