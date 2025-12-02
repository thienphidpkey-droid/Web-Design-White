import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ProjectItem {
  title: string;
  cat: string;
  url: string;
  image: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export enum SectionId {
  HOME = 'home',
  SERVICES = 'services',
  PROJECTS = 'projects',
  CONTACT = 'contact',
}