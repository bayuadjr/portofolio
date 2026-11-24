import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanity/client';

import styles from './Writing.module.css';

export default function WritingPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    let cancelled = false;

    client
      .fetch('*[_type == "post"] | order(date desc)')
      .then((data) => {
        if (!cancelled) {
          setPosts(data || []);
          setError(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch posts:', err);
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

  const uniqueTags = useMemo(() => {
    const tags = new Set();
    posts.forEach((p) => {
      if (Array.isArray(p.tag)) {
        p.tag.forEach((t) => tags.add(t));
      } else if (p.tag) {
        tags.add(p.tag);
      }
    });
    return ['All', ...Array.from(tags).sort()];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'All') return posts;
    return posts.filter((p) => {
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
          Half-formed ideas, book notes, and essays about things I keep noticing.
        </p>
      </section>

      <section className={styles.content}>
        {uniqueTags.length > 1 && (
          <div className={styles.filterBar} role="group" aria-label="Filter writing by topic">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`${styles.filterBtn} ${activeFilter === tag ? styles.active : ''}`}
                onClick={() => setActiveFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className={styles.stateBox} role="status">
            <p className={styles.stateText}>Loading posts...</p>
          </div>
        ) : error ? (
          <div className={styles.stateBox} role="alert">
            <p className={styles.stateText}>
              Could not load writing right now. Check your connection and try again.
            </p>
            <button type="button" className={styles.retryBtn} onClick={handleRetry}>
              Try again
            </button>
          </div>
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
                    <p className={styles.rowSummary}>{post.summary || 'Read the essay.'}</p>
                  </div>

                  <div className={styles.rowMetaRight}>
                    {tagText && <span className={styles.rowTag}>{tagText}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : posts.length > 0 ? (
          <div className={styles.stateBox}>
            <p className={styles.stateText}>No posts match "{activeFilter}".</p>
            <button
              type="button"
              className={styles.retryBtn}
              onClick={() => setActiveFilter('All')}
            >
              Show all posts
            </button>
          </div>
        ) : (
          <div className={styles.stateBox}>
            <p className={styles.stateText}>
              No writing published yet. Essays and notes will show up here once added.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
