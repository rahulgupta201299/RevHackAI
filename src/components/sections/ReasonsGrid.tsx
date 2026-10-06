'use client';

import Typography from '@mui/material/Typography';
import { reasons as allReasons } from '../../content/whyUs';
import CardGrid from '../ui/CardGrid';
import IconTile from '../ui/IconTile';
import Reveal from '../ui/Reveal';
import SurfaceCard from '../ui/SurfaceCard';

export default function ReasonsGrid({ reasons = allReasons }) {
  return (
    <CardGrid>
      {reasons.map((reason, index) => (
        <Reveal key={reason.title} delay={(index % 3) * 0.06}>
          <SurfaceCard
            interactive
            component="article"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <IconTile icon={reason.icon} />
            <Typography variant="h3">{reason.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {reason.copy}
            </Typography>
          </SurfaceCard>
        </Reveal>
      ))}
    </CardGrid>
  );
}
