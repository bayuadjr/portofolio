import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity/client';
import {
  prepareProjects,
  getProjectTags,
  isFieldnotesProject,
} from '../data/projectHelpers';
import { sanitizeHttpUrl } from '../utils/url';
import DemoCredentials from '../components/DemoCredentials/DemoCredentials';
import styles from './Work.module.css';

export default function Work() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    let cancelled = false;

    const query = `*[_type == "project"] {
      _id,
      num,
      title,
      slug,
      projectType,
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
          setError(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch projects from Sanity:', err);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  const handleRetry = () => {
    setLoading(true);
    setError(false);
    setRetryCount((c) => c + 1);
  };

  const uniqueTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((p) => {
      getProjectTags(p).forEach((t) => tags.add(t));
    });
    return ['All', ...Array.from(tags).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    const needle = activeFilter.toLowerCase();
    return projects.filter((p) => {
      if (p.projectType && p.projectType.toLowerCase() === needle) return true;
      return getProjectTags(p).some((t) => t.toLowerCase() === needle);
    });
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
    const num = project.num || '01';
    const slug = project.slug?.current || project.slug || project._id;
    const projectType = project.projectType || 'Web App';
    const tags = getProjectTags(project);
    const highlights = Array.isArray(project.highlights) ? project.highlights : [];
    const safeLiveUrl = sanitizeHttpUrl(project.liveUrl);
    const safeRepoUrl = sanitizeHttpUrl(project.repoUrl);
    const liveLabel = isFieldnotesProject(project) ? 'Open Fieldnotes' : 'Open live app';

    return (
      <article className={styles.featuredCard}>
        <div className={styles.featuredMain}>
          <div className={styles.featuredMeta}>
            <span className={styles.metaLine}>
              {num} / {projectType}
              {project.year ? ` / ${project.year}` : ''}
            </span>
            {safeLiveUrl && (
              <span className={styles.liveStatus}>Live demo available</span>
            )}
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
              Read the notes
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

          {highlights.length > 0 && (
            <div className={styles.insideBox}>
              <div className={styles.insideHead}>Inside the app</div>
              <ul className={styles.insideList}>
                {highlights.map((item, idx) => (
                  <li className={styles.insideRow} key={item}>
                    <span className={styles.insideIndex}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.insideName}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <DemoCredentials credentials={project.demoCredentials} compact />
        </aside>
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
          Things I've built, studied, or helped run. Some started as class fieldwork, some as late-night experiments, and a few turned into tools other people can actually open.
        </p>
      </section>

      <section className={styles.content}>
        {uniqueTags.length > 1 && (
          <div className={styles.filterBar} role="group" aria-label="Filter projects by topic">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`${styles.filterBtn} ${activeFilter === tag ? styles.active : ''}`}
                onClick={() => setActiveFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className={styles.stateBox} role="status">
            <p className={styles.stateText}>Loading projects...</p>
          </div>
        ) : error ? (
          <div className={styles.stateBox} role="alert">
            <p className={styles.stateText}>
              Could not load projects right now. Check your connection and try again.
            </p>
            <button type="button" className={styles.retryBtn} onClick={handleRetry}>
              Try again
            </button>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className={styles.showcase}>
            {featuredProject && renderFeatured(featuredProject)}

            {gridProjects.length > 0 && (
              <div className={styles.grid}>
                {gridProjects.map((project, index) => {
                  const num = project.num || String(index + 1).padStart(2, '0');
                  const slug = project.slug?.current || project.slug || project._id;
                  const projectType = project.projectType || 'Project';
                  const tags = getProjectTags(project);
                  const safeLiveUrl = sanitizeHttpUrl(project.liveUrl);

                  const isPaperOrResearch =
                    /paper|research|fieldwork|study|etnografi|anthropology/i.test(
                      projectType
                    );
                  const actionLabel = isPaperOrResearch
                    ? 'Read notes'
                    : 'Open project';

                  return (
                    <article className={styles.card} key={project._id || num}>
                      {project.coverImage?.asset ? (
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
                          <span className={styles.typeBadge}>{projectType}</span>
                        </Link>
                      ) : (
                        <Link to={`/work/${slug}`} className={styles.cardNoMediaHeader}>
                          <span className={styles.cardBigNum}>{num}</span>
                          <div className={styles.cardHeaderMeta}>
                            <span className={styles.typeLabel}>{projectType}</span>
                            {project.year && (
                              <span className={styles.cardYear}>{project.year}</span>
                            )}
                          </div>
                        </Link>
                      )}

                      <div className={styles.cardBody}>
                        {project.coverImage?.asset && (
                          <div className={styles.cardMetaTop}>
                            <span className={styles.cardNum}>{num}</span>
                            {project.year && (
                              <span className={styles.cardYear}>{project.year}</span>
                            )}
                          </div>
                        )}

                        <h3 className={styles.cardTitle}>
                          <Link to={`/work/${slug}`} className={styles.cardTitleLink}>
                            {project.title}
                          </Link>
                        </h3>

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
              No projects match "{activeFilter}".
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
