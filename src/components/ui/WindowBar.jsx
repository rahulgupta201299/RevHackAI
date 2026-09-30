import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** macOS-style window chrome for decorative previews. */
export default function WindowBar({ title, dark = false }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
        px: 2,
        py: 1.5,
        borderBottom: 1,
        borderColor: dark ? 'rgba(255, 255, 255, 0.08)' : 'divider',
      }}
    >
      {['#ff5f57', '#febc2e', '#28c840'].map((color) => (
        <Box key={color} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color }} />
      ))}
      {title && (
        <Typography variant="mono" sx={{ ml: 1, fontSize: '0.75rem', opacity: 0.7 }}>
          {title}
        </Typography>
      )}
    </Box>
  );
}
