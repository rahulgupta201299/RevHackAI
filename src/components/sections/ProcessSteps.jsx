import Typography from '@mui/material/Typography';
import { process } from '../../content/services';
import CardGrid from '../ui/CardGrid';
import Reveal from '../ui/Reveal';

export default function ProcessSteps({ steps = process }) {
  return (
    <CardGrid component="ol" columns={{ xs: 1, sm: 2, lg: 4 }} gap={{ xs: 4, md: 3 }}>
      {steps.map((step, index) => (
        <Reveal
          as="li"
          key={step.step}
          delay={index * 0.08}
          sx={{ pt: 3, borderTop: 2, borderColor: 'text.primary' }}
        >
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
