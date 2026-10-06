'use client';

import type { IconKey } from '../../content/types';
import Typography from '@mui/material/Typography';
import { education, profile, recognition } from '../../content/profile';
import CtaBanner from '../sections/CtaBanner';
import ExperienceTimeline from '../sections/ExperienceTimeline';
import SkillGroups from '../sections/SkillGroups';
import StatsStrip from '../sections/StatsStrip';
import CardGrid from '../ui/CardGrid';
import IconTile from '../ui/IconTile';
import PageHeader from '../ui/PageHeader';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SurfaceCard from '../ui/SurfaceCard';

interface CredentialProps {
  icon: IconKey;
  label: string;
  title: string;
  detail: string;
}

function Credential({ icon, label, title, detail }: CredentialProps) {
  return (
    <SurfaceCard sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
      <IconTile icon={icon} />
      <div>
        <Typography variant="overline" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h4" component="h3" sx={{ mt: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {detail}
        </Typography>
      </div>
    </SurfaceCard>
  );
}

export default function ExperienceView() {
  return (
    <>
      <PageHeader eyebrow={profile.role} title={profile.headline} intro={profile.summary}>
        <Typography color="text.secondary" sx={{ maxWidth: '44rem' }}>
          {profile.approach}
        </Typography>
      </PageHeader>
      <StatsStrip />

      <Section eyebrow="Experience" title="Where the engineering comes from">
        <ExperienceTimeline />
      </Section>

      <Section
        alt
        eyebrow="Skills"
        title="A full-stack toolkit"
        intro="Frontend, backend, data, cloud and AI — plus the quality and security practices that keep production healthy."
      >
        <SkillGroups />
      </Section>

      <Section
        eyebrow="Credentials"
        title={recognition.length ? 'Education & recognition' : 'Education'}
      >
        <CardGrid columns={{ xs: 1, md: 2 }}>
          <Reveal>
            <Credential
              icon="education"
              label="Education"
              title={education.degree}
              detail={[education.institution, education.period].filter(Boolean).join(' · ')}
            />
          </Reveal>
          {recognition.map((award) => (
            <Reveal key={award.title} delay={0.06}>
              <Credential
                icon="award"
                label="Recognition"
                title={award.title}
                detail={award.year}
              />
            </Reveal>
          ))}
        </CardGrid>
      </Section>

      <CtaBanner title="Need a senior engineer who ships end to end?" />
    </>
  );
}
