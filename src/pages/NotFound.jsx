import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: '120px 0 160px', maxWidth: '640px' }}>
      <p style={{ fontSize: '14px', color: 'var(--mid)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        404 — Not Found
      </p>
      <h1 style={{
        fontFamily: "'Newsreader', Georgia, serif",
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 'clamp(40px, 6vw, 64px)',
        color: 'var(--ink)',
        lineHeight: 1.15,
        marginBottom: '20px',
      }}>
        Page not found.
      </h1>
      <p style={{ fontSize: '17px', color: 'var(--mid)', lineHeight: 1.6, marginBottom: '40px' }}>
        The page you are looking for may have been moved, deleted, or is not yet available.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          border: '1px solid var(--ink)',
          color: 'var(--ink)',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 500,
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--ink)';
          e.currentTarget.style.color = 'var(--paper)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--ink)';
        }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}
