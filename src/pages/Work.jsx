import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanity/client';

import styles from './Work.module.css';

export default function Work() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    client
      .fetch('*[_type == "project"] | order(num asc)')
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const uniqueTags = useMemo(() => {
    const tags = new Set();
    projects.forEach(p => {
      if (Array.isArray(p.tag)) {
        p.tag.forEach(t => tags.add(t));
      } else if (p.tag) {
        tags.add(p.tag); // fallback for old string tags
      }
    });
    return ['All', ...Array.from(tags).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(p => {
      if (Array.isArray(p.tag)) {
        return p.tag.includes(activeFilter);
      }
      return p.tag === activeFilter;
    });
  }, [projects, activeFilter]);

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Work<span className={styles.accent}>.</span>
        </h1>
        <p className={styles.heroDesc}>
          Selected projects spanning ethnography, data science, and project management
          — the places where anthropology meets systems thinking.
        </p>
      </section>

      <section className={styles.content}>
        <div className={styles.filterBar}>
          {uniqueTags.map(tag => (
            <button
              key={tag}
              className={`${styles.filterBtn} ${activeFilter === tag ? styles.active : ''}`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {loading ? (
          <div className={styles.emptyState}>Loading projects...</div>
        ) : filteredProjects.length > 0 ? (
          <div className={styles.list}>
            {filteredProjects.map((project, index) => {
              const num = project.num || String(index + 1).padStart(2, '0');
              const tagText = project.projectType || 
                (Array.isArray(project.tag) ? project.tag.join(' · ') : project.tag) || '';

              return (
                <Link
                  to={`/work/${project.slug?.current || project._id}`}
                  className={styles.row}
                  key={project._id || num}
                >
                  <span className={styles.rowNum}>{num}</span>

                  <div className={styles.rowMain}>
                    <h2 className={styles.rowTitle}>{project.title}</h2>
                    {(project.summary || project.desc) && (
                      <p className={styles.rowDesc}>{project.summary || project.desc}</p>
                    )}
                  </div>

                  <div className={styles.rowMeta}>
                    {tagText && <span className={styles.rowTag}>{tagText}</span>}
                    <span className={styles.arrow} aria-hidden="true">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>Nothing here yet — check back soon.</div>
        )}
      </section>
    </>
  );
}
