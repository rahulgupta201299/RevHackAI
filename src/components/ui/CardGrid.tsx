'use client';

import Box, { type BoxProps } from '@mui/material/Box';
import type { ElementType } from 'react';
import { mergeSx, type Sx } from './mergeSx';

/**
 * Responsive CSS grid. `columns` maps breakpoints to a column count,
 * e.g. `{ xs: 1, sm: 2, lg: 3 }`.
 */
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface CardGridProps extends Omit<BoxProps, 'sx' | 'gap'> {
  columns?: Partial<Record<Breakpoint, number>>;
  gap?: number | string | Partial<Record<Breakpoint, number | string>>;
  sx?: Sx;
  component?: ElementType;
}

export default function CardGrid({
  columns = { xs: 1, sm: 2, lg: 3 },
  gap = 2.5,
  sx,
  children,
  ...rest
}: CardGridProps) {
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
