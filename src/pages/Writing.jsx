import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanity/client';
import fallbackPosts from '../data/posts';
import {
  POST_CATEGORIES,
  enrichPost,
  estimateReadingTime,
} from '../data/postHelpers';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import styles from './Writing.module.css';

export default function WritingPage() {
  useDocumentMeta({
    title: 'Writing',
    description:
      'Longer-form essays, reading notes, and research reflections by Bayu Adji Ramadhan.',
    path: '/writing',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    let cancelled = false;

    const query = `*[_type == "post"] | order(date desc) {
      _id,
      title,
      slug,
      date,
      category,
      featured,
      tag,
      summary,
      readingTime,
      body
    }`;

    client
      .fetch(query)
      .then((data) => {
        if (!cancelled) {
          setPosts((data || []).map(enrichPost));
          setUsingFallback(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch posts:', err);
        if (!cancelled) {
          setPosts(fallbackPosts.map(enrichPost));
          setUsingFallback(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  const handleRetry = () => {
    setLoading(true);
    setUsingFallback(false);
    setRetryCount((c) => c + 1);
  };

  const filterCategories = useMemo(() => {
    const present = new Set();
    posts.forEach((p) => {
      p.categories.forEach((cat) => present.add(cat));
    });

    const ordered = POST_CATEGORIES.slice(1).filter((cat) => present.has(cat));
    present.forEach((cat) => {
      if (!ordered.includes(cat)) ordered.push(cat);
    });

    return ordered.length > 0 ? ['All', ...ordered] : ['All'];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'All') return posts;
    return posts.filter((p) => p.categories.includes(activeFilter));
  }, [posts, activeFilter]);

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Writing<span className={styles.accent}>.</span>
        </h1>
        <p className={styles.heroDesc}>
          Essays, reading notes, and longer-form thinking across anthropology, data, and software. For informal visual notes and places, visit{' '}
          <Link to="/adventure" className={styles.inlineLink}>
            Beyond
          </Link>
          .
        </p>
      </section>

      <section className={styles.content}>
        {filterCategories.length > 1 && (
          <div className={styles.filterBar} role="group" aria-label="Filter writing by category">
            {filterCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`${styles.filterBtn} ${activeFilter === category ? styles.active : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {usingFallback && (
          <div className={styles.fallbackNotice} role="status">
            <span>Could not reach the Sanity archive right now. Showing local notes instead.</span>
            <button type="button" className={styles.retryBtn} onClick={handleRetry}>
              Try again
            </button>
          </div>
        )}

        {loading ? (
          <div className={styles.stateBox} role="status">
            <p className={styles.stateText}>Loading posts...</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className={styles.list}>
            {filteredPosts.map((post) => {
              const categoryText = post.categories.join(' · ');
              const dateText = post.date
                ? new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                : '';
              const minutes = estimateReadingTime(post.body, post.readingTime);

              return (
                <Link
                  to={`/writing/${post.slug?.current || post._id}`}
                  className={styles.row}
                  key={post._id}
                >
                  <div className={styles.rowMetaLeft}>
                    {dateText && <span className={styles.rowDate}>{dateText}</span>}
                    {minutes && (
                      <span className={styles.readingTime}>{minutes} min read</span>
                    )}
                  </div>

                  <div className={styles.rowMain}>
                    <h2 className={styles.rowTitle}>{post.title}</h2>
                    <p className={styles.rowSummary}>{post.summary || 'Read the essay.'}</p>
                  </div>

                  <div className={styles.rowMetaRight}>
                    {categoryText && <span className={styles.rowTag}>{categoryText}</span>}
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
