import type { SxProps, Theme } from '@mui/material/styles';

export type Sx = SxProps<Theme>;
type SxItem = Sx | false | null | undefined;

/** Merge a component's own `sx` with the `sx` passed by its parent (MUI array syntax). */
export function mergeSx(...items: SxItem[]): Sx {
  return items.flatMap((item) => (Array.isArray(item) ? item : [item])).filter(Boolean) as Sx;
}
