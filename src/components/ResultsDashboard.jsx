import { Box, Chip, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
const stats = [
  ['2,331', 'Overall orders'],
  ['₹90.60L', 'Revenue tracked'],
  ['₹3,887', 'Average order value'],
  ['91%', 'Organic orders'],
];
export default function ResultsDashboard() {
  return (
    <Box className="resultsSection" component="section">
      <Container maxWidth="xl">
        <Typography className="eyebrow">CLIENT RESULTS / ZANA MOTORCYCLES</Typography>
        <Typography component="h2">
          A store that ships.
          <br />
          <i>A system that sees.</i>
        </Typography>
        <Typography className="resultsCopy">
          A custom admin view makes orders, revenue and acquisition sources clear for the
          team—without spreadsheet guesswork.
        </Typography>
        <motion.div
          className="dashboardFrame"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Box className="dashboardHead">
            <Box>
              <Typography component="h3">Revenue dashboard</Typography>
              <Typography>Organic vs. assisted orders, at a glance.</Typography>
            </Box>
            <Chip label="1 APR — 22 SEP 2026" />
          </Box>
          <Grid container className="dashboardMetrics">
            {stats.map(([value, label]) => (
              <Grid key={label} size={{ xs: 6, md: 3 }}>
                <Box>
                  <Typography component="strong">{value}</Typography>
                  <Typography>{label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box className="resultPanel">
                <Typography component="h4">Source breakdown</Typography>
                <Box className="sourceRow">
                  <span className="greenDot" />
                  Organic <b>2,126</b>
                  <strong>₹79.32L</strong>
                </Box>
                <Box className="sourceRow">
                  <span className="blueDot" />
                  Admin <b>205</b>
                  <strong>₹11.28L</strong>
                </Box>
                <Box className="sourceRow totalRow">
                  Total <b>2,331</b>
                  <strong>₹90.60L</strong>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Box className="resultPanel">
                <Typography component="h4">Orders by source</Typography>
                <Box className="donut">
                  <Box className="donutCenter">
                    <strong>2,331</strong>
                    <small>total orders</small>
                  </Box>
                </Box>
                <Box className="sourceLegend" aria-label="Orders by source breakdown">
                  <Typography>
                    <span className="greenDot" /> Organic <b>2,126</b> · 91%
                  </Typography>
                  <Typography>
                    <span className="blueDot" /> Admin <b>205</b> · 9%
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Box className="resultPanel">
                <Typography component="h4">Online vs COD</Typography>
                <Box className="paymentBar">
                  <i />
                </Box>
                <Typography>
                  <b>1,928</b> online orders
                </Typography>
                <Typography>
                  <b>403</b> COD orders
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
        <Typography className="resultsNote">
          Dashboard period: 1 April–22 September 2026. Metrics are client-recorded results, without
          unsupported growth projections.
        </Typography>
      </Container>
    </Box>
  );
}
