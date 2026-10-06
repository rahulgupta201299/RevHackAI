'use client';

import type { NavLink } from '../../content/types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { navLinks, site } from '../../content/site';
import { services } from '../../content/services';
import BrandLogo from './BrandLogo';

function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <Box component="nav" aria-label={title}>
      <Typography
        variant="overline"
        component="h2"
        color="text.secondary"
        sx={{ display: 'block', mb: 2 }}
      >
        {title}
      </Typography>
      <Stack component="ul" spacing={1.25} sx={{ m: 0, p: 0, listStyle: 'none' }}>
        {links.map((link) => (
          <li key={link.label}>
            <MuiLink component={Link} href={link.to} variant="body2">
              {link.label}
            </MuiLink>
          </li>
        ))}
      </Stack>
    </Box>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{ borderTop: 1, borderColor: 'divider', pt: { xs: 8, md: 10 }, pb: 4 }}
    >
      <Container>
        <Box
          sx={{
            display: 'grid',
            gap: 5,
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1.6fr 1fr 1fr' },
          }}
        >
          <Box sx={{ gridColumn: { sm: '1 / -1', md: 'auto' }, maxWidth: '26rem' }}>
            <BrandLogo />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              AI-first product engineering — we design, build and deploy complete products on AWS,
              engineered to help growing businesses scale 2–4×.
            </Typography>
          </Box>
          <FooterColumn
            title="Explore"
            links={[{ label: 'Home', to: '/' }, ...navLinks, { label: 'Contact', to: '/contact' }]}
          />
          <FooterColumn
            title="Services"
            links={services.slice(0, 5).map((s) => ({ label: s.title, to: '/services' }))}
          />
        </Box>
        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            pt: 3,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {year} {site.brand}. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Built, shipped and deployed end to end.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
