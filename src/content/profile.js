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

export const stats = [
  { value: '4+', label: 'Years shipping production software' },
  { value: '2–4×', label: 'Growth our systems are built to support' },
  { value: '₹90L+', label: 'Client revenue running on our builds' },
  { value: '3', label: 'Enterprise banking platforms delivered' },
];

/** The end-to-end stack shown on Home and Services. */
export const stackLayers = [
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

export const experience = [
  {
    role: 'Senior Software Engineer',
    company: 'Fintech payments company',
    period: 'Jul 2022 — Present',
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
      'Built an e-commerce platform with a custom admin portal tracking ₹90L+ in revenue.',
      'Integrated AI and automation — email, WhatsApp and spreadsheet workflows — to remove manual follow-up.',
    ],
  },
];

export const enterpriseProjects = [
  {
    title: 'Digital Savings Account Onboarding',
    client: 'Leading private-sector bank',
    description:
      'End-to-end onboarding journeys for Savings, Salary and NRI banking products — online account opening with eKYC, video KYC and integrated payments.',
    outcome: 'Customers complete account opening within minutes.',
    tags: ['Full-stack journeys', 'eKYC / vKYC', 'Payments', 'API integration'],
  },
  {
    title: 'Digital Gold & NPS Investments',
    client: 'Leading private-sector bank',
    description:
      'Investment platforms that let customers buy digital gold and invest in the National Pension Scheme through an intuitive interface.',
    outcome: 'Complex financial products turned into clear, guided flows.',
    tags: ['Investment UX', 'Secure transactions', 'API integration'],
  },
  {
    title: 'One Customer One QR',
    client: 'Leading private-sector bank',
    description:
      'A platform for sales agents to share user-specific, unique sourcing links with prospective customers.',
    outcome: 'Traceable, personalised acquisition links for every agent.',
    tags: ['Link generation', 'Sales tooling', 'Attribution'],
  },
];

export const skillGroups = [
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

export const education = {
  degree: "Bachelor's degree",
  institution: 'Premier engineering institute, India',
  period: '2018 — 2022',
};

export const recognition = [
  { title: 'Annual “Warrior” award for engineering impact', year: '2025' },
];
