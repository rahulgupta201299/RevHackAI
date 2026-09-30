import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';
import { easeCurve } from '../../theme';
import Eyebrow from './Eyebrow';
import GridBackdrop from './GridBackdrop';

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeCurve } },
};

/** Intro block at the top of inner pages. */
export default function PageHeader({ eyebrow, title, intro, children }) {
  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        pt: { xs: 8, md: 12 },
        pb: { xs: 7, md: 10 },
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <GridBackdrop />
      <Container>
        <Box
          component={m.div}
          initial="hidden"
          animate="visible"
          variants={container}
          sx={{ maxWidth: '52rem' }}
        >
          {eyebrow && (
            <m.div variants={item}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </m.div>
          )}
          <m.div variants={item}>
            <Typography variant="h1">{title}</Typography>
          </m.div>
          {intro && (
            <m.div variants={item}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mt: 3, maxWidth: '44rem' }}
              >
                {intro}
              </Typography>
            </m.div>
          )}
          {children && (
            <Box component={m.div} variants={item} sx={{ mt: 4 }}>
              {children}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
