import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ activePage = 'home' }) => {
  return (
    <div className="top-bar">
      <div className="logo-section">
        <Link to="/">
          <img src="/Landing_page/nest-logo.png" alt="The NEST Logo" className="logo" />
        </Link>
      </div>
      <nav className="navbar">
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/explore" 
            className={`nav-link ${activePage === 'explore' ? 'active' : ''}`}
          >
            Explore
          </Link>
          <Link 
            to="/save-profile" 
            className={`nav-link ${activePage === 'saved-profiles' ? 'active' : ''}`}
          >
            Saved Profiles
          </Link>
          <Link 
            to="/my-profile" 
            className={`nav-link ${activePage === 'my-profile' ? 'active' : ''}`}
          >
            My Profile
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

