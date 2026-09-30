import CloseRounded from '@mui/icons-material/CloseRounded';
import MenuRounded from '@mui/icons-material/MenuRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useState } from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { navLinks } from '../../content/site';
import { fonts } from '../../theme';
import BrandLogo from './BrandLogo';
import ThemeToggle from './ThemeToggle';

const navButtonSx = {
  color: 'text.secondary',
  fontWeight: 500,
  minHeight: 40,
  px: 2,
  '&:hover, &.active': { color: 'text.primary', bgcolor: 'surface.muted' },
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 8 });
  const close = () => setOpen(false);

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        color: 'text.primary',
        bgcolor: (t) => `rgba(${t.vars.palette.background.defaultChannel} / 0.82)`,
        backdropFilter: 'saturate(160%) blur(14px)',
        borderBottom: 1,
        borderColor: scrolled ? 'divider' : 'transparent',
        transition: 'border-color .3s ease',
      }}
    >
      <Container>
        <Toolbar disableGutters sx={{ gap: 2, minHeight: { xs: 64, md: 72 } }}>
          <BrandLogo />

          <Box
            component="nav"
            aria-label="Primary"
            sx={{ display: { xs: 'none', md: 'block' }, mx: 'auto' }}
          >
            <Box component="ul" sx={{ display: 'flex', gap: 0.5, m: 0, p: 0, listStyle: 'none' }}>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Button component={NavLink} to={link.to} sx={navButtonSx}>
                    {link.label}
                  </Button>
                </li>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, ml: { xs: 'auto', md: 0 } }}>
            <ThemeToggle />
            <Button
              component={RouterLink}
              to="/contact"
              variant="contained"
              size="small"
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              Start a project
            </Button>
            <IconButton
              aria-label="Open menu"
              aria-controls="mobile-menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              sx={{ display: { md: 'none' } }}
            >
              <MenuRounded fontSize="small" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={open}
        onClose={close}
        slotProps={{ paper: { id: 'mobile-menu', sx: { width: 'min(88vw, 360px)', p: 3 } } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <BrandLogo onClick={close} />
          <IconButton aria-label="Close menu" onClick={close}>
            <CloseRounded fontSize="small" />
          </IconButton>
        </Box>
        <Box component="nav" aria-label="Mobile">
          <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
            {[{ label: 'Home', to: '/' }, ...navLinks, { label: 'Contact', to: '/contact' }].map(
              (link) => (
                <li key={link.to}>
                  <Box
                    component={NavLink}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={close}
                    sx={{
                      display: 'block',
                      py: 1.75,
                      borderBottom: 1,
                      borderColor: 'divider',
                      color: 'text.secondary',
                      textDecoration: 'none',
                      fontFamily: fonts.display,
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                      '&:hover, &.active': { color: 'text.primary' },
                    }}
                  >
                    {link.label}
                  </Box>
                </li>
              ),
            )}
          </Box>
        </Box>
        <Button
          component={RouterLink}
          to="/contact"
          variant="contained"
          fullWidth
          onClick={close}
          sx={{ mt: 4 }}
        >
          Start a project
        </Button>
      </Drawer>
    </AppBar>
  );
}
