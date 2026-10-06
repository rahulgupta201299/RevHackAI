import Box from '@mui/material/Box';
import { m } from 'framer-motion';
import { easeCurve } from '../../theme';

/** Content tips up out of the page in 3D (from slightly behind and below) as it scrolls in. */
const variants = {
  hidden: { opacity: 0, y: 40, rotateX: 14, scale: 0.97 },
  visible: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
};

/** Fades content in once when it scrolls into view. Respects reduced-motion (MotionConfig). */
export default function Reveal({ as = 'div', delay = 0, style, children, ...rest }) {
  return (
    <Box
      component={m[as]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
      transition={{ duration: 0.8, ease: easeCurve, delay }}
      style={{ transformPerspective: 1200, transformOrigin: '50% 100%', ...style }}
      {...rest}
    >
      {children}
    </Box>
  );
}
