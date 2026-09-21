import { Box, Container, Typography } from '@mui/material';
import profileImage from '../Assets/rahul-gupta.jpeg';
export default function About() {
  return (
    <Box className="aboutPage">
      <Container className="profileSection" maxWidth="lg">
        <Box className="profilePhotoWrap">
          <img alt="Rahul Gupta" src={profileImage} />
        </Box>
        <Box className="profileCopy">
          <Typography className="eyebrow">ABOUT RAHUL GUPTA</Typography>
          <Typography component="h1">
            I build digital systems that <i>compound.</i>
          </Typography>
          <Typography>
            I am Rahul Gupta, a software engineer focused on turning digital experiences into
            practical growth engines. I bring together customer journeys, e-commerce, automation and
            decision-ready data so teams can move from more demand to more completed business.
          </Typography>
          <Typography>
            My role is to create the foundations that give an ambitious business room to grow
            tenfold: clearer conversion paths, faster follow-up and useful visibility across the
            operation.
          </Typography>
          <Box className="profileLinks">
            <a
              href="https://www.linkedin.com/in/rahul-gupta-597360188/"
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn ↗
            </a>
            <a href="https://www.instagram.com/rahul_3539/" rel="noreferrer" target="_blank">
              Instagram ↗
            </a>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
