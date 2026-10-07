'use client';

import CtaBanner from '../sections/CtaBanner';
import LiveShowcase from '../sections/LiveShowcase';
import ProjectsGrid from '../sections/ProjectsGrid';
import PageHeader from '../ui/PageHeader';
import Section from '../ui/Section';

export default function WorkView() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Built, shipped and running in production."
        intro="Products across retail, financial services, banking, creative studios and AI. Hover a preview to scroll through the live site, or filter by industry."
      />

      <Section eyebrow="Portfolio" title="Projects by industry">
        <ProjectsGrid filterable />
      </Section>

      <Section
        alt
        eyebrow="Live demo"
        title="What our e-commerce admin portals look like."
        intro="Orders, revenue, visitors and traffic sources updating in real time. Figures are simulated to keep client data private."
      >
        <LiveShowcase />
      </Section>

      <CtaBanner title="Want a product like these?" />
    </>
  );
}
