// Step 1: Define GraphQL Schema Types
// This file defines the GraphQL schema using SDL (Schema Definition Language)
// It describes the shape of our data and available operations

export const typeDefs = `#graphql
    # Schema Definitions
    # Author type: Represents a book author and their relationship with books
    type Author {
        id: ID!          # Unique identifier, required field (!)
        name: String!    # Author's name, required field
        books: [Book]    # One-to-many relationship: One author can have multiple books
    }

    # Book type: Represents a book and its relationship with an author
    type Book {
        id: ID!              # Unique identifier, required field
        title: String!       # Book title, required field
        publishedYear: Int   # Optional field (no !)
        author: Author       # Many-to-one relationship: Each book has one author
    }

    # Query type: Defines available read operations in our API
    type Query {
        authors: [Author]    # Returns an array of all authors
        books: [Book]        # Returns an array of all books
    }
    
    # Mutation type: Defines available write operations in our API
    type Mutation {
        # Operation to add a new book
        # Arguments: authorId and title are required, publishedYear is optional
        addBook(authorId: ID!, title: String!, publishedYear: Int): Book!
    }
`;
