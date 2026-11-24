let blockCounter = 0;

function makeKey(prefix = 'k') {
  blockCounter += 1;
  return `${prefix}-${blockCounter}`;
}

export function heading(text, level = 'h2') {
  return {
    _type: 'block',
    _key: makeKey('h'),
    style: level,
    markDefs: [],
    children: [{ _type: 'span', _key: makeKey('s'), text, marks: [] }],
  };
}

export function paragraph(text) {
  return {
    _type: 'block',
    _key: makeKey('p'),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: makeKey('s'), text, marks: [] }],
  };
}

export function bullet(text) {
  return {
    _type: 'block',
    _key: makeKey('b'),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: makeKey('s'), text, marks: [] }],
  };
}

const projects = [
  {
    _id: 'project-fieldnotes',
    num: '01',
    sortOrder: 1,
    title: 'Fieldnotes',
    slug: { current: 'fieldnotes-ai-ethnographic-assistant' },
    category: 'Software & Tools',
    projectType: 'Web App',
    role: 'Creator & Product Developer',
    status: 'Active development',
    featured: true,
    year: '2026',
    liveUrl: 'https://fieldnotes-ivory.vercel.app/',
    repoUrl: 'https://github.com/bayuadjr/fieldnotes',
    tags: ['Fieldwork', 'React', 'Dexie.js', 'Supabase'],
    highlights: ['Team Digest', 'Theme Detector', 'Perspective Drift', 'Tension Log'],
    demoCredentials: {
      email: 'bayu@fieldnotes.id',
      password: 'password123',
    },
    summary:
      'An AI-assisted ethnographic fieldwork companion built local-first so qualitative researchers keep interpretive authority.',
    relatedSlugs: ['traffic-ethics-fieldwork', 'harmoko-coffee-digitalization'],
    body: [
      heading('Context'),
      paragraph(
        'Ethnographic fieldwork often happens in places with unreliable connectivity while notes pile up across notebooks, audio transcripts, and loose files. Fieldnotes started in May 2026 to give qualitative researchers in Indonesia a calm workspace that respects how fieldwork actually unfolds.'
      ),
      heading('Research Problem'),
      paragraph(
        'Most note apps force researchers to pick between heavy enterprise QDA suites with file lock-in or AI chat tools that flatten field data into generic summaries. Automated clustering often hides contradictions and blurs what a researcher observed versus what they inferred later.'
      ),
      heading('Product Concept'),
      paragraph(
        'The guiding rule is simple: AI assists administrative and analytical sorting, while human researchers retain interpretive authority. Notes distinguish empirical observation from personal reflection, surface contradictions in a Tension Log instead of hiding them, and export cleanly to Markdown and CSV with zero lock-in.'
      ),
      heading('Design Decisions'),
      bullet('Separated Observation notes from Interpretation to preserve evidentiary clarity.'),
      bullet('Designed Team Digest to highlight what researchers are noticing together rather than plain chronological logs.'),
      bullet('Made AI Theme Detector suggestions explicitly provisional with Accept, Reject, or Ambiguous states.'),
      bullet('Added Perspective Drift and Fault Lines views to surface shifts and disagreements across team members.'),
      heading('Technical Implementation'),
      paragraph(
        'The current codebase is built with React, TypeScript, Vite, and Tailwind CSS, backed by Dexie.js (IndexedDB) for local-first storage and Supabase for optional sync and authentication. AI synthesis uses a bring-your-own-key Google Gemini integration with local offline heuristics as fallback, alongside OpenAlex academic lookup.'
      ),
      heading('AI Role and Limitations'),
      paragraph(
        'AI never writes final findings or overwrites raw field entries. Its suggestions act as prompts for review and can be rejected or marked ambiguous when nuance resists categorization. Installable service-worker PWA packaging is still on the roadmap rather than treated as complete.'
      ),
      heading('Current Status and Next Steps'),
      paragraph(
        'Fieldnotes has a working web prototype with sandbox demo access. Current work focuses on stabilizing sync workflows, refining prompt behavior with qualitative data, and packaging offline asset caching.'
      ),
      heading('Reflection'),
      paragraph(
        'Building Fieldnotes clarified how much software encodes epistemology: every button either encourages premature certainty or makes room for doubt, contradiction, and revision.'
      ),
    ],
  },
  {
    _id: 'project-harmoko-coffee',
    num: '02',
    sortOrder: 2,
    title: 'Harmoko Coffee Digitalization',
    slug: { current: 'harmoko-coffee-digitalization' },
    category: 'Product & Business',
    projectType: 'Case Study',
    role: 'Capstone Team Member (Data Science & Digitalization)',
    status: 'In progress',
    featured: false,
    year: '2026',
    tags: ['Business Systems', 'Digitalization', 'POS', 'Data'],
    summary:
      'Program Asah 2026 capstone project turning manual street-coffee operations into a unified web profile, POS, and Cold Brew stock estimation dashboard.',
    relatedSlugs: ['fieldnotes-ai-ethnographic-assistant', 'maintenance-request-system'],
    body: [
      heading('Context'),
      paragraph(
        'Harmoko Coffee is a grab-and-go street coffee shop operating near Kantin CL at Universitas Brawijaya. As part of Program Asah 2026 (Dicoding and GoTo), Team A26-CS094 partnered with the founder to build a realistic digitalization MVP around real daily operations.'
      ),
      heading('Business Problem'),
      paragraph(
        'During busy campus hours, baristas recorded orders manually on paper or loose tables, leading to missed entries when lines grew long. Meanwhile, Cold Brew batches were estimated by intuition rather than recent demand patterns, creating preventable spoilage waste over quieter weekends.'
      ),
      heading('Approach and My Contribution'),
      paragraph(
        'We started with owner interviews and business process mapping before writing code, focusing on workflows that fit a fast counter environment rather than adding heavyweight ERP features.'
      ),
      bullet('Conducted stakeholder discovery and translated operational bottlenecks into clear four-week MVP criteria.'),
      bullet('Co-developed an integrated platform linking a Company Profile site with a Headless CMS Studio, an AI Event Scraper for campus and community events, a digital POS supporting Cash and QRIS tracking, and a daily Cold Brew stock estimation dashboard.'),
      bullet('Scoped out premature complexity such as payment gateway integration or CRM suites so baristas can log transactions quickly.'),
      heading('Current Status'),
      paragraph(
        'The MVP modules are actively under development and validation with the business owner and baristas. No performance metrics are claimed prior to live rollout.'
      ),
      heading('Reflection'),
      paragraph(
        'Watching how a busy coffee stand actually operates reinforced that data models only help small businesses if recording the underlying transaction takes seconds under rush pressure.'
      ),
    ],
  },
  {
    _id: 'project-traffic-ethics',
    num: '03',
    sortOrder: 3,
    title: 'Traffic Ethics Fieldwork',
    slug: { current: 'traffic-ethics-fieldwork' },
    category: 'Research',
    projectType: 'Fieldwork',
    role: 'Independent Researcher',
    status: 'Completed',
    featured: false,
    year: '2026',
    tags: ['Fieldwork', 'Ethnography', '16 Informants'],
    summary:
      'Qualitative fieldwork exploring why stopping at an empty red light feels socially awkward when everyone else rolls through.',
    relatedSlugs: ['ethnographic-essay-asa-2026', 'fieldnotes-ai-ethnographic-assistant'],
    body: [
      heading('Research Question'),
      paragraph(
        'A red light looks straightforward: stop, wait, then go. Yet on city streets, following the formal rule when an intersection looks empty often draws honks or stares. This project started from one question: why can obedience feel socially abnormal?'
      ),
      heading('Fieldwork Process'),
      paragraph(
        'I combined street-level observation with semi-structured interviews across 16 informants from several universities and workplaces across Java to understand how riders reason through red-light decisions in real time.'
      ),
      heading('Findings'),
      bullet('Most informants recognized that running a red light is formally wrong and carries risk, yet still followed traffic flow when others moved first.'),
      bullet('Once one rider crossed, surrounding riders tended to follow, often less out of urgency than a desire not to stand out or hold up those behind them.'),
      bullet('Several informants reported feeling awkward or self-conscious when stopping alone, whereas breaking the rule together felt ordinary.'),
      bullet('Informants who consistently waited tended to frame their decision around personal safety or internal principle rather than fear of enforcement.'),
      heading('Analytical Lenses'),
      paragraph(
        'To interpret the interviews, I looked at concepts from social conformity, pluralistic ignorance, and Bandura\'s observational learning as analytical lenses for understanding how informal street norms temporarily outweigh formal rules, rather than treating these frameworks as deterministic laws.'
      ),
      heading('Reflection'),
      paragraph(
        'The interviews showed that traffic behavior is less a question of individual discipline in isolation and more a live negotiation of what appears normal in a specific moment on the road.'
      ),
    ],
  },
  {
    _id: 'project-maintenance-request-system',
    num: '04',
    sortOrder: 4,
    title: 'Maintenance Request System',
    slug: { current: 'maintenance-request-system' },
    category: 'Software & Tools',
    projectType: 'Web App',
    role: 'Back-End Developer & Scrum Master',
    status: 'Completed',
    featured: false,
    year: '2023',
    tags: ['PHP', 'MySQL', 'Scrum'],
    summary:
      'Web application built with a six-person team during internship to digitize school facility maintenance workflows.',
    relatedSlugs: ['harmoko-coffee-digitalization', 'inisian-2025-event-operations'],
    body: [
      heading('Context'),
      paragraph(
        'Completed between January and March 2023 during a vocational software engineering internship at Budi Mulia Dua Foundation (SD Budi Mulia Dua Bintaro). Staff and teachers needed a traceable way to submit and track facility repair requests without relying on informal messages.'
      ),
      heading('My Contribution'),
      paragraph(
        'I worked in a six-person team carrying two responsibilities: Back-End Developer and Scrum Master.'
      ),
      bullet('Built core backend request submission, processing, and status tracking logic using PHP and MySQL.'),
      bullet('Facilitated sprint planning, daily stand-ups, backlog management, and user story mapping to keep delivery moving across the three-month placement.'),
      bullet('Authored system design documentation covering Entity Relationship Diagrams (ERD), Logical Record Structures (LRS), Activity Diagrams, and Data Flow Diagrams (DFD).'),
      heading('Written Output'),
      paragraph(
        'Alongside the application, I wrote a technical paper documenting the backend architecture: "Membuat Back End Aplikasi Maintenance Request Berbasis Web Menggunakan Bahasa Pemrograman PHP dan Basis Data MySQL pada SD BUDI MULIA DUA BINTARO."'
      ),
      heading('Reflection'),
      paragraph(
        'Even early software work taught me that backend schemas only make sense after sitting down with the staff who actually submit and resolve tickets every day.'
      ),
    ],
  },
  {
    _id: 'project-ethnographic-essay-asa-2026',
    num: '05',
    sortOrder: 5,
    title: 'Ethnographic Essay (ASA 2026)',
    slug: { current: 'ethnographic-essay-asa-2026' },
    category: 'Research',
    projectType: 'Essay',
    role: 'Author',
    status: '3rd Place, ASA 2026',
    featured: false,
    year: '2026',
    tags: ['Anthropology', 'Ethnography', 'Writing'],
    summary:
      'Competition essay awarded 3rd Place in the Ethnographic Essay category at the Anthropology Student Awards (ASA) 2026.',
    relatedSlugs: ['traffic-ethics-fieldwork'],
    body: [
      heading('Overview'),
      paragraph(
        'This ethnographic essay placed 3rd in the Ethnographic Essay competition at the Anthropology Student Awards (ASA) 2026.'
      ),
      heading('Documentation Note'),
      paragraph(
        'A detailed public summary, context notes, and excerpts are currently being prepared for publication in this archive so every claim and citation matches the submitted manuscript accurately.'
      ),
    ],
  },
  {
    _id: 'project-pandas-social-data',
    num: '06',
    sortOrder: 6,
    title: 'Pandas and Social Data',
    slug: { current: 'pandas-social-data' },
    category: 'Research',
    projectType: 'Data Analysis',
    role: 'Independent Learner',
    status: 'Ongoing practice',
    featured: false,
    year: '2025',
    tags: ['Python', 'Pandas', 'Data Analysis'],
    summary:
      'Cleaning, exploring, and plotting public datasets with Python, Pandas, and NumPy alongside qualitative study.',
    relatedSlugs: ['fieldnotes-ai-ethnographic-assistant', 'traffic-ethics-fieldwork'],
    body: [
      heading('Background'),
      paragraph(
        'To build fluency between anthropology and quantitative analysis, I started practicing structured data cleaning, exploratory plots, and introductory modeling with Python, Pandas, and NumPy.'
      ),
      heading('Focus'),
      paragraph(
        'Rather than treating numbers as self-explanatory, the practice helped me see how missing values, messy categories, and feature definitions shape every downstream summary. Those challenges closely mirror categorization dilemmas in qualitative coding.'
      ),
    ],
  },
  {
    _id: 'project-inisian',
    num: '07',
    sortOrder: 7,
    title: 'Inisian 2025 Event Operations',
    slug: { current: 'inisian-2025-event-operations' },
    category: 'Product & Business',
    projectType: 'Operations',
    role: 'Operations & Facilitation',
    status: 'Completed',
    featured: false,
    year: '2025',
    tags: ['Operations', 'Facilitation'],
    summary:
      'Coordinating team logistics, schedules, and student discussion sessions for university orientation.',
    relatedSlugs: ['maintenance-request-system'],
    body: [
      heading('What It Involved'),
      paragraph(
        'Worked directly on operations for university student orientation: coordinating cross-division logistics, maintaining run-of-show schedules, and facilitating small-group discussions.'
      ),
      heading('Takeaway'),
      paragraph(
        'Large student events run on clear communication loops more than written manuals. Keeping schedules simple gave facilitators room to handle unexpected changes calmly on the ground.'
      ),
    ],
  },
  {
    _id: 'project-portfolio',
    num: '08',
    sortOrder: 8,
    title: 'This Portfolio & Notebook',
    slug: { current: 'portfolio-website-bayuadjr' },
    category: 'Software & Tools',
    projectType: 'Web App',
    role: 'Designer & Developer',
    status: 'Active',
    featured: false,
    year: '2025',
    liveUrl: 'https://bayuadjr.vercel.app',
    repoUrl: 'https://github.com/bayuadjr/portofolio',
    tags: ['React', 'Vite', 'Sanity CMS'],
    summary:
      'Personal portfolio and intellectual notebook combining formal project case studies, essays, and informal observations.',
    relatedSlugs: ['fieldnotes-ai-ethnographic-assistant'],
    body: [
      heading('Intent'),
      paragraph(
        'I wanted one quiet, durable website where formal research, software tools, essays, and visual notes can sit side by side without turning into either a corporate resume or a noisy template.'
      ),
      heading('Architecture'),
      paragraph(
        'Built with React, Vite, CSS Modules, and Sanity CMS (including a lazy-loaded Studio route), paired with structured local fallback data so every page stays readable if the CMS is unreachable.'
      ),
    ],
  },
];

export default projects;
