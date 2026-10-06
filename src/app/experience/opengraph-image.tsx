import { ogContentType, ogSize, renderOgImage } from '@/lib/og';

export const alt = 'RevHack AI engineering experience';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: 'Experience',
    title: 'Fintech & banking-grade engineering for your product.',
  });
}
