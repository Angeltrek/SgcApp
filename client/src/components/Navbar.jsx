import '../App.css';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({pth}){
  const navItemContainerRef = useRef(null);
  const mobileMenuToggleRef = useRef(null);

  useEffect(() => {
    const mobileMenuToggle = mobileMenuToggleRef.current;

    const handleClick = () => {
      if (navItemContainerRef.current) {
        navItemContainerRef.current.classList.toggle('show-mobile-menu');
      }
    };

    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', handleClick);
    }

    return () => {
      if (mobileMenuToggle) {
        mobileMenuToggle.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <h3 className="sgc">SGC</h3>
        <button id="mobile-menu-toggle" className="mobile-menu-toggle" ref={mobileMenuToggleRef} aria-label="Toggle Mobile Menu">
          <i className="fa-solid fa-bars menu-icon"></i>
        </button>
        <ul className="nav-item-container" ref={navItemContainerRef}>
          <li className="nav-item">
            <Link to="/" className={`nav-link ${pth === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className={`nav-link ${pth === '/about' ? 'active' : ''}`}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className={`nav-link ${pth === '/login' ? 'active' : ''}`}>
              My Sensors
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};