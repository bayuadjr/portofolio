import { Link } from 'react-router-dom';
import { FIELDNOTES_DEFAULTS } from '../../data/projectHelpers';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <h1>Bayu Adji Ramadhan</h1>

      <p className="hero-sub">
        I study anthropology and tinker with code. Mostly curious about ordinary habits and what happens when you look a bit closer.
      </p>

      <div className="hero-actions">
        <Link to="/work" className="btn-solid">
          See my work
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
