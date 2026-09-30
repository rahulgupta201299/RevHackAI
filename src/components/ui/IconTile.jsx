import Box from '@mui/material/Box';
import { iconMap } from './iconMap';

export default function IconTile({ icon }) {
  const Icon = iconMap[icon] ?? iconMap.code;

  return (
    <Box
      aria-hidden="true"
      sx={{
        display: 'grid',
        placeItems: 'center',
        width: 48,
        height: 48,
        flex: 'none',
        borderRadius: '14px',
        bgcolor: 'accent.soft',
        color: 'accent.text',
      }}
    >
      <Icon />
    </Box>
  );
}
