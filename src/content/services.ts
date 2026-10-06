import type { ProcessStep, Service } from './types';

/**
 * Services and delivery process. `icon` must be a key of `iconMap` in components/ui/iconMap.js.
 */
export const services: Service[] = [
  {
    id: 'product',
    icon: 'code',
    title: 'Full-stack product engineering',
    summary:
      'Web apps, portals and SaaS products built end to end — responsive frontend, Node.js APIs and a well-designed database.',
    items: [
      'React / Next.js frontends',
      'Node.js services & REST APIs',
      'Auth, payments & integrations',
    ],
  },
  {
    id: 'cloud',
    icon: 'cloud',
    title: 'AWS cloud & DevOps',
    summary:
      'Production infrastructure on AWS from scratch — secure, automated and ready to scale with demand.',
    items: [
      'Infrastructure setup & IaC',
      'CI/CD pipelines & monitoring',
      'Autoscaling, CDN & cost control',
    ],
  },
  {
    id: 'ai',
    icon: 'ai',
    title: 'AI integration & automation',
    summary:
      'Put AI and automation to work — assistants, smart workflows and integrations that remove manual effort.',
    items: [
      'LLM features & chat assistants',
      'Email, WhatsApp & CRM workflows',
      'Data sync across your tools',
    ],
  },
  {
    id: 'websites',
    icon: 'web',
    title: 'Websites & e-commerce',
    summary: 'Fast, trustworthy websites and storefronts designed to turn visitors into customers.',
    items: [
      'Brand & marketing websites',
      'E-commerce storefronts',
      'Landing pages & conversion paths',
    ],
  },
  {
    id: 'dashboards',
    icon: 'dashboard',
    title: 'Dashboards & analytics',
    summary:
      'One shared view of orders, revenue and demand sources, so every decision is backed by data.',
    items: ['Revenue & order reporting', 'Source attribution', 'Custom admin portals'],
  },
  {
    id: 'audits',
    icon: 'speed',
    title: 'Performance & security audits',
    summary:
      'A senior review of existing products to fix what slows them down or puts them at risk.',
    items: [
      'Core Web Vitals & load speed',
      'Security hardening (CSP, SRI, headers)',
      'Architecture & cloud-cost review',
    ],
  },
];

export const process: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    copy: 'We map the goal, users and bottlenecks, then agree on scope, architecture and the metrics that define success.',
  },
  {
    step: '02',
    title: 'Build',
    copy: 'AI-accelerated development of frontend, backend and integrations, with a working demo every week.',
  },
  {
    step: '03',
    title: 'Deploy',
    copy: 'Automated CI/CD to production on AWS, with monitoring, backups and security in place from day one.',
  },
  {
    step: '04',
    title: 'Scale',
    copy: 'We track the numbers, remove bottlenecks and scale the infrastructure as the business grows 2–4×.',
  },
];
