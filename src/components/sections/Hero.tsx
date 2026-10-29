'use client';

import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { hero } from '../../content/home';
import { site } from '../../content/site';
import { fonts } from '../../theme';

const HumanPortrait = dynamic(() => import('../three/HumanPortrait'), { ssr: false });

export default function Hero() {
  const { mode, systemMode } = useColorScheme();
  const dark = (mode === 'system' ? systemMode : mode) === 'dark';
  return (
    <Box
      component="section"
      aria-labelledby="hero-title"
      sx={(theme) => ({
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        minHeight: { xs: 0, md: 'min(760px, calc(100svh - 110px))' },
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#e8eee1',
        ...theme.applyStyles('dark', {
          bgcolor: '#0A0A0A',
        }),
      })}
    >
      <HumanPortrait dark={dark} />
      <Container sx={{ pt: { xs: 29, sm: 34, md: 10 }, pb: { xs: 6, md: 10 }, position: 'relative' }}>
        <Box sx={{ maxWidth: { xs: 520, md: 550 } }}>
          <Typography
            variant="overline"
            sx={{ display: 'block', color: 'accent.text', mb: 3, fontSize: '0.72rem' }}
          >
            HUMAN INSIGHT / AI AMBITION / REAL PRODUCTS
          </Typography>
          <Typography
            id="hero-title"
            component="h1"
            sx={(theme) => ({
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: { xs: '3.25rem', sm: '4.5rem', md: '5.75rem' },
              lineHeight: 0.97,
              letterSpacing: 0,
              color: '#5A3E2B',
              ...theme.applyStyles('dark', { color: '#70d4f4' }),
            })}
          >
            RevHack{' '}
            <Box component="span" sx={{ color: 'accent.text' }}>
              AI
            </Box>
          </Typography>
          <Typography
            component="p"
            sx={{
              mt: 2,
              fontFamily: fonts.display,
              fontWeight: 500,
              fontSize: { xs: '1.65rem', sm: '2.15rem', md: '2.5rem' },
              lineHeight: 1.15,
              maxWidth: '14em',
              letterSpacing: 0,
            }}
          >
            Human thinking.
            <br />
            <Box component="span" sx={{ color: 'accent.text' }}>
              Intelligent building.
            </Box>
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 3, maxWidth: '31rem', fontSize: { xs: '1rem', md: '1.1rem' } }}
          >
            {hero.intro}
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
            <Button
              href="#results"
              variant="outlined"
              size="large"
              endIcon={<ArrowForwardRounded />}
            >
              See client results
            </Button>
          </Stack>
          <Box
            component="ul"
            aria-label="What you get"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px 20px',
              mt: 4,
              mb: 0,
              p: 0,
              listStyle: 'none',
            }}
          >
            {hero.assurances.map((item) => (
              <Typography
                component="li"
                key={item}
                variant="body2"
                color="text.secondary"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
              >
                <CheckRounded aria-hidden="true" sx={{ fontSize: 17, color: 'success.main' }} />
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
