import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to="/" className="mark">Bayu</Link>
      <ul>
        <li><NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
        <li><NavLink to="/work" className={({ isActive }) => (isActive ? 'active' : '')}>Work</NavLink></li>
        <li><NavLink to="/adventure" className={({ isActive }) => (isActive ? 'active' : '')}>Beyond</NavLink></li>
        <li><NavLink to="/writing" className={({ isActive }) => (isActive ? 'active' : '')}>Writing</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink></li>
      </ul>
    </nav>
  );
}
