import { ogContentType, ogSize, renderOgImage } from '@/lib/og';

export const alt = 'Book a free tech consultation with RevHack AI';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: 'Free 30-min call',
    title: 'Tell us what you want to build. Get a clear plan.',
  });
}
