import { createTheme, type Theme } from '@mui/material/styles';

/**
 * Design system. All colours, typography and component styles live here.
 * Custom palette keys (accent, surface, line, inverse, chart, shadow) become CSS
 * variables, so they switch automatically between light and dark mode and can be used in
 * `sx` as strings, e.g. `color: 'accent.text'`, `bgcolor: 'surface.alt'`.
 */
export const fonts = {
  body: "'Inter Variable', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  display: "'Space Grotesk Variable', 'Inter Variable', system-ui, sans-serif",
  mono: "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace",
};

/** Easing curve shared by CSS transitions (`ease`) and framer-motion (`easeCurve`). */
export const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const ease = `cubic-bezier(${easeCurve.join(', ')})`;

/** Vertical rhythm shared by every page section (theme spacing units: 8px). */
export const sectionY = { xs: 9, md: 12, lg: 15 };

/** Elevation helpers for `sx`, e.g. `boxShadow: shadows.lg`. */
export const shadows = {
  sm: (theme: Theme) => `0 1px 2px ${theme.vars.palette.shadow.soft}`,
  lg: (theme: Theme) => `0 24px 60px -24px ${theme.vars.palette.shadow.strong}`,
};

const lightPalette = {
  primary: { main: '#111113', contrastText: '#fafaf7' },
  secondary: { main: '#ff4d08', dark: '#e0430a', contrastText: '#111113' },
  success: { main: '#15803d' },
  background: { default: '#fafaf7', paper: '#ffffff' },
  text: { primary: '#111113', secondary: '#55555c' },
  divider: '#e4e2dc',
  accent: { text: '#c2410c', soft: '#fff0e8' },
  surface: { alt: '#f3f2ee', muted: '#f3f2ee' },
  line: { strong: '#cfccc4', grid: 'rgba(17, 17, 19, 0.06)' },
  inverse: { bg: '#111113', text: '#fafaf7', muted: '#b4b4bb' },
  chart: { primary: '#ff4d08', secondary: '#2563eb' },
  shadow: { soft: 'rgba(17, 17, 19, 0.05)', strong: 'rgba(17, 17, 19, 0.25)' },
};

const darkPalette = {
  primary: { main: '#f2f1ee', contrastText: '#0b0b0d' },
  secondary: { main: '#ff6a2b', dark: '#ff824d', contrastText: '#111113' },
  success: { main: '#4ade80' },
  background: { default: '#0b0b0d', paper: '#141417' },
  text: { primary: '#f2f1ee', secondary: '#a3a3ab' },
  divider: '#2a2a30',
  accent: { text: '#ff8a57', soft: 'rgba(255, 106, 43, 0.12)' },
  surface: { alt: '#111114', muted: '#1b1b1f' },
  line: { strong: '#3a3a42', grid: 'rgba(255, 255, 255, 0.05)' },
  inverse: { bg: '#f2f1ee', text: '#111113', muted: '#4b4b52' },
  chart: { primary: '#ff6a2b', secondary: '#7aa2ff' },
  shadow: { soft: 'rgba(0, 0, 0, 0.4)', strong: 'rgba(0, 0, 0, 0.7)' },
};

const heading = {
  fontFamily: fonts.display,
  fontWeight: 600,
  textWrap: 'balance',
};

const gutter = 'clamp(20px, 4vw, 40px)';

const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-theme' },
  colorSchemes: {
    light: { palette: lightPalette },
    dark: { palette: darkPalette },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: fonts.body,
    h1: {
      ...heading,
      fontSize: 'clamp(2.4rem, 5.8vw, 4.5rem)',
      lineHeight: 1.04,
      letterSpacing: '-0.035em',
    },
    h2: {
      ...heading,
      fontSize: 'clamp(1.85rem, 3.6vw, 2.9rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
    },
    h3: { ...heading, fontSize: '1.3rem', lineHeight: 1.25, letterSpacing: '-0.02em' },
    h4: { ...heading, fontSize: '1.1rem', lineHeight: 1.3, letterSpacing: '-0.01em' },
    subtitle1: { fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', lineHeight: 1.65 },
    body1: { lineHeight: 1.6 },
    body2: { fontSize: '0.925rem', lineHeight: 1.6 },
    overline: {
      fontFamily: fonts.mono,
      fontSize: '0.78rem',
      fontWeight: 600,
      letterSpacing: '0.12em',
      lineHeight: 1.5,
    },
    mono: { fontFamily: fonts.mono, fontSize: '0.85rem', lineHeight: 1.6 },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: 0 },
  },
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    // MUI renders subtitle1/2 as <h6> by default, which creates fake headings (bad for SEO and
    // screen readers). Map text-only variants to non-heading elements.
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          subtitle1: 'p',
          subtitle2: 'p',
          overline: 'span',
          mono: 'span',
        },
      },
    },
    MuiContainer: {
      defaultProps: { maxWidth: 'lg' },
      styleOverrides: {
        root: ({ theme }) => ({
          paddingLeft: gutter,
          paddingRight: gutter,
          [theme.breakpoints.up('sm')]: { paddingLeft: gutter, paddingRight: gutter },
        }),
        maxWidthLg: ({ theme }) => ({ [theme.breakpoints.up('lg')]: { maxWidth: 1280 } }),
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 22,
          minHeight: 46,
          fontSize: '0.95rem',
          transition: 'background-color .2s ease, border-color .2s ease, transform .2s ease',
          '&:active': { transform: 'translateY(1px)' },
        },
        sizeSmall: { minHeight: 38, paddingInline: 16, fontSize: '0.875rem' },
        sizeLarge: { minHeight: 52 },
        outlined: ({ theme }) => ({
          borderColor: theme.vars.palette.line.strong,
          color: theme.vars.palette.text.primary,
          '&:hover': {
            borderColor: theme.vars.palette.text.primary,
            backgroundColor: theme.vars.palette.surface.muted,
          },
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: 42,
          height: 42,
          border: `1px solid ${theme.vars.palette.divider}`,
          color: theme.vars.palette.text.primary,
          '&:hover': {
            borderColor: theme.vars.palette.line.strong,
            backgroundColor: theme.vars.palette.surface.muted,
          },
        }),
      },
    },
    MuiCard: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 24,
          borderColor: theme.vars.palette.divider,
          backgroundImage: 'none',
          boxShadow: shadows.sm(theme),
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 999,
          fontWeight: 500,
          border: `1px solid ${theme.vars.palette.divider}`,
          backgroundColor: theme.vars.palette.surface.muted,
          color: theme.vars.palette.text.primary,
        }),
        sizeSmall: { height: 28, fontSize: '0.8rem' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({ backgroundColor: theme.vars.palette.background.paper }),
      },
    },
    MuiAccordion: {
      defaultProps: { disableGutters: true, elevation: 0, square: true },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: 'transparent',
          backgroundImage: 'none',
          borderBottom: `1px solid ${theme.vars.palette.divider}`,
          '&::before': { display: 'none' },
        }),
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: { paddingInline: 0, minHeight: 72 },
        content: { marginBlock: 20 },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: { root: { paddingInline: 0, paddingTop: 0, paddingBottom: 24 } },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.vars.palette.divider,
          fontVariantNumeric: 'tabular-nums',
        }),
        head: ({ theme }) => ({ color: theme.vars.palette.text.secondary, fontWeight: 500 }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.vars.palette.background.default,
          backgroundImage: 'none',
        }),
      },
    },
    MuiLink: { defaultProps: { underline: 'hover', color: 'inherit' } },
  },
});

// Global styles need the resolved CSS variables, so they are added after the theme is created.
theme.components = theme.components ?? {};
theme.components.MuiCssBaseline = {
  styleOverrides: {
    html: { scrollBehavior: 'smooth', scrollPaddingTop: 88 },
    body: {
      textRendering: 'optimizeLegibility',
      transition: 'background-color .3s ease, color .3s ease',
    },
    'p, ul, ol, dl, dd, figure': { margin: 0 },
    img: { display: 'block', maxWidth: '100%' },
    '::selection': {
      backgroundColor: theme.vars.palette.secondary.main,
      color: theme.vars.palette.secondary.contrastText,
    },
    ':focus-visible': {
      outline: `2px solid ${theme.vars.palette.secondary.main}`,
      outlineOffset: 3,
      borderRadius: 6,
    },
    'main:focus': { outline: 'none' },
    '@media (prefers-reduced-motion: reduce)': {
      html: { scrollBehavior: 'auto' },
      '*, *::before, *::after': {
        animationDuration: '0.01ms !important',
        animationIterationCount: '1 !important',
        transitionDuration: '0.01ms !important',
      },
    },
  },
};

export default theme;
