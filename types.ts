import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export enum SectionId {
  HOME = 'home',
  SERVICES = 'services',
  PORTFOLIO = 'portfolio',
  CONTACT = 'contact',
}