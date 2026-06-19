import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [atHero, setAtHero] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let lastScroll = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const current = window.scrollY;
        const heroEl = document.getElementById('hero');
        const heroBottom = heroEl ? heroEl.offsetHeight : 80;

        if (current < heroBottom - 72) {
          setVisible(true);
          setAtHero(true);
        } else {
          setAtHero(false);
          if (current > lastScroll + 8) {
            setVisible(false);
            setMenuOpen(false);
          } else if (current < lastScroll - 8) {
            setVisible(true);
          }
        }
        lastScroll = current;
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const navClass = [
    styles.nav,
    !visible && styles.hidden,
    atHero && styles.hero,
  ].filter(Boolean).join(' ');

  return (
    <>
      <nav className={navClass}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo} onClick={close}>
            bayu<span>.</span>
          </Link>
          <span className={styles.divider} aria-hidden="true" />
          <Link to="/work" className={styles.link} onClick={close}>work</Link>
          <span className={styles.divider} aria-hidden="true" />
          <Link to="/writing" className={styles.link} onClick={close}>writing</Link>
        </div>

        <div className={styles.right}>
          <span className={styles.divider} aria-hidden="true" />
          <Link to="/adventure" className={`${styles.link} ${styles.linkDesktop}`} onClick={close}>
            glimpses
          </Link>
          <span className={`${styles.divider} ${styles.dividerDesktop}`} aria-hidden="true" />
          <button
            className={`${styles.cta} ${styles.ctaDesktop}`}
            onClick={() => { close(); navigate('/#footer'); }}
          >
            say hello →
          </button>
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={styles.burgerIcon}>{menuOpen ? '✧' : '✦'}</span>
          </button>
        </div>
      </nav>

      <div className={`${styles.mobile} ${menuOpen ? styles.mobileOpen : ''}`}>
        <Link to="/work" className={styles.mobileLink} onClick={close}>work</Link>
        <Link to="/writing" className={styles.mobileLink} onClick={close}>writing</Link>
        <Link to="/adventure" className={styles.mobileLink} onClick={close}>glimpses</Link>
        <button
          className={styles.mobileCta}
          onClick={() => { close(); navigate('/#footer'); }}
        >
          say hello →
        </button>
      </div>
    </>
  );
}
