'use client';

import Box from '@mui/material/Box';
import Link from 'next/link';
import { site } from '../../content/site';
import { fonts } from '../../theme';

export default function BrandLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Box
      component={Link}
      href="/"
      onClick={onClick}
      aria-label={`${site.brand} — home`}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.25,
        color: 'text.primary',
        textDecoration: 'none',
        borderRadius: 2,
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 56 56"
        aria-hidden="true"
        sx={{ width: 34, height: 34, flex: 'none' }}
      >
        <rect fill="#151515" height="56" rx="12" width="56" />
        <path d="M12 12h10l4 4v9l-4 4H12V12Z" fill="#F7F1E7" />
        <path d="M16 16h5l1.5 1.5v5L21 24h-5v-8Z" fill="#151515" />
        <path d="M12 31h5l10 13h-6L12 35v-4Z" fill="#FF4D08" />
        <path d="M30 12h5v12h7V12h5v32h-5V30h-7v14h-5V12Z" fill="#F7F1E7" />
        <path d="m48 18 3.5 3.5-3.5 3.5-3.5-3.5L48 18Z" fill="#FFCB3D" />
        <path d="m48 31 3.5 3.5-3.5 3.5-3.5-3.5L48 31Z" fill="#FF4D08" />
      </Box>
      <Box
        component="span"
        sx={{
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: '1.15rem',
          letterSpacing: '-0.02em',
        }}
      >
        RevHack{' '}
        <Box component="span" sx={{ color: 'accent.text' }}>
          AI
        </Box>
      </Box>
    </Box>
  );
}
