import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../sanity/client';
import fallbackPosts from '../../data/posts';
import { enrichPost } from '../../data/postHelpers';

export default function RecentWriting({ limit = 3 }) {
  const [posts, setPosts] = useState(() => fallbackPosts.map(enrichPost));
  const [fetchError, setFetchError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const query = `*[_type == "post"] | order(date desc)[0...$limit] {
      _id,
      title,
      slug,
      date,
      category,
      tag,
      summary,
      readingTime
    }`;

    client
      .fetch(query, { limit })
      .then((data) => {
        if (!cancelled) {
          setFetchError(false);
          if (Array.isArray(data) && data.length > 0) {
            setPosts(data.map(enrichPost));
          }
        }
      })
      .catch((err) => {
        console.error('Failed to fetch recent posts:', err);
        if (!cancelled) {
          setFetchError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [limit, retryCount]);

  const displayedPosts = posts.slice(0, limit);

  return (
    <section className="section" id="recent-writing">
      <div className="section-label">Recent writing</div>

      <div>
        {fetchError && (
          <div className="error-box" role="status">
            <span>Could not refresh writing from the archive right now. Showing local notes instead.</span>
            <button
              type="button"
              className="retry-btn"
              onClick={() => setRetryCount((c) => c + 1)}
            >
              Try again
            </button>
          </div>
        )}

        <div className="recent-writing-list">
          {displayedPosts.map((post, index) => {
            const slug = post.slug?.current || post.slug || post._id;
            const dateText = post.date
              ? new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                })
              : '';

            return (
              <Link
                key={post._id || index}
                to={slug ? `/writing/${slug}` : '/writing'}
                className="recent-writing-row"
              >
                <span className="recent-writing-date">{dateText}</span>
                <span className="recent-writing-title">{post.title}</span>
                {post.primaryCategory && (
                  <span className="recent-writing-cat">{post.primaryCategory}</span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="section-actions-inline">
          <Link to="/writing" className="intro-more">
            See all writing
          </Link>
          <Link to="/adventure" className="intro-more">
            Visit field journal (Beyond)
          </Link>
        </div>
      </div>
    </section>
  );
}
