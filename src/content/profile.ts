import type { Job, SkillGroup, StackLayer, Stat } from './types';

/**
 * Engineering profile. Personal details (name, phone, location, employer and client names)
 * are intentionally anonymised. Review the backend, data and cloud items so they match your
 * own experience before publishing.
 */
export const profile = {
  role: 'Senior Full-stack Engineer',
  headline: 'AI-first engineer who builds, ships and deploys complete products.',
  summary:
    'Senior software engineer with 4+ years delivering production products end to end — web frontends, Node.js backends and APIs, databases and AWS infrastructure — for high-traffic fintech and banking platforms and for growing businesses.',
  approach:
    'AI-assisted workflows speed up every stage, from architecture to testing, so products reach customers faster without cutting corners on security, performance or reliability.',
};

export const stats: Stat[] = [
  { value: '₹1Cr+', label: 'Revenue processed on a store we built' },
  { value: '3', label: 'Products live in production' },
  { value: '4+', label: 'Years shipping production software' },
  { value: '100%', label: 'Code & cloud owned by our clients' },
];

/** The end-to-end stack shown on Home and Services. */
export const stackLayers: StackLayer[] = [
  {
    layer: 'Experience',
    detail: 'Websites, web apps, portals & dashboards',
    tech: ['React', 'Next.js', 'TypeScript', 'Material UI'],
  },
  {
    layer: 'Backend',
    detail: 'APIs, business logic & integrations',
    tech: ['Node.js', 'Express', 'REST APIs', 'Webhooks'],
  },
  {
    layer: 'Data',
    detail: 'Storage, caching & reporting',
    tech: ['PostgreSQL', 'MongoDB', 'DynamoDB', 'Redis'],
  },
  {
    layer: 'Cloud',
    detail: 'Infrastructure, delivery & scale on AWS',
    tech: ['EC2 / Lambda', 'S3 + CloudFront', 'RDS', 'CI/CD'],
  },
  {
    layer: 'AI',
    detail: 'Assistants, automation & AI-accelerated delivery',
    tech: ['LLM APIs', 'AI agents', 'Workflow automation', 'AI-assisted dev'],
  },
];

export const experience: Job[] = [
  {
    role: 'Senior Software Engineer',
    company: 'Fintech payments company',
    period: '4+ years · Present',
    mode: 'Remote',
    summary:
      'Leading engineering across multiple fintech products — architecture, performance, security and delivery for high-traffic customer journeys.',
    highlights: [
      'Architected new product modules end to end — routing, state management, API contracts and integration with Node.js services.',
      'Improved Lighthouse scores and Core Web Vitals through lazy loading, code splitting and optimised rendering.',
      'Hardened application security with Content Security Policy, Subresource Integrity and secure build configuration.',
      'Drove the migration to an internal RsPack-based platform — faster builds, better isolation and standardised dependencies.',
      'Partnered with backend and product teams to ship high-availability releases on consistent cycles.',
      'Mentored engineers, ran design reviews and led RCA and performance audits that reduced production defects.',
    ],
  },
  {
    role: 'Founder & Lead Engineer',
    company: 'RevHack AI — product engineering studio',
    period: 'Ongoing',
    mode: 'Remote',
    summary:
      'Designing, building and deploying complete products for growing businesses — from first commit to production on AWS.',
    highlights: [
      'Ship full-stack products end to end: frontend, Node.js APIs, databases, CI/CD and monitoring.',
      'Provision AWS infrastructure from scratch — compute, storage, CDN, DNS, SSL and autoscaling.',
      'Built an e-commerce platform with a custom admin portal for orders, payments and traffic sources.',
      'Integrated AI and automation — email, WhatsApp and spreadsheet workflows — to remove manual follow-up.',
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Material UI', 'HTML & CSS'],
  },
  {
    title: 'Backend & APIs',
    skills: ['Node.js', 'Express', 'REST APIs', 'Authentication', 'Webhooks', 'Integrations'],
  },
  {
    title: 'Cloud & DevOps (AWS)',
    skills: ['EC2', 'Lambda', 'S3', 'CloudFront', 'RDS', 'Route 53', 'Docker', 'CI/CD'],
  },
  {
    title: 'Data',
    skills: ['PostgreSQL', 'MongoDB', 'DynamoDB', 'Redis', 'Data modelling'],
  },
  {
    title: 'AI engineering',
    skills: ['LLM APIs', 'AI agents & chat', 'Prompt engineering', 'AI-assisted development'],
  },
  {
    title: 'Quality, security & leadership',
    skills: ['Core Web Vitals', 'CSP & SRI', 'Jest', 'Code reviews', 'Mentoring', 'RCA'],
  },
];

export const education: { degree: string; institution: string; period?: string } = {
  degree: "Bachelor's degree",
  institution: 'Premier engineering institute, India',
};

/** Awards are left out on purpose: they would identify the employer. Add items as { title, year }. */
export const recognition: { title: string; year: string }[] = [];
