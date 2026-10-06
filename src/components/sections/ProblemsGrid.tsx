'use client';

import EastRounded from '@mui/icons-material/EastRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { problems } from '../../content/home';
import CardGrid from '../ui/CardGrid';
import IconTile from '../ui/IconTile';
import Reveal from '../ui/Reveal';
import SurfaceCard from '../ui/SurfaceCard';
import Tilt3D from '../ui/Tilt3D';

/** "Sound familiar?" — the problems clients arrive with, and what we do about each. */
export default function ProblemsGrid({ items = problems }) {
  return (
    <CardGrid component="ul" columns={{ xs: 1, sm: 2, lg: 4 }} gap={2.5}>
      {items.map((item, index) => (
        <Reveal as="li" key={item.pain} delay={index * 0.07} sx={{ height: '100%' }}>
          <Tilt3D sx={{ borderRadius: '24px' }}>
            <SurfaceCard
              component="article"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                position: 'relative',
                overflow: 'visible',
                transition: 'border-color .3s ease',
                '&:hover': { borderColor: 'line.strong' },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'inherit',
                  background:
                    'radial-gradient(120% 60% at 0% 0%, rgba(255, 106, 43, 0.10), transparent 60%)',
                  pointerEvents: 'none',
                },
              }}
            >
              <Box data-depth="3" sx={{ width: 'fit-content' }}>
                <IconTile icon={item.icon} />
              </Box>
              <Typography data-depth="2" variant="h3" component="h3" sx={{ fontSize: '1.15rem' }}>
                {item.pain}
              </Typography>
              <Box
                data-depth="1"
                sx={{
                  pt: 2,
                  borderTop: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  gap: 1.25,
                }}
              >
                <EastRounded
                  aria-hidden="true"
                  sx={{ fontSize: 18, mt: '3px', color: 'accent.text', flex: 'none' }}
                />
                <Typography variant="body2" color="text.secondary">
                  {item.fix}
                </Typography>
              </Box>
            </SurfaceCard>
          </Tilt3D>
        </Reveal>
      ))}
    </CardGrid>
  );
}
