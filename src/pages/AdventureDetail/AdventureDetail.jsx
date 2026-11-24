import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../../sanity/client';
import { sanitizeHttpUrl } from '../../utils/url';
import styles from './AdventureDetail.module.css';

export default function AdventureDetail() {
  const { slug } = useParams();
  const [retryCount, setRetryCount] = useState(0);
  const [state, setState] = useState({
    slug: null,
    attempt: -1,
    glimpse: null,
    error: false,
  });

  const loading = state.slug !== slug || state.attempt !== retryCount;
  const error = !loading && state.error;
  const glimpse = !loading && !state.error ? state.glimpse : null;

  useEffect(() => {
    let cancelled = false;

    const fetchGlimpse = async () => {
      try {
        const query = `*[_type == "glimpse" && (slug.current == $slug || _id == $slug)][0] {
          ...,
          "dimensions": image.asset->metadata.dimensions
        }`;
        const data = await client.fetch(query, { slug });
        if (!cancelled) {
          setState({ slug, attempt: retryCount, glimpse: data || null, error: false });
        }
      } catch (err) {
        console.error('Failed to fetch glimpse:', err);
        if (!cancelled) {
          setState({ slug, attempt: retryCount, glimpse: null, error: true });
        }
      }
    };

    fetchGlimpse();
    return () => {
      cancelled = true;
    };
  }, [slug, retryCount]);

  if (loading) {
    return (
      <div className={styles.stateBox} role="status">
        <p className={styles.stateText}>Loading visual note...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.stateBox} role="alert">
        <p className={styles.stateText}>
          Could not load this visual note right now. Check your connection and try again.
        </p>
        <div className={styles.stateActions}>
          <button
            type="button"
            className={styles.retryBtn}
            onClick={() => setRetryCount((c) => c + 1)}
          >
            Try again
          </button>
          <Link to="/adventure" className={styles.backLink}>
            Back to Beyond
          </Link>
        </div>
      </div>
    );
  }

  if (!glimpse) {
    return (
      <div className={styles.stateBox}>
        <p className={styles.stateText}>Visual note not found.</p>
        <Link to="/adventure" className={styles.backLink}>
          Back to Beyond
        </Link>
      </div>
    );
  }

  const safeVideoUrl = sanitizeHttpUrl(glimpse.videoUrl);
  const hashtags = Array.isArray(glimpse.hashtags) ? glimpse.hashtags : [];
  const imgWidth = glimpse.dimensions?.width || 1200;
  const imgHeight = glimpse.dimensions?.height || 800;

  return (
    <article className={styles.container}>
      <div className={styles.topNav}>
        <Link to="/adventure" className={styles.backLinkTop}>
          Back to Beyond
        </Link>
      </div>

      <div className={styles.mediaWrapper}>
        {glimpse.mediaType === 'video' && safeVideoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            controls
            width={1200}
            height={675}
            className={styles.video}
          >
            <source src={safeVideoUrl} type="video/mp4" />
          </video>
        ) : glimpse.image?.asset ? (
          <img
            src={urlFor(glimpse.image).auto('format').url()}
            alt={glimpse.title || glimpse.location || 'Visual note'}
            width={imgWidth}
            height={imgHeight}
            fetchPriority="high"
            className={styles.image}
          />
        ) : null}
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.location}>
            {glimpse.location || glimpse.title || 'Visual note'}
          </h1>
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
          <Link to="/adventure" className={styles.backLink}>
            Back to Beyond
          </Link>
        </div>
      </div>
    </article>
  );
}
