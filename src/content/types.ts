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

export interface EnterpriseProject {
  title: string;
  client: string;
  description: string;
  outcome: string;
  tags: string[];
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

export type ProjectTone = 'ember' | 'ocean';

export interface ClientProject {
  name: string;
  category: string;
  description: string;
  deliverables: string[];
  url: string;
  tone: ProjectTone;
}

export interface CaseStudy {
  client: string;
  period: string;
  metrics: Stat[];
  sources: {
    label: string;
    orders: string;
    revenue: string;
    share: number;
    tone: 'primary' | 'secondary';
  }[];
  total: { orders: string; revenue: string };
  payments: { online: number; cod: number };
}
