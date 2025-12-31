import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentProfileCard.css';

const SavedProfileCard = ({ profile, isOwnProfile = false, onUnlike }) => {
  const navigate = useNavigate();
  const [emailCopied, setEmailCopied] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleGetInTouch = async (e) => {
    e.stopPropagation();
    
    if (profile.email) {
      try {
        await navigator.clipboard.writeText(profile.email);
        setEmailCopied(true);
        setShowNotification(true);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    }
  };

  const handleEditProfile = (e) => {
    e.stopPropagation();
    navigate('/my-profile');
  };

  const handleUnlikeClick = (e) => {
    e.stopPropagation();
    if (onUnlike) {
      onUnlike(profile.id, e);
    }
  };

  return (
    <div className="student-card">
      {/* Notification Toast */}
      {showNotification && (
        <div className="email-notification">
          <div className="notification-content">
            <strong>Email Copied!</strong>
            <span>Copied {profile.email} to clipboard.</span>
          </div>
        </div>
      )}
      
      {/* My Profile Tag */}
      {isOwnProfile && (
        <div className="card-header">
          <span className="roommate-tag" style={{ background: '#591671' }}>My profile</span>
        </div>
      )}
      
      {/* Roommate Tag */}
      {profile.roommateTag && !isOwnProfile && (
        <div className="card-header">
          <span className="roommate-tag">{profile.roommateTag}</span>
        </div>
      )}
      
      <div className="card-content">
        <img 
          src={profile.image || '/profile_pics/create_profile_page/backg.png'} 
          alt={profile.name} 
          className="student-photo"
        />
        
        <div className="student-info">
          <div className="name-major-row">
            <h3 className="student-name">{profile.name}</h3>
            <div className="year-heart-wrapper">
              {/* Heart Icon - Only for non-own profiles */}
              {!isOwnProfile && (
                <button 
                  className="heart-button favorited"
                  onClick={handleUnlikeClick}
                  aria-label="Remove from saved profiles"
                >
                  <svg width="24" height="24" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#591671" d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868c-3.308 0-6.227 1.633-8.018 4.129c-1.791-2.496-4.71-4.129-8.017-4.129c-5.45 0-9.868 4.417-9.868 9.868c0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959c.17-.721.268-1.469.268-2.242z"></path>
                  </svg>
                </button>
              )}
              
              {/* Heart Icon for own profile (non-clickable) */}
              {isOwnProfile && (
                <div className="heart-button favorited" style={{ pointerEvents: 'none' }}>
                  <svg width="24" height="24" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#591671" d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868c-3.308 0-6.227 1.633-8.018 4.129c-1.791-2.496-4.71-4.129-8.017-4.129c-5.45 0-9.868 4.417-9.868 9.868c0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959c.17-.721.268-1.469.268-2.242z"></path>
                  </svg>
                </div>
              )}
              
              <span className="student-year">{profile.year}</span>
            </div>
          </div>
          
          <p className="student-major">{profile.major}</p>
          
          <p className="student-description">{profile.description || profile.bio}</p>
          
          <div className="interests-container">
            {profile.interests && (Array.isArray(profile.interests) 
              ? profile.interests 
              : profile.interests.split(',').map(i => i.trim())
            ).map((interest, index) => (
              <span key={index} className="interest-tag">
                {interest}
              </span>
            ))}
          </div>
          
          {isOwnProfile ? (
            <button 
              className={`get-in-touch-btn ${emailCopied ? 'copied' : ''}`}
              onClick={handleEditProfile}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Edit profile
            </button>
          ) : (
            <button 
              className={`get-in-touch-btn ${emailCopied ? 'copied' : ''}`}
              onClick={handleGetInTouch}
            >
              {emailCopied ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {profile.email}
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                  Get in touch
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedProfileCard;

