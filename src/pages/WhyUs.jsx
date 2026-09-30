import ComparisonTable from '../components/sections/ComparisonTable';
import CtaBanner from '../components/sections/CtaBanner';
import FaqList from '../components/sections/FaqList';
import ReasonsGrid from '../components/sections/ReasonsGrid';
import StatsStrip from '../components/sections/StatsStrip';
import PageHeader from '../components/ui/PageHeader';
import PageMeta from '../components/ui/PageMeta';
import Section from '../components/ui/Section';

export default function WhyUs() {
  return (
    <>
      <PageMeta
        title="Why us"
        description="One AI-first team for frontend, backend, AWS and AI — banking-grade quality, startup speed and systems built to scale 2–4×."
      />
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
