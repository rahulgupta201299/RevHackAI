'use client';

import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { caseStudy } from '../../content/work';
import { easeCurve, fonts } from '../../theme';
import CountUp from '../ui/CountUp';
import Reveal from '../ui/Reveal';
import SurfaceCard from '../ui/SurfaceCard';
import Tilt3D from '../ui/Tilt3D';
import WindowBar from '../ui/WindowBar';

/** Compact, animated version of the Zana case-study dashboard for the homepage. */
export default function ResultsHighlight({ data = caseStudy }) {
  const [organic] = data.sources;
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // The dashboard starts tipped back in 3D and settles flat as it reaches the middle of the screen.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 24 });
  const rotateX = useTransform(p, [0, 1], reduce ? [0, 0] : [28, 0]);
  const rotateY = useTransform(p, [0, 1], reduce ? [0, 0] : [-22, 0]);
  const scale = useTransform(p, [0, 1], reduce ? [1, 1] : [0.86, 1]);

  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 4, md: 6 },
        alignItems: 'center',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.15fr) minmax(0, 0.85fr)' },
      }}
    >
      <Box
        ref={ref}
        component={m.div}
        style={{ rotateX, rotateY, scale, transformPerspective: 1400 }}
        sx={{ transformOrigin: '50% 60%' }}
      >
        <Tilt3D max={5} sx={{ borderRadius: '24px' }}>
          <SurfaceCard sx={{ p: 0, overflow: 'hidden' }}>
            <WindowBar title={`${data.client.toLowerCase().replace(/\s+/g, '-')} · admin`} />
            <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
              <Typography variant="body2" color="text.secondary">
                {data.client} · {data.period}
              </Typography>
              <Box
                component="dl"
                sx={{
                  m: 0,
                  mt: 2.5,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: { xs: 2, md: 2.5 },
                }}
              >
                {data.metrics.map((metric) => (
                  <Box
                    key={metric.label}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column-reverse',
                      gap: 0.5,
                      p: { xs: 2, md: 2.5 },
                      borderRadius: '16px',
                      bgcolor: 'surface.alt',
                      border: 1,
                      borderColor: 'divider',
                    }}
                  >
                    <Box component="dt" sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                      {metric.label}
                    </Box>
                    <Box
                      component="dd"
                      sx={{
                        m: 0,
                        fontFamily: fonts.display,
                        fontWeight: 600,
                        fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1.1,
                      }}
                    >
                      <CountUp value={metric.value} />
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    color: 'text.secondary',
                    mb: 1,
                  }}
                >
                  <span>Orders by source</span>
                  <span>
                    {organic.label} {organic.share}%
                  </span>
                </Box>
                <Box
                  role="img"
                  aria-label={`${organic.label} ${organic.share}%, others ${100 - organic.share}%`}
                  sx={{
                    height: 10,
                    borderRadius: 999,
                    overflow: 'hidden',
                    bgcolor: 'chart.secondary',
                  }}
                >
                  <Box
                    component={m.div}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: organic.share / 100 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 1.4, ease: easeCurve, delay: 0.2 }}
                    sx={{ height: '100%', bgcolor: 'chart.primary', transformOrigin: '0 50%' }}
                  />
                </Box>
              </Box>
            </Box>
          </SurfaceCard>
        </Tilt3D>
      </Box>

      <Reveal delay={0.1}>
        <Typography variant="overline" color="accent.text">
          Case study · Full-stack e-commerce
        </Typography>
        <Typography variant="h3" sx={{ mt: 1, fontSize: 'clamp(1.5rem, 2.4vw, 2rem)' }}>
          From storefront to admin portal — built, launched and run on AWS.
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          {data.client} needed more than a website. We built the store, the backend and a custom
          admin portal that tracks every order, payment and traffic source — so the team knows
          exactly what drives revenue.
        </Typography>
        <Button
          component={Link}
          href="/work"
          variant="outlined"
          endIcon={<ArrowForwardRounded />}
          sx={{ mt: 3 }}
        >
          Read the case study
        </Button>
      </Reveal>
    </Box>
  );
}
