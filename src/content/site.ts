import type { NavLink } from './types';

/**
 * Global site settings. Edit this file to change branding, navigation and contact details.
 */
export const site = {
  brand: 'RevHack AI',
  tagline: 'Build & launch your product without hiring a tech team',
  url: 'https://revhackai.in',
  // Used by the contact form (opens the visitor's email app). Not displayed on the page.
  contactEmail: 'rahul@revhackai.in',
  availability: 'Taking on new projects',
  primaryCta: 'Book a free 30-min call',
  responseTime: 'Replies within one working day',
};

export const navLinks: NavLink[] = [
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'Why us', to: '/why' },
  { label: 'Experience', to: '/experience' },
];
