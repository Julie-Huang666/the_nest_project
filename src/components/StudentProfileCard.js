import React, { useState } from 'react';
import './StudentProfileCard.css';

const StudentProfileCard = ({ student }) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    // Check if profile is already saved
    const saved = localStorage.getItem('savedProfiles');
    if (saved) {
      const savedProfiles = JSON.parse(saved);
      return savedProfiles.some(p => p.id === student.id);
    }
    return false;
  });
  const [emailCopied, setEmailCopied] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    // Save or remove from localStorage
    const saved = localStorage.getItem('savedProfiles');
    let savedProfiles = saved ? JSON.parse(saved) : [];

    if (newFavoriteState) {
      // Add to saved profiles if not already there
      if (!savedProfiles.some(p => p.id === student.id)) {
        savedProfiles.push(student);
        localStorage.setItem('savedProfiles', JSON.stringify(savedProfiles));
      }
    } else {
      // Remove from saved profiles
      savedProfiles = savedProfiles.filter(p => p.id !== student.id);
      localStorage.setItem('savedProfiles', JSON.stringify(savedProfiles));
    }
  };

  const handleGetInTouch = async (e) => {
    e.stopPropagation();
    
    if (student.email) {
      try {
        await navigator.clipboard.writeText(student.email);
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

  return (
    <div className="student-card">
      {/* Notification Toast */}
      {showNotification && (
        <div className="email-notification">
          <div className="notification-content">
            <strong>Email Copied!</strong>
            <span>Copied {student.email} to clipboard.</span>
          </div>
        </div>
      )}
      
      {student.roommateTag && (
        <div className="card-header">
          <span className="roommate-tag">{student.roommateTag}</span>
        </div>
      )}
      
      <div className="card-content">
        <img 
          src={student.image} 
          alt={student.name} 
          className="student-photo"
        />
        
        <div className="student-info">
          <div className="name-major-row">
            <h3 className="student-name">{student.name}</h3>
            <div className="year-heart-wrapper">
              <button 
                className={`heart-button ${isFavorite ? 'favorited' : ''}`}
                onClick={handleHeartClick}
                aria-label="Add to favorites"
              >
                {isFavorite ? (
                  <svg width="24" height="24" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#591671" d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868c-3.308 0-6.227 1.633-8.018 4.129c-1.791-2.496-4.71-4.129-8.017-4.129c-5.45 0-9.868 4.417-9.868 9.868c0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959c.17-.721.268-1.469.268-2.242z"></path>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#000" strokeWidth="1.5" fill="none"/>
                  </svg>
                )}
              </button>
              <span className="student-year">{student.year}</span>
            </div>
          </div>
          
          <p className="student-major">{student.major}</p>
          
          <p className="student-description">{student.description}</p>
          
          <div className="interests-container">
            {student.interests.map((interest, index) => (
              <span key={index} className="interest-tag">
                {interest}
              </span>
            ))}
          </div>
          
          <button 
            className={`get-in-touch-btn ${emailCopied ? 'copied' : ''}`}
            onClick={handleGetInTouch}
          >
            {emailCopied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {student.email}
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
        </div>
      </div>
    </div>
  );
};

export default StudentProfileCard;

