import { ogContentType, ogSize, renderOgImage } from '@/lib/og';

export const alt = 'RevHack AI case studies and client results';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: 'Portfolio',
    title: '₹1Cr+ in revenue on a store we built — and more, live.',
  });
}
