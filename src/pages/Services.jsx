import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const services = [
  [
    '01',
    'Websites that convert',
    'A clear, high-performance digital front door that makes your offer easier to trust and buy.',
    ['Brand & website design', 'E-commerce stores', 'Landing pages & conversion paths'],
    'serviceGold',
  ],
  [
    '02',
    'Automation that follows through',
    'Practical systems that move each enquiry from interest to action without manual chasing.',
    ['CRM & lead capture', 'Email + WhatsApp flows', 'Spreadsheet & workflow integrations'],
    'serviceLight',
  ],
  [
    '03',
    'Dashboards that decide',
    'One shared view of what your business is doing, where demand comes from and what to improve next.',
    ['Revenue & order reporting', 'Source attribution', 'Custom admin portals'],
    'serviceDark',
  ],
];
export default function Services() {
  return (
    <Box className="servicesPage">
      <Container maxWidth="xl">
        <Box className="servicesHero">
          <Typography className="eyebrow">THREE SYSTEMS. BUILT TO WORK TOGETHER.</Typography>
          <Typography component="h1">
            WHAT WE
            <br />
            <i>BUILD.</i>
          </Typography>
          <Typography>
            We combine the customer-facing website with the systems behind it—so a great first
            impression becomes a measurable business outcome.
          </Typography>
        </Box>
        <Grid container spacing={3} className="servicesCards">
          {services.map(([number, title, description, items, className], index) => (
            <Grid key={number} size={{ xs: 12, md: 4 }}>
              <motion.article
                className={`serviceCard ${className}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Typography className="serviceNumber">{number}</Typography>
                <Typography component="h2">{title}</Typography>
                <Typography className="serviceDescription">{description}</Typography>
                <Box component="ul">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </Box>
              </motion.article>
            </Grid>
          ))}
        </Grid>
        <Box className="servicesFoot">
          <Typography>
            Not sure which system you need first? We’ll help you identify the highest-leverage next
            move.
          </Typography>
          <Button component={Link} endIcon={<ArrowOutwardIcon />} to="/contact" variant="contained">
            Talk about your project
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
