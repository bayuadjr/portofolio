import { Link } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';

export default function Home() {
  return (
    <>
      <Hero />

      <section className="intro">
        <div className="intro-label">About</div>
        <div className="intro-body">
          <p>
            I came to college after studying software in vocational school, so I never really learned to treat people and computers as separate subjects.
          </p>
          <p>
            What usually catches my eye is pretty mundane: why someone stops at an empty red light while everyone else rolls through, or how a small shared tool changes the way a group talks.
          </p>
          <p>
            Data shows me a rough outline from far away. Talking to people reminds me how much that outline misses.
          </p>

          <Link to="/about" className="intro-more">
            More about me
          </Link>
        </div>
      </section>

      <Projects limit={3} />

      <section className="footer-cta">
        <div className="intro-label">Say hello</div>
        <div>
          <h2>Want to trade notes or talk through an idea?</h2>
          <Link to="/contact" className="btn-solid">Write me a note</Link>
        </div>
      </section>
    </>
  );
}
