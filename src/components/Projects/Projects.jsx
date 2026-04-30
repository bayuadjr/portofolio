import { Link } from 'react-router-dom';
import projects from '../../data/projects';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section className={styles.section} id="projects">
      <div className={styles.header}>
        <h2 className={styles.title}>Projects</h2>
        <Link to="/work" className={styles.viewAll}>
          View all →
        </Link>
      </div>

      <div className={styles.grid}>
        {projects.map((project) => (
          <article className={styles.card} key={project.num}>
            <div className={styles.cardTop}>
              <span className={styles.cardNum}>{project.num} —</span>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDesc}>{project.desc}</p>
            </div>
            <div className={styles.cardFooter}>
              <span className={styles.cardTag}>{project.tag}</span>
              <span className={styles.arrowCircle}>→</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
