import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity/client';
import styles from './Work.module.css';

export default function Work() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    // GROQ query fetching all fields: title, slug, num, year, projectType, summary, desc, coverImage, tags, tag
    const query = `*[_type == "project"]{
      _id,
      num,
      title,
      slug,
      projectType,
      summary,
      desc,
      year,
      coverImage,
      tags,
      tag
    } | order(num asc)`;

    client
      .fetch(query)
      .then((data) => {
        setProjects(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch projects from Sanity:', err);
        setLoading(false);
      });
  }, []);

  const uniqueTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((p) => {
      const itemTags = p.tags || p.tag;
      if (Array.isArray(itemTags)) {
        itemTags.forEach((t) => tags.add(t));
      } else if (itemTags) {
        tags.add(itemTags);
      }
    });
    return ['All', ...Array.from(tags).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((p) => {
      const itemTags = p.tags || p.tag;
      const type = p.projectType;
      if (type && type.toLowerCase() === activeFilter.toLowerCase()) return true;
      if (Array.isArray(itemTags)) {
        return itemTags.some((t) => t.toLowerCase() === activeFilter.toLowerCase());
      }
      return itemTags && itemTags.toLowerCase() === activeFilter.toLowerCase();
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
          {uniqueTags.map((tag) => (
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
            {filteredProjects.map((project, index) => {
              const num = project.num || String(index + 1).padStart(2, '0');
              const slug = project.slug?.current || project.slug || project._id;
              const projectType = project.projectType || 'Project';
              const rawTags = project.tags || project.tag;
              const tags = Array.isArray(rawTags)
                ? rawTags
                : rawTags
                  ? [rawTags]
                  : [];

              const isPaperOrResearch = /paper|research|fieldwork|study|etnografi|anthropology/i.test(
                projectType
              );
              const actionLabel = isPaperOrResearch ? 'Read Study →' : 'View Project →';

              return (
                <Link
                  to={`/work/${slug}`}
                  className={styles.card}
                  key={project._id || num}
                >
                  {/* Media Container: 16:9 ratio with coverImage or subtle fallback */}
                  <div className={styles.cardMedia}>
                    {project.coverImage ? (
                      <img
                        src={urlFor(project.coverImage)
                          .width(800)
                          .height(450)
                          .fit('crop')
                          .auto('format')
                          .url()}
                        alt={project.title}
                        className={styles.cardImg}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.cardFallback}>
                        <div className={styles.fallbackPattern} aria-hidden="true" />
                        <span className={styles.fallbackType}>{projectType}</span>
                      </div>
                    )}
                    <span className={styles.typeBadge}>{projectType}</span>
                  </div>

                  {/* Card Body using Flexbox with margin-top: auto for aligned footer */}
                  <div className={styles.cardBody}>
                    <div className={styles.cardMetaTop}>
                      <span className={styles.cardNum}>{num}</span>
                      {project.year && <span className={styles.cardYear}>{project.year}</span>}
                    </div>

                    <h2 className={styles.cardTitle}>{project.title}</h2>

                    {(project.summary || project.desc) && (
                      <p className={styles.cardDesc}>{project.summary || project.desc}</p>
                    )}

                    {/* Card Footer pinned to the bottom via margin-top: auto */}
                    <div className={styles.cardFooter}>
                      <div className={styles.cardTags}>
                        {tags.slice(0, 3).map((t) => (
                          <span key={t} className={styles.tagBadge}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className={styles.actionLink}>
                        {actionLabel}
                      </span>
                    </div>
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

