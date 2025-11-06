import React from 'react';
import { TechIcons } from '@/components/TechIcons';
import { Project, Skill, Testimonial } from './types';

export const skills: Skill[] = [
  { name: '', icon: <TechIcons.React />, category: 'frontend' },
  { name: '', icon: <TechIcons.Next />, category: 'frontend' },
  { name: '', icon: <TechIcons.TypeScript />, category: 'frontend' },
  { name: '', icon: <TechIcons.Tailwind />, category: 'frontend' },
  { name: '', icon: <TechIcons.JavaScript />, category: 'frontend' },
  { name: '', icon: <TechIcons.Node />, category: 'backend' },
  { name: '', icon: <TechIcons.Express />, category: 'backend' },
  { name: '', icon: <TechIcons.MongoDB />, category: 'backend' },
  { name: '', icon: <TechIcons.ReactNative />, category: 'mobile' },
  { name: '', icon: <TechIcons.AWS />, category: 'cloud' },
  { name: '', icon: <TechIcons.Azure />, category: 'cloud' },
  { name: '', icon: <TechIcons.Docker />, category: 'devops' },
  { name: '', icon: <TechIcons.Git />, category: 'devops' },
  { name: '', icon: <TechIcons.CICD />, category: 'devops' },
];

export const securitySkills = [
  'Penetration Testing', 'Network Security', 'Vulnerability Assessment',
  'Ethical Hacking', 'Cloud Security', 'IT Infrastructure',
  'Network Administration', 'Security Audits', 'Incident Response'
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'Adeiyiade Farm Store',
    description: 'Farm E-Commerce Platform with WhatsApp Integration & Admin Dashboard',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'REST API', 'Node.js' ,'Vercel'],
    liveUrl: 'https://adeiyiade-farm.vercel.app',
    githubUrl: 'https://github.com/q-bamidele001/adeiyiade-farm-store',
    image: '/images/adeiyiade-farm.png'
  },
  {
    id: 2,
    title: 'Student Management System',
    description: 'Features include secure admin authentication with email verification, real-time CRUD operations for students and departments',
    tech: ['React', 'Next.js', 'Node.js', 'GraphQL', 'MongoDB', 'Tailwind CSS', 'TypeScript'],
    liveUrl: 'https://student-portal-zr8i.vercel.app',
    githubUrl: 'https://github.com/q-bamidele001/Student-Portal',
    image: '/images/youngtech.png'
  },
  {
    id: 3,
    title: 'Cloud Infrastructure Dashboard',
    description: 'AWS monitoring dashboard with real-time metrics, cost optimization, and security alerts',
    tech: ['EC2', 'AWS SDK', 'IAM', 'VPC', 'S3', 'CloudWatch'],
    liveUrl: '',
    githubUrl: '',
    image: '/images/cloudteck.png'
  },
  {
    id: 4,
    title: 'Royalle Emporium, Nigerian E-commerce fashion store 🇳🇬',
    description: 'Built from scratch and now live on Vercel. handling real orders, payments, and custom tailoring requests & Admin Dashboard',
    tech: ['React', 'Next.js', 'NextAuth', 'MongoDB', 'DHL API', 'TypeScript', 'Tailwind CSS', 'Paystack API'],
    liveUrl: 'https://royalle-emporium.vercel.app',
    githubUrl: 'https://github.com/q-bamidele001/royalle-emporium',
    image: '/images/royalle-emporium.png'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mrs Oluwatosin",
    role: "CEO",
    company: "Royalle Emporium Fashion Store",
    image: "/testimonials/client1.jpg", 
    rating: 5,
    feedback: "Bamidele delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise is outstanding. The site loads 75% faster than our previous one!",
    project: "E-Commerce Platform",
    date: "August 2025"
  },
  {
    id: 2,
    name: "Mr Jimoh Opeyemi",
    role: "Product Manager",
    company: "CloudFlow Solutions",
    image: "/testimonials/client2.jpg",
    rating: 5,
    feedback: "Working with Bamidele was a pleasure. He built our cloud infrastructure dashboard with real-time monitoring and security features. Professional, responsive, and highly skilled!",
    project: "Cloud Dashboard",
    date: "December 2024"
  },
  {
    id: 3,
    name: "Mr Adeiyiade",
    role: "CEO",
    company: "Adeiyiade Farms Store",
    image: "/testimonials/client3.jpg",
    rating: 5,
    feedback: "Bamidele created a fantastic e-commerce site for our farm products, complete with WhatsApp integration for orders. The admin dashboard makes managing inventory a breeze. Highly recommend his services!",
    project: "E-Commerce Platform",
    date: "June 2025"
  },
  {
    id: 4,
    name: "Mr Bidemi (Bidex)",
    role: "Founder",
    company: "BTech School",
    image: "/testimonials/client4.jpg",
    rating: 5,
    feedback: "Bamidele developed a comprehensive student management system for our institution. The secure authentication and real-time CRUD operations have transformed how we manage student data. Excellent work!",
    project: "Student Management System",
    date: "February 2025"
  }
];