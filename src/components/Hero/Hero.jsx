import { Link } from 'react-router-dom';
import { FIELDNOTES_DEFAULTS } from '../../data/projectHelpers';
import { HERO_CONTENT } from '../../data/siteContent';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <p className="hero-eyebrow">{HERO_CONTENT.eyebrow}</p>
      <h1>{HERO_CONTENT.headline}</h1>

      <p className="hero-sub">{HERO_CONTENT.subcopy}</p>

      <div className="hero-actions">
        <Link to="/work" className="btn-solid">
          Explore work
        </Link>
        <a
          href={FIELDNOTES_DEFAULTS.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          Open Fieldnotes
        </a>
      </div>
    </section>
  );
}
