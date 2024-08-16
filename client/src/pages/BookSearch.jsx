import { useLazyQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { BOOK_SEARCH } from '../utils/queries';
import { useSearchParams } from 'react-router-dom'

const BookSearch = () => {
   const [searchBooks, { loading, data}] = useLazyQuery(BOOK_SEARCH);
   const [searchParams]  = useSearchParams()
   const searchTerm = searchParams.get('q')
   let books = []
   
   if(data){
      books = data.bookSearch
   }

   useEffect (() => {
      if(searchTerm){
         searchBooks({variables: {query: searchTerm} });
      }

   },[searchTerm]);


   return (
      <div className="book-search-results">
         <h1>Search Results</h1>
         {books.length > 0 ? (
            <ul>
               {books.map((book) => (
                  <li key={book.bookId}>
                     <img src={book.image} alt={book.title} />
                     <h3>{book.title}</h3>
                     <p>{book.authors.join(', ')}</p>
                     <p>{book.description}</p>
                  </li>
               ))}
            </ul>
         ) : (
            <p>No results found.</p>
         )}
      </div>
   );
};

export default BookSearch;