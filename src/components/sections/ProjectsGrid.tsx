'use client';

import Box from '@mui/material/Box';
import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';
import type { Project, ProjectCategory } from '../../content/types';
import { projectCategories, projects as allProjects } from '../../content/work';
import Tilt3D from '../ui/Tilt3D';
import ProjectCard from './ProjectCard';

type Filter = ProjectCategory | 'all';

/**
 * Portfolio grid. With `filterable`, a row of industry filters sits above the cards
 * (E-commerce & retail, Financial services, Banking, Books, media & AI).
 */
export default function ProjectsGrid({
  projects = allProjects,
  filterable = false,
}: {
  projects?: Project[];
  filterable?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>('all');
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter);
  const categories = projectCategories.filter(
    (c) => c.id === 'all' || projects.some((p) => p.category === c.id),
  );

  return (
    <Box>
      {filterable && (
        <Box
          role="group"
          aria-label="Filter projects by industry"
          sx={{
            display: 'flex',
            gap: 1,
            mb: { xs: 3, md: 4 },
            overflowX: 'auto',
            pb: 0.5,
            mx: { xs: -0.5, sm: 0 },
            px: { xs: 0.5, sm: 0 },
            scrollbarWidth: 'none',
          }}
        >
          {categories.map((c) => {
            const count =
              c.id === 'all' ? projects.length : projects.filter((p) => p.category === c.id).length;
            const active = filter === c.id;
            return (
              <Box
                key={c.id}
                component="button"
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(c.id)}
                sx={{
                  flex: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  minHeight: 40,
                  borderRadius: 999,
                  border: 1,
                  borderColor: active ? 'text.primary' : 'divider',
                  bgcolor: active ? 'text.primary' : 'background.paper',
                  color: active ? 'background.default' : 'text.primary',
                  font: 'inherit',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color .2s ease, color .2s ease, border-color .2s ease',
                  '&:hover': { borderColor: 'text.primary' },
                }}
              >
                {c.label}
                <Box
                  component="span"
                  sx={{ fontSize: '0.75rem', opacity: 0.65, fontVariantNumeric: 'tabular-nums' }}
                >
                  {count}
                </Box>
              </Box>
            );
          })}
        </Box>
      )}

      <Box
        aria-live="polite"
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => (
            <Box
              component={m.div}
              key={project.slug}
              initial={{ opacity: 0, y: 24, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 1200 }}
            >
              <Tilt3D max={4} sx={{ borderRadius: '24px' }}>
                <ProjectCard project={project} />
              </Tilt3D>
            </Box>
          ))}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
