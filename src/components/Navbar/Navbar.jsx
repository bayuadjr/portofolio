import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [atHero, setAtHero] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScroll = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const current = window.scrollY;
        if (current < 80) {
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav className={`${styles.nav} ${!visible ? styles.hidden : ''} ${atHero ? styles.hero : ''}`}>

        {/* LEFT GROUP: logo + work + writing */}
        <div className={styles.left}>
          <Link to="/" className={styles.logo} onClick={close}>
            bayu<span>.</span>
          </Link>
          <Link to="/work" className={styles.link} onClick={close}>work</Link>
          <Link to="/writing" className={styles.link} onClick={close}>writing</Link>
        </div>

        {/* RIGHT GROUP: glimpses + say hello + hamburger */}
        <div className={styles.right}>
          <Link to="/adventure" className={`${styles.link} ${styles.linkDesktop}`} onClick={close}>
            glimpses
          </Link>
          <button
            className={`${styles.cta} ${styles.ctaDesktop}`}
            onClick={() => { close(); navigate('/'); }}
          >
            say hello →
          </button>
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

      </nav>

      {/* MOBILE MENU */}
      <div className={`${styles.mobile} ${menuOpen ? styles.mobileOpen : ''}`}>
        <Link to="/work" className={styles.mobileLink} onClick={close}>work</Link>
        <Link to="/writing" className={styles.mobileLink} onClick={close}>writing</Link>
        <Link to="/adventure" className={styles.mobileLink} onClick={close}>glimpses</Link>
        <button
          className={styles.mobileCta}
          onClick={() => { close(); navigate('/'); }}
        >
          say hello →
        </button>
      </div>
    </>
  );
}
