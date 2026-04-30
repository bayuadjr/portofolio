import Adventure from '../components/Adventure/Adventure';
import Footer from '../components/Footer/Footer';

export default function AdventurePage() {
  return (
    <>
      <section style={{ padding: 'var(--space-3xl) var(--space-lg)', borderBottom: 'var(--border)' }}>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            letterSpacing: '-2px',
            marginBottom: 'var(--space-md)',
          }}
        >
          Adventure<span style={{ color: 'var(--terracotta)' }}>.</span>
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
          Fieldwork, travel, campus life — moments captured between datasets and deadlines.
        </p>
      </section>
      <Adventure />
      <Footer />
    </>
  );
}
