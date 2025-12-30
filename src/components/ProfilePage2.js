import React from 'react';
import './ProfilePage2.css';

const ProfilePage2 = () => {
  return (
    <div className="profile-page-2">
      {/* Background Image */}
      <div className="background-image-container">
        <img 
          src="/profile_pics/create_profile_page/backg.png" 
          alt="Background" 
          className="background-image"
        />
      </div>
      
      {/* Content goes here */}
      <div className="content-overlay">
        {/* Add your content here */}
      </div>
    </div>
  );
};

export default ProfilePage2;

