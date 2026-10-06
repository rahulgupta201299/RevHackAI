import { ogContentType, ogSize, renderOgImage } from '@/lib/og';

export const alt = 'RevHack AI services: web apps, AWS cloud and AI automation';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: 'Services',
    title: 'Web apps, AWS cloud & AI automation — delivered end to end.',
  });
}
