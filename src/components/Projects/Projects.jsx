import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../sanity/client';
import fallbackProjects from '../../data/projects';
import { prepareProjects, getProjectTags } from '../../data/projectHelpers';
import { sanitizeHttpUrl } from '../../utils/url';

export default function Projects({ limit = 3 }) {
  const [projects, setProjects] = useState(() => prepareProjects(fallbackProjects));
  const [fetchError, setFetchError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

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
        console.error(err);
        if (!cancelled) {
          setFetchError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  const displayedProjects = projects.slice(0, limit);

  return (
    <section className="threads" id="projects">
      <div className="threads-head">
        <div className="intro-label">Recent work</div>
        <div>
          <p className="threads-lead">
            Some recent projects and notes.
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

        {displayedProjects.map((project, index) => {
          const slug = project.slug?.current || project.slug || project._id;
          const tags = getProjectTags(project);
          const tagText = tags.join(' · ');
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
                  {hasLiveDemo && (
                    <span className="thread-live">Live</span>
                  )}
                </div>
                <p>{project.summary || project.desc}</p>
              </div>

              <div className="thread-aside">
                {tagText && <span className="tag">{tagText}</span>}
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
