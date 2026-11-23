import { Link } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';

const FOCUS_AREAS = [
  {
    num: '01',
    title: 'Ethnographic Fieldwork',
    desc: 'Qualitative observation, interviews, and thick cultural context.',
  },
  {
    num: '02',
    title: 'Computational Analysis',
    desc: 'Python, statistical reasoning, and pattern discovery in social data.',
  },
  {
    num: '03',
    title: 'Applied Research Tools',
    desc: 'Designing offline-first software and systems for real field teams.',
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="intro">
        <div className="intro-label">About</div>
        <div className="intro-body">
          <p>
            I am an Anthropology student at Universitas Brawijaya. Lately, I've been spending a lot of time working between anthropology, data science, and technology to look for new ways to understand human behavior.
          </p>
          <p>
            I'm interested in things that seem simple, but turn out to have patterns behind them, such as how people make decisions, how they follow others, how information spreads, and how technology changes how we work and interact.
          </p>
          <p>
            I don't see data as a replacement for field research. I'm more interested in what happens when data helps us find patterns, and then anthropology helps us understand the context behind those patterns.
          </p>

          <div className="focus-grid">
            {FOCUS_AREAS.map((area) => (
              <div className="focus-item" key={area.num}>
                <span className="focus-num">{area.num}</span>
                <h3 className="focus-title">{area.title}</h3>
                <p className="focus-desc">{area.desc}</p>
              </div>
            ))}
          </div>

          <Link to="/about" className="intro-more">
            More about my background →
          </Link>
        </div>
      </section>

      <Projects limit={3} />

      <section className="footer-cta">
        <div className="intro-label">Contact</div>
        <div>
          <h2>Interested in discussing research, data, or collaboration?</h2>
          <Link to="/contact" className="btn-solid">Contact me →</Link>
        </div>
      </section>
    </>
  );
}
