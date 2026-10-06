import JsonLd from '@/components/seo/JsonLd';
import ServicesView from '@/components/views/ServicesView';
import { breadcrumbJsonLd, pageMetadata, servicesJsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Web App, AWS Cloud & AI Automation Services',
  description:
    'Full-stack web and app development, AWS cloud & DevOps, AI integration, e-commerce, dashboards and performance & security audits — senior-led, delivered end to end.',
  path: '/services',
  keywords: ['web development services', 'AWS DevOps services', 'AI integration services'],
});

export default function ServicesPage() {
  return (
    <>
      <ServicesView />
      <JsonLd
        data={[servicesJsonLd(), breadcrumbJsonLd([{ name: 'Services', path: '/services' }])]}
      />
    </>
  );
}
