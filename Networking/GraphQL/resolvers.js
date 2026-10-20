// Step 2: Implement Resolvers
// This file contains the implementation of how to fetch/modify the data
// for each field in our GraphQL schema

// Mock database - In production, this would be replaced with real database connections
const data = {
  authors: [
    { id: "1", name: "Chirag Goel", bookIds: ["101", "102"] },
    { id: "2", name: "Akshay Saini", bookIds: ["103"] },
  ],
  books: [
    {
      id: "101",
      title: "Namaste Frontend System Design",
      publishedYear: 2000,
      authorId: "1",
    },
    { id: "102", title: "Book 2", publishedYear: 2010, authorId: "1" },
    { id: "103", title: "Book 3", publishedYear: 2020, authorId: "2" },
  ],
};

export const resolvers = {
  // Field-level resolvers for Book type
  Book: {
    // Resolves the author field for a Book
    // parent: contains the book object being resolved
    author: (parent, args, context, info) => {
      return data.authors.find(
        (authorDetail) => authorDetail.id === parent.authorId
      );
    },
  },

  // Field-level resolvers for Author type
  Author: {
    // Resolves the books field for an Author
    // parent: contains the author object being resolved
    books: (parent, args, context, info) => {
      return data.books.filter((book) => parent.bookIds.includes(book.id));
    },
  },

  // Query resolvers - Handle data fetching
  Query: {
    // Resolver for 'authors' query - Returns all authors
    authors: (parent, args, context, info) => {
      return data.authors;
    },
    // Resolver for 'books' query - Returns all books
    books: (parent, args, context, info) => {
      return data.books;
    },
  },

  // Mutation resolvers - Handle data modifications
  Mutation: {
    // Resolver for 'addBook' mutation
    // args: contains the input parameters (authorId, title, publishedYear)
    addBook: (parent, args, context, info) => {
      const newBook = {
        ...args,
        id: String(data.books.length + 1),
      };
      data.books.push(newBook);
      return newBook;
    },
  },
};
