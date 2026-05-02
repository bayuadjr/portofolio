import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../../sanity/client';
import styles from './AdventureDetail.module.css';

export default function AdventureDetail() {
  const { slug } = useParams();
  const [adventure, setAdventure] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdventure = async () => {
      try {
        const query = `*[_type == "adventure" && slug.current == $slug][0]`;
        const data = await client.fetch(query, { slug });
        setAdventure(data);
      } catch (error) {
        console.error("Failed to fetch adventure:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdventure();
  }, [slug]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!adventure) return <div className={styles.empty}>Adventure not found.</div>;

  return (
    <article className={styles.container}>
      <div className={styles.imageWrapper}>
        {adventure.image && (
          <img
            src={urlFor(adventure.image).url()}
            alt={adventure.title || adventure.location || 'Adventure'}
            className={styles.image}
          />
        )}
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          {adventure.location && (
            <h1 className={styles.location}>
              <span className={styles.pin}>📍</span> {adventure.location}
            </h1>
          )}
          {adventure.date && (
            <div className={styles.date}>
              {new Date(adventure.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            </div>
          )}
        </header>

        {adventure.caption && (
          <p className={styles.caption}>{adventure.caption}</p>
        )}

        <div className={styles.footer}>
          <Link to="/adventure" className={styles.backLink}>← Back to Adventure</Link>
        </div>
      </div>
    </article>
  );
}
