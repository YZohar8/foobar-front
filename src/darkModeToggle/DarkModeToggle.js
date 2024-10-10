import React, { useState } from 'react';
import './DarkModeToggle.css'

const DarkModeToggle = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);

    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <div>
      {isDarkMode ?
        (<i class="bi bi-brightness-high sun" onClick={toggleDarkMode}></i>)
        :
        (<i class="bi bi-brightness-high-fill sun" onClick={toggleDarkMode}></i>)
        }
    </div>
  );
};

export default DarkModeToggle;