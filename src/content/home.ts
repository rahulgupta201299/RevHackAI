import type { Faq, Problem, SeniorCard } from './types';

/**
 * Homepage-only copy: the problems clients come with, the senior-led block and quick FAQs.
 * Deliberately anonymous: no personal names, photos or employer details.
 * `icon` must be a key of `iconMap` in components/ui/iconMap.js.
 */
export const hero = {
  title: 'Build and launch your product —',
  accent: 'without hiring a tech team.',
  intro:
    'RevHack AI designs, builds and deploys web apps, online stores, dashboards and AI automations for founders and growing businesses. Led by a senior engineer from fintech and banking — one accountable partner from the first call to a live product on AWS.',
  assurances: ['Free scoping call & estimate', 'You own the code', 'Weekly demos'],
};

export const problems: Problem[] = [
  {
    icon: 'code',
    pain: 'You have an idea but no tech team.',
    fix: 'We scope it, build it and launch an MVP in weeks — with a working demo every week.',
  },
  {
    icon: 'web',
    pain: 'Your website looks fine but brings no business.',
    fix: 'Fast, conversion-focused sites and stores, with tracking on every lead and order.',
  },
  {
    icon: 'ai',
    pain: 'Your team drowns in manual follow-ups.',
    fix: 'AI and automation across email, WhatsApp, CRM and spreadsheets.',
  },
  {
    icon: 'speed',
    pain: 'Your app is slow, insecure or costly to run.',
    fix: 'A senior audit, then fixes for speed, security and AWS cost — no rewrite needed.',
  },
];

export const seniorCards: SeniorCard[] = [
  {
    icon: 'security',
    value: '4+ yrs',
    title: 'Fintech & banking-grade engineering',
    copy: 'Secure, high-traffic products shipped to production — the same standards on your build.',
  },
  {
    icon: 'layers',
    value: '3',
    title: 'Enterprise banking platforms',
    copy: 'Account onboarding, investments and payments journeys delivered end to end.',
  },
  {
    icon: 'key',
    value: '1:1',
    title: 'Direct line to your engineer',
    copy: 'No account managers or hand-offs — the person you talk to is the person who builds.',
  },
];

export const homeFaqs: Faq[] = [
  {
    question: 'How much does a project cost?',
    answer:
      'It depends on scope. After a free 30-minute call you get a written proposal with a fixed scope, timeline and price — no surprises. Smaller websites and automations start in weeks, not months.',
  },
  {
    question: 'How fast can you launch?',
    answer:
      'Most websites and automations go live in 2–4 weeks; MVPs typically in 4–8 weeks. You see a working demo every week, so there is never a “big reveal” risk.',
  },
  {
    question: 'Who owns the code and the AWS account?',
    answer:
      'You do. Everything is set up in your accounts from day one, with documentation and a proper handover.',
  },
  {
    question: 'Can you work on our existing product?',
    answer:
      'Yes. We audit what you have, fix the highest-risk issues first — performance, security and cost — and improve it step by step.',
  },
];
