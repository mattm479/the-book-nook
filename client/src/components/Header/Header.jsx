import React from 'react';
import './style.css';

function Header() {
  return (
    <header className="header">
    <div className="header-logo">The Book Nook</div>
    <div className="header-search">
        <input
          type="text"
          placeholder="Search for books..."
          className="search-input"
        />
        <button className="search-button">
          Search
        </button>
      </div>
  </header>
  );
}

export default Header;
