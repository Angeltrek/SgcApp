import '../App.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({pth}) {
  return (
    <footer>
      <div className="container">
        <h3 className="sgc">SGC</h3>
        <nav className="footer-container">
          <ul className="footer-item-container">
            <h4>Company</h4>
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
              <Link to="/documentation" className={`nav-link ${pth === '/documentation' ? 'active' : ''}`}>
                Documentation
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className={`nav-link ${pth === '/login' ? 'active' : ''}`}>
                My Sensors
              </Link>
            </li>
          </ul>
          <ul className="footer-item-container">
            <h4>Socials</h4>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="fa-brands fa-instagram socials"></i>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="fa-brands fa-facebook socials"></i>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="fa-brands fa-discord socials"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <p className="copyright">@sgc.com, 2023 All Rights Reserverd</p>
    </footer>
  );
};