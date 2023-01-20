const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        bookId: ID
        authors: [String]
        description: String!
        title: String!
        image: String!
        link: String!
    }
    type Query {
        me: User
    }
    type Auth {
        token: ID!
        user: User
    }
    input SavedBookInput{
        authors: [String!]
        description: String!
        title: String!
        image: String!
        link: String!
        bookId: String!
    }
   
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, password: String!, email: String!): Auth
        removeBook(bookId: String!): User
        saveBook(book: SavedBookInput): User
    }
    `;

    module.exports = typeDefs;