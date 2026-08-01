// Single source of truth for service copy + StepFlow step data — drives both
// the Home preview cards and the /services documentary timeline.
export const SERVICES = [
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    description:
      'Custom web and backend systems engineered for scale, built with clean architecture and long-term maintainability in mind.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    steps: ['Requirement', 'Architecture', 'Development', 'Testing', 'Deployment'],
    features: [
      'Clean, modular architecture from day one',
      'Code reviewed and tested before it ships',
      'Built to scale past the first thousand users',
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    description:
      'Cross-platform apps that feel native on both iOS and Android, from wireframe to store release.',
    tags: ['Flutter', 'React Native', 'iOS', 'Android'],
    steps: ['Wireframe', 'Flutter', 'Android', 'iOS', 'Release'],
    features: [
      'One codebase, native feel on both platforms',
      'Offline-ready, performance-first engineering',
      'Store submission and release handled end to end',
    ],
  },
  {
    id: 'desktop',
    title: 'Desktop Applications',
    description:
      'Native-feeling desktop software with robust business logic and reliable local data handling.',
    tags: ['Electron', '.NET', 'SQLite'],
    steps: ['UI', 'Business Logic', 'Database', 'Installer', 'Launch'],
    features: [
      'Cross-platform installers for Windows, macOS, Linux',
      'Reliable local data storage and sync',
      'Auto-update pipelines built in',
    ],
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    description:
      'AI agents, copilots, and RAG-powered assistants that automate workflows and unlock insights from your data.',
    tags: ['LLMs', 'RAG', 'LangChain'],
    steps: ['Prompt', 'Embedding', 'Reasoning', 'Inference', 'Response'],
    features: [
      'RAG pipelines grounded in your own data',
      'Agents that call real tools, not just chat',
      'Evaluated and guardrailed before launch',
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    description:
      'Automated pipelines and cloud infrastructure that ship safely and scale on demand.',
    tags: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    steps: ['Commit', 'CI', 'Docker', 'Kubernetes', 'Production'],
    features: [
      'Zero-downtime deployments as the default',
      'Infrastructure as code, fully reproducible',
      'Autoscaling under real traffic, not just in theory',
    ],
  },
  {
    id: 'qa-automation',
    title: 'QA Automation',
    description: 'Automated test suites that catch regressions before your customers do.',
    tags: ['Playwright', 'Jest', 'CI'],
    steps: ['Open Browser', 'Execute Test', 'Validate', 'Report', 'Success'],
    features: [
      'End-to-end tests run on every commit',
      'Coverage that grows with the codebase',
      'Failures caught before they reach production',
    ],
  },
];
