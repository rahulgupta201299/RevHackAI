'use client';

import { enterpriseProjects } from '../../content/profile';
import { clientProjects } from '../../content/work';
import CtaBanner from '../sections/CtaBanner';
import EnterpriseProjectCard from '../sections/EnterpriseProjectCard';
import ProjectCard from '../sections/ProjectCard';
import ResultsDashboard from '../sections/ResultsDashboard';
import CardGrid from '../ui/CardGrid';
import PageHeader from '../ui/PageHeader';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';

export default function WorkView() {
  return (
    <>
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
        title="₹1.02Cr in revenue, tracked in one place."
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
