import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>{children}</div> {/* Apply theme class */}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
