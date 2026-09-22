import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import BrandLogo from './BrandLogo';
const links = [
  ['Services', '/services'],
  ['Work', '/work'],
  ['Why us', '/why'],
  // ['About', '/about'],
];
export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <AppBar className="appbar" position="sticky" elevation={0}>
        <Toolbar component={Container} maxWidth="xl">
          <NavLink className="brand" to="/">
            <BrandLogo />
          </NavLink>
          <Box component="nav">
            {links.map(([label, path]) => (
              <Button key={label} component={NavLink} to={path}>
                {label}
              </Button>
            ))}
          </Box>
          <Button component={NavLink} to="/contact" className="navButton" variant="contained">
            Start a project
          </Button>
          <IconButton
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="menuToggle"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" className="mobileMenu" onClose={closeMenu} open={menuOpen}>
        <Box className="mobileMenuPanel" component="nav" aria-label="Mobile navigation">
          <Box className="mobileMenuTop">
            <BrandLogo />
            <IconButton aria-label="Close navigation menu" onClick={closeMenu}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className="mobileMenuLinks">
            {links.map(([label, path], index) => (
              <NavLink key={label} onClick={closeMenu} to={path}>
                <span>0{index + 1}</span>
                {label}
              </NavLink>
            ))}
          </Box>
          <Button component={NavLink} onClick={closeMenu} to="/contact" variant="contained">
            Start a project
          </Button>
        </Box>
      </Drawer>
      <Outlet />
      <Box component="footer" className="footer">
        <Typography>REVHACK AI · Websites, commerce & automation built for growth.</Typography>
        <Typography>© 2026</Typography>
      </Box>
    </>
  );
}
