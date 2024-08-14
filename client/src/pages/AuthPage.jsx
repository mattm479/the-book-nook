
import React, { useState } from 'react';
import { Box, Button, Input, Label, Flex, Heading, Text } from '@radix-ui/themes';
import '../styles/AuthPage.css';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., call API)
    console.log(formData);
  };

  return (
    <Box className="auth-page">
      <Flex direction="column" align="center" className="auth-container">
        <Heading size="4">{isSignup ? 'Sign Up' : 'Login'}</Heading>
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup && (
            <Box className="form-group">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Box>
          )}
          <Box className="form-group">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Box>
          <Box className="form-group">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Box>
          <Button type="submit" className="submit-button">
            {isSignup ? 'Sign Up' : 'Login'}
          </Button>
        </form>
        <Text className="toggle-text">
          {isSignup ? 'Already have an account?' : 'No account?'}
          <Button onClick={() => setIsSignup(!isSignup)} className="toggle-button">
            {isSignup ? 'Login' : 'Sign Up'}
          </Button>
        </Text>
      </Flex>
    </Box>
  );
};

export default AuthPage;
