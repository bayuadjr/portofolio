import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../sanity/client';
import fallbackProjects from '../../data/projects';
import {
  prepareProjects,
  getProjectCategory,
  getProjectTags,
  isFieldnotesProject,
} from '../../data/projectHelpers';
import { sanitizeHttpUrl } from '../../utils/url';

export default function Projects({ limit = 4 }) {
  const [projects, setProjects] = useState(() => prepareProjects(fallbackProjects));
  const [fetchError, setFetchError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

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
          setFetchError(false);
          if (data && data.length > 0) {
            setProjects(prepareProjects(data));
          }
        }
      })
      .catch((err) => {
        console.error('Failed to fetch projects:', err);
        if (!cancelled) {
          setFetchError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  const displayedProjects = projects.slice(0, limit);
  const leadProject = displayedProjects.find((item) => item.featured === true) || null;
  const secondaryProjects = leadProject
    ? displayedProjects.filter((item) => item !== leadProject)
    : displayedProjects;

  return (
    <section className="threads" id="projects">
      <div className="threads-head">
        <div className="intro-label">Selected work</div>
        <div>
          <p className="threads-lead">
            Selected projects across research, software, and business systems.
          </p>
        </div>
      </div>

      <div className="threads-list">
        {fetchError && (
          <div className="error-box" role="status">
            <span>Could not refresh projects from the archive right now. Showing local notes instead.</span>
            <button
              type="button"
              className="retry-btn"
              onClick={() => setRetryCount((c) => c + 1)}
            >
              Try again
            </button>
          </div>
        )}

        {leadProject && (() => {
          const slug = leadProject.slug?.current || leadProject.slug || leadProject._id;
          const tags = getProjectTags(leadProject);
          const category = getProjectCategory(leadProject);
          const safeLiveUrl = sanitizeHttpUrl(leadProject.liveUrl);
          const liveLabel = isFieldnotesProject(leadProject) ? 'Open live app' : 'Open demo';

          return (
            <article className="thread-featured">
              <div className="thread-featured-meta">
                <span>{category}</span>
                {leadProject.status && <span>· {leadProject.status}</span>}
                {leadProject.year && <span>· {leadProject.year}</span>}
              </div>

              <h3 className="thread-featured-title">
                <Link to={slug ? `/work/${slug}` : '/work'}>
                  {leadProject.title}
                </Link>
              </h3>

              <p className="thread-featured-desc">
                {leadProject.summary || leadProject.desc}
              </p>

              {tags.length > 0 && (
                <div className="thread-featured-tags">
                  {tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="thread-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="thread-featured-actions">
                <Link to={slug ? `/work/${slug}` : '/work'} className="btn-solid">
                  Read case study
                </Link>
                {safeLiveUrl && (
                  <a
                    href={safeLiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    {liveLabel}
                  </a>
                )}
              </div>
            </article>
          );
        })()}

        {secondaryProjects.map((project, index) => {
          const slug = project.slug?.current || project.slug || project._id;
          const category = getProjectCategory(project);
          const hasLiveDemo = Boolean(sanitizeHttpUrl(project.liveUrl));

          return (
            <Link
              to={slug ? `/work/${slug}` : '/work'}
              className="thread-row"
              key={project._id || index || project.title}
            >
              <div className="thread-body">
                <div className="thread-title-row">
                  <h3>{project.title}</h3>
                  {hasLiveDemo && <span className="thread-live">Live</span>}
                </div>
                <p>{project.summary || project.desc}</p>
              </div>

              <div className="thread-aside">
                <span className="tag">{category}</span>
                {project.year && <span className="tag">{project.year}</span>}
              </div>
            </Link>
          );
        })}

        <div className="threads-footer">
          <Link to="/work" className="intro-more">
            See all projects
          </Link>
        </div>
      </div>
    </section>
  );
}
