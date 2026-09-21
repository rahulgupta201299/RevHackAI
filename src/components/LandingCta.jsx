import { Box, Button, Typography } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router-dom';

export default function LandingCta() {
  return (
    <Box component="section" className="landingCta">
      <Typography className="ctaMark">✦</Typography>
      <Typography component="h2">
        GOT A GROWTH
        <br />
        PROBLEM?
        <br />
        <i>LET’S FIX IT.</i>
      </Typography>
      <Typography>
        Tell me what is slowing the business down. I’ll help you shape the digital system that can
        move it forward.
      </Typography>
      <Box>
        <Button component={Link} to="/contact" variant="contained" endIcon={<ArrowOutwardIcon />}>
          Start a project
        </Button>
        <Button component={Link} to="/work" variant="outlined">
          See the work
        </Button>
      </Box>
    </Box>
  );
}
