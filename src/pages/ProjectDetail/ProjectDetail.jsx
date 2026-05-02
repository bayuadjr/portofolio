import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../../sanity/client';
import PortableTextRenderer from '../../components/PortableText/PortableTextRenderer';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const query = `*[_type == "project" && slug.current == $slug][0]`;
        const data = await client.fetch(query, { slug });
        setProject(data);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!project) return <div className={styles.empty}>Project not found.</div>;

  return (
    <article className={styles.container}>
      {project.coverImage && (
        <div className={styles.coverWrapper}>
          <img
            src={urlFor(project.coverImage).url()}
            alt={project.title}
            className={styles.coverImage}
          />
        </div>
      )}

      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>{project.title}</h1>
            <div className={styles.meta}>
              {project.year && <span className={styles.year}>{project.year}</span>}
              {project.tag && project.tag.map(t => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
          <div className={styles.headerRight}>
            {project.summary && <p className={styles.summary}>{project.summary}</p>}
          </div>
        </header>

        <hr className={styles.divider} />

        <div className={styles.body}>
          {project.body ? (
            <PortableTextRenderer value={project.body} />
          ) : (
            <p className={styles.emptyBody}>No details provided yet.</p>
          )}
        </div>

        <div className={styles.footer}>
          <Link to="/work" className={styles.backLink}>← Back to Work</Link>
        </div>
      </div>
    </article>
  );
}
