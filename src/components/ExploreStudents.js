import React, { useState } from 'react';
import Navbar from './Navbar';
import StudentProfileCard from './StudentProfileCard';
import './ExploreStudents.css';

const ExploreStudents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('All schools');
  const [selectedYear, setSelectedYear] = useState('All Years');

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSchool('All schools');
    setSelectedYear('All Years');
  };

  const students = [
    {
      id: 1,
      name: 'Dorothy Paige',
      major: 'Computer science',
      year: 'Junior',
      school: 'McCormick School of Engineering and Applied Science',
      description: 'Love building cool apps and exploring hidden coffee spots around Evanston. Looking for hackathon teammates!',
      interests: ['Coding', 'UI design', 'Coffee'],
      image: '/profile_pics/Dorothy_paige.jpg',
      roommateTag: null,
      email: 'dorothypaige@u.northwestern.edu'
    },
    {
      id: 2,
      name: 'Daniel Taylor',
      major: 'Biology',
      year: 'Sophomore',
      school: 'Weinberg College of Arts and Sciences',
      description: 'Pre-med student who loves hiking and nature photography. Always down for a study session at the library.',
      interests: ['Biology', 'Photography', 'Hiking'],
      image: '/profile_pics/Daniel_Taylor.jpg',
      roommateTag: null,
      email: 'danieltaylor@u.northwestern.edu'
    },
    {
      id: 3,
      name: 'Marcus Johnson',
      major: 'Music Performance',
      year: 'Freshman',
      school: 'Bienen School of Music',
      description: 'Cellist. Music is my life. Searching for chamber music partners and concert buddies.',
      interests: ['Cello', 'Classical music', 'Reading'],
      image: '/profile_pics/Marcus_Johnson.jpg',
      roommateTag: 'Searching Room mate',
      email: 'marcusjohnson@u.northwestern.edu'
    },
    {
      id: 4,
      name: 'Sarah Chen',
      major: 'Political Science',
      year: 'Senior',
      school: 'Weinberg College of Arts and Sciences',
      description: 'Passionate about social justice and policy. Love debating and volunteering in the community.',
      interests: ['Politics', 'Debate', 'Volunteering'],
      image: '/profile_pics/Sarah_Chen.png',
      roommateTag: null,
      email: 'sarahchen@u.northwestern.edu'
    },
    {
      id: 5,
      name: 'James Johnson',
      major: 'Economics',
      year: 'Freshman',
      school: 'Weinberg College of Arts and Sciences',
      description: 'Finance enthusiast with a passion for sustainable investing. Huge fan of intramural basketball.',
      interests: ['Finance', 'Basketball', 'Sustainability'],
      image: '/profile_pics/James_Johnson.png',
      roommateTag: 'Searching Room mate',
      email: 'jamesjohnson@u.northwestern.edu'
    },
    {
      id: 6,
      name: 'Jennifer Alsop',
      major: 'Communication Studies',
      year: 'Sophomore',
      school: 'School of Communication',
      description: 'Future PR pro. Love organizing events and meeting new people. Let\'s connect!',
      interests: ['Social media', 'PR', 'Baseball'],
      image: '/profile_pics/Jennifer_Alsop.jpg',
      roommateTag: null,
      email: 'jenniferalsop@u.northwestern.edu'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = searchQuery === '' || 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSchool = selectedSchool === 'All schools' || student.school === selectedSchool;
    const matchesYear = selectedYear === 'All Years' || student.year === selectedYear;
    
    return matchesSearch && matchesSchool && matchesYear;
  });

  return (
    <div className="explore-students-page">
      {/* Top Bar with Logo and Navbar */}
      <Navbar activePage="explore" />

      {/* Main Content */}
      <div className="explore-content">
        <h1 className="explore-heading">Explore students</h1>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-bar-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, major, year, interest"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-dropdowns">
            <select 
              className="filter-dropdown"
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
            >
              <option>All schools</option>
              <option>Weinberg College of Arts and Sciences</option>
              <option>McCormick School of Engineering and Applied Science</option>
              <option>School of Communication</option>
              <option>School of Education and Social Policy (SESP)</option>
              <option>Medill School of Journalism, Media, Integrated Marketing Communications</option>
              <option>Bienen School of Music</option>
              <option>School of Professional Studies</option>
              <option>Kellogg School of Management</option>
              <option>Pritzker School of Law</option>
              <option>Feinberg School of Medicine</option>
            </select>

            <select 
              className="filter-dropdown"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option>All Years</option>
              <option>Freshman</option>
              <option>Sophomore</option>
              <option>Junior</option>
              <option>Senior</option>
              <option>Graduate</option>
            </select>
          </div>

          <button 
            className="filter-icon-btn" 
            aria-label="Remove all filters"
            onClick={handleResetFilters}
          >
            <img 
              src="/Explore_page/remove filter.png" 
              alt="Remove filters" 
              className="remove-filter-icon"
            />
          </button>
        </div>

        {/* Students Grid */}
        <div className="students-grid">
          {filteredStudents.map(student => (
            <StudentProfileCard key={student.id} student={student} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreStudents;

