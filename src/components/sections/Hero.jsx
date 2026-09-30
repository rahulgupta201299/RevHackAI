import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material/styles';
import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { site } from '../../content/site';
import { easeCurve, fonts, shadows } from '../../theme';
import GridBackdrop from '../ui/GridBackdrop';
import WindowBar from '../ui/WindowBar';

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
  70% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeCurve } },
};

const pipeline = [
  { label: 'frontend built', meta: 'web · mobile-ready' },
  { label: 'api tests passed', meta: 'node.js' },
  { label: 'database migrated', meta: 'postgres' },
  { label: 'infrastructure ready', meta: 'aws' },
  { label: 'deployed', meta: 'cdn + autoscaling' },
];

const techLine = ['Full-stack', 'Node.js', 'AWS', 'AI-first', 'Banking-grade security'];

function TerminalCard() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        borderRadius: 5,
        overflow: 'hidden',
        bgcolor: '#111113',
        color: '#e8e8ea',
        border: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        boxShadow: shadows.lg,
      }}
    >
      <WindowBar title="~/your-product" dark />
      <Box
        sx={{
          p: { xs: 2.5, sm: 3 },
          fontFamily: fonts.mono,
          fontSize: { xs: '0.78rem', sm: '0.85rem' },
          lineHeight: 2,
        }}
      >
        <Box>
          <Box component="span" sx={{ color: '#ff8a57' }}>
            $
          </Box>{' '}
          revhack ship --env production
        </Box>
        {pipeline.map((step) => (
          <Box key={step.label} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <span>
              <Box component="span" sx={{ color: '#4ade80' }}>
                ✓
              </Box>{' '}
              {step.label}
            </span>
            <Box component="span" sx={{ color: '#8b8b93' }}>
              {step.meta}
            </Box>
          </Box>
        ))}
        <Box sx={{ color: '#ff8a57', mt: 0.5 }}>→ live. ready to scale 2–4×</Box>
      </Box>
    </Box>
  );
}

function FloatCard({ children, sx }) {
  return (
    <Box
      aria-hidden="true"
      sx={[
        {
          position: 'absolute',
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1.5,
          borderRadius: 4,
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          boxShadow: shadows.lg,
          animation: `${float} 6s ease-in-out infinite`,
        },
        sx,
      ]}
    >
      {children}
    </Box>
  );
}

export default function Hero() {
  return (
    <Box
      component="section"
      aria-labelledby="hero-title"
      sx={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        pt: { xs: 7, md: 11 },
        pb: { xs: 9, md: 13 },
      }}
    >
      <GridBackdrop />
      <Container
        sx={{
          display: 'grid',
          alignItems: 'center',
          gap: { xs: 7, md: 6 },
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.1fr) minmax(0, 0.9fr)' },
        }}
      >
        <Box component={m.div} initial="hidden" animate="visible" variants={stagger}>
          <Box
            component={m.p}
            variants={rise}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              px: 1.75,
              py: 0.75,
              mb: 3,
              borderRadius: 999,
              border: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              fontSize: '0.85rem',
              fontWeight: 500,
            }}
          >
            <Box
              component="span"
              aria-hidden="true"
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: '#22c55e',
                animation: `${pulse} 2s infinite`,
              }}
            />
            {site.availability}
          </Box>

          <m.div variants={rise}>
            <Typography id="hero-title" variant="h1">
              Build, ship and scale your product —{' '}
              <Box component="span" sx={{ color: 'accent.text' }}>
                end to end.
              </Box>
            </Typography>
          </m.div>

          <m.div variants={rise}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mt: 3, maxWidth: '38rem' }}
            >
              An AI-first engineering studio led by a senior full-stack engineer. We design, build
              and deploy complete products — frontend, Node.js backend, data and AWS cloud —
              engineered to help your business grow 2–4×.
            </Typography>
          </m.div>

          <Stack
            component={m.div}
            variants={rise}
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ mt: 4 }}
          >
            <Button
              component={RouterLink}
              to="/contact"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardRounded />}
            >
              Start a project
            </Button>
            <Button component={RouterLink} to="/work" variant="outlined" size="large">
              See our work
            </Button>
          </Stack>

          <Box
            component={m.ul}
            variants={rise}
            aria-label="Core capabilities"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px 18px',
              mt: 4,
              p: 0,
              listStyle: 'none',
            }}
          >
            {techLine.map((item) => (
              <Typography
                component="li"
                variant="mono"
                key={item}
                color="text.secondary"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  '&::before': { content: '"▸"', color: 'accent.text' },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box
          component={m.div}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: easeCurve }}
          sx={{ position: 'relative', px: { sm: 3 }, py: { sm: 5 } }}
        >
          <TerminalCard />
          <FloatCard sx={{ top: 0, right: 0 }}>
            <Typography
              sx={{
                fontFamily: fonts.display,
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'accent.text',
              }}
            >
              2–4×
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.3 }}>
              Growth-ready
              <br />
              architecture
            </Typography>
          </FloatCard>
          <FloatCard sx={{ bottom: 0, left: 0, animationDelay: '-3s' }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'success.main' }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Deployed on AWS
            </Typography>
          </FloatCard>
        </Box>
      </Container>
    </Box>
  );
}
