import { Box, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const stages = [
  [
    '01',
    'BRIEF',
    'We identify the offer, audience and biggest friction point. One focused conversation is enough to start well.',
  ],
  [
    '02',
    'BUILD',
    'Design, development and automation are connected into one system, with clear progress throughout.',
  ],
  [
    '03',
    'LAUNCH',
    'You go live with a practical handover, measurement in place and support for the next improvement.',
  ],
];

export default function DeliveryProcess() {
  return (
    <Box component="section" className="deliverySection">
      <Container maxWidth="xl">
        <Typography className="eyebrow">HOW IT WORKS</Typography>
        <Typography component="h2">
          <i>JUST DELIVERY.</i>
        </Typography>
        <Grid container spacing={3} className="deliveryGrid">
          {stages.map(([number, title, copy], index) => (
            <Grid key={number} size={{ xs: 12, md: 4 }}>
              <motion.article
                className="deliveryCard"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -7 }}
              >
                <Typography className="deliveryNumber">{number}</Typography>
                <Box>
                  <Typography component="h3">{title}</Typography>
                  <Typography>{copy}</Typography>
                </Box>
              </motion.article>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
