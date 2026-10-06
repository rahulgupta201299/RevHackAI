import { ogContentType, ogSize, renderOgImage } from '@/lib/og';

export const alt = 'RevHack AI — build and launch your product without hiring a tech team';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: 'Tech consulting & product engineering',
    title: 'Build and launch your product — without hiring a tech team.',
  });
}
