import type { CaseStudy, ClientProject } from './types';

/**
 * Client projects and case-study metrics shown on the Home and Work pages.
 */
export const clientProjects: ClientProject[] = [
  {
    name: 'Zana Motorcycles',
    category: 'Full-stack e-commerce',
    description:
      'Premium motorcycle-accessories store with a custom admin portal and backend for orders, source tracking and revenue visibility.',
    deliverables: ['Storefront experience', 'Admin portal & APIs', 'Order & revenue reporting'],
    url: 'https://www.zanamotorcycles.com/',
    tone: 'ember',
  },
  {
    name: 'Medra Finvest',
    category: 'Website + AI automation',
    description:
      'Financial-products website connected to email, WhatsApp and spreadsheet workflows for quicker lead handling.',
    deliverables: ['Marketing website', 'Lead automation', 'Spreadsheet sync'],
    url: 'https://medrafin.in/',
    tone: 'ocean',
  },
];

export const caseStudy: CaseStudy = {
  client: 'Zana Motorcycles',
  period: '1 Apr — 6 Oct 2026',
  metrics: [
    { value: '2,611', label: 'Overall orders' },
    { value: '₹1.02Cr', label: 'Revenue tracked' },
    { value: '₹3,920', label: 'Average order value' },
    { value: '91%', label: 'Organic orders' },
  ],
  sources: [
    { label: 'Organic', orders: '2,369', revenue: '₹88.55L', share: 91, tone: 'primary' },
    { label: 'Admin-assisted', orders: '242', revenue: '₹13.80L', share: 9, tone: 'secondary' },
  ],
  total: { orders: '2,611', revenue: '₹1.02Cr' },
  payments: { online: 2160, cod: 451 },
};
