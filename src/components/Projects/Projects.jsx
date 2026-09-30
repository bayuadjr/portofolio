import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../sanity/client';
import fallbackProjects from '../../data/projects';

export default function Projects({ limit = 3 }) {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    client
      .fetch('*[_type == "project"] | order(num asc)')
      .then((data) => {
        if (data && data.length > 0) {
          setProjects(data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const displayedProjects = projects.slice(0, limit);

  return (
    <section className="threads" id="projects">
      <div className="threads-head">
        <div className="intro-label">Work areas</div>
        <div>
          <p style={{ fontSize: '17px', color: 'var(--mid)', maxWidth: '560px', lineHeight: '1.6' }}>
            Three intersecting paths: applied social research, information detection tools, and data science skill development.
          </p>
        </div>
      </div>

      <div className="threads-list">
        {displayedProjects.map((project) => (
          <Link
            to={project.slug?.current ? `/work/${project.slug.current}` : '/work'}
            className="thread-row"
            key={project._id || project.num || project.title}
          >
            <div>
              <h3>{project.title}</h3>
              <p>{project.summary || project.desc}</p>
            </div>
            <span className="tag">
              {Array.isArray(project.tag) ? project.tag.join(' · ') : project.tag}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
