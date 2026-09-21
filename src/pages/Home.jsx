import { Container, Grid, Typography } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DeliveryProcess from '../components/DeliveryProcess';
import LandingCta from '../components/LandingCta';
import PageHero from '../components/PageHero';
const services = [
  [
    '01',
    'WEBSITES',
    'Fast, clear and designed to convert.',
    'Storefronts · landing pages · product flows',
  ],
  [
    '02',
    'AUTOMATION',
    'Less manual work between enquiry and revenue.',
    'CRM · WhatsApp · email workflows',
  ],
  ['03', 'DASHBOARDS', 'Numbers your team can act on.', 'Orders · revenue · source reporting'],
];
export default function Home() {
  return (
    <>
      <PageHero />
      <Container className="section" maxWidth="xl">
        <Typography className="eyebrow">THREE THINGS. DONE RIGHT.</Typography>
        <Typography component="h2">
          Digital systems that
          <br />
          <i>pull their weight.</i>
        </Typography>
        <Grid container spacing={2} className="serviceGrid">
          {services.map(([number, title, copy, detail]) => (
            <Grid key={number} size={{ xs: 12, md: 4 }}>
              <motion.article whileHover={{ y: -8 }}>
                <span>{number}</span>
                <Typography component="h3">{title}</Typography>
                <Typography>{copy}</Typography>
                <Typography className="serviceDetail">{detail}</Typography>
                <Typography className="serviceExplore" component={Link} to="/services">
                  Explore service <ArrowOutwardIcon />
                </Typography>
              </motion.article>
            </Grid>
          ))}
        </Grid>
      </Container>
      <DeliveryProcess />
      <LandingCta />
    </>
  );
}
