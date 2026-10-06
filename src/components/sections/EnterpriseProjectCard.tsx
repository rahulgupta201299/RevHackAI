'use client';

import type { EnterpriseProject } from '../../content/types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SurfaceCard from '../ui/SurfaceCard';
import TagList from '../ui/TagList';

export default function EnterpriseProjectCard({ project }: { project: EnterpriseProject }) {
  return (
    <SurfaceCard
      interactive
      component="article"
      sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
    >
      <Typography variant="overline" color="text.secondary">
        {project.client}
      </Typography>
      <Typography variant="h3">{project.title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {project.description}
      </Typography>
      <Box
        sx={{
          mt: 0.5,
          pl: 1.75,
          borderLeft: 2,
          borderColor: 'secondary.main',
          fontWeight: 500,
          fontSize: '0.95rem',
        }}
      >
        {project.outcome}
      </Box>
      <TagList
        tags={project.tags}
        label={`${project.title} focus areas`}
        sx={{ mt: 'auto', pt: 1 }}
      />
    </SurfaceCard>
  );
}
