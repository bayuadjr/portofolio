import styles from './Footer.module.css';

const socials = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/bayuadjr/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/bayu-adji-ramadhan-886652236/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.5 8.5h3v11h-3v-11zm1.5-5.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4 5.5h2.9v1.5h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5v5.7h-3v-5c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.3-2 2.7v5.1h-3v-11z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    url: 'https://github.com/bayuadjr/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.33 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.18-3.37-1.18-.45-1.17-1.11-1.48-1.11-1.48-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.38-2.03 1.01-2.75-.1-.26-.44-1.3.1-2.71 0 0 .83-.27 2.72 1.05a9.2 9.2 0 0 1 5.02 0c1.89-1.32 2.72-1.05 2.72-1.05.55 1.41.21 2.45.1 2.71.63.72 1.01 1.63 1.01 2.75 0 3.94-2.26 4.8-4.52 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.6.69.49A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'Kaggle',
    url: 'https://www.kaggle.com/bayuadjiramadhan',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.5 3h3.1l5.4 8.6V3h3.1v18h-3.1l-5.4-8.6V21H4.5V3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const email = import.meta.env.VITE_EMAIL;

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.row}>
        <a href={`mailto:${email}`} className={styles.email}>
          {email}
        </a>

        <div className={styles.socials}>
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      <p className={styles.base}>Malang, Indonesia</p>
    </footer>
  );
}
