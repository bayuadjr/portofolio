import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../sanity/client';
import styles from './Projects.module.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch('*[_type == "project"] | order(num asc) [0...3]')
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <section className={styles.section} id="projects">
      <div className={styles.header}>
        <h2 className={styles.title}>Projects</h2>
        <Link to="/work" className={styles.viewAll}>
          View all →
        </Link>
      </div>

      <div className={styles.grid}>
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <Link to={`/work/${project.slug?.current || project._id}`} className={styles.cardLink} key={project._id || project.num}>
              <article className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.cardNum}>{project.num} —</span>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDesc}>{project.summary || project.desc}</p>
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.cardTag}>
                    {Array.isArray(project.tag) ? project.tag[0] : project.tag}
                  </span>
                  <span className={styles.arrowCircle}>→</span>
                </div>
              </article>
            </Link>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </section>
  );
}
