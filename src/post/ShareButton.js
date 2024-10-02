import React, { useState, useEffect } from 'react';
import './ShareButton.css'

function ShareButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (e) => {
    if (e.target.closest('.share-button-container') === null) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('click', closeMenu);
    } else {
      document.removeEventListener('click', closeMenu);
    }
    return () => document.removeEventListener('click', closeMenu);
  }, [isMenuOpen]);

  return (
    <div className="share-button-container">
      <i className="bi bi-share action-button" onClick={toggleMenu}></i>
      {isMenuOpen && (
        <div className="share-menu">
          <ul>
            <li><i className="bi bi-facebook"></i>Facebook</li>
            <li><i className="bi bi-twitter"></i> Twitter</li>
            <li><i className="bi bi-envelope"></i> Email</li>
            <li><i className="bi bi-link"></i>Link</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ShareButton;
