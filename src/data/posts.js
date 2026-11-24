import { heading, paragraph } from './projects';

const posts = [
  {
    _id: 'post-german-traits-v2',
    title: 'German Cultural Traits as a Coherent Value System',
    slug: { current: 'german-cultural-traits-as-coherent-value-system' },
    date: '2025-04-15T00:00:00Z',
    category: 'Anthropology',
    tag: ['Anthropology'],
    readingTime: 4,
    summary:
      'Exploring how stereotypes around punctuality and directness connect into a shared social logic of trust through predictability.',
    body: [
      heading('The Puzzle of Cultural Traits'),
      paragraph(
        'When people describe German culture, they often list isolated traits such as punctuality, directness, or attachment to rules. Treated as separate quirks, the list misses why those habits tend to appear together.'
      ),
      heading('Trust Through Predictability'),
      paragraph(
        'A useful way to read these habits is as parts of one underlying value system: building trust by making behavior predictable. Saying clearly what you expect and arriving when stated lowers uncertainty between strangers.'
      ),
      heading('Contrasting Social Logics'),
      paragraph(
        'Comparing that logic with everyday Indonesian interaction highlights how trust can also be organized around maintaining harmony and attentiveness to social context rather than rigid scheduling.'
      ),
    ],
  },
  {
    _id: 'post-dawn-everything-v2',
    title: 'The Dawn of Everything: Notes on Social Complexity',
    slug: { current: 'the-dawn-of-everything-graeber-wengrow' },
    date: '2025-03-01T00:00:00Z',
    category: 'Reading Notes',
    tag: ['Book Notes', 'Anthropology'],
    readingTime: 5,
    summary:
      'Reading Graeber and Wengrow on why early human societies experimented with political form rather than following one straight evolutionary line.',
    body: [
      heading('Against Linear Stories'),
      paragraph(
        'The core argument in The Dawn of Everything challenges the tidy staircase from small egalitarian bands to farming, cities, and fixed hierarchy. Across the archaeological record, groups moved between social arrangements deliberately.'
      ),
      heading('Ideas That Stuck With Me'),
      paragraph(
        'Concepts like schismogenesis and seasonal shifts in authority serve as a useful reminder when designing software or reading social data: people regularly negotiate, resist, and rework structure rather than passively following one script.'
      ),
    ],
  },
  {
    _id: 'post-moral-inversion-v2',
    title: 'Moral Inversion and Pluralistic Ignorance in Urban Traffic',
    slug: { current: 'moral-inversion-and-pluralistic-ignorance' },
    date: '2025-02-01T00:00:00Z',
    category: 'Research Notes',
    tag: ['Research Notes', 'Anthropology'],
    readingTime: 5,
    summary:
      'Notes on why stopping at an empty red light can trigger social friction when riders mistake collective compliance with flow for shared approval.',
    body: [
      heading('The Midnight Red Light'),
      paragraph(
        'In urban traffic, stopping at an empty intersection at night can turn formal rule-following into social friction. Waiting feels out of place when surrounding riders roll past without pausing.'
      ),
      heading('Pluralistic Ignorance as a Lens'),
      paragraph(
        'Pluralistic ignorance describes situations where individuals privately agree with a norm yet conform to opposite behavior because they assume everyone else prefers it. Looking at street intersections through that lens informs the Traffic Ethics Fieldwork interviews.'
      ),
    ],
  },
];

export default posts;
