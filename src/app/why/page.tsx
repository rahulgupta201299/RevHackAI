import JsonLd from '@/components/seo/JsonLd';
import WhyUsView from '@/components/views/WhyUsView';
import { faqs } from '@/content/whyUs';
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Tech Partner vs Freelancer vs Agency',
  description:
    'One senior-led team for frontend, backend, AWS and AI: banking-grade security, AI-accelerated delivery and you own the code. See how we compare and get answers.',
  path: '/why',
  keywords: ['freelancer vs agency', 'hire tech partner', 'outsource software development'],
});

export default function WhyPage() {
  return (
    <>
      <WhyUsView />
      <JsonLd data={[faqJsonLd(faqs), breadcrumbJsonLd([{ name: 'Why us', path: '/why' }])]} />
    </>
  );
}
