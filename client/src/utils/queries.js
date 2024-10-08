import { gql } from '@apollo/client';

export const ME = gql`
    query me($_id: ID!) {
        me(_id: $_id) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                authors
                description
                image
                inventory
                price
            }
            cart {
                bookId
                title
                quantity
                price
            }
        }
    }
`;

export const BOOK_SEARCH = gql`
    query bookSearch($query: String!) {
        bookSearch(query: $query) {
            bookId
            title
            authors
            description
            image
            price
            inventory
        }
    }
`;

export const GET_BOOKS = gql`
    query getBooks {
        books {
            bookId
            title
            authors
            description
            image
            quantity
            price
        }
    }    
`;

export const GET_SINGLE_BOOK = gql`
    query getSingleBook($bookId: String!) {
        book(bookId: $bookId) {
            bookId
            title
            authors
            description
            image
            quantity
            price
            genre
            pageCount
            averageRating
            ratingsCount
        }
    }
`;

export const QUERY_CHECKOUT = gql`
    query getCheckout($books: [CartItemInput]!) {
        getCheckout(books: $books) {
            session
        }
    }
`;

