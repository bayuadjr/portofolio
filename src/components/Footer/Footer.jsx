import styles from './Footer.module.css';

const socials = [
  { name: 'Instagram', url: 'https://www.instagram.com/bayuadjr/' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/bayu-adji-ramadhan-886652236/' },
  { name: 'GitHub', url: 'https://github.com/bayuadjr/' },
  { name: 'Kaggle', url: 'https://www.kaggle.com/bayuadjiramadhan' },
];

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      {/* ── Left ── */}
      <div className={styles.left}>
        <h2 className={styles.heading}>
          Let's<br />
          <span className={styles.headingAccent}>talk.</span>
        </h2>
        <p className={styles.subtext}>
          Open to research collaboration, freelance work, or just genuinely
          interesting conversations.
        </p>
        <a
          href={`mailto:${import.meta.env.VITE_EMAIL}`}
          className={styles.emailCta}
          id="email-cta"
        >
          {import.meta.env.VITE_EMAIL} →
        </a>
      </div>

      {/* ── Right ── */}
      <div className={styles.right}>
        <span className={styles.socialTitle}>Connect</span>
        <div className={styles.socialList}>
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.name}
              <span className={styles.socialArrow}>↗</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── Base ── */}
      <div className={styles.base}>
        <p className={styles.baseText}>
          © 2025 Bayu Adji Ramadhan · Malang, Indonesia
        </p>
      </div>
    </footer>
  );
}
