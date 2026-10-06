import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { stats } from '../../content/profile';
import { fonts } from '../../theme';
import CountUp from '../ui/CountUp';
import Reveal from '../ui/Reveal';

export default function StatsStrip({ items = stats }) {
  return (
    <Box
      component="section"
      aria-label="Key numbers"
      sx={{ borderTop: 1, borderBottom: 1, borderColor: 'divider' }}
    >
      <Container>
        <Box
          component="dl"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(4, minmax(0, 1fr))',
            },
          }}
        >
          {items.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.06}
              sx={{
                display: 'flex',
                flexDirection: 'column-reverse',
                justifyContent: 'flex-end',
                gap: 0.75,
                py: { xs: 3.5, md: 5 },
                px: { xs: 1, md: 3 },
                borderLeft: { md: index === 0 ? 0 : 1 },
                borderTop: { xs: index > 1 ? 1 : 0, md: 0 },
                borderColor: 'divider',
                '&:first-of-type': { pl: { md: 0 } },
              }}
            >
              <Box
                component="dt"
                sx={{ color: 'text.secondary', fontSize: '0.9rem', lineHeight: 1.45 }}
              >
                {stat.label}
              </Box>
              <Box
                component="dd"
                sx={{
                  m: 0,
                  fontFamily: fonts.display,
                  fontWeight: 600,
                  fontSize: 'clamp(1.9rem, 3.4vw, 2.6rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                <CountUp value={stat.value} />
              </Box>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
