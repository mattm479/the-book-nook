import React from 'react';
import bookIcon from '../../assets/book.png';
import './style.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
      <div className="navbar-logo">
          <img src={bookIcon} alt="Book Nook" className="navbar-logo-icon" />
        </div>
        <div className="navbar-nav">
          <a href="#home" className="navbar-nav-link">Home</a>
          <a href="#contact" className="navbar-nav-link">Contact</a>
          <a href="#login" className="navbar-nav-link">Login/Signup</a>
          <a href="#cart" className="navbar-nav-link">Cart</a>
        </div>
      </div>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search for books..."
          className="search-input"
        />
        <button className="search-button">
          Search
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
