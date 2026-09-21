import { Box, Button, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
const fade = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
export default function PageHero() {
  const dragBoundsRef = useRef(null);
  return (
    <Box className="hero" ref={dragBoundsRef}>
      <Container maxWidth="xl">
        <motion.div
          className="floating logoChip"
          drag
          dragConstraints={dragBoundsRef}
          dragElastic={0.05}
        >
          WEB EXPERIENCES
        </motion.div>
        <motion.div
          className="floating websiteChip"
          drag
          dragConstraints={dragBoundsRef}
          dragElastic={0.05}
        >
          SYSTEMS
        </motion.div>
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.16 }}>
          <motion.div variants={fade}>
            <Typography component="h1">
              WE BUILD
              <br />
              <span>REVENUE</span>
              <br />
              <b>ENGINES.</b>
            </Typography>
          </motion.div>
          <motion.div variants={fade}>
            <Typography className="heroCopy">
              Websites, commerce and automation made for businesses that are ready to grow with
              intention—not just look good online.
            </Typography>
          </motion.div>
          <motion.div variants={fade}>
            <Button component={Link} to="/contact" className="cta" variant="contained">
              Start a project
            </Button>
            <Button component={Link} to="/work" className="workButton" variant="outlined">
              See our work
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}
