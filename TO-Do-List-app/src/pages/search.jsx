import React, { useState } from 'react';
import './Search.css';

const SearchPrompt = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const navigationShortcuts = [
    { name: 'Go to home', shortcut: 'G then H' },
    { name: 'Go to Inbox', shortcut: 'G then I' },
    { name: 'Go to Today', shortcut: 'G then T' },
    { name: 'Go to Upcoming', shortcut: 'G then U' },
    { name: 'Go to Filters & Labels', shortcut: 'G then V' }
  ];

  return (
    <div className="search-prompt-container">
      <div className={`search-input-container ${isFocused ? 'focused' : ''}`}>
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#B2BEC3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 21L16.65 16.65" stroke="#B2BEC3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search or type a command..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      <div className="recent-section">
        <div className="section-title">Recently viewed</div>
        <div className="quick-links">
          <button className="quick-link">Inbox</button>
          <button className="quick-link">Upcoming</button>
          <button className="quick-link">Today</button>
        </div>
      </div>

      <div className="shortcuts-section">
        <div className="section-title">Navigation</div>
        <div className="shortcuts-list">
          {navigationShortcuts.map((item, index) => (
            <div key={index} className="shortcut-item">
              <span className="shortcut-name">{item.name}</span>
              <span className="shortcut-keys">{item.shortcut}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPrompt;