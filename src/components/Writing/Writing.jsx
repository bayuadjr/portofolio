import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../sanity/client';
import styles from './Writing.module.css';

const tagClassMap = {
  terracotta: styles.tagTerracotta,
  sky: styles.tagSky,
  acid: styles.tagAcid,
};

export default function WritingSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch('*[_type == "post"] | order(date desc) [0...3]')
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <section className={styles.section} id="writing-page">
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Writing</h1>
          <p className={styles.subtitle}>
            Reflections on anthropology, data, books, and the things in between.
          </p>
        </div>
        <Link to="/writing" className={styles.viewAll}>View all →</Link>
      </div>

      <div className={styles.list}>
        {loading ? (
          <p>Loading writing...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Link to={`/writing/${post.slug?.current || post._id}`} className={styles.itemLink} key={post._id || post.title}>
              <article className={styles.item}>
                <span className={styles.itemDate}>
                  {post.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                </span>
                <div className={styles.itemContent}>
                  <h2 className={styles.itemTitle}>{post.title}</h2>
                  <p className={styles.itemExcerpt}>
                    {post.summary || 'Click to read more.'}
                  </p>
                </div>
                <span
                  className={`${styles.itemTag} ${tagClassMap[post.tagColor] || ''}`}
                >
                  {Array.isArray(post.tag) ? post.tag[0] : post.tag}
                </span>
              </article>
            </Link>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </section>
  );
}
