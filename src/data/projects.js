const projects = [
  {
    _id: 'project-fieldnotes',
    num: '01',
    title: 'Fieldnotes — AI Ethnographic Assistant',
    slug: { current: 'fieldnotes-ai-ethnographic-assistant' },
    projectType: 'Web App',
    featured: true,
    year: '2026',
    liveUrl: 'https://fieldnotes-ivory.vercel.app/',
    repoUrl: 'https://github.com/bayuadjr/fieldnotes',
    tags: ['Anthropology', 'AI Research', 'PWA'],
    highlights: ['Team Digest', 'Theme Detector', 'Perspective Drift', 'Tension Log'],
    demoCredentials: {
      email: 'bayu@fieldnotes.id',
      password: 'password123',
    },
    desc: 'AI-powered offline-first PWA for qualitative field researchers — Team Digest, Theme Detector, Perspective Drift, and Tension Log.',
  },
  {
    _id: 'project-traffic-ethics',
    num: '02',
    title: 'Traffic Ethics Fieldwork',
    slug: { current: 'traffic-ethics-fieldwork' },
    projectType: 'Fieldwork',
    year: '2026',
    tags: ['Ethnography', 'Anthropology'],
    desc: 'Deontological & utilitarian lens on moral inversion and pluralistic ignorance in Indonesian urban traffic. Based on original fieldwork and interview data.',
  },
  {
    _id: 'project-pandas-social-data',
    num: '03',
    title: 'Pandas × Social Data',
    slug: { current: 'pandas-social-data' },
    projectType: 'Data Analysis',
    year: '2025',
    tags: ['Data Science', 'Python'],
    desc: 'Self-directed learning via Kaggle — cleaning, analyzing, and visualizing social datasets using Python, Pandas, and NumPy. Building toward computational social science.',
  },
];

export default projects;
