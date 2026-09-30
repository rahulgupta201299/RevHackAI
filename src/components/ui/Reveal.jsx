import Box from '@mui/material/Box';
import { m } from 'framer-motion';
import { easeCurve } from '../../theme';

const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/** Fades content in once when it scrolls into view. Respects reduced-motion (MotionConfig). */
export default function Reveal({ as = 'div', delay = 0, children, ...rest }) {
  return (
    <Box
      component={m[as]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
      transition={{ duration: 0.6, ease: easeCurve, delay }}
      {...rest}
    >
      {children}
    </Box>
  );
}
