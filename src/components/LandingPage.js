import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/create-profile');
  };

  return (
    <div className="landing-page">
      {/* Top Bar with Logo and Navbar */}
      <div className="top-bar">
        <div className="logo-section">
          <img src="/Landing_page/nest-logo.png" alt="The NEST Logo" className="logo" />
        </div>
        <nav className="navbar">
          <div className="nav-links">
            <a href="/" className="nav-link">Home</a>
            <a href="/explore" className="nav-link">Explore</a>
            <a href="/save-profile" className="nav-link">Saved Profiles</a>
            <a href="/my-profile" className="nav-link">My Profile</a>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img src="/Landing_page/hero_img.png" alt="Hero background" className="hero-bg-image" />
        </div>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-heading">
              <span className="hero-heading-white">Find Your </span>
              <span className="hero-heading-purple">Wildcat Nest.</span>
            </h1>
            <p className="hero-tagline">The ultimate social connection app for NU students</p>
            <p className="hero-features">Academic | Social | Room mates | Campus life</p>
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

