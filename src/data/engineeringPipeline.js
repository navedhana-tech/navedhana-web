import {
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiAmazon,
  SiDocker,
} from 'react-icons/si';

// The literal, named technology pipeline — lives on /services (not the Hero,
// which stays brand-centric around the Engineering Universe). Illustrative,
// not a literal claim about production infrastructure — see plan Gaps note.
export const PIPELINE = [
  { id: 'idea', label: 'Idea' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'frontend', label: 'Frontend', icon: SiReact },
  { id: 'backend', label: 'Backend', icon: SiNodedotjs },
  { id: 'database', label: 'Database', icon: SiPostgresql },
  { id: 'ai', label: 'AI', icon: SiPython },
  { id: 'testing', label: 'Testing' },
  { id: 'cloud', label: 'Cloud', icon: SiAmazon },
  { id: 'deployment', label: 'Deployment', icon: SiDocker },
  { id: 'monitoring', label: 'Monitoring' },
  { id: 'growth', label: 'Growth' },
];
