const projects = [
  {
    _id: 'project-fieldnotes',
    num: '01',
    title: 'Fieldnotes',
    slug: { current: 'fieldnotes-ai-ethnographic-assistant' },
    projectType: 'Web App',
    featured: true,
    year: '2026',
    liveUrl: 'https://fieldnotes-ivory.vercel.app/',
    repoUrl: 'https://github.com/bayuadjr/fieldnotes',
    tags: ['Fieldwork', 'Web app'],
    demoCredentials: {
      email: 'bayu@fieldnotes.id',
      password: 'password123',
    },
    desc: 'An offline-first field notebook for researchers working on slow connections. Includes team digests, theme tracking, perspective drift, and tension logs.',
  },
  {
    _id: 'project-traffic-ethics',
    num: '02',
    title: 'Traffic Ethics Fieldwork',
    slug: { current: 'traffic-ethics-fieldwork' },
    projectType: 'Fieldwork',
    year: '2026',
    tags: ['Fieldwork', 'Anthropology'],
    desc: 'Notes and interviews about why drivers bend traffic rules, and why stopping at an empty red light feels odd when no one else does.',
  },
  {
    _id: 'project-pandas-social-data',
    num: '03',
    title: 'Pandas and Social Data',
    slug: { current: 'pandas-social-data' },
    projectType: 'Data Analysis',
    year: '2025',
    tags: ['Data', 'Python'],
    desc: 'Cleaning, exploring, and plotting public social datasets with Python, Pandas, and NumPy alongside qualitative field notes.',
  },
];

export default projects;
