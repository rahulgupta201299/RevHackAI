import type { StaticImageData } from 'next/image';

/** Shared content types. Every content file is plain data typed against these. */
export type IconKey =
  | 'ai'
  | 'award'
  | 'cloud'
  | 'code'
  | 'dashboard'
  | 'education'
  | 'key'
  | 'layers'
  | 'security'
  | 'speed'
  | 'web';

export interface NavLink {
  label: string;
  to: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface StackLayer {
  layer: string;
  detail: string;
  tech: string[];
}

export interface Job {
  role: string;
  company: string;
  period: string;
  mode: string;
  summary: string;
  highlights: string[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Service {
  id: string;
  icon: IconKey;
  title: string;
  summary: string;
  items: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  copy: string;
}

export interface Reason {
  icon: IconKey;
  title: string;
  copy: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Problem {
  icon: IconKey;
  pain: string;
  fix: string;
}

export interface SeniorCard {
  icon: IconKey;
  value: string;
  title: string;
  copy: string;
}

export type ProjectCategory = 'ecommerce' | 'financial' | 'banking' | 'media';

export type ProjectPreview =
  /** A tall full-page screenshot that scrolls inside a browser frame. */
  | { type: 'scroll'; image: StaticImageData; alt: string }
  /** A few app screens shown as a crossfading slideshow. */
  | { type: 'slides'; slides: { image: StaticImageData; caption: string; alt: string }[] }
  /** Work under NDA: no screenshots, a placeholder instead. */
  | { type: 'confidential' };

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  /** Short project type, e.g. "Full-stack e-commerce". */
  kind: string;
  badge?: string;
  description: string;
  deliverables: string[];
  url?: string;
  /** One headline result shown on the card, e.g. { value: '₹1Cr+', label: 'revenue processed' }. */
  highlight?: { value: string; label: string };
  preview: ProjectPreview;
}

/** Baselines for the simulated live dashboard (never real client data). */
export interface LiveDemo {
  title: string;
  note: string;
  hourly: number[];
  averageOrderValue: number;
  visitors: number;
  sources: { label: string; share: number }[];
  products: string[];
  cities: string[];
}
