import JsonLd from '@/components/seo/JsonLd';
import ExperienceView from '@/components/views/ExperienceView';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Fintech & Banking-Grade Engineering Experience',
  description:
    'Senior full-stack engineering behind every project: fintech and banking platforms, Node.js backends, AWS infrastructure, Core Web Vitals and AI-first delivery.',
  path: '/experience',
  keywords: ['senior full-stack engineer', 'fintech engineering', 'React Node.js AWS'],
});

export default function ExperiencePage() {
  return (
    <>
      <ExperienceView />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Experience', path: '/experience' }])} />
    </>
  );
}
