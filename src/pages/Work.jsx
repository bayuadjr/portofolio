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
          <div className={styles.grid}>
            {filteredProjects.map((project) => (
              <Link to={`/work/${project.slug?.current || project._id}`} className={styles.cardLink} key={project._id}>
                <article className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.cardNum}>{project.num} —</span>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDesc}>{project.summary || project.desc}</p>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardTag}>
                      {Array.isArray(project.tag) ? project.tag[0] : project.tag}
                      {Array.isArray(project.tag) && project.tag.length > 1 && ` +${project.tag.length - 1}`}
                    </span>
                    <span className={styles.arrowCircle}>→</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>Nothing here yet — check back soon.</div>
        )}
      </section>
      
    </>
  );
}
