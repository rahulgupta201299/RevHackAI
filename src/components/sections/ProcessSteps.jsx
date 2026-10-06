import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';
import { process } from '../../content/services';
import { easeCurve } from '../../theme';
import CardGrid from '../ui/CardGrid';
import Reveal from '../ui/Reveal';

export default function ProcessSteps({ steps = process }) {
  return (
    <CardGrid component="ol" columns={{ xs: 1, sm: 2, lg: 4 }} gap={{ xs: 4, md: 3 }}>
      {steps.map((step, index) => (
        <Reveal as="li" key={step.step} delay={index * 0.08} sx={{ position: 'relative', pt: 3 }}>
          {/* Track + fill: the line "draws" step by step as the section scrolls in. */}
          <Box
            aria-hidden="true"
            sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, bgcolor: 'divider' }}
          >
            <Box
              component={m.div}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, ease: easeCurve, delay: 0.2 + index * 0.25 }}
              sx={{
                height: '100%',
                transformOrigin: '0 50%',
                background: 'linear-gradient(90deg, #ff4d08, #ff9a3d)',
              }}
            />
          </Box>
          <Box
            component={m.span}
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: easeCurve, delay: 0.2 + index * 0.25 }}
            aria-hidden="true"
            sx={{
              position: 'absolute',
              top: -5,
              left: 0,
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: 'secondary.main',
              boxShadow: '0 0 0 4px rgba(255, 106, 43, 0.18)',
            }}
          />
          <Typography variant="mono" sx={{ color: 'accent.text', fontWeight: 600 }}>
            {step.step}
          </Typography>
          <Typography variant="h3" sx={{ mt: 1.5, fontSize: '1.5rem' }}>
            {step.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.25 }}>
            {step.copy}
          </Typography>
        </Reveal>
      ))}
    </CardGrid>
  );
}
