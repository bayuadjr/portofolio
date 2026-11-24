import { Link } from 'react-router-dom';
import { FIELDNOTES_DEFAULTS } from '../../data/projectHelpers';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <p className="hero-meta">Malang, Indonesia</p>

      <h1>Bayu Adji Ramadhan</h1>

      <p className="hero-sub">
        I study anthropology and spend my spare time working with data and building small tools. Mostly, I like paying attention to ordinary habits and seeing what shows up when you look a little closer.
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
