import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../../sanity/client';
import PortableTextRenderer from '../../components/PortableText/PortableTextRenderer';
import DemoCredentials from '../../components/DemoCredentials/DemoCredentials';
import { enrichProject, getProjectTags } from '../../data/projectHelpers';
import { sanitizeHttpUrl } from '../../utils/url';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [state, setState] = useState({ slug: null, project: null });

  const loading = state.slug !== slug;
  const project = state.slug === slug ? enrichProject(state.project) : null;

  useEffect(() => {
    let cancelled = false;

    const fetchProject = async () => {
      try {
        const query = `*[_type == "project" && (slug.current == $slug || _id == $slug)][0]{
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
          setState({ slug, project: data || null });
        }
      } catch (error) {
        console.error('Failed to fetch project:', error);
        if (!cancelled) {
          setState({ slug, project: null });
        }
      }
    };

    fetchProject();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!project) return <div className={styles.empty}>Project not found.</div>;

  const tags = getProjectTags(project);
  const highlights = Array.isArray(project.highlights) ? project.highlights : [];
  const hasDemoCreds = Boolean(
    project.demoCredentials?.email || project.demoCredentials?.password
  );

  const safePreviewVideo = sanitizeHttpUrl(project.previewVideo);
  const safeLiveUrl = sanitizeHttpUrl(project.liveUrl);
  const safeRepoUrl = sanitizeHttpUrl(project.repoUrl);
  const hasPreviewOrLinks = Boolean(
    safePreviewVideo || safeLiveUrl || safeRepoUrl || highlights.length > 0 || hasDemoCreds
  );

  return (
    <article className={styles.container}>
      <div className={styles.topNav}>
        <Link to="/work" className={styles.backLinkTop}>← Back to Work</Link>
      </div>

      {project.coverImage?.asset && (
        <div className={styles.coverWrapper}>
          <img
            src={urlFor(project.coverImage).auto('format').url()}
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
          {tags.length > 0 && (
            <div className={styles.meta}>
              {tags.map((t) => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          )}
        </header>

        {hasPreviewOrLinks && (
          <div className={styles.previewSection}>
            {safePreviewVideo && (
              <video autoPlay muted loop playsInline className={styles.previewVideo}>
                <source src={safePreviewVideo} type="video/mp4" />
              </video>
            )}

            {(safeLiveUrl || safeRepoUrl) && (
              <div className={styles.ctaRow}>
                {safeLiveUrl && (
                  <a href={safeLiveUrl} target="_blank" rel="noopener noreferrer" className={styles.liveBtn}>
                    → View Live Demo
                  </a>
                )}
                {safeRepoUrl && (
                  <a href={safeRepoUrl} target="_blank" rel="noopener noreferrer" className={styles.repoBtn}>
                    → GitHub Repo
                  </a>
                )}
              </div>
            )}

            {highlights.length > 0 && (
              <div className={styles.highlightsBlock}>
                <div className={styles.highlightsLabel}>Key Capabilities</div>
                <div className={styles.highlightsGrid}>
                  {highlights.map((item, idx) => (
                    <div className={styles.highlightItem} key={item}>
                      <span className={styles.highlightNum}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className={styles.highlightText}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasDemoCreds && (
              <div className={styles.demoCredsWrap}>
                <DemoCredentials credentials={project.demoCredentials} />
              </div>
            )}
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
