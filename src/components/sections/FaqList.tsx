'use client';

import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { faqs as allFaqs } from '../../content/whyUs';
import Reveal from '../ui/Reveal';

export default function FaqList({ faqs = allFaqs }) {
  return (
    <Reveal sx={{ maxWidth: '52rem', borderTop: 1, borderColor: 'divider' }}>
      {faqs.map((faq, index) => (
        <Accordion key={faq.question}>
          <AccordionSummary
            expandIcon={<ExpandMoreRounded />}
            id={`faq-${index}-header`}
            aria-controls={`faq-${index}-content`}
          >
            <Box component="span" sx={{ fontWeight: 600, fontSize: '1.05rem' }}>
              {faq.question}
            </Box>
          </AccordionSummary>
          <AccordionDetails id={`faq-${index}-content`}>
            <Typography color="text.secondary">{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Reveal>
  );
}
