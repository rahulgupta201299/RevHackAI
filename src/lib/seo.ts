import type { Metadata } from 'next';
import type { Faq } from '@/content/types';
import { services } from '@/content/services';
import { site } from '@/content/site';

/**
 * Single source of truth for SEO: site-wide defaults, per-page metadata and JSON-LD
 * structured data. Kept deliberately anonymous (brand only, no personal names).
 */
export const seo = {
  url: site.url,
  name: site.brand,
  locale: 'en_IN',
  defaultTitle: 'Tech Consultant & MVP Development in India | RevHack AI',
  titleTemplate: '%s | RevHack AI',
  description:
    'Build and launch your web app, online store or AI automation without hiring a tech team. Senior-led full-stack development, AWS cloud and AI — book a free 30-min call.',
  keywords: [
    'tech consultant',
    'technology consulting India',
    'MVP development',
    'full-stack development company',
    'hire full-stack developer',
    'web app development',
    'Next.js development',
    'Node.js development',
    'AWS cloud consulting',
    'DevOps services',
    'AI automation',
    'AI integration services',
    'e-commerce website development',
    'custom dashboard development',
    'startup tech partner',
  ],
  twitterHandle: undefined as string | undefined,
} as const;

export const absoluteUrl = (path = '/') => new URL(path, seo.url).toString();

interface PageSeo {
  /** Short page title; the template adds " | RevHack AI". */
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

/** Per-page metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({ title, description, path, keywords }: PageSeo): Metadata {
  return {
    title,
    description,
    keywords: keywords ? [...keywords, ...seo.keywords.slice(0, 5)] : undefined,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      siteName: seo.name,
      locale: seo.locale,
      title: `${title} | ${seo.name}`,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${seo.name}`,
      description,
    },
  };
}

/* ---------------------------------- JSON-LD ---------------------------------- */

const orgId = `${seo.url}/#organization`;
const websiteId = `${seo.url}/#website`;

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': orgId,
    name: seo.name,
    url: seo.url,
    logo: absoluteUrl('/logo-512.png'),
    image: absoluteUrl('/opengraph-image'),
    slogan: site.tagline,
    description: seo.description,
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    knowsAbout: [
      'Full-stack web development',
      'React',
      'Next.js',
      'Node.js',
      'Amazon Web Services',
      'DevOps',
      'AI automation',
      'Large language models',
      'E-commerce',
      'Web performance',
      'Application security',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: absoluteUrl('/contact'),
      availableLanguage: ['English', 'Hindi'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Product engineering services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.summary,
        },
      })),
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    url: seo.url,
    name: seo.name,
    description: seo.description,
    inLanguage: 'en-IN',
    publisher: { '@id': orgId },
  };
}

export function servicesJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': services.map((service) => ({
      '@type': 'Service',
      '@id': `${absoluteUrl('/services')}#${service.id}`,
      name: service.title,
      description: service.summary,
      serviceType: service.title,
      provider: { '@id': orgId },
      areaServed: 'Worldwide',
      url: absoluteUrl('/services'),
    })),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
