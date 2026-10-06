import JsonLd from '@/components/seo/JsonLd';
import WorkView from '@/components/views/WorkView';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Case Studies: ₹1Cr+ E-commerce Results',
  description:
    'Client work and results: an e-commerce store and admin portal tracking ₹1.02Cr in revenue, AI-automated lead handling and enterprise banking journeys.',
  path: '/work',
  keywords: ['e-commerce case study', 'web development portfolio', 'fintech development'],
});

export default function WorkPage() {
  return (
    <>
      <WorkView />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Work', path: '/work' }])} />
    </>
  );
}
