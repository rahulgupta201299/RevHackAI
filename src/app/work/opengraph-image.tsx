import { ogContentType, ogSize, renderOgImage } from '@/lib/og';

export const alt = 'RevHack AI case studies and client results';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: 'Case studies',
    title: '₹1.02Cr in revenue running on a store we built.',
  });
}
