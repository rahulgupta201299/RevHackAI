import type { MetadataRoute } from 'next';
import { seo } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${seo.name} — Tech consulting & product engineering`,
    short_name: seo.name,
    description: seo.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fafaf7',
    theme_color: '#111113',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/logo-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/logo-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
