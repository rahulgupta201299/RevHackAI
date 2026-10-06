import JsonLd from '@/components/seo/JsonLd';
import ContactView from '@/components/views/ContactView';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Book a Free 30-Min Tech Consultation',
  description:
    'Tell us what you want to build, ship or scale. Get a free 30-minute call and a clear plan with scope, timeline and estimate — replies within one working day.',
  path: '/contact',
  keywords: ['free tech consultation', 'software project estimate', 'hire developer India'],
});

export default function ContactPage() {
  return (
    <>
      <ContactView />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Contact', path: '/contact' }])} />
    </>
  );
}
