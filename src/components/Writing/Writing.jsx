import posts from '../../data/posts';
import styles from './Writing.module.css';

const tagClassMap = {
  terracotta: styles.tagTerracotta,
  sky: styles.tagSky,
  acid: styles.tagAcid,
};

export default function WritingSection() {
  return (
    <section className={styles.section} id="writing-page">
      <h1 className={styles.title}>Writing</h1>
      <p className={styles.subtitle}>
        Reflections on anthropology, data, books, and the things in between.
      </p>

      <div className={styles.list}>
        {posts.map((post, i) => (
          <article className={styles.item} key={i}>
            <span className={styles.itemDate}>{post.date}</span>
            <div className={styles.itemContent}>
              <h2 className={styles.itemTitle}>{post.title}</h2>
              <p className={styles.itemExcerpt}>
                Coming soon — this piece is currently being written.
              </p>
            </div>
            <span
              className={`${styles.itemTag} ${tagClassMap[post.tagColor] || ''}`}
            >
              {post.tag}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
