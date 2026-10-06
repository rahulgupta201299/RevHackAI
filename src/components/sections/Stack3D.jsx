import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { stackLayers } from '../../content/profile';
import { fonts } from '../../theme';
import Reveal from '../ui/Reveal';

const colors = ['#ff6a2b', '#ff9a3d', '#4ade80', '#7aa2ff', '#c4a5ff'];

/** One translucent plate of the isometric stack. */
function Plate({ layer, index, total, gap, active, color }) {
  // Top of the list (Experience) sits at the top of the stack.
  const level = total - 1 - index;
  const lift = useMotionValue(0);
  const liftSpring = useSpring(lift, { stiffness: 260, damping: 22 });
  const z = useTransform([gap, liftSpring], ([g, l]) => level * g + l);

  useEffect(() => {
    lift.set(active ? 22 : 0);
  }, [active, lift]);

  return (
    <Box
      component={m.div}
      style={{ z }}
      sx={{
        position: 'absolute',
        inset: 0,
        borderRadius: '28px',
        border: '1.5px solid',
        borderColor: color,
        background: `linear-gradient(135deg, ${color}40, ${color}14)`,
        boxShadow: active
          ? `0 0 0 1px ${color}, 0 30px 60px -20px ${color}`
          : `0 20px 40px -24px rgba(0,0,0,0.45)`,
        transition: 'box-shadow .35s ease',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        p: 2.5,
      }}
    >
      {/* Mini "UI" drawn on each plate so it reads as a layer of a product. */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: '18% 16% auto auto',
          width: '38%',
          display: 'grid',
          gap: 1,
          opacity: 0.8,
        }}
      >
        {[1, 0.7, 0.45].map((w) => (
          <Box key={w} sx={{ height: 8, width: `${w * 100}%`, borderRadius: 4, bgcolor: color }} />
        ))}
      </Box>
      <Typography
        sx={{
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: '1.15rem',
          color: 'text.primary',
          letterSpacing: '-0.02em',
        }}
      >
        {layer.layer}
      </Typography>
    </Box>
  );
}

/**
 * "Every layer, one partner": an isometric 3D stack of the product layers that explodes apart
 * as you scroll, with a linked list — hovering or focusing a row lifts its plate.
 */
export default function Stack3D({ layers = stackLayers }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const raw = useTransform(scrollYProgress, [0, 1], reduce ? [56, 56] : [10, 62]);
  const gap = useSpring(raw, { stiffness: 90, damping: 20 });
  const spin = useTransform(scrollYProgress, [0, 1], reduce ? [-40, -40] : [-58, -40]);

  return (
    <Box
      ref={ref}
      sx={{
        display: 'grid',
        gap: { xs: 4, md: 6 },
        alignItems: 'center',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 0.95fr) minmax(0, 1.05fr)' },
      }}
    >
      <Box
        component="ol"
        sx={{ m: 0, p: 0, listStyle: 'none', display: 'grid', gap: 1, order: { xs: 1, md: 0 } }}
      >
        {layers.map((layer, index) => (
          <Reveal
            as="li"
            key={layer.layer}
            delay={index * 0.06}
            tabIndex={0}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            sx={{
              display: 'grid',
              gridTemplateColumns: '14px 1fr',
              gap: 2,
              alignItems: 'start',
              p: 2,
              borderRadius: 3,
              border: 1,
              borderColor: active === index ? 'line.strong' : 'transparent',
              bgcolor: active === index ? 'background.paper' : 'transparent',
              cursor: 'default',
              transition: 'background-color .25s ease, border-color .25s ease',
              outline: 'none',
              '&:focus-visible': { borderColor: 'secondary.main' },
            }}
          >
            <Box
              aria-hidden="true"
              sx={{
                mt: '6px',
                width: 14,
                height: 14,
                borderRadius: '4px',
                bgcolor: colors[index % colors.length],
              }}
            />
            <Box>
              <Typography variant="h4" component="h3">
                {layer.layer}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {layer.detail}
              </Typography>
              <Typography variant="mono" color="text.secondary" sx={{ fontSize: '0.78rem' }}>
                {layer.tech.join(' · ')}
              </Typography>
            </Box>
          </Reveal>
        ))}
      </Box>

      <Box
        aria-hidden="true"
        sx={{
          position: 'relative',
          height: { xs: 380, sm: 460, md: 540 },
          perspective: 1800,
          display: 'grid',
          placeItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: '20%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(122, 162, 255, 0.25), transparent 65%)',
            filter: 'blur(30px)',
          }}
        />
        <Box
          component={m.div}
          style={{ rotateX: 58, rotateZ: spin }}
          sx={{
            position: 'relative',
            width: { xs: 200, sm: 250, md: 290 },
            height: { xs: 200, sm: 250, md: 290 },
            transformStyle: 'preserve-3d',
            mt: { xs: 8, md: 10 },
          }}
        >
          {layers.map((layer, index) => (
            <Plate
              key={layer.layer}
              layer={layer}
              index={index}
              total={layers.length}
              gap={gap}
              active={active === index}
              color={colors[index % colors.length]}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
