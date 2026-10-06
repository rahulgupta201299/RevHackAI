import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import HomeView from '@/components/views/HomeView';
import { homeFaqs } from '@/content/home';
import { faqJsonLd, seo } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: seo.defaultTitle },
  description: seo.description,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <HomeView />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
