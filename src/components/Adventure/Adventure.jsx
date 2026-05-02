import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../../sanity/client';
import styles from './Adventure.module.css';

const tagClassMap = {
  terracotta: styles.tagTerracotta,
  sky: styles.tagSky,
  acid: styles.tagAcid,
};

export default function Adventure() {
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      client.fetch('*[_type == "post"] | order(date desc) [0...3]'),
      client.fetch('*[_type == "adventure"] | order(date desc) [0...3]'),
    ])
      .then(([postsData, photosData]) => {
        setPosts(postsData);
        setPhotos(photosData);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <section className={styles.section} id="adventure-writing">
      {/* ── Left: Adventure Log ── */}
      <div className={styles.left}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Adventure Log</h2>
          <Link to="/adventure" className={styles.viewAll}>See All →</Link>
        </div>
        <div className={styles.photoGrid}>
          {loading ? (
            <p>Loading photos...</p>
          ) : photos.length > 0 ? (
            photos.map((photo) => (
              <Link to={`/adventure/${photo.slug?.current || photo._id}`} key={photo._id} className={styles.photoLink}>
                <div
                  className={`${styles.photoBlock} ${styles[photo.colorClass] || ''}`}
                  style={
                    photo.image
                      ? {
                          backgroundImage: `url(${urlFor(photo.image).url()})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }
                      : {}
                  }
                >
                  <span className={styles.photoCaption}>{photo.caption}</span>
                </div>
              </Link>
            ))
          ) : (
            <p>No photos found.</p>
          )}
        </div>
      </div>

      {/* ── Right: Writing Sidebar ── */}
      <div className={styles.right}>
        <h2 className={styles.sectionTitle}>Writing</h2>
        <div className={styles.writingList}>
          {loading ? (
            <p>Loading writing...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <Link to={`/writing/${post.slug?.current || post._id}`} className={styles.postLink} key={post._id || post.title}>
                <article className={styles.postItem}>
                  <div className={styles.postMeta}>
                    <span className={styles.postDate}>
                      {post.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                    </span>
                    <span
                      className={`${styles.postTag} ${tagClassMap[post.tagColor] || ''}`}
                    >
                      {Array.isArray(post.tag) ? post.tag[0] : post.tag}
                    </span>
                  </div>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                </article>
              </Link>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
