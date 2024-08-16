import React from 'react';
import './style.css';

function Footer() {
  return (
    <footer className="footer footer-absolute">
      <div className="footer-content">
        <div className="footer-left">
          <p>&copy; 2024 The Book Nook. All rights reserved.</p>
          <p><a href="https://www.flaticon.com/free-icons/book" title="book icons">Book icons created by Smashicons - Flaticon</a></p>
        </div>
        <div className="footer-right">
          <a href="contact" className="footer-link">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

