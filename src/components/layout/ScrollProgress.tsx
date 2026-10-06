'use client';

import Box from '@mui/material/Box';
import { m, useScroll, useSpring } from 'framer-motion';

/** Thin reading-progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <Box
      component={m.div}
      aria-hidden="true"
      style={{ scaleX }}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: (t) => t.zIndex.appBar + 1,
        transformOrigin: '0 50%',
        background: 'linear-gradient(90deg, #ff4d08, #ff9a3d 60%, #7aa2ff)',
        pointerEvents: 'none',
      }}
    />
  );
}
