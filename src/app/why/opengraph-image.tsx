import { ogContentType, ogSize, renderOgImage } from '@/lib/og';

export const alt = 'Why choose RevHack AI over a freelancer or agency';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: 'Why RevHack AI',
    title: 'A senior engineer on your project — not a sales team.',
  });
}
