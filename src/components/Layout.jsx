import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import BrandLogo from './BrandLogo';
const links = [
  ['Services', '/services'],
  ['Work', '/work'],
  ['Why us', '/why'],
  // ['About', '/about'],
];
export default function Layout() {
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
        </Toolbar>
      </AppBar>
      <Outlet />
      <Box component="footer" className="footer">
        <Typography>REVHACK AI · Websites, commerce & automation built for growth.</Typography>
        <Typography>© 2026</Typography>
      </Box>
    </>
  );
}
