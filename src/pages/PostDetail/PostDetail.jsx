import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../../sanity/client';
import PortableTextRenderer from '../../components/PortableText/PortableTextRenderer';
import styles from './PostDetail.module.css';

export default function PostDetail() {
  const { slug } = useParams();
  const [retryCount, setRetryCount] = useState(0);
  const [state, setState] = useState({
    slug: null,
    attempt: -1,
    post: null,
    error: false,
  });

  const loading = state.slug !== slug || state.attempt !== retryCount;
  const error = !loading && state.error;
  const post = !loading && !state.error ? state.post : null;

  useEffect(() => {
    let cancelled = false;

    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && (slug.current == $slug || _id == $slug)][0]{
          ...,
          body[]{
            ...,
            _type == "fileAttachment" => {
              ...,
              asset->
            }
          }
        }`;
        const data = await client.fetch(query, { slug });
        if (!cancelled) {
          setState({ slug, attempt: retryCount, post: data || null, error: false });
        }
      } catch (err) {
        console.error('Failed to fetch post:', err);
        if (!cancelled) {
          setState({ slug, attempt: retryCount, post: null, error: true });
        }
      }
    };

    fetchPost();
    return () => {
      cancelled = true;
    };
  }, [slug, retryCount]);

  if (loading) {
    return (
      <div className={styles.stateBox} role="status">
        <p className={styles.stateText}>Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.stateBox} role="alert">
        <p className={styles.stateText}>
          Could not load this post right now. Check your connection and try again.
        </p>
        <div className={styles.stateActions}>
          <button
            type="button"
            className={styles.retryBtn}
            onClick={() => setRetryCount((c) => c + 1)}
          >
            Try again
          </button>
          <Link to="/writing" className={styles.backLink}>
            Back to Writing
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.stateBox}>
        <p className={styles.stateText}>Post not found.</p>
        <Link to="/writing" className={styles.backLink}>
          Back to Writing
        </Link>
      </div>
    );
  }

  const tags = Array.isArray(post.tag) ? post.tag : post.tag ? [post.tag] : [];

  return (
    <article className={styles.container}>
      <div className={styles.topNav}>
        <Link to="/writing" className={styles.backLinkTop}>
          Back to Writing
        </Link>
      </div>

      {post.coverImage?.asset && (
        <div className={styles.coverWrapper}>
          <img
            src={urlFor(post.coverImage).width(1200).height(675).fit('crop').auto('format').url()}
            alt={post.title}
            width={1200}
            height={675}
            fetchPriority="high"
            className={styles.coverImage}
          />
        </div>
      )}

      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            {post.date && (
              <span className={styles.date}>
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            )}
            {post.readingTime && (
              <span className={styles.readingTime}>{post.readingTime} min read</span>
            )}
            {tags.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        </header>

        <div className={styles.body}>
          {post.body ? (
            <PortableTextRenderer value={post.body} />
          ) : (
            <p className={styles.emptyBody}>No text added for this post yet.</p>
          )}
        </div>

        <div className={styles.footer}>
          <Link to="/writing" className={styles.backLink}>
            Back to Writing
          </Link>
        </div>
      </div>
    </article>
  );
}
