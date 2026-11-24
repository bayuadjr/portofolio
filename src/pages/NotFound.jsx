import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: '100px 0 140px', maxWidth: '640px' }}>
      <p style={{ fontSize: '14px', color: 'var(--mid)', marginBottom: '16px', letterSpacing: '0.04em' }}>
        404
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
      <p style={{ fontSize: '17px', color: 'var(--mid)', lineHeight: 1.6, marginBottom: '36px' }}>
        That page either moved, never existed, or the link has a typo.
      </p>
      <Link to="/" className="btn-outline">
        Back to home
      </Link>
    </div>
  );
}
