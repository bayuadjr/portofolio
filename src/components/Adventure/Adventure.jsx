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
  const [glimpses, setGlimpses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      client.fetch('*[_type == "post"] | order(date desc) [0...3]'),
      client.fetch('*[_type == "glimpse"] | order(date desc) [0...3]'),
    ])
      .then(([postsData, glimpsesData]) => {
        setPosts(postsData);
        setGlimpses(glimpsesData);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <section className={styles.section} id="adventure-writing">
      {/* ── Left: Glimpses ── */}
      <div className={styles.left}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Glimpses</h2>
          <Link to="/adventure" className={styles.viewAll}>See All →</Link>
        </div>
        <div className={styles.photoGrid}>
          {loading ? (
            <p>Loading glimpses...</p>
          ) : glimpses.length > 0 ? (
            glimpses.map((item) => (
              <Link to={`/adventure/${item.slug?.current || item._id}`} key={item._id} className={styles.photoLink}>
                <div className={`${styles.photoBlock} ${styles[item.colorClass] || ''}`}>
                  {item.mediaType === 'video' && item.videoUrl ? (
                    <video autoPlay muted loop playsInline className={styles.previewMedia}>
                      <source src={item.videoUrl} type="video/mp4" />
                    </video>
                  ) : item.image ? (
                    <img 
                      src={urlFor(item.image).width(400).url()} 
                      alt={item.title} 
                      className={styles.previewMedia} 
                    />
                  ) : null}
                  <span className={styles.photoCaption}>{item.caption}</span>
                </div>
              </Link>
            ))
          ) : (
            <p>No glimpses found.</p>
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
