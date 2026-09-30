import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckList from '../ui/CheckList';
import IconTile from '../ui/IconTile';
import SurfaceCard from '../ui/SurfaceCard';

export default function ServiceCard({ service, compact = false }) {
  return (
    <SurfaceCard
      interactive
      component="article"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <IconTile icon={service.icon} />
      <Box>
        <Typography variant="h3">{service.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {service.summary}
        </Typography>
      </Box>
      {!compact && (
        <Box sx={{ mt: 'auto', pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <CheckList items={service.items} dense />
        </Box>
      )}
    </SurfaceCard>
  );
}
