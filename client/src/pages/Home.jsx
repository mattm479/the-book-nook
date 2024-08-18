import { Box, Heading, Text } from '@radix-ui/themes';
import '../styles/App.css';
import {useLazyQuery} from "@apollo/client";
import {BOOK_SEARCH} from "../utils/queries.js";
import {useEffect} from "react";
import BookCard from "../components/BookCard/BookCard.jsx";

function Home() {
  const categories = ["biographies", "computers", "art", "architecture", "mathematics", "medical", "music", "nature", "pets", "poetry", "science"];
  const searchTerm = categories[Math.floor(Math.random() * categories.length)];
  const [searchBooks, { loading, data }] = useLazyQuery(BOOK_SEARCH);
  let books = [];

  useEffect(() => {
      searchBooks({ variables: { query: searchTerm } });
  }, []);

  if (loading) {
      return <div>Loading...</div>;
  }

  if (data && data.bookSearch) {
      books = data.bookSearch;
  }

  return (
    <Box className="homepage">
      <Box className="homepage-header">
        <Heading size="4" className="homepage-header-title">Welcome to The Book Nook</Heading>
        <Text size="2" className="homepage-header-subtitle">Your one-stop shop for all your favorite books.</Text>
      </Box>
      { books.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginLeft: "25px" }}>
            {books.map((book) => (
                <div key={book.bookId} style={{ flex: "1 0 25%", marginBottom: "25px" }}>
                  <BookCard bookData={book} />
                </div>
            ))}
          </div>
      ) : (
          <p>No results found.</p>
      )}
    </Box>
  );
}

export default Home;
