// might need to change import to 
import {gql} from "@apollo/client";

export const LOGIN_USER = gql `
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                username
                _id
            }
        }
    }

`;

export const ADD_USER = gql `
    mutation addUser($email: String!, $password: String!, $username: String!) {
        addUser(email: $email, password: $password, username: $username) {
            token 
            user {
                username
                _id
            }
        }
    }
`;
export const SAVE_BOOK = gql `
    mutation saveBook($book: SavedBookInput!) {
        saveBook(book: $book) {
            username
            email
            bookCount
            savedBooks{
                bookId
                authors
                description
                title
                link
                image
            }
        }
    }

`;
export const REMOVE_BOOK = gql `
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            username
            email
            bookCount
            savedBooks{
                bookId
                authors
                description
                title
                link
                image
            }
        }
    }

`;