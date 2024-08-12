import React from 'react';
import '@radix-ui/themes/styles.css'; // Import Radix UI theme styles
import { Flex, Theme } from '@radix-ui/themes';
import { ThemeProvider } from './theme/ThemeContext'; // Import ThemeProvider
import Header from "./components/Header/Header.jsx";

function App() {
  return (
    <div>
    <ThemeProvider>
      <Flex direction="column" gap="2">
        <Theme>
      <Header />
      </Theme>
      </Flex>
    </ThemeProvider>
    </div>
  );
}

export default App;