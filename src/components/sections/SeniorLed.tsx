'use client';

import type { MotionValue } from 'framer-motion';
import type { SeniorCard } from '../../content/types';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { seniorCards } from '../../content/home';
import { site } from '../../content/site';
import { fonts, shadows } from '../../theme';
import IconTile from '../ui/IconTile';
import Reveal from '../ui/Reveal';

/** One card in the 3D stack. Its fan-out position is driven by the section's scroll progress. */
interface StackCardProps {
  card: SeniorCard;
  index: number;
  total: number;
  progress: MotionValue<number>;
  spread: number;
}

function StackCard({ card, index, total, progress, spread }: StackCardProps) {
  const centre = (total - 1) / 2;
  const offset = index - centre;
  const y = useTransform(progress, [0, 1], [offset * 16, offset * spread]);
  const z = useTransform(progress, [0, 1], [-index * 40, -Math.abs(offset) * 30]);
  const rotateZ = useTransform(progress, [0, 1], [offset * -2, offset * 3]);

  return (
    <Box
      component={m.article}
      style={{ y, z, rotateZ }}
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        mt: '-62px',
        zIndex: total - index,
        display: 'flex',
        gap: 2,
        alignItems: 'flex-start',
        p: 2.5,
        minHeight: 124,
        borderRadius: '20px',
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        boxShadow: shadows.lg,
        transition: 'border-color .3s ease, box-shadow .3s ease',
        '&:hover': { borderColor: 'secondary.main' },
      }}
    >
      <IconTile icon={card.icon} />
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: '1.6rem',
            lineHeight: 1,
            color: 'accent.text',
          }}
        >
          {card.value}
        </Typography>
        <Typography variant="h4" component="h3" sx={{ mt: 0.75 }}>
          {card.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {card.copy}
        </Typography>
      </Box>
    </Box>
  );
}

/**
 * "Who you'll work with" — anonymous on purpose (no names, photos or employer details).
 * Credentials sit in a 3D card stack that fans out as the section scrolls into view.
 */
export default function SeniorLed({ cards = seniorCards }) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  // Small screens get the stack fully fanned out (readable), still tilted in 3D.
  const small = useMediaQuery((t) => t.breakpoints.down('sm'));
  const reduce = prefersReduced || small;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const raw = useTransform(scrollYProgress, (v) => (reduce ? 1 : v));
  const progress = useSpring(raw, { stiffness: 90, damping: 22 });
  const rotateY = useTransform(progress, [0, 1], [-32, -14]);
  const rotateX = useTransform(progress, [0, 1], [22, 8]);

  return (
    <Box
      ref={ref}
      sx={{
        display: 'grid',
        gap: { xs: 6, md: 8 },
        alignItems: 'center',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1fr)' },
      }}
    >
      <Reveal>
        <Typography variant="overline" color="accent.text">
          Who you’ll work with
        </Typography>
        <Typography variant="h2" sx={{ mt: 1 }}>
          A senior engineer on your project — not a sales team.
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
          Every project is led hands-on by a senior full-stack engineer with a background in secure,
          high-traffic fintech and banking products. You get that standard of engineering without
          the agency overhead.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4 }}>
          <Button
            component={Link}
            href="/contact"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardRounded />}
          >
            {site.primaryCta}
          </Button>
          <Button component={Link} href="/experience" variant="outlined" size="large">
            See experience
          </Button>
        </Stack>
      </Reveal>

      <Box
        sx={{
          position: 'relative',
          height: { xs: 660, sm: 620 },
          perspective: 1400,
          mx: { xs: 0, md: 2 },
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: '15% 10%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 106, 43, 0.28), transparent 65%)',
            filter: 'blur(30px)',
          }}
        />
        <Box
          component={m.div}
          style={{ rotateX, rotateY }}
          sx={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
            maxWidth: 440,
            mx: 'auto',
          }}
        >
          {cards.map((card, index) => (
            <StackCard
              key={card.title}
              card={card}
              index={index}
              total={cards.length}
              progress={progress}
              spread={small ? 190 : 170}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
