import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { experience } from '../../content/profile';
import CheckList from '../ui/CheckList';
import Reveal from '../ui/Reveal';

export default function ExperienceTimeline({ items = experience }) {
  return (
    <Box component="ol" sx={{ m: 0, p: 0, listStyle: 'none' }}>
      {items.map((job) => (
        <Reveal
          as="li"
          key={job.role}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '240px minmax(0, 1fr)' },
            gap: { xs: 2, md: 5 },
            py: { xs: 4, md: 5 },
            borderTop: 1,
            borderColor: 'divider',
            '&:last-of-type': { borderBottom: 1, borderColor: 'divider' },
          }}
        >
          <Box>
            <Typography
              variant="mono"
              sx={{ display: 'block', color: 'accent.text', fontWeight: 600 }}
            >
              {job.period}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {job.mode}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
              {job.role}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5, fontWeight: 500 }}>
              {job.company}
            </Typography>
            <Typography sx={{ mt: 2, maxWidth: '44rem' }}>{job.summary}</Typography>
            <Box sx={{ mt: 2.5 }}>
              <CheckList items={job.highlights} />
            </Box>
          </Box>
        </Reveal>
      ))}
    </Box>
  );
}
