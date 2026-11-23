import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../sanity/client';
import fallbackProjects from '../../data/projects';
import { prepareProjects, getProjectTags } from '../../data/projectHelpers';
import { sanitizeHttpUrl } from '../../utils/url';

export default function Projects({ limit = 3 }) {
  const [projects, setProjects] = useState(() => prepareProjects(fallbackProjects));

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
        if (!cancelled && data && data.length > 0) {
          setProjects(prepareProjects(data));
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const displayedProjects = projects.slice(0, limit);

  return (
    <section className="threads" id="projects">
      <div className="threads-head">
        <div className="intro-label">Work areas</div>
        <div>
          <p style={{ fontSize: '17px', color: 'var(--mid)', maxWidth: '560px', lineHeight: '1.6' }}>
            Three intersecting paths: applied social research, ethnographic software tools, and computational data analysis.
          </p>
        </div>
      </div>

      <div className="threads-list">
        {displayedProjects.map((project, index) => {
          const num = project.num || String(index + 1).padStart(2, '0');
          const slug = project.slug?.current || project.slug || project._id;
          const tags = getProjectTags(project);
          const tagText = tags.join(' · ');
          const hasLiveDemo = Boolean(sanitizeHttpUrl(project.liveUrl));

          return (
            <Link
              to={slug ? `/work/${slug}` : '/work'}
              className="thread-row"
              key={project._id || num || project.title}
            >
              <span className="thread-num">{num}</span>

              <div className="thread-body">
                <div className="thread-title-row">
                  <h3>{project.title}</h3>
                  {hasLiveDemo && (
                    <span className="thread-live">Live Demo</span>
                  )}
                </div>
                <p>{project.summary || project.desc}</p>
              </div>

              <div className="thread-aside">
                {tagText && <span className="tag">{tagText}</span>}
                <span className="thread-arrow" aria-hidden="true">→</span>
              </div>
            </Link>
          );
        })}

        <div className="threads-footer">
          <Link to="/work" className="intro-more">
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
