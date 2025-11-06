import { ReactNode } from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
}

export interface Skill {
  name: string;
  icon: ReactNode;
  category: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  feedback: string;
  project: string;
  date: string;
}