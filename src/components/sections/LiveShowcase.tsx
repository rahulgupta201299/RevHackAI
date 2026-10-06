'use client';

import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import CheckList from '../ui/CheckList';
import Reveal from '../ui/Reveal';
import LiveDashboard from './LiveDashboard';

const points = [
  'Orders, payments and revenue update in real time',
  'Every order attributed to its traffic source',
  'Built on Node.js APIs and AWS, owned by the client',
];

/**
 * The live (simulated) store-admin dashboard, tipped back in 3D and settling flat as it scrolls
 * to the middle of the screen, next to a short explanation.
 */
export default function LiveShowcase({ cta = true }: { cta?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 24 });
  const rotateX = useTransform(p, [0, 1], reduce ? [0, 0] : [24, 0]);
  const rotateY = useTransform(p, [0, 1], reduce ? [0, 0] : [-16, 0]);
  const scale = useTransform(p, [0, 1], reduce ? [1, 1] : [0.9, 1]);

  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 4, md: 6 },
        alignItems: 'center',
        gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.5fr) minmax(0, 0.7fr)' },
      }}
    >
      <Box
        ref={ref}
        component={m.div}
        style={{ rotateX, rotateY, scale, transformPerspective: 1400 }}
        sx={{ transformOrigin: '50% 60%', minWidth: 0 }}
      >
        <LiveDashboard />
      </Box>

      <Reveal delay={0.1}>
        <Typography variant="overline" color="accent.text">
          Live demo · E-commerce admin
        </Typography>
        <Typography variant="h3" sx={{ mt: 1, fontSize: 'clamp(1.5rem, 2.4vw, 2rem)' }}>
          The admin portal behind a store we built — running live.
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          The admin portal we built for Zana Motorcycles has processed ₹1Cr+ in revenue. Every
          e-commerce build ships with one, so the team sees what drives sales as it happens. The
          numbers on this demo are simulated to keep client data private.
        </Typography>
        <Box sx={{ mt: 2.5 }}>
          <CheckList items={points} dense />
        </Box>
        {cta && (
          <Button
            component={Link}
            href="/contact"
            variant="outlined"
            endIcon={<ArrowForwardRounded />}
            sx={{ mt: 3 }}
          >
            Get a dashboard like this
          </Button>
        )}
      </Reveal>
    </Box>
  );
}
