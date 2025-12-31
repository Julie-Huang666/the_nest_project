import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
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
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Load existing profile data when editing
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setFormData({
        fullName: profile.name || '',
        email: profile.email || '',
        instagram: '', // Instagram not stored in profile
        school: profile.school || '',
        year: profile.year ? profile.year.toLowerCase() : '',
        major: profile.major || '',
        roommateStatus: profile.roommateTag === 'Searching Room mate' ? 'looking' : 'not-seeking',
        interests: Array.isArray(profile.interests) ? profile.interests.join(', ') : (profile.interests || ''),
        bio: profile.description || profile.bio || '',
        profilePhoto: null // Can't restore file from localStorage
      });
      
      // Set photo preview if image exists
      if (profile.image && !profile.image.startsWith('blob:')) {
        setPhotoPreview(profile.image);
      } else if (profile.image && profile.image.startsWith('blob:')) {
        // Try to restore blob URL (may not work after refresh)
        setPhotoPreview(profile.image);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create user profile object
    const interestsArray = formData.interests
      ? formData.interests.split(',').map(i => i.trim()).filter(i => i)
      : [];
    
    // Preserve existing ID if editing, otherwise create new one
    const existingProfile = localStorage.getItem('userProfile');
    const existingId = existingProfile ? JSON.parse(existingProfile).id : null;
    
    // Preserve existing image if no new photo uploaded
    const existingImage = existingProfile && !formData.profilePhoto 
      ? JSON.parse(existingProfile).image 
      : null;
    
    const userProfile = {
      id: existingId || 'user-profile-' + Date.now(),
      name: formData.fullName,
      email: formData.email,
      major: formData.major,
      year: formData.year.charAt(0).toUpperCase() + formData.year.slice(1),
      school: formData.school,
      description: formData.bio,
      interests: interestsArray,
      image: formData.profilePhoto 
        ? URL.createObjectURL(formData.profilePhoto)
        : (existingImage || '/profile_pics/create_profile_page/backg.png'),
      roommateTag: formData.roommateStatus === 'looking' ? 'Searching Room mate' : null
    };

    // Save user profile to localStorage
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    // Navigate to saved profiles page
    navigate('/save-profile');
  };

  return (
    <div 
      className="create-profile-page"
      style={{
        backgroundImage: `url('/profile_pics/create_profile_page/backg.png')`
      }}
    >
      {/* Top Bar with Logo and Navbar */}
      <Navbar activePage="my-profile" />

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
              <option value="looking">Finding for room mates</option>
              <option value="not-seeking">Not actively seeking</option>
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
            <div 
              className={`upload-area ${isDragging ? 'drag-over' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
              {photoPreview ? (
                <div className="photo-preview-container">
                  <img src={photoPreview} alt="Profile preview" className="photo-preview" />
                  <label htmlFor="profilePhoto" className="change-photo-btn">
                    Change photo
                  </label>
                </div>
              ) : (
                <label htmlFor="profilePhoto" className="upload-label">
                  <div className="upload-icon">📷</div>
                  <div className="upload-text">
                    <strong>Upload a photo</strong>
                    <span>Drag and drop files here or click to browse</span>
                  </div>
                </label>
              )}
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

