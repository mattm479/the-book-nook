import React, { createContext, useState, useContext } from 'react';
import { Theme } from '@radix-ui/themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Theme>
        <div className={theme}>{children}</div>
      </Theme> {/* Apply theme class */}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
