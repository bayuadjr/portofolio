import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../../sanity/client';
import styles from './AdventureDetail.module.css';

export default function AdventureDetail() {
  const { slug } = useParams();
  const [glimpse, setGlimpse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlimpse = async () => {
      try {
        const query = `*[_type == "glimpse" && slug.current == $slug][0]`;
        const data = await client.fetch(query, { slug });
        setGlimpse(data);
      } catch (error) {
        console.error("Failed to fetch glimpse:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGlimpse();
  }, [slug]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!glimpse) return <div className={styles.empty}>Glimpse not found.</div>;

  return (
    <article className={styles.container}>
      <div className={styles.topNav}>
        <Link to="/adventure" className={styles.backLinkTop}>← Back to Beyond</Link>
      </div>

      <div className={styles.mediaWrapper}>
        {glimpse.mediaType === 'video' && glimpse.videoUrl ? (
          <video autoPlay muted loop playsInline controls className={styles.video}>
            <source src={glimpse.videoUrl} type="video/mp4" />
          </video>
        ) : glimpse.image ? (
          <img
            src={urlFor(glimpse.image).url()}
            alt={glimpse.title || glimpse.location || 'Glimpse'}
            className={styles.image}
          />
        ) : null}
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          {glimpse.location && (
            <h1 className={styles.location}>
              <span className={styles.pin}>📍</span>{glimpse.location}
            </h1>
          )}
          {glimpse.date && (
            <div className={styles.date}>
              {new Date(glimpse.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          )}
        </header>

        {glimpse.caption && (
          <p className={styles.caption}>{glimpse.caption}</p>
        )}

        {glimpse.hashtags && glimpse.hashtags.length > 0 && (
          <div className={styles.hashtags}>
            {glimpse.hashtags.map(tag => (
              <span key={tag} className={styles.hashtagPill}>#{tag}</span>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <Link to="/adventure" className={styles.backLink}>← Back to Beyond</Link>
        </div>
      </div>
    </article>
  );
}
