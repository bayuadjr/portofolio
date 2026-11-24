import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity/client';
import fallbackProjects from '../data/projects';
import {
  WORK_CATEGORIES,
  prepareProjects,
  getProjectCategory,
  getProjectTags,
  isFieldnotesProject,
} from '../data/projectHelpers';
import { sanitizeHttpUrl } from '../utils/url';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import DemoCredentials from '../components/DemoCredentials/DemoCredentials';
import styles from './Work.module.css';

export default function Work() {
  useDocumentMeta({
    title: 'Work',
    description:
      'Fieldwork, software tools, and business digitalization case studies by Bayu Adji Ramadhan.',
    path: '/work',
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    let cancelled = false;

    const query = `*[_type == "project"] {
      _id,
      num,
      sortOrder,
      title,
      slug,
      category,
      projectType,
      role,
      status,
      featured,
      summary,
      desc,
      year,
      coverImage,
      liveUrl,
      repoUrl,
      highlights,
      demoCredentials,
      tags,
      tag,
      "bodyCount": count(body)
    }`;

    client
      .fetch(query)
      .then((data) => {
        if (!cancelled) {
          setProjects(prepareProjects(data || []));
          setUsingFallback(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch projects from Sanity:', err);
        if (!cancelled) {
          setProjects(prepareProjects(fallbackProjects));
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

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((p) => getProjectCategory(p) === activeFilter);
  }, [projects, activeFilter]);

  const featuredProject = useMemo(
    () => filteredProjects.find((p) => p.featured === true) || null,
    [filteredProjects]
  );

  const gridProjects = useMemo(() => {
    if (!featuredProject) return filteredProjects;
    return filteredProjects.filter((p) => p !== featuredProject);
  }, [filteredProjects, featuredProject]);

  const renderFeatured = (project) => {
    const slug = project.slug?.current || project.slug || project._id;
    const category = getProjectCategory(project);
    const tags = getProjectTags(project);
    const safeLiveUrl = sanitizeHttpUrl(project.liveUrl);
    const safeRepoUrl = sanitizeHttpUrl(project.repoUrl);
    const liveLabel = isFieldnotesProject(project) ? 'Open Fieldnotes' : 'Open live app';
    const hasDemoCreds = Boolean(
      project.demoCredentials?.email || project.demoCredentials?.password
    );
    const hasAside = Boolean(project.coverImage?.asset || hasDemoCreds);

    const metaParts = [category, project.status, project.year].filter(Boolean);

    return (
      <article className={`${styles.featuredCard} ${!hasAside ? styles.featuredSingle : ''}`}>
        <div className={styles.featuredMain}>
          <div className={styles.featuredMeta}>
            <span className={styles.metaLine}>{metaParts.join(' · ')}</span>
          </div>

          <h2 className={styles.featuredTitle}>
            <Link to={`/work/${slug}`} className={styles.featuredTitleLink}>
              {project.title}
            </Link>
          </h2>

          {(project.summary || project.desc) && (
            <p className={styles.featuredDesc}>{project.summary || project.desc}</p>
          )}

          {tags.length > 0 && (
            <div className={styles.cardTags}>
              {tags.map((t) => (
                <span key={t} className={styles.tagBadge}>
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className={styles.featuredActions}>
            {safeLiveUrl && (
              <a
                href={safeLiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                {liveLabel}
              </a>
            )}
            <Link to={`/work/${slug}`} className={styles.secondaryBtn}>
              Read case study
            </Link>
            {safeRepoUrl && (
              <a
                href={safeRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ghostBtn}
              >
                View source
              </a>
            )}
          </div>
        </div>

        {hasAside && (
          <aside className={styles.featuredAside}>
            {project.coverImage?.asset && (
              <Link to={`/work/${slug}`} className={styles.featuredMedia}>
                <img
                  src={urlFor(project.coverImage)
                    .width(960)
                    .height(540)
                    .fit('crop')
                    .auto('format')
                    .url()}
                  alt={project.title}
                  width={960}
                  height={540}
                  fetchPriority="high"
                  className={styles.featuredImg}
                />
              </Link>
            )}

            <DemoCredentials credentials={project.demoCredentials} compact />
          </aside>
        )}
      </article>
    );
  };

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Work<span className={styles.accent}>.</span>
        </h1>
        <p className={styles.heroDesc}>
          Selected projects across research, software tools, and business systems.
        </p>
      </section>

      <section className={styles.content}>
        <div className={styles.filterBar} role="group" aria-label="Filter projects by category">
          {WORK_CATEGORIES.map((category) => (
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

        {usingFallback && (
          <div className={styles.fallbackNotice} role="status">
            <span>Could not reach the Sanity archive right now. Showing local case studies instead.</span>
            <button type="button" className={styles.retryBtn} onClick={handleRetry}>
              Try again
            </button>
          </div>
        )}

        {loading ? (
          <div className={styles.stateBox} role="status">
            <p className={styles.stateText}>Loading projects...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className={styles.showcase}>
            {featuredProject && renderFeatured(featuredProject)}

            {gridProjects.length > 0 && (
              <div className={styles.grid}>
                {gridProjects.map((project, index) => {
                  const slug = project.slug?.current || project.slug || project._id;
                  const category = getProjectCategory(project);
                  const projectType = project.projectType || category;
                  const tags = getProjectTags(project);
                  const safeLiveUrl = sanitizeHttpUrl(project.liveUrl);
                  const statusNote = [project.role, project.status].filter(Boolean).join(' · ');

                  const actionLabel =
                    category === 'Research' ? 'Read notes' : 'Read case study';

                  return (
                    <article className={styles.card} key={project._id || index}>
                      {project.coverImage?.asset && (
                        <Link to={`/work/${slug}`} className={styles.cardMedia}>
                          <img
                            src={urlFor(project.coverImage)
                              .width(800)
                              .height(450)
                              .fit('crop')
                              .auto('format')
                              .url()}
                            alt={project.title}
                            width={800}
                            height={450}
                            className={styles.cardImg}
                            loading="lazy"
                          />
                          <span className={styles.typeBadge}>{category}</span>
                        </Link>
                      )}

                      <div className={styles.cardBody}>
                        <div className={styles.cardMetaTop}>
                          <span className={styles.typeLabel}>
                            {category}
                            {projectType && projectType !== category ? ` · ${projectType}` : ''}
                          </span>
                          {project.year && (
                            <span className={styles.cardYear}>{project.year}</span>
                          )}
                        </div>

                        <h2 className={styles.cardTitle}>
                          <Link to={`/work/${slug}`} className={styles.cardTitleLink}>
                            {project.title}
                          </Link>
                        </h2>

                        {statusNote && (
                          <p className={styles.cardStatus}>{statusNote}</p>
                        )}

                        {(project.summary || project.desc) && (
                          <p className={styles.cardDesc}>
                            {project.summary || project.desc}
                          </p>
                        )}

                        <div className={styles.cardFooter}>
                          <div className={styles.cardTags}>
                            {tags.slice(0, 3).map((t) => (
                              <span key={t} className={styles.tagBadge}>
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className={styles.cardActions}>
                            {safeLiveUrl && (
                              <a
                                href={safeLiveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.quickLiveLink}
                              >
                                Live demo
                              </a>
                            )}
                            <Link to={`/work/${slug}`} className={styles.actionLink}>
                              {actionLabel}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        ) : projects.length > 0 ? (
          <div className={styles.stateBox}>
            <p className={styles.stateText}>
              No projects in "{activeFilter}".
            </p>
            <button
              type="button"
              className={styles.retryBtn}
              onClick={() => setActiveFilter('All')}
            >
              Show all projects
            </button>
          </div>
        ) : (
          <div className={styles.stateBox}>
            <p className={styles.stateText}>
              No projects published yet. New work will show up here once added.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
