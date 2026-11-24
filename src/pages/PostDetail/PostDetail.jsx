import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../../sanity/client';
import PortableTextRenderer from '../../components/PortableText/PortableTextRenderer';
import {
  enrichPost,
  estimateReadingTime,
  findFallbackPostBySlug,
  getRelatedFallbackPosts,
} from '../../data/postHelpers';
import { getProjectCategory } from '../../data/projectHelpers';
import { sanitizeHttpUrl } from '../../utils/url';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import styles from './PostDetail.module.css';

export default function PostDetail() {
  const { slug } = useParams();
  const [retryCount, setRetryCount] = useState(0);
  const [state, setState] = useState({
    slug: null,
    attempt: -1,
    post: null,
    relatedPosts: [],
    error: false,
    usingFallback: false,
  });

  const loading = state.slug !== slug || state.attempt !== retryCount;
  const error = !loading && state.error;
  const usingFallback = !loading && state.usingFallback;
  const post = !loading && !state.error && state.post ? enrichPost(state.post) : null;
  const relatedPosts = !loading && !state.error ? state.relatedPosts.map(enrichPost) : [];

  useDocumentMeta({
    title: post?.title || 'Writing',
    description: post?.summary || undefined,
    path: `/writing/${slug || ''}`,
  });

  useEffect(() => {
    let cancelled = false;

    const fetchPost = async () => {
      try {
        const postQuery = `*[_type == "post" && (slug.current == $slug || _id == $slug)][0]{
          ...,
          relatedProjects[]->{
            _id,
            title,
            slug,
            category,
            projectType,
            year
          },
          body[]{
            ...,
            _type == "fileAttachment" => {
              ...,
              asset->
            }
          }
        }`;

        const relatedQuery = `*[_type == "post" && slug.current != $slug && _id != $slug] | order(date desc)[0...2]{
          _id,
          title,
          slug,
          date,
          category,
          tag,
          summary
        }`;

        const [data, related] = await Promise.all([
          client.fetch(postQuery, { slug }),
          client.fetch(relatedQuery, { slug }),
        ]);

        if (!cancelled) {
          setState({
            slug,
            attempt: retryCount,
            post: data || null,
            relatedPosts: Array.isArray(related) ? related : [],
            error: false,
            usingFallback: false,
          });
        }
      } catch (err) {
        console.error('Failed to fetch post:', err);
        if (!cancelled) {
          const fallback = findFallbackPostBySlug(slug);
          setState({
            slug,
            attempt: retryCount,
            post: fallback,
            relatedPosts: fallback ? getRelatedFallbackPosts(slug, 2) : [],
            error: !fallback,
            usingFallback: Boolean(fallback),
          });
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

  const minutes = estimateReadingTime(post.body, post.readingTime);
  const references = Array.isArray(post.references) ? post.references : [];
  const relatedProjects = Array.isArray(post.relatedProjects)
    ? post.relatedProjects.filter(Boolean)
    : [];

  return (
    <article className={styles.container}>
      <div className={styles.topNav}>
        <Link to="/writing" className={styles.backLinkTop}>
          Back to Writing
        </Link>
      </div>

      {usingFallback && (
        <div className={styles.fallbackNotice} role="status">
          <span>Showing local article notes because the Sanity archive could not be reached.</span>
          <button
            type="button"
            className={styles.retryBtn}
            onClick={() => setRetryCount((c) => c + 1)}
          >
            Try again
          </button>
        </div>
      )}

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
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            )}
            {minutes && (
              <span className={styles.readingTime}>{minutes} min read</span>
            )}
            {post.categories.map((cat) => (
              <span key={cat} className={styles.tag}>{cat}</span>
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

        {references.length > 0 && (
          <section className={styles.extraSection} aria-label="References">
            <h2 className={styles.extraHeading}>References</h2>
            <ul className={styles.refList}>
              {references.map((ref, idx) => {
                const safeHref = sanitizeHttpUrl(ref?.url);
                return (
                  <li key={ref?._key || idx} className={styles.refItem}>
                    {safeHref ? (
                      <a
                        href={safeHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.refLink}
                      >
                        {ref.title || safeHref}
                      </a>
                    ) : (
                      <span>{ref?.title}</span>
                    )}
                    {ref?.note && <p className={styles.refNote}>{ref.note}</p>}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {relatedProjects.length > 0 && (
          <section className={styles.extraSection} aria-label="Related work">
            <h2 className={styles.extraHeading}>Related work</h2>
            <div className={styles.relatedList}>
              {relatedProjects.map((proj) => {
                const projSlug = proj.slug?.current || proj.slug || proj._id;
                return (
                  <Link
                    key={proj._id || projSlug}
                    to={`/work/${projSlug}`}
                    className={styles.relatedRow}
                  >
                    <span className={styles.relatedTitle}>{proj.title}</span>
                    <span className={styles.relatedMeta}>
                      {getProjectCategory(proj)}
                      {proj.year ? ` · ${proj.year}` : ''}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className={styles.extraSection} aria-label="Related writing">
            <h2 className={styles.extraHeading}>More writing</h2>
            <div className={styles.relatedList}>
              {relatedPosts.map((rel) => {
                const relSlug = rel.slug?.current || rel.slug || rel._id;
                const relDate = rel.date
                  ? new Date(rel.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                    })
                  : '';

                return (
                  <Link
                    key={rel._id || relSlug}
                    to={`/writing/${relSlug}`}
                    className={styles.relatedRow}
                  >
                    <span className={styles.relatedTitle}>{rel.title}</span>
                    <span className={styles.relatedMeta}>
                      {rel.primaryCategory || relDate}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <div className={styles.footer}>
          <Link to="/writing" className={styles.backLink}>
            Back to Writing
          </Link>
        </div>
      </div>
    </article>
  );
}
