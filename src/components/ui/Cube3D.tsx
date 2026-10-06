'use client';

import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';
import { mergeSx, type Sx } from './mergeSx';

const spin = keyframes`
  from { transform: rotateX(-24deg) rotateY(0deg); }
  to { transform: rotateX(-24deg) rotateY(360deg); }
`;
const spinInner = keyframes`
  from { transform: rotateX(45deg) rotateY(360deg) rotateZ(0deg); }
  to { transform: rotateX(45deg) rotateY(0deg) rotateZ(360deg); }
`;

const faces = [
  'rotateY(0deg)',
  'rotateY(90deg)',
  'rotateY(180deg)',
  'rotateY(-90deg)',
  'rotateX(90deg)',
  'rotateX(-90deg)',
];

function Faces({ size, color, fill }: { size: number; color: string; fill: string }) {
  return faces.map((rot) => (
    <Box
      key={rot}
      sx={{
        position: 'absolute',
        inset: 0,
        border: `1.5px solid ${color}`,
        borderRadius: '14%',
        background: fill,
        transform: `${rot} translateZ(${size / 2}px)`,
        boxShadow: `inset 0 0 ${size / 4}px ${color}55`,
      }}
    />
  ));
}

/** Decorative, pure-CSS rotating glass cube with a counter-rotating core. */
export default function Cube3D({ size = 180, sx }: { size?: number; sx?: Sx }) {
  const inner = size * 0.45;

  return (
    <Box
      aria-hidden="true"
      sx={mergeSx(
        {
          width: size,
          height: size,
          perspective: size * 5,
          pointerEvents: 'none',
        },
        sx,
      )}
    >
      <Box
        sx={{
          position: 'relative',
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          animation: `${spin} 18s linear infinite`,
        }}
      >
        <Faces size={size} color="#ff8a57" fill="rgba(255, 106, 43, 0.06)" />
        <Box
          sx={{
            position: 'absolute',
            left: (size - inner) / 2,
            top: (size - inner) / 2,
            width: inner,
            height: inner,
            transformStyle: 'preserve-3d',
            animation: `${spinInner} 9s linear infinite`,
          }}
        >
          <Faces size={inner} color="#7aa2ff" fill="rgba(122, 162, 255, 0.22)" />
        </Box>
      </Box>
    </Box>
  );
}
