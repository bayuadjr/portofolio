import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../../sanity/client';

export default function GlimpsesPreview() {
  const [glimpses, setGlimpses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch('*[_type == "glimpse"] | order(date desc) [0...2]')
      .then((data) => {
        setGlimpses(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="section" id="glimpses-preview">
      <div className="section-label">
        Glimpses
        <br />
        <br />
        <Link to="/adventure" style={{ textDecoration: 'underline' }}>See all →</Link>
      </div>

      <div className="section-body" style={{ display: 'flex', gap: '24px' }}>
        {loading ? (
          <p>Loading glimpses...</p>
        ) : glimpses.length > 0 ? (
          glimpses.map((item) => (
            <Link
              to={`/adventure/${item.slug?.current || item._id}`}
              key={item._id}
              style={{ flex: 1, textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ background: 'var(--panel)', border: '1px dashed var(--line)', padding: '12px', height: '100%' }}>
                {item.mediaType === 'video' && item.videoUrl ? (
                  <video autoPlay muted loop playsInline style={{ width: '100%', display: 'block', marginBottom: '12px' }}>
                    <source src={item.videoUrl} type="video/mp4" />
                  </video>
                ) : item.image ? (
                  <img
                    src={urlFor(item.image).width(600).url()}
                    alt={item.title}
                    style={{ width: '100%', display: 'block', marginBottom: '12px' }}
                  />
                ) : null}
                {item.caption && (
                  <span style={{ fontSize: '13px', color: 'var(--mid)' }}>{item.caption}</span>
                )}
              </div>
            </Link>
          ))
        ) : (
          <p>No glimpses yet.</p>
        )}
      </div>
    </section>
  );
}
