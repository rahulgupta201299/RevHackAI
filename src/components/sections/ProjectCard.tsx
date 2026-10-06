'use client';

import ArrowOutwardRounded from '@mui/icons-material/ArrowOutwardRounded';
import LockOutlined from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material/styles';
import { AnimatePresence, m, useInView, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Project, ProjectPreview } from '../../content/types';
import { projectCategories } from '../../content/work';
import SurfaceCard from '../ui/SurfaceCard';
import TagList from '../ui/TagList';
import { visuallyHidden } from '../ui/visuallyHidden';
import WindowBar from '../ui/WindowBar';

/** Height of the preview "screen" relative to its width (16:10 browser viewport). */
const SCREEN_RATIO = 10 / 16;

// Touch devices (no hover) get a slow automatic scroll through the page instead.
const autoScroll = keyframes`
  0%, 12% { transform: translateY(0); }
  50%, 62% { transform: translateY(var(--scroll-to)); }
  100% { transform: translateY(0); }
`;

const categoryLabel = (id: Project['category']) =>
  projectCategories.find((c) => c.id === id)?.label ?? id;

function hostOf(url?: string) {
  return url ? new URL(url).host.replace(/^www\./, '') : 'confidential';
}

/** Full-page screenshot that scrolls inside the frame on hover (or automatically on touch). */
function ScrollPreview({ preview }: { preview: Extract<ProjectPreview, { type: 'scroll' }> }) {
  const { width, height } = preview.image;
  // How far the image must move up for its bottom to reach the bottom of the frame.
  const travel = `-${(1 - (width * SCREEN_RATIO) / height) * 100}%`;

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        '& img': {
          display: 'block',
          width: '100%',
          height: 'auto',
          transform: 'translateY(0)',
          transition: 'transform 5s cubic-bezier(0.45, 0, 0.55, 1)',
          willChange: 'transform',
        },
        '.project-card:hover & img, .project-card:focus-within & img': {
          transform: `translateY(${travel})`,
        },
        '@media (hover: none)': {
          '& img': { '--scroll-to': travel, animation: `${autoScroll} 16s ease-in-out infinite` },
        },
      }}
    >
      <Image
        src={preview.image}
        alt={preview.alt}
        sizes="(max-width: 900px) 100vw, 600px"
        placeholder="blur"
      />
    </Box>
  );
}

/** Crossfading slideshow of a few app screens, with a caption for each. */
function SlidesPreview({ preview }: { preview: Extract<ProjectPreview, { type: 'slides' }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const slide = preview.slides[index];

  useEffect(() => {
    if (!inView || reduce) return undefined;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % preview.slides.length), 3800);
    return () => window.clearInterval(id);
  }, [inView, reduce, preview.slides.length]);

  return (
    <Box ref={ref} sx={{ position: 'absolute', inset: 0, bgcolor: '#0b0b0d' }}>
      <AnimatePresence initial={false}>
        <Box
          component={m.div}
          key={index}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          sx={{ position: 'absolute', inset: 0 }}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            sizes="(max-width: 900px) 100vw, 600px"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
        </Box>
      </AnimatePresence>
      <Box
        sx={{
          position: 'absolute',
          left: 12,
          bottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.25,
          py: 0.5,
          borderRadius: 999,
          bgcolor: 'rgba(17, 17, 19, 0.72)',
          backdropFilter: 'blur(8px)',
          color: '#fafaf7',
          fontSize: '0.75rem',
          fontWeight: 600,
        }}
      >
        {preview.slides.map((s, i) => (
          <Box
            key={s.caption}
            component="button"
            type="button"
            aria-label={`Show screen: ${s.caption}`}
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
            sx={{
              p: 0,
              width: i === index ? 16 : 6,
              height: 6,
              border: 0,
              borderRadius: 999,
              cursor: 'pointer',
              bgcolor: i === index ? '#ff8a57' : 'rgba(250,250,247,0.5)',
              transition: 'width .3s ease',
            }}
          />
        ))}
        <Box component="span" sx={{ ml: 0.5 }}>
          {slide.caption}
        </Box>
      </Box>
    </Box>
  );
}

/** NDA placeholder: an abstract, blurred UI with a lock — no real screens. */
function ConfidentialPreview() {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f1b33 0%, #1d3b6e 55%, #2a78d6 100%)',
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: '12% 10%',
          display: 'grid',
          gap: 1.5,
          gridTemplateColumns: '1fr 1fr 1fr',
          filter: 'blur(6px)',
          opacity: 0.55,
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <Box key={i} sx={{ borderRadius: 2, bgcolor: 'rgba(255,255,255,0.18)' }} />
        ))}
      </Box>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1,
          borderRadius: 999,
          bgcolor: 'rgba(11, 11, 13, 0.6)',
          color: '#fafaf7',
          fontWeight: 600,
          fontSize: '0.9rem',
        }}
      >
        <LockOutlined sx={{ fontSize: 18 }} />
        Under NDA · details confidential
      </Box>
    </Box>
  );
}

function Preview({ project }: { project: Project }) {
  const { preview } = project;
  const screen = (
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '16 / 10',
        overflow: 'hidden',
        bgcolor: 'surface.alt',
      }}
    >
      {preview.type === 'scroll' && <ScrollPreview preview={preview} />}
      {preview.type === 'slides' && <SlidesPreview preview={preview} />}
      {preview.type === 'confidential' && <ConfidentialPreview />}
      {project.highlight && (
        <Box
          sx={{
            position: 'absolute',
            left: 12,
            bottom: 12,
            zIndex: 1,
            display: 'flex',
            alignItems: 'baseline',
            gap: 1,
            px: 1.5,
            py: 0.75,
            borderRadius: 999,
            bgcolor: 'rgba(17, 17, 19, 0.78)',
            backdropFilter: 'blur(8px)',
            color: '#fafaf7',
            pointerEvents: 'none',
          }}
        >
          <Box component="span" sx={{ fontWeight: 700, color: '#ff8a57', fontSize: '1rem' }}>
            {project.highlight.value}
          </Box>
          <Box component="span" sx={{ fontSize: '0.78rem', fontWeight: 500 }}>
            {project.highlight.label}
          </Box>
        </Box>
      )}
    </Box>
  );

  return (
    <Box
      data-depth="2"
      sx={{
        m: 1.5,
        mb: 0,
        borderRadius: 4,
        overflow: 'hidden',
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <WindowBar title={hostOf(project.url)} />
      {project.url && preview.type === 'scroll' ? (
        <Box
          component="a"
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          sx={{ display: 'block' }}
        >
          {screen}
        </Box>
      ) : (
        screen
      )}
    </Box>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <SurfaceCard
      interactive
      component="article"
      className="project-card"
      sx={{ p: 0, display: 'flex', flexDirection: 'column', overflow: 'visible' }}
    >
      <Preview project={project} />
      <Box
        sx={{
          p: { xs: 2.75, md: 3.5 },
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          flex: 1,
        }}
      >
        <Typography variant="overline" color="accent.text">
          {categoryLabel(project.category)}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.25 }}>
          <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
            {project.name}
          </Typography>
          {project.badge && (
            <Chip
              size="small"
              label={project.badge}
              sx={{ bgcolor: 'accent.soft', color: 'accent.text', borderColor: 'transparent' }}
            />
          )}
        </Box>
        <Typography variant="body2" sx={{ mt: -0.75, fontWeight: 500 }}>
          {project.kind}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.description}
        </Typography>
        <TagList
          tags={project.deliverables}
          label={`${project.name} deliverables`}
          sx={{ mt: 0.5 }}
        />
        {project.url && (
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              mt: 'auto',
              pt: 1.5,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              fontWeight: 600,
            }}
          >
            Visit live site
            <ArrowOutwardRounded fontSize="small" aria-hidden="true" />
            <Box component="span" sx={visuallyHidden}>
              (opens in a new tab)
            </Box>
          </Link>
        )}
      </Box>
    </SurfaceCard>
  );
}
