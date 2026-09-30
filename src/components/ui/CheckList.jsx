import CheckRounded from '@mui/icons-material/CheckRounded';
import Box from '@mui/material/Box';

export default function CheckList({ items, dense = false }) {
  return (
    <Box
      component="ul"
      sx={{ display: 'grid', gap: dense ? 1 : 1.25, m: 0, p: 0, listStyle: 'none' }}
    >
      {items.map((item) => (
        <Box
          component="li"
          key={item}
          sx={{
            display: 'flex',
            gap: 1.25,
            fontSize: dense ? '0.925rem' : '0.95rem',
            lineHeight: 1.55,
          }}
        >
          <CheckRounded
            aria-hidden="true"
            sx={{ flex: 'none', mt: '2px', fontSize: 18, color: 'accent.text' }}
          />
          <span>{item}</span>
        </Box>
      ))}
    </Box>
  );
}
