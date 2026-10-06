'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { site } from '../../content/site';
import ContactForm from '../sections/ContactForm';
import CheckList from '../ui/CheckList';
import PageHeader from '../ui/PageHeader';
import { sectionY } from '../../theme';

const nextSteps = [
  'A short call to understand your goals and current setup',
  'A clear proposal: scope, architecture, timeline and cost',
  'Weekly demos while we build, then deployment to AWS',
];

export default function ContactView() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let’s build something that grows."
        intro="Share where your product or business is today. We’ll reply with practical next steps — no obligation."
      />
      <Box component="section" aria-label="Contact form" sx={{ py: sectionY }}>
        <Container
          sx={{
            display: 'grid',
            gap: { xs: 5, md: 8 },
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 0.8fr) minmax(0, 1.2fr)' },
            alignItems: 'start',
          }}
        >
          <Box>
            <Typography variant="h3" component="h2" sx={{ fontSize: '1.5rem' }}>
              What happens next
            </Typography>
            <Box sx={{ mt: 2.5 }}>
              <CheckList items={nextSteps} />
            </Box>
            <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
              <Typography variant="overline" color="text.secondary">
                Availability
              </Typography>
              <Typography sx={{ mt: 0.5, fontWeight: 600 }}>{site.availability}</Typography>
              <Typography variant="body2" color="text.secondary">
                {site.responseTime}
              </Typography>
            </Box>
          </Box>
          <ContactForm />
        </Container>
      </Box>
    </>
  );
}
