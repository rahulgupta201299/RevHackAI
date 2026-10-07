'use client';

import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import Button from '@mui/material/Button';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { homeFaqs } from '../../content/home';
import { services } from '../../content/services';
import CtaBanner from '../sections/CtaBanner';
import FaqList from '../sections/FaqList';
import Hero from '../sections/Hero';
import ProblemsGrid from '../sections/ProblemsGrid';
import ProcessSteps from '../sections/ProcessSteps';
import LiveShowcase from '../sections/LiveShowcase';
import ProjectsGrid from '../sections/ProjectsGrid';
import SeniorLed from '../sections/SeniorLed';
import ServiceCard from '../sections/ServiceCard';
import Stack3D from '../sections/Stack3D';
import StatsStrip from '../sections/StatsStrip';
import CardGrid from '../ui/CardGrid';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import Tilt3D from '../ui/Tilt3D';

function SectionLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Button component={Link} href={href} variant="outlined" endIcon={<ArrowForwardRounded />}>
      {children}
    </Button>
  );
}

/**
 * Homepage flow, ordered the way a prospective client decides:
 * what is this → is it for me → can they deliver (proof) → what exactly → who → how → objections → act.
 */
export default function HomeView() {
  return (
    <>
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
        eyebrow="Portfolio"
        title="Products we’ve built, live in production."
        intro="Retail, financial services, banking, creative studios and AI — hover a preview to scroll through the real site."
        action={<SectionLink href="/work">All work</SectionLink>}
        sx={{ scrollMarginTop: 72 }}
      >
        <ProjectsGrid filterable />
      </Section>

      <Section
        eyebrow="See it live"
        title="Dashboards that show what drives revenue."
        intro="A real-time view of orders, payments and traffic sources — ticking away with demo data."
      >
        <LiveShowcase />
      </Section>

      <Section
        alt
        eyebrow="What we do"
        title="Everything your product needs, from first commit to production."
        intro="One partner for websites, apps, backend, cloud and AI — so nothing gets lost between hand-offs."
        action={<SectionLink href="/services">All services</SectionLink>}
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
        eyebrow="End-to-end"
        title="Every layer of your product. One partner."
        intro="Scroll to pull the stack apart — hover a layer to see what goes into it."
      >
        <Stack3D />
      </Section>

      <Section alt>
        <SeniorLed />
      </Section>

      <Section
        eyebrow="How we work"
        title="Discover, build, deploy — then scale."
        intro="A clear, four-step path from idea to a product that grows with your business."
      >
        <ProcessSteps />
      </Section>

      <Section
        alt
        eyebrow="Questions"
        title="What clients ask before we start."
        action={<SectionLink href="/why">Why teams choose us</SectionLink>}
      >
        <FaqList faqs={homeFaqs} />
      </Section>

      <CtaBanner />
    </>
  );
}
