import Typography from '@mui/material/Typography';
import { skillGroups } from '../../content/profile';
import CardGrid from '../ui/CardGrid';
import Reveal from '../ui/Reveal';
import SurfaceCard from '../ui/SurfaceCard';
import TagList from '../ui/TagList';

export default function SkillGroups({ groups = skillGroups }) {
  return (
    <CardGrid>
      {groups.map((group, index) => (
        <Reveal key={group.title} delay={(index % 3) * 0.06}>
          <SurfaceCard>
            <Typography variant="h4" component="h3">
              {group.title}
            </Typography>
            <TagList tags={group.skills} label={`${group.title} skills`} sx={{ mt: 2 }} />
          </SurfaceCard>
        </Reveal>
      ))}
    </CardGrid>
  );
}
