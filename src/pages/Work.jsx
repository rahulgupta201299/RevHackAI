import { enterpriseProjects } from '../content/profile';
import { clientProjects } from '../content/work';
import CtaBanner from '../components/sections/CtaBanner';
import EnterpriseProjectCard from '../components/sections/EnterpriseProjectCard';
import ProjectCard from '../components/sections/ProjectCard';
import ResultsDashboard from '../components/sections/ResultsDashboard';
import CardGrid from '../components/ui/CardGrid';
import PageHeader from '../components/ui/PageHeader';
import PageMeta from '../components/ui/PageMeta';
import Reveal from '../components/ui/Reveal';
import Section from '../components/ui/Section';

export default function Work() {
  return (
    <>
      <PageMeta
        title="Work"
        description="Client products, a revenue case study and enterprise banking platforms delivered end to end."
      />
      <PageHeader
        eyebrow="Work"
        title="Built, shipped and running in production."
        intro="Client products for growing businesses and enterprise platforms used by bank customers every day."
      />

      <Section eyebrow="Client projects" title="Products for growing businesses">
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
        eyebrow="Case study"
        title="₹90L+ in revenue, tracked in one place."
        intro="The storefront and admin portal we built for Zana Motorcycles give the team a live view of orders, sources and payments."
      >
        <ResultsDashboard />
      </Section>

      <Section
        eyebrow="Enterprise"
        title="Banking platforms at scale"
        intro="Customer journeys delivered for a leading private-sector bank — secure, compliant and high-traffic."
      >
        <CardGrid>
          {enterpriseProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.06}>
              <EnterpriseProjectCard project={project} />
            </Reveal>
          ))}
        </CardGrid>
      </Section>

      <CtaBanner title="Want results like these?" />
    </>
  );
}
