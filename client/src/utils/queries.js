import { gql } from '@apollo/client';

export const ME = gql`
    query me($_id: ID!) {
        me(_id: $_id) {
            token
            user {
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
                    quantity
                    price
                }
            }
        }
    }
`;

export const BOOK_SEARCH = gql`
    query bookSearch($query: String!) {
        books(query: $query) {
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

