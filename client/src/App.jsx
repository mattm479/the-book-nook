import React from 'react';
import '@radix-ui/themes/styles.css'; // Import Radix UI theme styles
import { Flex, Text, Button, Theme } from '@radix-ui/themes';
import ThemePanel from './theme/ThemePanel'; // Import ThemePanel component
import { ThemeProvider } from './theme/ThemeContext'; // Import ThemeProvider

function App() {
  return (
    <ThemeProvider>
      <Flex direction="column" gap="2">
    
        <Theme>
        <Text>Hello from Radix Themes :)</Text>
        <Button size="3">Let's go</Button>
        </Theme>
      </Flex>
    </ThemeProvider>
  );
}

export default App;

