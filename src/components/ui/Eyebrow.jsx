import Typography from '@mui/material/Typography';
import { mergeSx } from './mergeSx';

/** Small uppercase label that sits above a heading. */
export default function Eyebrow({ children, sx, ...rest }) {
  return (
    <Typography
      component="p"
      variant="overline"
      sx={mergeSx(
        {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1.25,
          mb: 2,
          color: 'accent.text',
          '&::before': {
            content: '""',
            width: 18,
            height: 2,
            borderRadius: '2px',
            bgcolor: 'currentColor',
          },
        },
        sx,
      )}
      {...rest}
    >
      {children}
    </Typography>
  );
}
