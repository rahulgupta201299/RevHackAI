'use client';

import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import ScrollProgress from './ScrollProgress';

/** Page chrome shared by every route: skip link, progress bar, header, main and footer. */
export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Box
        component="a"
        href="#main"
        sx={{
          position: 'fixed',
          top: 12,
          left: 12,
          zIndex: 'tooltip',
          px: 2,
          py: 1.25,
          borderRadius: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          fontWeight: 600,
          textDecoration: 'none',
          transform: 'translateY(-160%)',
          '&:focus-visible': { transform: 'none' },
        }}
      >
        Skip to content
      </Box>
      <Header />
      <Box component="main" id="main" tabIndex={-1}>
        {children}
      </Box>
      <Footer />
    </>
  );
}
