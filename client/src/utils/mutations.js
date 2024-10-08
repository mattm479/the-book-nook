import { gql } from '@apollo/client';

export const SIGN_UP = gql`
    mutation signUp($username: String!, $email: String!, $password: String!) {
        signUp(username: $username, email: $email, password: $password) {
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
                    inventory
                    price
                }
            }
        }
    }
`;

export const SIGN_IN = gql`
    mutation signIn($username: String!, $password: String!) {
        signIn(username: $username, password: $password) {
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
                    inventory
                    price
                }
            }
        }
    }
`;

export const CHANGE_USERNAME = gql`
    mutation changeUsername($userId: ID!, $username: String!) {
        changeUsername(userId: $userId, username: $username) {
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
                    inventory
                    price
                }
            }
        }
    }
`;

export const CHANGE_EMAIL = gql`
    mutation changeEmail($userId: ID!, $email: String!) {
        changeEmail(userId: $userId, email: $email) {
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
                    inventory
                    price
                }
            }
        }
    }
`;

export const CHANGE_PASSWORD = gql`
    mutation changePassword($userId: ID!, $password: String!) {
        changePassword(userId: $userId, password: $password) {
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
                    inventory
                    price
                }
            }
        }
    }
`;

export const SIGN_OUT = gql`
    mutation signOut($userId: ID!) {
        signOut(userId: $userId)
    }
`;

export const ADD_TO_CART = gql`
    mutation addToCart($userId: ID!, $bookId: String!, $title: String!, $price: Int!, $quantity: Int!) {
        addToCart(userId: $userId, bookId: $bookId, title: $title, price: $price, quantity: $quantity) {
            bookId
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($userId: ID!, $bookISBN: String!) {
        saveBook(userId: $userId, bookISBN: $bookISBN)
    }
`;

export const UPDATE_CART = gql`
    mutation updateCart($userId: ID!, $cart: [CartItemInput]!) {
        updateCart(userId: $userId, cart: $cart) {
            bookId
            title
            quantity
            price
        }
    }    
`;

export const ORDER_HISTORY = gql`
    mutation orderHistory($userId: ID!) {
        orderHistory(userId: $userId) {
            orderId {
                title
                price
            }
        }
    }
`;

export const SEND_EMAIL = gql`
    mutation sendEmail($username: String, $email: String!, $message: String!) {
        sendEmail(username: $username, email: $email, message: $message)
    }
`;