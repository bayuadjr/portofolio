import { Link } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import RecentWriting from '../components/RecentWriting/RecentWriting';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { HOME_ABOUT, CURRENT_INTERESTS, CURRENTLY_EXPLORING } from '../data/siteContent';

export default function Home() {
  useDocumentMeta({
    description:
      'Portfolio and personal notebook of Bayu Adji Ramadhan, an anthropology student exploring people, systems, data, and software tools.',
    path: '/',
  });

  return (
    <>
      <Hero />

      <section className="intro">
        <div className="intro-label">About</div>
        <div className="intro-body">
          {HOME_ABOUT.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}

          <Link to="/about" className="intro-more">
            More about me
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Interests</div>
        <ul className="interest-list">
          {CURRENT_INTERESTS.map((item) => (
            <li key={item.title} className="interest-item">
              <div className="interest-title">{item.title}</div>
              <p className="interest-note">{item.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <Projects limit={4} />

      <RecentWriting limit={3} />

      <section className="section">
        <div className="section-label">Currently</div>
        <ul className="exploring-list">
          {CURRENTLY_EXPLORING.map((item) => (
            <li key={item.title} className="exploring-item">
              <div className="exploring-title">{item.title}</div>
              <p className="exploring-note">{item.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="footer-cta">
        <div className="intro-label">Say hello</div>
        <div>
          <h2>Want to trade notes or talk through an idea?</h2>
          <Link to="/contact" className="btn-solid">
            Write me a note
          </Link>
        </div>
      </section>
    </>
  );
}
