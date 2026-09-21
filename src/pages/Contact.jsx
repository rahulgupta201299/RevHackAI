import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import EmailIcon from '@mui/icons-material/Email';
import { Box, Button, Container, Typography } from '@mui/material';

const emailAddress = 'rahulgupta201299@gmail.com';

export default function Contact() {
  return (
    <Box className="contactPage">
      <Container className="contactLayout" maxWidth="xl">
        <Box className="contactIntro">
          <Typography className="eyebrow">START A PROJECT / 01</Typography>
          <Typography component="h1">
            LET’S BUILD
            <br />
            <i>WHAT’S NEXT.</i>
          </Typography>
          <Typography>
            Tell me where growth is getting stuck. I’ll help you identify the digital system that
            will make the next move easier—from the first customer touchpoint to the work behind the
            scenes.
          </Typography>
          <Button
            component="a"
            endIcon={<ArrowOutwardIcon />}
            href={`mailto:${emailAddress}?subject=New%20project%20enquiry`}
            variant="contained"
          >
            Start by email
          </Button>
        </Box>

        <Box className="contactBrief">
          <Box className="contactBriefTop">
            <Typography>THE PROJECT BRIEF</Typography>
            <Typography>NO LONG FORM REQUIRED</Typography>
          </Box>
          <Typography component="h2">A useful first message has three things.</Typography>
          <Box className="briefPoints">
            <Box>
              <Typography>01</Typography>
              <Box>
                <Typography component="h3">Your business</Typography>
                <Typography>What you sell, who you serve and where you are today.</Typography>
              </Box>
            </Box>
            <Box>
              <Typography>02</Typography>
              <Box>
                <Typography component="h3">The friction</Typography>
                <Typography>What is slow, unclear, manual or falling through the gaps?</Typography>
              </Box>
            </Box>
            <Box>
              <Typography>03</Typography>
              <Box>
                <Typography component="h3">The outcome</Typography>
                <Typography>What would a stronger next quarter look like for your team?</Typography>
              </Box>
            </Box>
          </Box>
          <Box className="contactEmail">
            <EmailIcon />
            <Box>
              <Typography>WRITE DIRECTLY TO</Typography>
              <Typography component="a" href={`mailto:${emailAddress}`}>
                {emailAddress}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
