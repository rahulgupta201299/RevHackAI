'use client';

import Box from '@mui/material/Box';
import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { mergeSx, type Sx } from './mergeSx';
import type { PointerEvent, ReactNode } from 'react';

const spring = { stiffness: 220, damping: 22, mass: 0.6 };

/**
 * Wraps content in a 3D tilt that follows the mouse, with a soft light glare.
 * Mark children with data-depth="1" | "2" | "3" to lift them off the card in 3D.
 * Touch and reduced-motion users get the content without the effect.
 */
interface Tilt3DProps {
  children?: ReactNode;
  /** Maximum tilt in degrees. */
  max?: number;
  glare?: boolean;
  sx?: Sx;
}

export default function Tilt3D({ children, max = 9, glare = true, sx }: Tilt3DProps) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const active = useMotionValue(0);

  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const glareOpacity = useSpring(active, { stiffness: 160, damping: 24 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.22), transparent 55%)`;

  if (reduce) {
    return <Box sx={mergeSx({ height: '100%' }, sx)}>{children}</Box>;
  }

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
    active.set(1);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
    active.set(0);
  };

  return (
    <Box
      component={m.div}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      sx={mergeSx(
        {
          position: 'relative',
          height: '100%',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          // Keep the 3D context through the card so [data-depth] layers pop off its surface.
          '& > *, & > * > *, & > * > * > *': { transformStyle: 'preserve-3d' },
          '& [data-depth="1"]': { transform: 'translateZ(24px)' },
          '& [data-depth="2"]': { transform: 'translateZ(48px)' },
          '& [data-depth="3"]': { transform: 'translateZ(72px)' },
        },
        sx,
      )}
    >
      {children}
      {glare && (
        <Box
          component={m.div}
          aria-hidden="true"
          style={{ background: glareBg, opacity: glareOpacity }}
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            mixBlendMode: 'soft-light',
            zIndex: 2,
          }}
        />
      )}
    </Box>
  );
}
