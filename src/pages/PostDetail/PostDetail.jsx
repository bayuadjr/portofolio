import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../../sanity/client';
import PortableTextRenderer from '../../components/PortableText/PortableTextRenderer';
import styles from './PostDetail.module.css';

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0]`;
        const data = await client.fetch(query, { slug });
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!post) return <div className={styles.empty}>Post not found.</div>;

  return (
    <article className={styles.container}>
      <div className={styles.topNav}>
        <Link to="/writing" className={styles.backLinkTop}>← Back to Writing</Link>
      </div>

      {post.coverImage && (
        <div className={styles.coverWrapper}>
          <img
            src={urlFor(post.coverImage).url()}
            alt={post.title}
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
            {post.tag && post.tag.map(t => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        </header>

        <div className={styles.body}>
          {post.body ? (
            <PortableTextRenderer value={post.body} />
          ) : (
            <p className={styles.emptyBody}>No details provided yet.</p>
          )}
        </div>

        <div className={styles.footer}>
          <Link to="/writing" className={styles.backLink}>← Back to Writing</Link>
        </div>
      </div>
    </article>
  );
}
