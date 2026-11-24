import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../../sanity/client';
import PortableTextRenderer from '../../components/PortableText/PortableTextRenderer';
import DemoCredentials from '../../components/DemoCredentials/DemoCredentials';
import {
  enrichProject,
  getProjectCategory,
  getProjectTags,
  findFallbackProjectBySlug,
  getRelatedFallbackProjects,
} from '../../data/projectHelpers';
import { sanitizeHttpUrl } from '../../utils/url';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [retryCount, setRetryCount] = useState(0);
  const [state, setState] = useState({
    slug: null,
    attempt: -1,
    project: null,
    error: false,
    usingFallback: false,
  });

  const loading = state.slug !== slug || state.attempt !== retryCount;
  const error = !loading && state.error;
  const usingFallback = !loading && state.usingFallback;
  const project = !loading && !state.error && state.project ? enrichProject(state.project) : null;

  useDocumentMeta({
    title: project?.title || 'Work',
    description: project?.summary || undefined,
    path: `/work/${slug || ''}`,
  });

  useEffect(() => {
    let cancelled = false;

    const fetchProject = async () => {
      try {
        const query = `*[_type == "project" && (slug.current == $slug || _id == $slug)][0]{
          ...,
          relatedProjects[]->{
            _id,
            title,
            slug,
            category,
            projectType,
            year,
            summary
          },
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
          setState({
            slug,
            attempt: retryCount,
            project: data || null,
            error: false,
            usingFallback: false,
          });
        }
      } catch (err) {
        console.error('Failed to fetch project:', err);
        if (!cancelled) {
          const fallback = findFallbackProjectBySlug(slug);
          setState({
            slug,
            attempt: retryCount,
            project: fallback,
            error: !fallback,
            usingFallback: Boolean(fallback),
          });
        }
      }
    };

    fetchProject();
    return () => {
      cancelled = true;
    };
  }, [slug, retryCount]);

  if (loading) {
    return (
      <div className={styles.stateBox} role="status">
        <p className={styles.stateText}>Loading project...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.stateBox} role="alert">
        <p className={styles.stateText}>
          Could not load this project right now. Check your connection and try again.
        </p>
        <div className={styles.stateActions}>
          <button
            type="button"
            className={styles.retryBtn}
            onClick={() => setRetryCount((c) => c + 1)}
          >
            Try again
          </button>
          <Link to="/work" className={styles.backLink}>
            Back to Work
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={styles.stateBox}>
        <p className={styles.stateText}>Project not found.</p>
        <Link to="/work" className={styles.backLink}>
          Back to Work
        </Link>
      </div>
    );
  }

  const category = getProjectCategory(project);
  const tags = getProjectTags(project);
  const hasDemoCreds = Boolean(
    project.demoCredentials?.email || project.demoCredentials?.password
  );

  const safePreviewVideo = sanitizeHttpUrl(project.previewVideo);
  const safeLiveUrl = sanitizeHttpUrl(project.liveUrl);
  const safeRepoUrl = sanitizeHttpUrl(project.repoUrl);
  const hasPreviewOrLinks = Boolean(
    safePreviewVideo || safeLiveUrl || safeRepoUrl || hasDemoCreds
  );

  const specs = [
    { label: 'Category', value: category },
    project.role ? { label: 'Role', value: project.role } : null,
    project.status ? { label: 'Status', value: project.status } : null,
    project.year ? { label: 'Year', value: project.year } : null,
  ].filter(Boolean);

  const cmsRelated = Array.isArray(project.relatedProjects)
    ? project.relatedProjects.filter(Boolean).map(enrichProject)
    : [];
  const relatedList =
    cmsRelated.length > 0 ? cmsRelated : getRelatedFallbackProjects(project);

  return (
    <article className={styles.container}>
      <div className={styles.topNav}>
        <Link to="/work" className={styles.backLinkTop}>
          Back to Work
        </Link>
      </div>

      {usingFallback && (
        <div className={styles.fallbackNotice} role="status">
          <span>Showing local project notes because the Sanity archive could not be reached.</span>
          <button
            type="button"
            className={styles.retryBtn}
            onClick={() => setRetryCount((c) => c + 1)}
          >
            Try again
          </button>
        </div>
      )}

      {project.coverImage?.asset && (
        <div className={styles.coverWrapper}>
          <img
            src={urlFor(project.coverImage).width(1200).height(675).fit('crop').auto('format').url()}
            alt={project.title}
            width={1200}
            height={675}
            fetchPriority="high"
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

          {specs.length > 0 && (
            <dl className={styles.specGrid}>
              {specs.map((item) => (
                <div key={item.label} className={styles.specItem}>
                  <dt className={styles.specLabel}>{item.label}</dt>
                  <dd className={styles.specValue}>{item.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </header>

        {hasPreviewOrLinks && (
          <div className={styles.previewSection}>
            {safePreviewVideo && (
              <video
                controls
                playsInline
                preload="metadata"
                width={960}
                height={540}
                className={styles.previewVideo}
              >
                <source src={safePreviewVideo} type="video/mp4" />
              </video>
            )}

            {(safeLiveUrl || safeRepoUrl) && (
              <div className={styles.ctaRow}>
                {safeLiveUrl && (
                  <a href={safeLiveUrl} target="_blank" rel="noopener noreferrer" className={styles.liveBtn}>
                    Open live app
                  </a>
                )}
                {safeRepoUrl && (
                  <a href={safeRepoUrl} target="_blank" rel="noopener noreferrer" className={styles.repoBtn}>
                    View source
                  </a>
                )}
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
            <p className={styles.emptyBody}>No notes added for this project yet.</p>
          )}
        </div>

        {relatedList.length > 0 && (
          <section className={styles.relatedSection} aria-label="Related work">
            <h2 className={styles.relatedHeading}>Related work</h2>
            <div className={styles.relatedList}>
              {relatedList.map((rel) => {
                const relSlug = rel.slug?.current || rel.slug || rel._id;
                const relCat = getProjectCategory(rel);
                return (
                  <Link
                    key={rel._id || relSlug}
                    to={`/work/${relSlug}`}
                    className={styles.relatedRow}
                  >
                    <div>
                      <div className={styles.relatedTitle}>{rel.title}</div>
                      {rel.summary && (
                        <p className={styles.relatedSummary}>{rel.summary}</p>
                      )}
                    </div>
                    <span className={styles.relatedMeta}>
                      {relCat}
                      {rel.year ? ` · ${rel.year}` : ''}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <div className={styles.footer}>
          <Link to="/work" className={styles.backLink}>
            Back to Work
          </Link>
        </div>
      </div>
    </article>
  );
}
