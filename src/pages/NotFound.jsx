import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link as RouterLink } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import PageMeta from '../components/ui/PageMeta';

export default function NotFound() {
  return (
    <>
      <PageMeta title="Page not found" />
      <PageHeader
        eyebrow="404"
        title="This page didn’t ship."
        intro="The page you’re looking for doesn’t exist or has moved."
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button component={RouterLink} to="/" variant="contained" size="large">
            Back to home
          </Button>
          <Button component={RouterLink} to="/contact" variant="outlined" size="large">
            Contact us
          </Button>
        </Stack>
      </PageHeader>
    </>
  );
}
