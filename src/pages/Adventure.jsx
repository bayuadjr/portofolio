import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity/client';

import styles from './Adventure.module.css';

export default function AdventurePage() {
  const [glimpses, setGlimpses] = useState([]);
  const [filteredGlimpses, setFilteredGlimpses] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch('*[_type == "glimpse"] | order(date desc)')
      .then((data) => {
        setGlimpses(data);
        setFilteredGlimpses(data);
        
        // Extract unique hashtags
        const allTags = data.reduce((acc, item) => {
          if (item.hashtags && Array.isArray(item.hashtags)) {
            return [...acc, ...item.hashtags];
          }
          return acc;
        }, []);
        const uniqueTags = ['All', ...new Set(allTags)];
        setHashtags(uniqueTags);
        
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleFilter = (tag) => {
    setActiveFilter(tag);
    if (tag === 'All') {
      setFilteredGlimpses(glimpses);
    } else {
      setFilteredGlimpses(glimpses.filter(item => 
        item.hashtags && item.hashtags.includes(tag)
      ));
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Glimpses<span className={styles.accent}>.</span>
        </h1>
        <p className={styles.heroDesc}>
          Fieldwork, travel, campus life — moments captured between datasets and deadlines.
        </p>
      </section>

      <section className={styles.content}>
        {!loading && hashtags.length > 1 && (
          <div className={styles.filterBar}>
            {hashtags.map(tag => (
              <button
                key={tag}
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
          <div className={styles.masonryGrid}>
            {filteredGlimpses.map((item) => (
              <Link to={`/adventure/${item.slug?.current || item._id}`} key={item._id} className={styles.masonryItemLink}>
                <div className={styles.masonryItem}>
                  {item.mediaType === 'video' && item.videoUrl ? (
                    <video autoPlay muted loop playsInline className={styles.video}>
                      <source src={item.videoUrl} type="video/mp4" />
                    </video>
                  ) : item.image ? (
                    <img
                      src={urlFor(item.image).width(600).url()}
                      alt={item.location || item.title || 'Glimpse'}
                      className={styles.image}
                    />
                  ) : (
                    <div className={`${styles.imagePlaceholder} ${styles[item.colorClass] || ''}`} />
                  )}
                  
                  <div className={styles.overlay}>
                    {item.location && <span className={styles.location}>📍 {item.location}</span>}
                    {item.caption && <p className={styles.caption}>{item.caption}</p>}
                    
                    {item.hashtags && item.hashtags.length > 0 && (
                      <div className={styles.tagOverlay}>
                        {item.hashtags.map(tag => (
                          <span key={tag} className={styles.smallTag}>#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>Nothing here yet — check back soon.</div>
        )}
      </section>
    </>
  );
}

