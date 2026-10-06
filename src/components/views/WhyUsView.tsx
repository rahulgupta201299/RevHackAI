'use client';

import ComparisonTable from '../sections/ComparisonTable';
import CtaBanner from '../sections/CtaBanner';
import FaqList from '../sections/FaqList';
import ReasonsGrid from '../sections/ReasonsGrid';
import StatsStrip from '../sections/StatsStrip';
import PageHeader from '../ui/PageHeader';
import Section from '../ui/Section';

export default function WhyUsView() {
  return (
    <>
      <PageHeader
        eyebrow="Why us"
        title="One team that builds, ships and scales it all."
        intro="Most growing businesses juggle a designer, a developer, a cloud consultant and an agency. We replace the hand-offs with one senior, AI-first engineering team accountable for the outcome."
      />
      <StatsStrip />

      <Section eyebrow="What you get" title="Six reasons teams choose us">
        <ReasonsGrid />
      </Section>

      <Section
        alt
        eyebrow="Comparison"
        title="How we compare"
        intro="A quick look at what changes when one team owns the whole product."
      >
        <ComparisonTable />
      </Section>

      <Section eyebrow="FAQ" title="Questions, answered">
        <FaqList />
      </Section>

      <CtaBanner secondary={{ label: 'See our work', to: '/work' }} />
    </>
  );
}
