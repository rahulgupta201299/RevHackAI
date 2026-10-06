'use client';

import { process, services } from '../../content/services';
import CtaBanner from '../sections/CtaBanner';
import ProcessSteps from '../sections/ProcessSteps';
import ServiceCard from '../sections/ServiceCard';
import Stack3D from '../sections/Stack3D';
import CardGrid from '../ui/CardGrid';
import PageHeader from '../ui/PageHeader';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';

export default function ServicesView() {
  return (
    <>
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
        <Stack3D />
      </Section>

      <Section eyebrow="Process" title={`${process.length} steps. No surprises.`}>
        <ProcessSteps />
      </Section>

      <CtaBanner secondary={{ label: 'Why choose us', to: '/why' }} />
    </>
  );
}
