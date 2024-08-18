import { useLazyQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { BOOK_SEARCH } from '../utils/queries';
import { useSearchParams } from 'react-router-dom'
import BookCard from "../components/BookCard/BookCard.jsx";

const BookSearch = () => {
   const [searchBooks, { loading, data}] = useLazyQuery(BOOK_SEARCH);
   const [searchParams]  = useSearchParams()
   const searchTerm = searchParams.get('q')
   let books = []

   useEffect (() => {
      if(searchTerm){
         searchBooks({variables: {query: searchTerm} });
      }

   },[searchTerm]);

   if(data){
      books = data.bookSearch
   }

   return (
      <div className="book-search-results">
         <span style={{ textAlign: "center" }}><h1>Search Results</h1></span>
         {books.length > 0 ? (
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
      </div>
   );
};

export default BookSearch;