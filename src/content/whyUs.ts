import type { Faq, Reason } from './types';

/**
 * "Why us" content: reasons, comparison table and FAQs.
 * `icon` must be a key of `iconMap` in components/ui/iconMap.js.
 */
export const reasons: Reason[] = [
  {
    icon: 'layers',
    title: 'One team, idea to production',
    copy: 'Design, frontend, backend, cloud and automation handled by one accountable team. No hand-offs, no finger-pointing.',
  },
  {
    icon: 'ai',
    title: 'AI-first delivery',
    copy: 'AI-assisted architecture, coding and testing compress weeks into days — with a senior engineer reviewing every change.',
  },
  {
    icon: 'cloud',
    title: 'Built on AWS to scale',
    copy: 'Autoscaling, CDN and managed databases from day one, so 2–4× growth doesn’t mean a rebuild.',
  },
  {
    icon: 'security',
    title: 'Banking-grade security',
    copy: 'Practices proven on regulated fintech platforms: secure headers, least-privilege access and audited dependencies.',
  },
  {
    icon: 'dashboard',
    title: 'Measured by outcomes',
    copy: 'Analytics and dashboards are part of the build, so you see orders, leads and revenue — not just a launch date.',
  },
  {
    icon: 'key',
    title: 'You own everything',
    copy: 'Code, AWS account, domains and data stay in your name, with documentation and a clean handover.',
  },
];

export const comparison = {
  columns: ['Typical freelancer', 'Typical agency', 'RevHack AI'],
  rows: [
    {
      label: 'End-to-end ownership (UI → API → AWS)',
      values: ['Usually one layer', 'Split across teams', 'One accountable team'],
    },
    {
      label: 'Speed to first release',
      values: ['Varies', 'Slow, process-heavy', 'Fast, AI-accelerated'],
    },
    {
      label: 'Production-grade cloud setup',
      values: ['Often skipped', 'Extra cost', 'Included from day one'],
    },
    {
      label: 'Security standards',
      values: ['Ad hoc', 'Depends on the team', 'Banking-grade by default'],
    },
    {
      label: 'Direct access to a senior engineer',
      values: ['Yes', 'Via account managers', 'Always'],
    },
    {
      label: 'You own the code & infrastructure',
      values: ['Sometimes', 'Sometimes', 'Always'],
    },
  ],
};

export const faqs: Faq[] = [
  {
    question: 'What does “end to end” actually include?',
    answer:
      'Discovery, UI/UX, frontend, Node.js backend and APIs, database design, AWS infrastructure, CI/CD, monitoring and post-launch support. You can also pick only the parts you need.',
  },
  {
    question: 'How does AI make delivery faster?',
    answer:
      'AI assists with scaffolding, code generation, tests, documentation and reviews. A senior engineer owns the architecture and reviews every change, so speed never costs quality.',
  },
  {
    question: 'How do you help a business grow 2–4×?',
    answer:
      'By removing the bottlenecks that cap growth: slow or unconvincing websites, manual follow-up, fragile infrastructure and no visibility into what is working. Every fix is measured against real numbers.',
  },
  {
    question: 'Can you work with our existing code or cloud setup?',
    answer:
      'Yes. We audit what you have, fix the highest-risk issues first — performance, security and cost — and improve it incrementally, without forcing a rewrite.',
  },
  {
    question: 'Who owns the code and the AWS account?',
    answer:
      'You do. Everything is set up in your accounts from the start, with documentation and a proper handover.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'You get monitoring, a prioritised improvement backlog and optional ongoing support for new features, scaling and optimisation.',
  },
];
