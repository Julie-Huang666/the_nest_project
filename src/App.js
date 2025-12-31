import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreateProfile from './components/CreateProfile';
import ProfilePage2 from './components/ProfilePage2';
import ExploreStudents from './components/ExploreStudents';
import SavedProfiles from './components/SavedProfiles';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/my-profile" element={<CreateProfile />} />
        <Route path="/profile-page-2" element={<ProfilePage2 />} />
        <Route path="/explore" element={<ExploreStudents />} />
        <Route path="/save-profile" element={<SavedProfiles />} />
      </Routes>
    </Router>
  );
}

export default App;

