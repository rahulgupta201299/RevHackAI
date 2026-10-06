'use client';

import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { site } from '../../content/site';
import Cube3D from '../ui/Cube3D';
import Reveal from '../ui/Reveal';

export default function CtaBanner({
  title = 'Have a product to build, ship or scale?',
  copy = 'Book a free 30-minute call. You’ll leave with a clear plan, a realistic timeline and an estimate — no obligation.',
  secondary = { label: 'See our services', to: '/services' },
}) {
  return (
    <Box component="section" aria-labelledby="cta-title" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <Reveal
          sx={{
            position: 'relative',
            overflow: 'hidden',
            isolation: 'isolate',
            borderRadius: 7,
            px: { xs: 3, sm: 5, md: 8 },
            py: { xs: 6, md: 9 },
            bgcolor: 'inverse.bg',
            color: 'inverse.text',
            '&::after': {
              content: '""',
              position: 'absolute',
              zIndex: -1,
              width: 420,
              height: 420,
              right: -120,
              top: -160,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 106, 43, 0.45), transparent 65%)',
            },
          }}
        >
          <Cube3D
            size={190}
            sx={{
              display: { xs: 'none', lg: 'block' },
              position: 'absolute',
              right: { lg: 110 },
              top: '50%',
              mt: '-95px',
              zIndex: -1,
            }}
          />
          <Typography id="cta-title" variant="h2" sx={{ maxWidth: '36rem' }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2, maxWidth: '40rem', color: 'inverse.muted' }}>
            {copy}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ mt: 4, alignItems: { sm: 'center' } }}
          >
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardRounded />}
            >
              {site.primaryCta}
            </Button>
            {secondary && (
              <Button
                component={Link}
                href={secondary.to}
                variant="outlined"
                size="large"
                sx={{
                  color: 'inverse.text',
                  borderColor: 'inverse.muted',
                  '&:hover': { borderColor: 'inverse.text', bgcolor: 'transparent' },
                }}
              >
                {secondary.label}
              </Button>
            )}
            <Typography variant="body2" sx={{ color: 'inverse.muted', pl: { sm: 1 } }}>
              {site.responseTime}
            </Typography>
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
}
