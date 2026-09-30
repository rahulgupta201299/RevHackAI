/**
 * Client projects and case-study metrics shown on the Home and Work pages.
 */
export const clientProjects = [
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

export const caseStudy = {
  client: 'Zana Motorcycles',
  period: '1 Apr — 22 Sep 2026',
  metrics: [
    { value: '2,331', label: 'Overall orders' },
    { value: '₹90.60L', label: 'Revenue tracked' },
    { value: '₹3,887', label: 'Average order value' },
    { value: '91%', label: 'Organic orders' },
  ],
  sources: [
    { label: 'Organic', orders: '2,126', revenue: '₹79.32L', share: 91, tone: 'primary' },
    { label: 'Admin-assisted', orders: '205', revenue: '₹11.28L', share: 9, tone: 'secondary' },
  ],
  total: { orders: '2,331', revenue: '₹90.60L' },
  payments: { online: 1928, cod: 403 },
};
