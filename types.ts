import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  role: string;
  challenge: string;
  impact: string;
  image: string;
  year: string;
  details: string[];
  tech: string[];
  link?: string;
  nda?: boolean;
}

export interface Skill {
  name: string;
  category: 'Technical' | 'Design' | 'Tools';
  icon?: React.ReactNode;
}
