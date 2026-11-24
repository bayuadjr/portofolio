import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity/client';
import { sanitizeHttpUrl } from '../utils/url';

import styles from './Adventure.module.css';

export default function AdventurePage() {
  const [glimpses, setGlimpses] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const query = `*[_type == "glimpse"] | order(date desc) {
      ...,
      "dimensions": image.asset->metadata.dimensions
    }`;

    client
      .fetch(query)
      .then((data) => {
        if (cancelled) return;
        setGlimpses(data || []);
        setError(false);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch glimpses:', err);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  const handleRetry = () => {
    setLoading(true);
    setError(false);
    setRetryCount((c) => c + 1);
  };

  const hashtags = useMemo(() => {
    const tags = new Set();
    glimpses.forEach((item) => {
      if (Array.isArray(item.hashtags)) {
        item.hashtags.forEach((t) => tags.add(t));
      }
    });
    return ['All', ...Array.from(tags)];
  }, [glimpses]);

  const filteredGlimpses = useMemo(() => {
    if (activeFilter === 'All') return glimpses;
    return glimpses.filter(
      (item) => Array.isArray(item.hashtags) && item.hashtags.includes(activeFilter)
    );
  }, [glimpses, activeFilter]);

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Beyond<span className={styles.accent}>.</span>
        </h1>
        <p className={styles.heroDesc}>
          Photos and small visual notes from outside the desk.
        </p>
      </section>

      <section className={styles.content}>
        {!loading && hashtags.length > 1 && (
          <div className={styles.filterBar} role="group" aria-label="Filter visual notes by tag">
            {hashtags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`${styles.filterBtn} ${activeFilter === tag ? styles.active : ''}`}
                onClick={() => setActiveFilter(tag)}
              >
                {tag === 'All' ? tag : `#${tag}`}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className={styles.stateBox} role="status">
            <p className={styles.stateText}>Loading visual notes...</p>
          </div>
        ) : error ? (
          <div className={styles.stateBox} role="alert">
            <p className={styles.stateText}>
              Could not load visual notes right now. Check your connection and try again.
            </p>
            <button type="button" className={styles.retryBtn} onClick={handleRetry}>
              Try again
            </button>
          </div>
        ) : filteredGlimpses.length > 0 ? (
          <div className={styles.mosaic}>
            {filteredGlimpses.map((item) => {
              const safeVideoUrl = sanitizeHttpUrl(item.videoUrl);
              const itemHashtags = Array.isArray(item.hashtags) ? item.hashtags : [];
              const imgWidth = item.dimensions?.width || 700;
              const imgHeight = item.dimensions?.height || 525;

              return (
                <Link
                  to={`/adventure/${item.slug?.current || item._id}`}
                  key={item._id}
                  className={styles.itemLink}
                >
                  <article className={styles.card}>
                    {item.mediaType === 'video' && safeVideoUrl ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        width={700}
                        height={525}
                        className={styles.video}
                      >
                        <source src={safeVideoUrl} type="video/mp4" />
                      </video>
                    ) : item.image?.asset ? (
                      <img
                        src={urlFor(item.image).width(700).auto('format').url()}
                        alt={item.location || item.title || 'Visual note'}
                        width={imgWidth}
                        height={imgHeight}
                        className={styles.image}
                        loading="lazy"
                      />
                    ) : null}

                    {(item.caption || item.location || itemHashtags.length > 0) && (
                      <div className={styles.captionBox}>
                        {item.location && <span className={styles.location}>{item.location}</span>}
                        {item.caption && <p className={styles.caption}>{item.caption}</p>}
                        {itemHashtags.length > 0 && (
                          <div className={styles.tagRow}>
                            {itemHashtags.map((tag) => (
                              <span key={tag} className={styles.tag}>#{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                </Link>
              );
            })}
          </div>
        ) : glimpses.length > 0 ? (
          <div className={styles.stateBox}>
            <p className={styles.stateText}>No visual notes match "#{activeFilter}".</p>
            <button
              type="button"
              className={styles.retryBtn}
              onClick={() => setActiveFilter('All')}
            >
              Show all
            </button>
          </div>
        ) : (
          <div className={styles.stateBox}>
            <p className={styles.stateText}>
              No visual notes published yet. Photos and short clips will show up here once added.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
