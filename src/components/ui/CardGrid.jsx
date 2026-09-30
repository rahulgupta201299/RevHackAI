import Box from '@mui/material/Box';
import { mergeSx } from './mergeSx';

/**
 * Responsive CSS grid. `columns` maps breakpoints to a column count,
 * e.g. `{ xs: 1, sm: 2, lg: 3 }`.
 */
export default function CardGrid({
  columns = { xs: 1, sm: 2, lg: 3 },
  gap = 2.5,
  sx,
  children,
  ...rest
}) {
  const gridTemplateColumns = Object.fromEntries(
    Object.entries(columns).map(([bp, count]) => [bp, `repeat(${count}, minmax(0, 1fr))`]),
  );

  return (
    <Box
      sx={mergeSx({ display: 'grid', gridTemplateColumns, gap, m: 0, p: 0, listStyle: 'none' }, sx)}
      {...rest}
    >
      {children}
    </Box>
  );
}
