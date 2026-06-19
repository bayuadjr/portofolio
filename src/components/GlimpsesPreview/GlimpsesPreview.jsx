import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../../sanity/client';
import styles from './GlimpsesPreview.module.css';

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
    <section className={styles.section} id="glimpses-preview">
      <div className={styles.header}>
        <h2 className={styles.title}>Glimpses</h2>
        <Link to="/adventure" className={styles.viewAll}>See all →</Link>
      </div>

      <div className={styles.grid}>
        {loading ? (
          <p className={styles.status}>Loading glimpses...</p>
        ) : glimpses.length > 0 ? (
          glimpses.map((item) => (
            <Link
              to={`/adventure/${item.slug?.current || item._id}`}
              key={item._id}
              className={styles.photoLink}
            >
              <div className={styles.photoBlock}>
                {item.mediaType === 'video' && item.videoUrl ? (
                  <video autoPlay muted loop playsInline className={styles.media}>
                    <source src={item.videoUrl} type="video/mp4" />
                  </video>
                ) : item.image ? (
                  <img
                    src={urlFor(item.image).width(600).url()}
                    alt={item.title}
                    className={styles.media}
                  />
                ) : null}
                {item.caption && (
                  <span className={styles.caption}>{item.caption}</span>
                )}
              </div>
            </Link>
          ))
        ) : (
          <p className={styles.status}>No glimpses yet.</p>
        )}
      </div>
    </section>
  );
}
