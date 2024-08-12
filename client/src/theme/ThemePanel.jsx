import React from 'react';
import { useTheme } from './ThemeContext'; // Import the custom hook

const ThemePanel = () => {
  const { theme, setTheme } = useTheme(); // Use the custom hook

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div style={{ position: 'fixed', bottom: 0, right: 0, padding: '10px', backgroundColor: '#fff', border: '1px solid #ccc' }}>
      <h3>Theme Panel</h3>
      <label>
        Select Theme:
        <select value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          {/* Add more theme options as needed */}
        </select>
      </label>
    </div>
  );
};

export default ThemePanel;


