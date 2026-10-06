import type { CSSProperties } from 'react';
// Types `theme.vars` (CSS variables are enabled in theme.ts).
import type {} from '@mui/material/themeCssVarsAugmentation';

/** Type augmentation for the custom palette keys and the `mono` typography variant in theme.ts. */
interface CustomPaletteKeys {
  accent: { text: string; soft: string };
  surface: { alt: string; muted: string };
  line: { strong: string; grid: string };
  inverse: { bg: string; text: string; muted: string };
  chart: { primary: string; secondary: string };
  shadow: { soft: string; strong: string };
}

declare module '@mui/material/styles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Palette extends CustomPaletteKeys {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface PaletteOptions extends Partial<CustomPaletteKeys> {}
  interface TypographyVariants {
    mono: CSSProperties;
  }
  interface TypographyVariantsOptions {
    mono?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    mono: true;
  }
}
