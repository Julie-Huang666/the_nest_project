import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import SavedProfileCard from './SavedProfileCard';
import './SavedProfiles.css';

const SavedProfiles = () => {
  const navigate = useNavigate();
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Load saved profiles from localStorage
    const saved = localStorage.getItem('savedProfiles');
    if (saved) {
      setSavedProfiles(JSON.parse(saved));
    }

    // Load user's own profile from localStorage
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  const handleUnlikeProfile = (profileId, e) => {
    e.stopPropagation();
    // Remove from saved profiles
    const updated = savedProfiles.filter(p => p.id !== profileId);
    setSavedProfiles(updated);
    localStorage.setItem('savedProfiles', JSON.stringify(updated));
  };

  const handleGoExplore = () => {
    navigate('/explore');
  };

  // Check if we should show empty state
  const hasNoProfiles = savedProfiles.length === 0 && !userProfile;

  // Combine user profile and saved profiles
  const allProfiles = [];
  if (userProfile) {
    allProfiles.push({ ...userProfile, isOwnProfile: true });
  }
  savedProfiles.forEach(profile => {
    if (profile.id !== userProfile?.id) {
      allProfiles.push({ ...profile, isOwnProfile: false });
    }
  });

  return (
    <div className="saved-profiles-page">
      {/* Top Bar with Logo and Navbar */}
      <Navbar activePage="saved-profiles" />

      {/* Main Content */}
      <div className="saved-profiles-content">
        <h1 className="saved-profiles-heading">Saved profiles</h1>
        <p className="saved-profiles-subtitle">Students you've saved to reach out to</p>

        {hasNoProfiles ? (
          /* Empty State */
          <div className="empty-state-container">
            <div className="empty-state-box">
              <div className="empty-state-content">
                <div className="empty-state-icon">
                  <svg width="80" height="80" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#591671" d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868c-3.308 0-6.227 1.633-8.018 4.129c-1.791-2.496-4.71-4.129-8.017-4.129c-5.45 0-9.868 4.417-9.868 9.868c0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959c.17-.721.268-1.469.268-2.242z"></path>
                  </svg>
                </div>
                <h2 className="empty-state-title">No saved profiles yet</h2>
                <p className="empty-state-description">
                  Create your profile or go explore students and save your interested profiles
                </p>
                <button className="go-explore-btn" onClick={handleGoExplore}>
                  Go explore
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Profiles Grid */
          <div className="saved-profiles-grid">
            {allProfiles.map((profile) => (
              <SavedProfileCard
                key={profile.id}
                profile={profile}
                isOwnProfile={profile.isOwnProfile}
                onUnlike={handleUnlikeProfile}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedProfiles;

