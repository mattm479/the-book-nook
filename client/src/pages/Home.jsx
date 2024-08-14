import { Box, Heading, Text, Flex, Link } from '@radix-ui/themes';
import '../styles/App.css';

function Home() {
  return (
    <Box className="homepage">
      <Box className="homepage-header">
        <Heading size="4" className="homepage-header-title">Welcome to The Book Nook</Heading>
        <Text size="2" className="homepage-header-subtitle">Your one-stop shop for all your favorite books.</Text>
      </Box>
      <Box className="homepage-featured">
        <Heading size="3">Featured Books</Heading>
        <Flex className="book-grid" gap="4" wrap="wrap" justify="center">
          <Box className="book-card">
            <img src="/path/to/book1.jpg" alt="Featured Book 1" />
            <Heading size="4">Book Title 1</Heading>
            <Text>Author Name</Text>
          </Box>
          <Box className="book-card">
            <img src="/path/to/book2.jpg" alt="Featured Book 2" />
            <Heading size="4">Book Title 2</Heading>
            <Text>Author Name</Text>
          </Box>
          {/* Add more book cards as needed */}
        </Flex>
      </Box>
      <Box className="homepage-categories">
        <Heading size="3">Book Categories</Heading>
        <ul>
          <li><Link href="#fiction">Fiction</Link></li>
          <li><Link href="#non-fiction">Non-Fiction</Link></li>
          <li><Link href="#science">Science</Link></li>
          <li><Link href="#history">History</Link></li>
          {/* Add more categories as needed */}
        </ul>
      </Box>
      <Box className="homepage-promotions">
        <Heading size="3">Special Promotions</Heading>
        <Text>Check out our latest promotions and discounts!</Text>
        {/* Add promotional content or links */}
      </Box>
    </Box>
  );
}

export default Home;
