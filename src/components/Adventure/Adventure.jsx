import posts from '../../data/posts';
import styles from './Adventure.module.css';

const tagClassMap = {
  terracotta: styles.tagTerracotta,
  sky: styles.tagSky,
  acid: styles.tagAcid,
};

export default function Adventure() {
  return (
    <section className={styles.section} id="adventure-writing">
      {/* ── Left: Adventure Log ── */}
      <div className={styles.left}>
        <h2 className={styles.sectionTitle}>Adventure Log</h2>
        <div className={styles.photoGrid}>
          <div className={`${styles.photoBlock} ${styles.block1}`}>
            <span className={styles.photoCaption}>somewhere in Java</span>
          </div>
          <div className={`${styles.photoBlock} ${styles.block2}`}>
            <span className={styles.photoCaption}>fieldwork days</span>
          </div>
          <div className={`${styles.photoBlock} ${styles.block3}`}>
            <span className={styles.photoCaption}>campus life</span>
          </div>
        </div>
      </div>

      {/* ── Right: Writing Sidebar ── */}
      <div className={styles.right}>
        <h2 className={styles.sectionTitle}>Writing</h2>
        <div className={styles.writingList}>
          {posts.map((post, i) => (
            <article className={styles.postItem} key={i}>
              <div className={styles.postMeta}>
                <span className={styles.postDate}>{post.date}</span>
                <span
                  className={`${styles.postTag} ${tagClassMap[post.tagColor] || ''}`}
                >
                  {post.tag}
                </span>
              </div>
              <h3 className={styles.postTitle}>{post.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
