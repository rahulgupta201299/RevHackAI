import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ResultsDashboard from '../components/ResultsDashboard';
const principles = [
  [
    '01',
    'Conversion paths, not pretty dead ends.',
    'Every page has one job: make the value clear, establish trust and lead the right customer to the next action.',
    'Clear product, checkout and enquiry journeys.',
  ],
  [
    '02',
    'Follow-up that does not depend on luck.',
    'Website activity should enter the right workflow immediately, so a valuable enquiry never waits in an inbox.',
    'CRM, email and WhatsApp automations.',
  ],
  [
    '03',
    'Decisions based on what happened.',
    'A shared view of orders, revenue and sources replaces guesswork with the evidence needed to make the next move.',
    'Client-specific reporting and operations dashboards.',
  ],
  [
    '04',
    'A foundation built to keep improving.',
    'Your offer changes, campaigns evolve and new product lines arrive. The system should be ready for all of it.',
    'Flexible components and connected operating workflows.',
  ],
];
export default function Why() {
  return (
    <Box className="whyPage">
      <Box className="whyHero">
        <Container maxWidth="lg">
          <Typography className="eyebrow">WHY THIS APPROACH WORKS</Typography>
          <Typography component="h1">
            DESIGN THAT
            <br />
            <i>DOES MORE.</i>
          </Typography>
          <Typography>
            More attention is useful only when the experience, follow-up and decisions around it are
            built to convert it into momentum.
          </Typography>
        </Container>
      </Box>
      <Container className="whyGrid" maxWidth="lg">
        <Box className="whyGridHeader">
          <Box>
            <Typography component="h2">
              THE SYSTEMS BEHIND
              <br />
              <i>SUSTAINABLE GROWTH.</i>
            </Typography>
            <Typography>
              Four practical principles that turn attention into better customer journeys, faster
              follow-up and clearer decisions.
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={3}>
          {principles.map(([number, title, copy, proof]) => (
            <Grid key={number} size={{ xs: 12, md: 6 }}>
              <Box component="article" className="whyCard">
                <Typography className="whyNumber">{number}</Typography>
                <Typography component="h2">{title}</Typography>
                <Typography>{copy}</Typography>
                <Box className="whyProof">
                  <Typography>THE OUTCOME</Typography>
                  <strong>{proof}</strong>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <ResultsDashboard />
      <Box className="whyCta">
        <Typography>Ready to turn your digital presence into a working growth system?</Typography>
        <Button component={Link} to="/contact" endIcon={<ArrowOutwardIcon />} variant="contained">
          Start a project
        </Button>
      </Box>
    </Box>
  );
}
