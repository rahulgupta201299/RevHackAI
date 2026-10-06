import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { homeFaqs } from '../content/home';
import { services } from '../content/services';
import { clientProjects } from '../content/work';
import CtaBanner from '../components/sections/CtaBanner';
import FaqList from '../components/sections/FaqList';
import Hero from '../components/sections/Hero';
import ProblemsGrid from '../components/sections/ProblemsGrid';
import ProcessSteps from '../components/sections/ProcessSteps';
import ProjectCard from '../components/sections/ProjectCard';
import ResultsHighlight from '../components/sections/ResultsHighlight';
import SeniorLed from '../components/sections/SeniorLed';
import ServiceCard from '../components/sections/ServiceCard';
import Stack3D from '../components/sections/Stack3D';
import StatsStrip from '../components/sections/StatsStrip';
import CardGrid from '../components/ui/CardGrid';
import PageMeta from '../components/ui/PageMeta';
import Reveal from '../components/ui/Reveal';
import Section from '../components/ui/Section';
import Tilt3D from '../components/ui/Tilt3D';

function SectionLink({ to, children }) {
  return (
    <Button component={RouterLink} to={to} variant="outlined" endIcon={<ArrowForwardRounded />}>
      {children}
    </Button>
  );
}

/**
 * Homepage flow, ordered the way a prospective client decides:
 * what is this → is it for me → can they deliver (proof) → what exactly → who → how → objections → act.
 */
export default function Home() {
  return (
    <>
      <PageMeta />
      <Hero />
      <StatsStrip />

      <Section
        eyebrow="Sound familiar?"
        title="Bring us the problem. We’ll ship the fix."
        intro="Most clients come to us with one of these. Each one ends with something live, measurable and yours."
      >
        <ProblemsGrid />
      </Section>

      <Section
        id="results"
        alt
        eyebrow="Proven results"
        title="Real numbers from a product we built."
        sx={{ scrollMarginTop: 72 }}
      >
        <ResultsHighlight />
        <CardGrid columns={{ xs: 1, md: 2 }} gap={3} sx={{ mt: { xs: 6, md: 8 } }}>
          {clientProjects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.08}>
              <Tilt3D max={4} sx={{ borderRadius: '24px' }}>
                <ProjectCard project={project} />
              </Tilt3D>
            </Reveal>
          ))}
        </CardGrid>
      </Section>

      <Section
        eyebrow="What we do"
        title="Everything your product needs, from first commit to production."
        intro="One partner for websites, apps, backend, cloud and AI — so nothing gets lost between hand-offs."
        action={<SectionLink to="/services">All services</SectionLink>}
      >
        <CardGrid>
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 3) * 0.06}>
              <Tilt3D sx={{ borderRadius: '24px' }}>
                <ServiceCard service={service} compact />
              </Tilt3D>
            </Reveal>
          ))}
        </CardGrid>
      </Section>

      <Section
        alt
        eyebrow="End-to-end"
        title="Every layer of your product. One partner."
        intro="Scroll to pull the stack apart — hover a layer to see what goes into it."
      >
        <Stack3D />
      </Section>

      <Section>
        <SeniorLed />
      </Section>

      <Section
        alt
        eyebrow="How we work"
        title="Discover, build, deploy — then scale."
        intro="A clear, four-step path from idea to a product that grows with your business."
      >
        <ProcessSteps />
      </Section>

      <Section
        eyebrow="Questions"
        title="What clients ask before we start."
        action={<SectionLink to="/why">Why teams choose us</SectionLink>}
      >
        <FaqList faqs={homeFaqs} />
      </Section>

      <CtaBanner />
    </>
  );
}
