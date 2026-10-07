import arcanumBook from '@/assets/previews/arcanum.webp';
import arcanumHall from '@/assets/previews/arcanum-hall.webp';
import arcanumLanding from '@/assets/previews/arcanum-landing.webp';
import kilnFull from '@/assets/previews/kiln-full.webp';
import medraFull from '@/assets/previews/medra-full.webp';
import zanaFull from '@/assets/previews/zana-full.webp';
import type { LiveDemo, Project, ProjectCategory } from './types';

/**
 * Portfolio projects shown on the Home and Work pages, grouped by industry.
 *
 * Privacy rules for this file:
 * - Client results are shown only as rounded headline figures (e.g. Zana's "₹1Cr+" revenue).
 *   Detailed figures (orders, conversion, source split) are never shown; the admin dashboard
 *   on the site uses simulated demo data (see `liveDemo`).
 * - Banking work is described generically only — no bank names or project specifics (NDA).
 */
export const projectCategories: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'ecommerce', label: 'E-commerce & retail' },
  { id: 'financial', label: 'Financial services' },
  { id: 'banking', label: 'Banking' },
  { id: 'creative', label: 'Arts & creative' },
  { id: 'media', label: 'Books, media & AI' },
];

export const projects: Project[] = [
  {
    slug: 'zana',
    name: 'Zana Motorcycles',
    category: 'ecommerce',
    kind: 'Full-stack e-commerce',
    description:
      'Premium motorcycle-accessories store with a custom admin portal and backend for orders, payments and traffic-source tracking.',
    deliverables: ['Storefront', 'Admin portal & APIs', 'Order & payment tracking'],
    url: 'https://www.zanamotorcycles.com/',
    highlight: { value: '₹1Cr+', label: 'revenue processed through the store' },
    preview: { type: 'scroll', image: zanaFull, alt: 'Zana Motorcycles storefront' },
  },
  {
    slug: 'arcanum',
    name: 'Arcanum',
    category: 'media',
    kind: '3D web app · AI recommendations',
    badge: 'Own product',
    description:
      'An infinite 3D library you can walk through. An AI librarian — English or Hindi, by voice or text — finds any book, brings it to you for a preview and recommends what to read next.',
    deliverables: [
      'Interactive 3D world',
      'AI librarian (EN / हि, voice)',
      'Book preview & recommendations',
    ],
    url: 'https://arcanum-verse.vercel.app/',
    preview: {
      type: 'slides',
      slides: [
        { image: arcanumLanding, caption: 'Enter the library', alt: 'Arcanum landing screen' },
        {
          image: arcanumHall,
          caption: 'Ask the AI librarian',
          alt: 'Arcanum 3D library hall with the AI librarian chat',
        },
        {
          image: arcanumBook,
          caption: 'Book preview & recommendations',
          alt: 'Arcanum book preview with similar-book recommendations',
        },
      ],
    },
  },
  {
    slug: 'kiln',
    name: 'KILN Collective',
    category: 'creative',
    kind: '3D website · studio booking & artist roster',
    description:
      'Website for a Mumbai studio space and artist collective: an interactive 3D hero with draggable artworks, bookable rooms with hourly rates, a browsable artist roster and a brief-to-booking enquiry flow.',
    deliverables: ['Interactive 3D hero', 'Room booking pages', 'Artist roster & profiles'],
    url: 'https://kiln-artist-studio.vercel.app/',
    preview: { type: 'scroll', image: kilnFull, alt: 'KILN Collective website' },
  },
  {
    slug: 'medra',
    name: 'Medra Finvest',
    category: 'financial',
    kind: 'Website + AI automation',
    description:
      'Bonds and fixed-income investment website connected to email, WhatsApp and spreadsheet workflows for faster lead handling.',
    deliverables: ['Marketing website', 'Lead automation', 'Spreadsheet sync'],
    url: 'https://medrafin.in/',
    preview: { type: 'scroll', image: medraFull, alt: 'Medra Finvest website' },
  },
  {
    slug: 'banking',
    name: 'Enterprise banking platforms',
    category: 'banking',
    kind: 'Under NDA',
    description:
      'Customer-facing web journeys for large, regulated banking platforms — engineered for security, high traffic and compliance. Client and project details are confidential.',
    deliverables: ['Secure customer journeys', 'Performance at scale', 'Security hardening'],
    preview: { type: 'confidential' },
  },
];

/**
 * Simulated store-admin data for the live dashboard. These are illustrative baselines, not any
 * client's real numbers; the dashboard animates them with small, realistic random changes.
 */
export const liveDemo: LiveDemo = {
  title: 'store-admin · live',
  note: 'Demo data, simulated in real time. Real client figures stay private.',
  // Orders per hour for the last 12 hours (oldest first); the last bar is the current hour.
  hourly: [3, 2, 4, 6, 9, 11, 8, 10, 13, 15, 12, 5],
  averageOrderValue: 3650,
  visitors: 148,
  sources: [
    { label: 'Organic', share: 0.58 },
    { label: 'Paid ads', share: 0.27 },
    { label: 'Referral', share: 0.15 },
  ],
  products: [
    'Crash guard',
    'Top rack',
    'Handlebar riser',
    'Saddle stays',
    'Tank bag',
    'Headlight grill',
    'Sump guard',
    'Phone mount',
  ],
  cities: ['Bengaluru', 'Pune', 'Delhi', 'Mumbai', 'Hyderabad', 'Chennai', 'Jaipur', 'Kochi'],
};
