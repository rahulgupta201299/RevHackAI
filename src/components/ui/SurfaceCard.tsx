'use client';

import Card, { type CardTypeMap } from '@mui/material/Card';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import { styled } from '@mui/material/styles';
import { ease, shadows } from '../../theme';

/** Themed card with consistent padding. Pass `interactive` for a hover lift. */
const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'interactive',
})<{ interactive?: boolean }>(({ theme }) => ({
  height: '100%',
  padding: 'clamp(22px, 3vw, 32px)',
  variants: [
    {
      props: { interactive: true },
      style: {
        transition: `transform .35s ${ease}, border-color .25s ease, box-shadow .35s ${ease}`,
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: theme.vars.palette.line.strong,
          boxShadow: shadows.lg(theme),
        },
      },
    },
  ],
}));

/** Keeps MUI's polymorphic `component` prop typing (e.g. component="article" | "form"). */
const SurfaceCard = StyledCard as unknown as OverridableComponent<
  CardTypeMap<{ interactive?: boolean }, 'div'>
>;

export default SurfaceCard;
