'use client';

import Box from '@mui/material/Box';

/** Decorative grid + glow used behind hero areas. */
export default function GridBackdrop() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        backgroundImage: (t) =>
          `radial-gradient(circle at 78% 12%, ${t.vars.palette.accent.soft}, transparent 42%),
           linear-gradient(${t.vars.palette.line.grid} 1px, transparent 1px),
           linear-gradient(90deg, ${t.vars.palette.line.grid} 1px, transparent 1px)`,
        backgroundSize: 'auto, 56px 56px, 56px 56px',
        maskImage: 'linear-gradient(to bottom, #000 55%, transparent)',
      }}
    />
  );
}
