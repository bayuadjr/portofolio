import Projects from '../components/Projects/Projects';
import Footer from '../components/Footer/Footer';

export default function Work() {
  return (
    <>
      <section style={{ padding: 'var(--space-3xl) var(--space-lg)', minHeight: '30vh' }}>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            letterSpacing: '-2px',
            marginBottom: 'var(--space-md)',
          }}
        >
          Work<span style={{ color: 'var(--terracotta)' }}>.</span>
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: 'var(--ink-light)',
            maxWidth: '520px',
            lineHeight: 1.6,
          }}
        >
          Selected projects spanning ethnography, data science, and project management
          — the places where anthropology meets systems thinking.
        </p>
      </section>
      <Projects />
      <Footer />
    </>
  );
}
