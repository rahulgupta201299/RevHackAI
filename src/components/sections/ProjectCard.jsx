import ArrowOutwardRounded from '@mui/icons-material/ArrowOutwardRounded';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import SurfaceCard from '../ui/SurfaceCard';
import TagList from '../ui/TagList';
import { visuallyHidden } from '../ui/visuallyHidden';
import WindowBar from '../ui/WindowBar';

const tones = {
  ember: 'linear-gradient(135deg, #ff4d08 0%, #ff9a3d 100%)',
  ocean: 'linear-gradient(135deg, #1d4ed8 0%, #38bdf8 100%)',
};

/** Decorative drawn preview so no screenshots are needed. */
function Preview({ tone }) {
  const bar = { height: 8, borderRadius: 999, bgcolor: 'divider' };

  return (
    <Box
      aria-hidden="true"
      sx={{
        m: 1.5,
        mb: 0,
        borderRadius: 4,
        overflow: 'hidden',
        border: 1,
        borderColor: 'divider',
        bgcolor: 'surface.alt',
      }}
    >
      <WindowBar />
      <Box sx={{ p: 2.5, display: 'grid', gap: 1.5 }}>
        <Box sx={{ height: 88, borderRadius: 3, background: tones[tone] ?? tones.ember }} />
        <Box sx={{ ...bar, width: '70%' }} />
        <Box sx={{ ...bar, width: '45%' }} />
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                height: 44,
                borderRadius: 2,
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default function ProjectCard({ project }) {
  return (
    <SurfaceCard
      interactive
      component="article"
      sx={{ p: 0, display: 'flex', flexDirection: 'column' }}
    >
      <Preview tone={project.tone} />
      <Box
        sx={{
          p: { xs: 2.75, md: 3.5 },
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          flex: 1,
        }}
      >
        <Typography variant="overline" color="accent.text">
          {project.category}
        </Typography>
        <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
          {project.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.description}
        </Typography>
        <TagList
          tags={project.deliverables}
          label={`${project.name} deliverables`}
          sx={{ mt: 0.5 }}
        />
        <Link
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            mt: 'auto',
            pt: 1.5,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            fontWeight: 600,
          }}
        >
          Visit live site
          <ArrowOutwardRounded fontSize="small" aria-hidden="true" />
          <Box component="span" sx={visuallyHidden}>
            (opens in a new tab)
          </Box>
        </Link>
      </Box>
    </SurfaceCard>
  );
}
