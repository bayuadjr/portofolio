import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../../sanity/client';
import { sanitizeHttpUrl } from '../../utils/url';
import styles from './AdventureDetail.module.css';

export default function AdventureDetail() {
  const { slug } = useParams();
  const [state, setState] = useState({ slug: null, glimpse: null });

  const loading = state.slug !== slug;
  const glimpse = state.slug === slug ? state.glimpse : null;

  useEffect(() => {
    let cancelled = false;

    const fetchGlimpse = async () => {
      try {
        const query = `*[_type == "glimpse" && (slug.current == $slug || _id == $slug)][0]`;
        const data = await client.fetch(query, { slug });
        if (!cancelled) {
          setState({ slug, glimpse: data || null });
        }
      } catch (error) {
        console.error('Failed to fetch glimpse:', error);
        if (!cancelled) {
          setState({ slug, glimpse: null });
        }
      }
    };

    fetchGlimpse();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!glimpse) return <div className={styles.empty}>Glimpse not found.</div>;

  const safeVideoUrl = sanitizeHttpUrl(glimpse.videoUrl);
  const hashtags = Array.isArray(glimpse.hashtags) ? glimpse.hashtags : [];

  return (
    <article className={styles.container}>
      <div className={styles.topNav}>
        <Link to="/adventure" className={styles.backLinkTop}>← Back to Beyond</Link>
      </div>

      <div className={styles.mediaWrapper}>
        {glimpse.mediaType === 'video' && safeVideoUrl ? (
          <video autoPlay muted loop playsInline controls className={styles.video}>
            <source src={safeVideoUrl} type="video/mp4" />
          </video>
        ) : glimpse.image?.asset ? (
          <img
            src={urlFor(glimpse.image).auto('format').url()}
            alt={glimpse.title || glimpse.location || 'Glimpse'}
            className={styles.image}
          />
        ) : null}
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          {glimpse.location ? (
            <h1 className={styles.location}>
              <span className={styles.pin} aria-hidden="true">📍</span>{glimpse.location}
            </h1>
          ) : (
            <h1 className={styles.location}>{glimpse.title || 'Glimpse'}</h1>
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

        {hashtags.length > 0 && (
          <div className={styles.hashtags}>
            {hashtags.map((tag) => (
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
