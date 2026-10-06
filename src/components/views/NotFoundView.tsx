'use client';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import PageHeader from '../ui/PageHeader';

export default function NotFoundView() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="This page didn’t ship."
        intro="The page you’re looking for doesn’t exist or has moved."
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button component={Link} href="/" variant="contained" size="large">
            Back to home
          </Button>
          <Button component={Link} href="/contact" variant="outlined" size="large">
            Contact us
          </Button>
        </Stack>
      </PageHeader>
    </>
  );
}
