import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useId } from 'react';
import { sectionY } from '../../theme';
import Eyebrow from './Eyebrow';
import { mergeSx } from './mergeSx';
import Reveal from './Reveal';

/**
 * Page section with an optional heading block.
 * `alt` uses the alternate surface colour to separate adjacent sections.
 */
export default function Section({ id, eyebrow, title, intro, action, alt = false, sx, children }) {
  const headingId = useId();

  return (
    <Box
      component="section"
      id={id}
      aria-labelledby={title ? headingId : undefined}
      sx={mergeSx(
        [
          { py: sectionY },
          alt && { bgcolor: 'surface.alt', borderTop: 1, borderBottom: 1, borderColor: 'divider' },
        ],
        sx,
      )}
    >
      <Container>
        {title && (
          <Reveal
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 3,
              mb: { xs: 5, md: 7 },
            }}
          >
            <Box sx={{ maxWidth: '46rem' }}>
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              <Typography id={headingId} variant="h2">
                {title}
              </Typography>
              {intro && (
                <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
                  {intro}
                </Typography>
              )}
            </Box>
            {action}
          </Reveal>
        )}
        {children}
      </Container>
    </Box>
  );
}
