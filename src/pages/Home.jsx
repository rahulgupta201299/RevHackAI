import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { services } from '../content/services';
import { reasons } from '../content/whyUs';
import { clientProjects } from '../content/work';
import CtaBanner from '../components/sections/CtaBanner';
import Hero from '../components/sections/Hero';
import ProcessSteps from '../components/sections/ProcessSteps';
import ProjectCard from '../components/sections/ProjectCard';
import ReasonsGrid from '../components/sections/ReasonsGrid';
import ServiceCard from '../components/sections/ServiceCard';
import StackLayers from '../components/sections/StackLayers';
import StatsStrip from '../components/sections/StatsStrip';
import CardGrid from '../components/ui/CardGrid';
import PageMeta from '../components/ui/PageMeta';
import Reveal from '../components/ui/Reveal';
import Section from '../components/ui/Section';

function SectionLink({ to, children }) {
  return (
    <Button component={RouterLink} to={to} variant="outlined" endIcon={<ArrowForwardRounded />}>
      {children}
    </Button>
  );
}

export default function Home() {
  return (
    <>
      <PageMeta />
      <Hero />
      <StatsStrip />

      <Section
        eyebrow="What we do"
        title="Everything your product needs, from first commit to production."
        intro="One team for frontend, backend, data, cloud and AI — so nothing gets lost between hand-offs."
        action={<SectionLink to="/services">All services</SectionLink>}
      >
        <CardGrid>
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 3) * 0.06}>
              <ServiceCard service={service} compact />
            </Reveal>
          ))}
        </CardGrid>
      </Section>

      <Section
        alt
        eyebrow="End-to-end stack"
        title="Full-stack by default. AI-first by design."
        intro="Every layer of a modern product, engineered to work together and deployed on AWS."
      >
        <StackLayers />
      </Section>

      <Section
        eyebrow="Selected work"
        title="Products that run real businesses."
        action={<SectionLink to="/work">View case study</SectionLink>}
      >
        <CardGrid columns={{ xs: 1, md: 2 }} gap={3}>
          {clientProjects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </CardGrid>
      </Section>

      <Section
        alt
        eyebrow="Why us"
        title="Senior engineering, delivered at startup speed."
        action={<SectionLink to="/why">Why teams choose us</SectionLink>}
      >
        <ReasonsGrid reasons={reasons.slice(0, 3)} />
      </Section>

      <Section
        eyebrow="How we work"
        title="Discover, build, deploy — then scale."
        intro="A clear, four-step path from idea to a product that grows with your business."
      >
        <ProcessSteps />
      </Section>

      <CtaBanner />
    </>
  );
}
