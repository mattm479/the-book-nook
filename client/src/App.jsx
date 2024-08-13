import React from 'react';
import '@radix-ui/themes/styles.css'; // Import Radix UI theme styles
import { Flex, Theme } from '@radix-ui/themes';
import { ThemeProvider } from './theme/ThemeContext'; // Import ThemeProvider
import Header from "./components/Header/Header.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <div>
    <ThemeProvider>
      <Flex direction="column" gap="2">
        <Theme>
          <Navbar />
      <Header />
      <Footer />
      </Theme>
      </Flex>
    </ThemeProvider>
    </div>
  );
}

export default App;