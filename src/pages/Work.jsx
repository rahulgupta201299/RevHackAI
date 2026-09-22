import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';

const projects = [
  {
    name: 'Zana Motorcycles',
    category: 'E-COMMERCE + OPERATIONS',
    description:
      'Premium motorcycle-accessories store with a custom admin portal for orders, source tracking and revenue visibility.',
    deliverables: ['Storefront experience', 'Operations dashboard'],
    url: 'https://www.zanamotorcycles.com/',
  },
  {
    name: 'Medra Finvest',
    category: 'FINANCE + AUTOMATION',
    description:
      'Financial products website with email, WhatsApp and spreadsheet-driven workflows for quicker lead handling.',
    deliverables: ['Lead automation', 'Spreadsheet sync'],
    url: 'https://medrafin.in/',
  },
];

function WorkCard({ project }) {
  return (
    <Card component="article" className="workCard" elevation={0}>
      <Box className="workPreview">
        <Box className="browserChrome">
          <span />
          <span />
          <span />
          <Typography>{project.url.replace('https://', '').replace('/', '')}</Typography>
        </Box>
        <iframe
          className="liveSitePreview"
          loading="lazy"
          src={project.url}
          title={`${project.name} live website preview`}
        />
        <Typography className="projectCategory">{project.category}</Typography>
        <Button
          aria-label={`Open ${project.name} in a new tab`}
          className="previewOpenButton"
          component="a"
          href={project.url}
          target="_blank"
          rel="noreferrer"
        >
          <OpenInNewIcon />
        </Button>
      </Box>
      <CardContent className="workCardContent">
        <Box>
          <Typography className="projectKicker">CASE STUDY</Typography>
          <Typography component="h2">{project.name}</Typography>
          <Typography>{project.description}</Typography>
          <Box className="deliverableList">
            {project.deliverables.map((deliverable) => (
              <Typography key={deliverable}>{deliverable}</Typography>
            ))}
          </Box>
        </Box>
        <Button
          component="a"
          href={project.url}
          target="_blank"
          rel="noreferrer"
          endIcon={<ArrowOutwardIcon />}
          variant="outlined"
        >
          Visit live site
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Work() {
  return (
    <Container className="workPage section" maxWidth="xl">
      <Box className="workHeader">
        <Box>
          <Typography className="eyebrow">SELECTED WORK / 02</Typography>
          <Typography component="h1">
            PROOF THAT
            <br />
            <i>PERFORMS.</i>
          </Typography>
        </Box>
        <Box className="workHeaderCopy">
          <Typography>
            Explore the live businesses I have designed, built and connected to better operating
            systems. Open any project and judge the work where it matters: in the real world.
          </Typography>
          <Typography className="workLiveNote">
            <span /> LIVE PROJECTS · OPEN IN A NEW TAB
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={3} className="workGallery">
        {projects.map((project) => (
          <Grid key={project.name} size={{ xs: 12, md: 6 }}>
            <WorkCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
