import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { caseStudy } from '../../content/work';
import { fonts } from '../../theme';
import CardGrid from '../ui/CardGrid';
import SurfaceCard from '../ui/SurfaceCard';

const toneColor = { primary: 'chart.primary', secondary: 'chart.secondary' };

function Metric({ value, label }) {
  return (
    <SurfaceCard sx={{ p: { xs: 2.5, md: 3 } }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography
        sx={{
          mt: 1,
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)',
          letterSpacing: '-0.03em',
        }}
      >
        {value}
      </Typography>
    </SurfaceCard>
  );
}

function Swatch({ tone }) {
  return (
    <Box
      component="span"
      aria-hidden="true"
      sx={{
        display: 'inline-block',
        width: 10,
        height: 10,
        borderRadius: '3px',
        mr: 1,
        bgcolor: toneColor[tone],
      }}
    />
  );
}

export default function ResultsDashboard({ data = caseStudy }) {
  const [primary] = data.sources;
  const totalPayments = data.payments.online + data.payments.cod;
  const onlineShare = Math.round((data.payments.online / totalPayments) * 100);

  return (
    <Box sx={{ display: 'grid', gap: 2.5 }}>
      <CardGrid columns={{ xs: 2, lg: 4 }} gap={{ xs: 1.5, md: 2.5 }}>
        {data.metrics.map((metric) => (
          <Metric key={metric.label} {...metric} />
        ))}
      </CardGrid>

      <Box
        sx={{
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.6fr) minmax(0, 1fr)' },
        }}
      >
        <SurfaceCard>
          <Typography variant="h3">Orders by source</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {data.client} · {data.period}
          </Typography>
          <Box sx={{ overflowX: 'auto', mt: 2 }}>
            <Table size="small" aria-label="Orders and revenue by source">
              <TableHead>
                <TableRow>
                  <TableCell>Source</TableCell>
                  <TableCell align="right">Orders</TableCell>
                  <TableCell align="right">Revenue</TableCell>
                  <TableCell align="right">Share</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.sources.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell component="th" scope="row">
                      <Swatch tone={row.tone} />
                      {row.label}
                    </TableCell>
                    <TableCell align="right">{row.orders}</TableCell>
                    <TableCell align="right">{row.revenue}</TableCell>
                    <TableCell align="right">{row.share}%</TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ '& > *': { fontWeight: 700, borderBottom: 0 } }}>
                  <TableCell component="th" scope="row">
                    Total
                  </TableCell>
                  <TableCell align="right">{data.total.orders}</TableCell>
                  <TableCell align="right">{data.total.revenue}</TableCell>
                  <TableCell align="right">100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          <Box
            role="img"
            aria-label={`${primary.label} ${primary.share}%, others ${100 - primary.share}%`}
            sx={{
              display: 'flex',
              height: 10,
              mt: 3,
              borderRadius: 999,
              overflow: 'hidden',
              bgcolor: 'chart.secondary',
            }}
          >
            <Box sx={{ width: `${primary.share}%`, bgcolor: 'chart.primary' }} />
          </Box>
        </SurfaceCard>

        <SurfaceCard sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h3">Payment mix</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Online vs cash on delivery
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 3, flex: 1 }}>
            <Box
              role="img"
              aria-label={`Online ${onlineShare}%, cash on delivery ${100 - onlineShare}%`}
              sx={{
                position: 'relative',
                flex: 'none',
                width: 132,
                height: 132,
                borderRadius: '50%',
                background: (t) =>
                  `conic-gradient(${t.vars.palette.chart.primary} 0 ${onlineShare}%, ${t.vars.palette.chart.secondary} 0)`,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: 20,
                  borderRadius: '50%',
                  bgcolor: 'background.paper',
                },
              }}
            >
              <Typography
                sx={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 1,
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: '1.4rem',
                }}
              >
                {onlineShare}%
              </Typography>
            </Box>
            <Box component="dl" sx={{ display: 'grid', gap: 1.5 }}>
              <div>
                <Box component="dt" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                  <Swatch tone="primary" />
                  Online
                </Box>
                <Box component="dd" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                  {data.payments.online.toLocaleString('en-IN')}
                </Box>
              </div>
              <div>
                <Box component="dt" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                  <Swatch tone="secondary" />
                  Cash on delivery
                </Box>
                <Box component="dd" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                  {data.payments.cod.toLocaleString('en-IN')}
                </Box>
              </div>
            </Box>
          </Box>
        </SurfaceCard>
      </Box>
    </Box>
  );
}
