import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProfile.css';

const CreateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    instagram: '',
    school: '',
    year: '',
    major: '',
    roommateStatus: '',
    interests: '',
    bio: '',
    profilePhoto: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      profilePhoto: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to second profile page
    navigate('/profile-page-2');
  };

  return (
    <div 
      className="create-profile-page"
      style={{
        backgroundImage: `url('/profile_pics/create_profile_page/backg.png')`
      }}
    >
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
            <a href="/my-profile" className="nav-link active">My Profile</a>
          </div>
        </nav>
      </div>

      {/* Form Container */}
      <div className="form-container">
        <h1 className="form-title">Create your profile</h1>
        <p className="form-subtitle">Please set up your profile so that other students can connect with you</p>
        
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="fullName">Full name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Insert full name here"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">NU Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g williewildcat@u.northwestern.edu"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="instagram">Instagram (optional)</label>
            <input
              type="text"
              id="instagram"
              name="instagram"
              placeholder="Insert Instagram account"
              value={formData.instagram}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="school">School</label>
            <select
              id="school"
              name="school"
              value={formData.school}
              onChange={handleInputChange}
            >
              <option value="">Select School</option>
              <option value="weinberg">Weinberg College of Arts and Sciences</option>
              <option value="mccormick">McCormick School of Engineering and Applied Science</option>
              <option value="communication">School of Communication</option>
              <option value="sesp">School of Education and Social Policy (SESP)</option>
              <option value="medill">Medill School of Journalism, Media, Integrated Marketing Communications</option>
              <option value="bienen">Bienen School of Music</option>
              <option value="sps">School of Professional Studies</option>
              <option value="kellogg">Kellogg School of Management</option>
              <option value="law">Pritzker School of Law</option>
              <option value="medicine">Feinberg School of Medicine</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="year">Year</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
            >
              <option value="">Select Year</option>
              <option value="freshman">Freshman</option>
              <option value="sophomore">Sophomore</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
              <option value="graduate">Graduate</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="major">Major</label>
            <input
              type="text"
              id="major"
              name="major"
              placeholder="e.g Computer science"
              value={formData.major}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="roommateStatus">Room mate status</label>
            <select
              id="roommateStatus"
              name="roommateStatus"
              value={formData.roommateStatus}
              onChange={handleInputChange}
            >
              <option value="">Finding for room mates</option>
              <option value="looking">Looking for roommates</option>
              <option value="found">Found roommates</option>
              <option value="not-looking">Not looking</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="interests">Interest (comma separated)</label>
            <input
              type="text"
              id="interests"
              name="interests"
              placeholder="e.g hiking, swimming, snow boarding"
              value={formData.interests}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Short bio</label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Write a short bio about yourself for people to know you more"
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Upload Profile Photo</label>
            <div className="upload-area">
              <input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="profilePhoto" className="upload-label">
                <div className="upload-icon">📷</div>
                <div className="upload-text">
                  <strong>Upload a photo</strong>
                  <span>Drag and drop files here</span>
                </div>
              </label>
            </div>
          </div>

          <button type="submit" className="save-btn">
            <span className="save-icon">↑</span>
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;

