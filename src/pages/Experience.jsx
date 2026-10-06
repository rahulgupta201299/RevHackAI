import Typography from '@mui/material/Typography';
import { education, profile, recognition } from '../content/profile';
import CtaBanner from '../components/sections/CtaBanner';
import ExperienceTimeline from '../components/sections/ExperienceTimeline';
import SkillGroups from '../components/sections/SkillGroups';
import StatsStrip from '../components/sections/StatsStrip';
import CardGrid from '../components/ui/CardGrid';
import IconTile from '../components/ui/IconTile';
import PageHeader from '../components/ui/PageHeader';
import PageMeta from '../components/ui/PageMeta';
import Reveal from '../components/ui/Reveal';
import Section from '../components/ui/Section';
import SurfaceCard from '../components/ui/SurfaceCard';

function Credential({ icon, label, title, detail }) {
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

export default function Experience() {
  return (
    <>
      <PageMeta
        title="Experience"
        description="Senior full-stack engineer — fintech and banking platforms, Node.js backends, AWS infrastructure and AI-first delivery."
      />
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
