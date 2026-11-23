import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity/client';
import { sanitizeHttpUrl } from '../utils/url';

import styles from './Adventure.module.css';

export default function AdventurePage() {
  const [glimpses, setGlimpses] = useState([]);
  const [filteredGlimpses, setFilteredGlimpses] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    client
      .fetch('*[_type == "glimpse"] | order(date desc)')
      .then((data) => {
        if (cancelled) return;
        const safeData = data || [];
        setGlimpses(safeData);
        setFilteredGlimpses(safeData);

        const allTags = safeData.reduce((acc, item) => {
          if (item.hashtags && Array.isArray(item.hashtags)) {
            return [...acc, ...item.hashtags];
          }
          return acc;
        }, []);
        const uniqueTags = ['All', ...new Set(allTags)];
        setHashtags(uniqueTags);

        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch glimpses:', err);
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleFilter = (tag) => {
    setActiveFilter(tag);
    if (tag === 'All') {
      setFilteredGlimpses(glimpses);
    } else {
      setFilteredGlimpses(
        glimpses.filter((item) => Array.isArray(item.hashtags) && item.hashtags.includes(tag))
      );
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Visual Observations</p>
        <h1 className={styles.heroTitle}>
          Beyond<span className={styles.accent}>.</span>
        </h1>
        <p className={styles.heroDesc}>
          Beyond research and code — photography, visual notes, and other things that sharpen how I observe my surroundings.
        </p>
      </section>

      <section className={styles.content}>
        {!loading && hashtags.length > 1 && (
          <div className={styles.filterBar}>
            {hashtags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`${styles.filterBtn} ${activeFilter === tag ? styles.active : ''}`}
                onClick={() => handleFilter(tag)}
              >
                {tag === 'All' ? tag : `#${tag}`}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className={styles.emptyState}>Loading glimpses...</div>
        ) : filteredGlimpses.length > 0 ? (
          <div className={styles.mosaic}>
            {filteredGlimpses.map((item) => {
              const safeVideoUrl = sanitizeHttpUrl(item.videoUrl);
              const itemHashtags = Array.isArray(item.hashtags) ? item.hashtags : [];

              return (
                <Link
                  to={`/adventure/${item.slug?.current || item._id}`}
                  key={item._id}
                  className={styles.itemLink}
                >
                  <article className={styles.card}>
                    {item.mediaType === 'video' && safeVideoUrl ? (
                      <video autoPlay muted loop playsInline className={styles.video}>
                        <source src={safeVideoUrl} type="video/mp4" />
                      </video>
                    ) : item.image?.asset ? (
                      <img
                        src={urlFor(item.image).width(700).auto('format').url()}
                        alt={item.location || item.title || 'Glimpse'}
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
        ) : (
          <div className={styles.emptyState}>Nothing here yet — check back soon.</div>
        )}
      </section>
    </>
  );
}
