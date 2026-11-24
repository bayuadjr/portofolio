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
            I'm an anthropology student at Universitas Brawijaya. Before college, I learned how to build software in vocational school, and somewhere along the way I stopped treating people and code like separate worlds.
          </p>
          <p>
            Most of what pulls me in looks ordinary at first: why drivers run a red light when nobody else stops, how a rumor moves through a group chat, or how a rough piece of software changes the way a small team talks to each other.
          </p>
          <p>
            Numbers help me spot a shape from a distance. Talking to people reminds me that the shape rarely tells the whole story.
          </p>

          <Link to="/about" className="intro-more">
            A bit more about me
          </Link>
        </div>
      </section>

      <Projects limit={3} />

      <section className="footer-cta">
        <div className="intro-label">Say hello</div>
        <div>
          <h2>Have a question, a stray observation, or something you'd like to talk through?</h2>
          <Link to="/contact" className="btn-solid">Write me a note</Link>
        </div>
      </section>
    </>
  );
}
