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
      <div className={styles.topNav}>
        <Link to="/work" className={styles.backLinkTop}>← Back to Work</Link>
      </div>

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
          <div className={styles.typeRow}>
            {project.projectType && <span className={styles.typeBadge}>{project.projectType}</span>}
            {project.year && <span className={styles.year}>{project.year}</span>}
          </div>
          <h1 className={styles.title}>{project.title}</h1>
          {project.summary && <p className={styles.summary}>{project.summary}</p>}
          {project.tag && (
            <div className={styles.meta}>
              {project.tag.map(t => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          )}
        </header>

        {/* WEBSITE & ML-MODEL & BRAND types — preview section */}
        {['website', 'ml-model', 'brand', 'other'].includes(project.projectType) && (
          <div className={styles.previewSection}>
            {project.previewVideo && (
              <video autoPlay muted loop playsInline className={styles.previewVideo}>
                <source src={project.previewVideo} type="video/mp4" />
              </video>
            )}
            
            {(project.liveUrl || project.repoUrl) && (
              <div className={styles.ctaRow}>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.liveBtn}>
                    → View Live Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.repoBtn}>
                    → GitHub Repo
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        {/* RESEARCH type — repo button only */}
        {project.projectType === 'research' && project.repoUrl && (
          <div className={styles.previewSection}>
            <div className={styles.ctaRow}>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.repoBtn}>
                → GitHub Repo
              </a>
            </div>
          </div>
        )}

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
