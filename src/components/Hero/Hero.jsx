import { Link } from 'react-router-dom';
import { FIELDNOTES_DEFAULTS } from '../../data/projectHelpers';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-top">
        <p className="hero-eyebrow">Anthropology × Data Science × Systems</p>
        <span className="hero-meta">Malang, ID — Universitas Brawijaya</span>
      </div>

      <h1>Bayu Adji Ramadhan</h1>

      <p className="hero-sub">
        Anthropology student exploring how people, systems, and technology shape everyday life.
      </p>

      <div className="hero-actions">
        <Link to="/work" className="btn-solid">
          Explore Work →
        </Link>
        <a
          href={FIELDNOTES_DEFAULTS.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          <span className="live-dot" aria-hidden="true" />
          Fieldnotes Live Demo ↗
        </a>
        <Link to="/contact" className="btn-text">
          Get in touch
        </Link>
      </div>
    </section>
  );
}
