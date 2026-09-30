import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { ease, shadows } from '../../theme';

/** Themed card with consistent padding. Pass `interactive` for a hover lift. */
const SurfaceCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'interactive',
})(({ theme }) => ({
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

export default SurfaceCard;
