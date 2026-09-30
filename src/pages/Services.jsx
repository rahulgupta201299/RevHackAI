import { process, services } from '../content/services';
import CtaBanner from '../components/sections/CtaBanner';
import ProcessSteps from '../components/sections/ProcessSteps';
import ServiceCard from '../components/sections/ServiceCard';
import StackLayers from '../components/sections/StackLayers';
import CardGrid from '../components/ui/CardGrid';
import PageHeader from '../components/ui/PageHeader';
import PageMeta from '../components/ui/PageMeta';
import Reveal from '../components/ui/Reveal';
import Section from '../components/ui/Section';

export default function Services() {
  return (
    <>
      <PageMeta
        title="Services"
        description="Full-stack product engineering, AWS cloud and DevOps, AI integration, websites, dashboards and audits."
      />
      <PageHeader
        eyebrow="Services"
        title="From idea to a product running on AWS."
        intro="Pick end-to-end delivery or just the piece you need. Every engagement is led by a senior full-stack engineer and accelerated with AI."
      />

      <Section title="What we deliver" eyebrow="Capabilities">
        <CardGrid>
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 3) * 0.06}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </CardGrid>
      </Section>

      <Section
        alt
        eyebrow="The stack"
        title="One team across every layer."
        intro="Frontend, backend, data, cloud and AI — designed together, so the whole product performs."
      >
        <StackLayers />
      </Section>

      <Section eyebrow="Process" title={`${process.length} steps. No surprises.`}>
        <ProcessSteps />
      </Section>

      <CtaBanner secondary={{ label: 'Why choose us', to: '/why' }} />
    </>
  );
}
