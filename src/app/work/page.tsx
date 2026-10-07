import JsonLd from '@/components/seo/JsonLd';
import WorkView from '@/components/views/WorkView';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Portfolio: E-commerce, Fintech, Banking & AI Projects',
  description:
    'Live projects by industry: a full-stack e-commerce store that has processed ₹1Cr+ in revenue, a fixed-income investment website with AI lead automation, an AI-powered 3D book library, a 3D website for an artist studio and enterprise banking work.',
  path: '/work',
  keywords: [
    'web development portfolio',
    'e-commerce development',
    'fintech website',
    '3D web app',
  ],
});

export default function WorkPage() {
  return (
    <>
      <WorkView />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Work', path: '/work' }])} />
    </>
  );
}
