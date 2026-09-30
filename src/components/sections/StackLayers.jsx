import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { stackLayers } from '../../content/profile';
import { fonts } from '../../theme';
import Reveal from '../ui/Reveal';
import SurfaceCard from '../ui/SurfaceCard';

/** The end-to-end stack: every layer a product needs, delivered by one team. */
export default function StackLayers() {
  return (
    <SurfaceCard component="ol" sx={{ p: 0, m: 0, listStyle: 'none', overflow: 'hidden' }}>
      {stackLayers.map((row, index) => (
        <Reveal
          as="li"
          key={row.layer}
          delay={index * 0.05}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '64px 220px 1fr auto' },
            alignItems: 'center',
            gap: { xs: 1.5, md: 3 },
            px: { xs: 2.5, md: 4 },
            py: { xs: 2.5, md: 3 },
            borderTop: index === 0 ? 0 : 1,
            borderColor: 'divider',
            transition: 'background-color .2s ease',
            '&:hover': { bgcolor: 'surface.muted' },
          }}
        >
          <Typography
            variant="mono"
            sx={{ color: 'accent.text', display: { xs: 'none', md: 'block' } }}
          >
            {String(index + 1).padStart(2, '0')}
          </Typography>
          <Typography
            component="h3"
            sx={{ fontFamily: fonts.display, fontSize: '1.35rem', fontWeight: 600 }}
          >
            {row.layer}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {row.detail}
          </Typography>
          <Box
            component="ul"
            aria-label={`${row.layer} technologies`}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: { md: 'flex-end' },
              gap: 0.75,
              m: 0,
              p: 0,
              listStyle: 'none',
            }}
          >
            {row.tech.map((tech) => (
              <Chip component="li" key={tech} label={tech} size="small" />
            ))}
          </Box>
        </Reveal>
      ))}
    </SurfaceCard>
  );
}
