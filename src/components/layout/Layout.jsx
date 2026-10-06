import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ScrollManager from './ScrollManager';
import ScrollProgress from './ScrollProgress';

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <ScrollProgress />
      <Box
        component="a"
        href="#main"
        sx={{
          position: 'fixed',
          top: 12,
          left: 12,
          zIndex: 'tooltip',
          px: 2,
          py: 1.25,
          borderRadius: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          fontWeight: 600,
          textDecoration: 'none',
          transform: 'translateY(-160%)',
          '&:focus-visible': { transform: 'none' },
        }}
      >
        Skip to content
      </Box>
      <Header />
      <Box component="main" id="main" tabIndex={-1}>
        <Suspense
          fallback={
            <Box sx={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
              <CircularProgress color="secondary" aria-label="Loading page" />
            </Box>
          }
        >
          <Outlet />
        </Suspense>
      </Box>
      <Footer />
    </>
  );
}
