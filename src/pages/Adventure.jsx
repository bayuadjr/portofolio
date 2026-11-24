import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity/client';
import { sanitizeHttpUrl } from '../utils/url';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import styles from './Adventure.module.css';

export default function AdventurePage() {
  useDocumentMeta({
    title: 'Beyond · Field Journal',
    description:
      'Informal personal field journal documenting places, photographs, and everyday observations outside formal research.',
    path: '/adventure',
  });

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
        <p className={styles.heroEyebrow}>Field Journal</p>
        <h1 className={styles.heroTitle}>
          Beyond<span className={styles.accent}>.</span>
        </h1>
        <p className={styles.heroDesc}>
          Informal observations, photographs, places, and everyday moments noted outside structured research. For documented fieldwork and case studies, visit{' '}
          <Link to="/work" className={styles.inlineLink}>
            Work
          </Link>
          .
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
            <div className={styles.stateActions}>
              <button type="button" className={styles.retryBtn} onClick={handleRetry}>
                Try again
              </button>
              <Link to="/writing" className={styles.secondaryStateLink}>
                Read Writing instead
              </Link>
            </div>
          </div>
        ) : filteredGlimpses.length > 0 ? (
          <div className={styles.mosaic}>
            {filteredGlimpses.map((item) => {
              const safeVideoUrl = sanitizeHttpUrl(item.videoUrl);
              const itemHashtags = Array.isArray(item.hashtags) ? item.hashtags : [];
              const imgWidth = item.dimensions?.width || 700;
              const imgHeight = item.dimensions?.height || 525;
              const previewText = item.caption || item.shortDescription;

              return (
                <Link
                  to={`/adventure/${item.slug?.current || item._id}`}
                  key={item._id}
                  className={styles.itemLink}
                >
                  <article className={styles.card}>
                    {item.mediaType === 'video' && safeVideoUrl ? (
                      <div className={styles.videoWrap}>
                        <video
                          muted
                          playsInline
                          preload="metadata"
                          width={700}
                          height={525}
                          className={styles.video}
                        >
                          <source src={safeVideoUrl} type="video/mp4" />
                        </video>
                        <span className={styles.mediaBadge}>Video</span>
                      </div>
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

                    {(previewText || item.location || itemHashtags.length > 0) && (
                      <div className={styles.captionBox}>
                        {item.location && <span className={styles.location}>{item.location}</span>}
                        {previewText && <p className={styles.caption}>{previewText}</p>}
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
              No field journal entries published yet. Photographs and informal observations will show up here as they are added.
            </p>
            <div className={styles.stateActions}>
              <Link to="/writing" className={styles.secondaryStateLink}>
                Read essays in Writing
              </Link>
              <Link to="/work" className={styles.secondaryStateLink}>
                Explore formal work
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
