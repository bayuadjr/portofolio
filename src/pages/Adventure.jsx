import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity/client';

import styles from './Adventure.module.css';

export default function AdventurePage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch('*[_type == "adventure"] | order(date desc)')
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Adventure<span className={styles.accent}>.</span>
        </h1>
        <p className={styles.heroDesc}>
          Fieldwork, travel, campus life — moments captured between datasets and deadlines.
        </p>
      </section>

      <section className={styles.content}>
        {loading ? (
          <div className={styles.emptyState}>Loading photos...</div>
        ) : photos.length > 0 ? (
          <div className={styles.masonryGrid}>
            {photos.map((photo) => (
              <Link to={`/adventure/${photo.slug?.current || photo._id}`} key={photo._id} className={styles.masonryItemLink}>
                <div className={styles.masonryItem}>
                  {photo.image ? (
                    <img
                      src={urlFor(photo.image).width(600).url()}
                      alt={photo.location || photo.title || 'Adventure'}
                      className={styles.image}
                    />
                  ) : (
                    <div className={`${styles.imagePlaceholder} ${styles[photo.colorClass] || ''}`} />
                  )}
                  <div className={styles.overlay}>
                    {photo.location && <span className={styles.location}>📍 {photo.location}</span>}
                    {photo.caption && <p className={styles.caption}>{photo.caption}</p>}
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
