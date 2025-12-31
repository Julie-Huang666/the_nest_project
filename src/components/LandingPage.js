import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/create-profile');
  };

  return (
    <div className="landing-page">
      {/* Top Bar with Logo and Navbar */}
      <Navbar activePage="home" />

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

      {/* Why The NEST Section */}
      <section className="why-nest-section">
        <h2 className="why-nest-title">
          <span className="why-text">Why</span>
          <span className="nest-text">The NEST?</span>
        </h2>
        <p className="why-nest-subtitle">
          Simplest way for you to find people of your interest.
        </p>
        <img 
          src="/Landing_page/Computer_img.png" 
          alt="Laptop mockup showing Explore students page" 
          className="why-nest-laptop-image"
        />
        
        {/* Feature Callout Bubbles */}
        <div className="feature-bubble feature-bubble-1">
          <h3 className="feature-bubble-title">Find potential mentors</h3>
          <p className="feature-bubble-text">Filter through for schools, year level, and major!</p>
        </div>
        <div className="feature-bubble feature-bubble-2">
          <h3 className="feature-bubble-title">Build Friendships</h3>
          <p className="feature-bubble-text">Look at individual tags to see people's interest, room mate status, and more!</p>
        </div>
        <div className="feature-bubble feature-bubble-3">
          <h3 className="feature-bubble-title">Easy connection</h3>
          <p className="feature-bubble-text">Get their contact information with a single click!</p>
        </div>
        
        {/* How It Works Section */}
        <section className="how-it-works-section">
        <h2 className="how-it-works-title">How It Works</h2>
        <div className="steps-container">
          <div className="step step-1">
            <div className="step-number">1</div>
            <div className="step-content">
              <div className="step-header">
                <h3 className="step-title">Create Profile</h3>
                <button className="step-arrow-btn" onClick={() => navigate('/create-profile')}>
                  <span className="arrow">→</span>
                </button>
              </div>
              <p className="step-description">
                Share your major and interests. Upload a profile picture so people can recognise you.
              </p>
            </div>
          </div>
          <div className="step step-2">
            <div className="step-number">2</div>
            <div className="step-content">
              <div className="step-header">
                <h3 className="step-title">Explore Students</h3>
                <button className="step-arrow-btn" onClick={() => navigate('/explore')}>
                  <span className="arrow">→</span>
                </button>
              </div>
              <p className="step-description">
                Make your search easy by filtering students by year, school, or interests.
              </p>
            </div>
          </div>
          <div className="step step-3">
            <div className="step-number">3</div>
            <div className="step-content">
              <div className="step-header">
                <h3 className="step-title">Make Connection</h3>
                <button className="step-arrow-btn" onClick={() => navigate('/save-profile')}>
                  <span className="arrow">→</span>
                </button>
              </div>
              <p className="step-description">
                Save matches by liking the profiles and reach out directly.
              </p>
            </div>
          </div>
        </div>
        </section>
        
        {/* Join Us Today Section */}
        <section className="join-us-section">
          <div className="join-us-background">
            <img src="/Landing_page/img_2.png" alt="Hands connecting" className="join-us-bg-image" />
          </div>
          <h2 className="join-us-title">Join Us Today</h2>
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-line">Over</div>
              <div className="stat-number">2k</div>
              <div className="stat-label">Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-line">More than</div>
              <div className="stat-number">3k</div>
              <div className="stat-label">Matches</div>
            </div>
            <div className="stat-card">
              <div className="stat-line">90%</div>
              <div className="stat-label">of wildcats</div>
              <div className="stat-label">like this product</div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default LandingPage;

