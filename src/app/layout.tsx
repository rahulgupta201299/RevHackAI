import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Providers from '@/components/Providers';
import SiteShell from '@/components/layout/SiteShell';
import JsonLd from '@/components/seo/JsonLd';
import { organizationJsonLd, seo, websiteJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: { default: seo.defaultTitle, template: seo.titleTemplate },
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: seo.name,
  authors: [{ name: seo.name, url: seo.url }],
  creator: seo.name,
  publisher: seo.name,
  category: 'technology',
  alternates: { canonical: '/' },
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: seo.name,
    locale: seo.locale,
    title: seo.defaultTitle,
    description: seo.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.defaultTitle,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // Add the token from Google Search Console (HTML tag method) as an env var on Vercel.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf7' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0d' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        {/* Applies the saved/system colour scheme before first paint (no theme flash). */}
        <InitColorSchemeScript attribute="data-theme" defaultMode="system" />
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
