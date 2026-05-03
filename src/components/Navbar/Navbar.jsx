import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={styles.navbar} id="navbar">
      <Link to="/" className={styles.logo}>
        bayu<span className={styles.logoDot}>.</span>
      </Link>

      <div
        className={`${styles.menuToggle} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        role="button"
        tabIndex={0}
      >
        <span />
        <span />
        <span />
      </div>

      <div className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
        <Link
          to="/work"
          className={styles.navLink}
          onClick={handleLinkClick}
        >
          work
        </Link>
        <Link
          to="/writing"
          className={styles.navLink}
          onClick={handleLinkClick}
        >
          writing
        </Link>
        <Link
          to="/adventure"
          className={styles.navLink}
          onClick={handleLinkClick}
        >
          glimpses
        </Link>

        <button
          className={styles.cta}
          onClick={() => {
            handleLinkClick();
            navigate('/contact');
          }}
          id="nav-cta"
        >
          say hello →
        </button>
      </div>
    </nav>
  );
}
