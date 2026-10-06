'use client';

import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined';
import CheckRounded from '@mui/icons-material/CheckRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { keyframes, useColorScheme } from '@mui/material/styles';
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { hero } from '../../content/home';
import { site } from '../../content/site';
import { easeCurve, fonts, shadows } from '../../theme';
import GridBackdrop from '../ui/GridBackdrop';
import { mergeSx, type Sx } from '../ui/mergeSx';

// three.js is client-only and heavy: load it after hydration, never during SSR.
const HeroScene = dynamic(() => import('../three/HeroScene'), { ssr: false });

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
  70% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

// Hero entrance runs as CSS keyframes (not JS), so it starts straight from the server HTML.
// The headline and intro animate transform only (never opacity 0): they are visible in the very
// first paint, which keeps Largest Contentful Paint fast — a Google ranking signal.
const riseIn = keyframes`
  from { opacity: 0; transform: translateY(28px); filter: blur(6px); }
  to { opacity: 1; transform: none; filter: none; }
`;
const flipIn = keyframes`
  from { transform: translateY(0.5em) rotateX(-60deg); }
  to { transform: none; }
`;
const slideIn = keyframes`
  from { transform: translateY(24px); }
  to { transform: none; }
`;
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const rise = (step: number) => ({
  animation: `${riseIn} .8s ${EASE} both`,
  animationDelay: `${step * 0.09}s`,
});

/**
 * Only run the WebGL scene where it is cheap: wide screens with a fine pointer and enough CPU
 * cores. Phones and low-power devices get the light CSS orb instead, which keeps mobile
 * Core Web Vitals (a Google ranking signal) fast.
 */
function canRun3d() {
  const capable =
    window.matchMedia('(min-width: 900px) and (pointer: fine)').matches &&
    (navigator.hardwareConcurrency ?? 4) >= 4;
  return capable && supportsWebGL();
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Splits a line into words that flip up into place one after another. */
function AnimatedWords({ text, sx, offset = 0 }: { text: string; sx?: Sx; offset?: number }) {
  return text.split(' ').map((w: string, i: number) => (
    <Box
      key={`${w}-${i}`}
      component="span"
      sx={mergeSx(
        {
          display: 'inline-block',
          transformOrigin: '50% 100%',
          whiteSpace: 'pre',
          animation: `${flipIn} .7s ${EASE} both`,
          animationDelay: `${0.1 + (offset + i) * 0.045}s`,
        },
        sx,
      )}
    >
      {`${w} `}
    </Box>
  ));
}

/** Gradient orb shown while the 3D scene loads, and instead of it when WebGL/motion is off. */
function Orb() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: '18%',
        borderRadius: '50%',
        background: 'conic-gradient(from 0deg, #ff4d08, #ff9a3d, #7aa2ff, #c4a5ff, #ff4d08)',
        filter: 'blur(42px)',
        opacity: 0.45,
        animation: `${spin} 14s linear infinite`,
      }}
    />
  );
}

interface GlassChipProps {
  children: ReactNode;
  x: MotionValue<number>;
  y: MotionValue<number>;
  depth?: number;
  sx?: Sx;
}

function GlassChip({ children, x, y, depth = 1, sx }: GlassChipProps) {
  const tx = useTransform(x, (v) => v * 18 * depth);
  const ty = useTransform(y, (v) => v * 18 * depth);

  return (
    <Box
      component={m.div}
      aria-hidden="true"
      style={{ x: tx, y: ty }}
      sx={mergeSx(
        {
          position: 'absolute',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          px: 1.75,
          py: 1.25,
          borderRadius: 3,
          border: 1,
          borderColor: 'divider',
          bgcolor: (t) => `rgba(${t.vars.palette.background.paperChannel} / 0.72)`,
          backdropFilter: 'blur(12px) saturate(160%)',
          boxShadow: shadows.lg,
          whiteSpace: 'nowrap',
        },
        sx,
      )}
    >
      {children}
    </Box>
  );
}

export default function Hero() {
  const section = useRef(null);
  const reduce = useReducedMotion();
  const { mode, systemMode } = useColorScheme();
  const dark = (mode === 'system' ? systemMode : mode) === 'dark';
  const [show3d, setShow3d] = useState(false);

  // Mount the WebGL scene once the browser is idle, so text and buttons paint first.
  useEffect(() => {
    if (reduce || !canRun3d()) return undefined;
    const idle = window.requestIdleCallback ?? ((cb) => window.setTimeout(cb, 250));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = idle(() => setShow3d(true));
    return () => cancel(id);
  }, [reduce]);

  // Pointer parallax for the floating chips.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 80, damping: 20 });
  const sy = useSpring(py, { stiffness: 80, damping: 20 });
  const handlePointer = (event: PointerEvent<HTMLElement>) => {
    if (reduce || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    py.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  // Gentle exit as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.88]);

  return (
    <Box
      ref={section}
      component="section"
      aria-labelledby="hero-title"
      onPointerMove={handlePointer}
      sx={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        pt: { xs: 5, md: 8 },
        pb: { xs: 8, md: 11 },
      }}
    >
      <GridBackdrop />
      <Container
        sx={{
          display: 'grid',
          alignItems: 'center',
          gap: { xs: 2, md: 4 },
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.05fr) minmax(0, 0.95fr)' },
        }}
      >
        <Box component={m.div} style={{ y: textY, opacity: textOpacity }}>
          <Box
            sx={{
              ...rise(0),
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              pl: 0.5,
              pr: 1.75,
              py: 0.5,
              mb: 3,
              borderRadius: 999,
              border: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              boxShadow: shadows.sm,
            }}
          >
            <Box
              aria-hidden="true"
              sx={{
                display: 'grid',
                placeItems: 'center',
                width: 34,
                height: 34,
                borderRadius: '50%',
                bgcolor: 'accent.soft',
                color: 'accent.text',
              }}
            >
              <AutoAwesomeOutlined sx={{ fontSize: 18 }} />
            </Box>
            <Box sx={{ lineHeight: 1.2 }}>
              <Typography component="p" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
                Senior-led tech consulting
              </Typography>
              <Typography
                component="p"
                sx={{
                  fontSize: '0.75rem',
                  color: 'text.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                }}
              >
                <Box
                  component="span"
                  aria-hidden="true"
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    bgcolor: '#22c55e',
                    animation: `${pulse} 2s infinite`,
                  }}
                />
                {site.availability}
              </Typography>
            </Box>
          </Box>

          <Typography id="hero-title" variant="h1" component="h1" sx={{ perspective: 600 }}>
            <AnimatedWords text={hero.title} />
            <AnimatedWords
              text={hero.accent}
              offset={hero.title.split(' ').length}
              sx={{
                background: 'linear-gradient(92deg, #ff4d08 0%, #ff8a3d 55%, #ffb38a 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            />
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              mt: 3,
              maxWidth: '36rem',
              animation: `${slideIn} .8s ${EASE} both`,
              animationDelay: '0.3s',
            }}
          >
            {hero.intro}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4, ...rise(5) }}>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardRounded />}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 12px 30px -12px rgba(255, 77, 8, 0.7)',
                transition: 'transform .3s ease, box-shadow .3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 18px 40px -14px rgba(255, 77, 8, 0.85)',
                },
                '& .MuiButton-endIcon': { transition: 'transform .3s ease' },
                '&:hover .MuiButton-endIcon': { transform: 'translateX(4px)' },
              }}
            >
              {site.primaryCta}
            </Button>
            <Button href="#results" variant="outlined" size="large">
              See client results
            </Button>
          </Stack>

          <Box
            component="ul"
            aria-label="What you get"
            sx={{
              ...rise(6),
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px 20px',
              mt: 3.5,
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
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}
              >
                <CheckRounded aria-hidden="true" sx={{ fontSize: 18, color: 'success.main' }} />
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box
          component={m.div}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: easeCurve }}
          style={{ scale: visualScale }}
          aria-hidden="true"
          sx={{
            position: 'relative',
            height: { xs: 320, sm: 420, md: 540 },
            mt: { xs: 3, md: 0 },
          }}
        >
          <Orb />
          {show3d && <HeroScene dark={dark} />}

          <GlassChip
            x={sx}
            y={sy}
            depth={1.4}
            sx={{ top: { xs: '6%', md: '10%' }, left: { xs: '4%', md: '2%' } }}
          >
            <Typography
              sx={{
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: { xs: '1.15rem', md: '1.4rem' },
                color: 'accent.text',
              }}
            >
              ₹1Cr+
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.25, fontSize: { xs: '0.75rem', md: '0.85rem' } }}
            >
              revenue on a
              <br />
              store we built
            </Typography>
          </GlassChip>

          <GlassChip
            x={sx}
            y={sy}
            depth={-1}
            sx={{ bottom: { xs: '8%', md: '12%' }, right: { xs: '4%', md: '2%' } }}
          >
            <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: 'success.main' }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, fontSize: { xs: '0.78rem', md: '0.875rem' } }}
            >
              Live on AWS · CI/CD
            </Typography>
          </GlassChip>

          <GlassChip
            x={sx}
            y={sy}
            depth={0.7}
            sx={{ display: { xs: 'none', sm: 'flex' }, top: '46%', right: '-2%', py: 1 }}
          >
            <Typography variant="mono" sx={{ fontSize: '0.78rem' }}>
              <Box component="span" sx={{ color: 'accent.text' }}>
                ▸
              </Box>{' '}
              web · api · cloud · ai
            </Typography>
          </GlassChip>
        </Box>
      </Container>
    </Box>
  );
}
