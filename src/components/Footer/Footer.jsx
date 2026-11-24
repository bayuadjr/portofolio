import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="footer">
      <span>Bayu Adji Ramadhan</span>
      <div className="footer-links">
        <a
          href="https://github.com/bayuadjr"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/bayu-adji-ramadhan-886652236/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          LinkedIn
        </a>
        <Link to="/contact" className="footer-link">
          Contact
        </Link>
      </div>
    </footer>
  );
}
