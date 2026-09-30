import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanity/client';

import styles from './Writing.module.css';

export default function WritingPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    client
      .fetch('*[_type == "post"] | order(date desc)')
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const uniqueTags = useMemo(() => {
    const tags = new Set();
    posts.forEach(p => {
      if (Array.isArray(p.tag)) {
        p.tag.forEach(t => tags.add(t));
      } else if (p.tag) {
        tags.add(p.tag);
      }
    });
    return ['All', ...Array.from(tags).sort()];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'All') return posts;
    return posts.filter(p => {
      if (Array.isArray(p.tag)) {
        return p.tag.includes(activeFilter);
      }
      return p.tag === activeFilter;
    });
  }, [posts, activeFilter]);

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Writing<span className={styles.accent}>.</span>
        </h1>
        <p className={styles.heroDesc}>
          Reflections on anthropology, data, books, and the things in between.
        </p>
      </section>

      <section className={styles.content}>
        <div className={styles.filterBar}>
          {uniqueTags.map(tag => (
            <button
              key={tag}
              className={`${styles.filterBtn} ${activeFilter === tag ? styles.active : ''}`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {loading ? (
          <div className={styles.emptyState}>Loading posts...</div>
        ) : filteredPosts.length > 0 ? (
          <div className={styles.list}>
            {filteredPosts.map((post) => {
              const tagText = Array.isArray(post.tag) ? post.tag.join(' · ') : post.tag || '';
              const dateText = post.date
                ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                : '';

              return (
                <Link
                  to={`/writing/${post.slug?.current || post._id}`}
                  className={styles.row}
                  key={post._id}
                >
                  <div className={styles.rowMetaLeft}>
                    {dateText && <span className={styles.rowDate}>{dateText}</span>}
                    {post.readingTime && (
                      <span className={styles.readingTime}>{post.readingTime} min read</span>
                    )}
                  </div>

                  <div className={styles.rowMain}>
                    <h2 className={styles.rowTitle}>{post.title}</h2>
                    <p className={styles.rowSummary}>{post.summary || 'Click to read more.'}</p>
                  </div>

                  <div className={styles.rowMetaRight}>
                    {tagText && <span className={styles.rowTag}>{tagText}</span>}
                    <span className={styles.arrow} aria-hidden="true">→</span>
                  </div>
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
