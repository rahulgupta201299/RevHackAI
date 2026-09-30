import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { mergeSx } from './mergeSx';

export default function TagList({ tags, label, sx }) {
  return (
    <Box
      component="ul"
      aria-label={label}
      sx={mergeSx({ display: 'flex', flexWrap: 'wrap', gap: 1, m: 0, p: 0, listStyle: 'none' }, sx)}
    >
      {tags.map((tag) => (
        <Chip component="li" key={tag} label={tag} size="small" />
      ))}
    </Box>
  );
}
