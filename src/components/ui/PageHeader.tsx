'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material/styles';
import type { ReactNode } from 'react';
import Eyebrow from './Eyebrow';
import GridBackdrop from './GridBackdrop';

// CSS (not JS) entrance so the page title paints straight from the server HTML (better LCP).
const riseIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: none; }
`;
const rise = (step: number) => ({
  animation: `${riseIn} .6s cubic-bezier(0.22, 1, 0.36, 1) both`,
  animationDelay: `${step * 0.08}s`,
});

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}

/** Intro block at the top of inner pages. */
export default function PageHeader({ eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        pt: { xs: 8, md: 12 },
        pb: { xs: 7, md: 10 },
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <GridBackdrop />
      <Container>
        <Box sx={{ maxWidth: '52rem' }}>
          {eyebrow && <Eyebrow sx={rise(0)}>{eyebrow}</Eyebrow>}
          <Typography variant="h1" sx={rise(1)}>
            {title}
          </Typography>
          {intro && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mt: 3, maxWidth: '44rem', ...rise(2) }}
            >
              {intro}
            </Typography>
          )}
          {children && <Box sx={{ mt: 4, ...rise(3) }}>{children}</Box>}
        </Box>
      </Container>
    </Box>
  );
}
