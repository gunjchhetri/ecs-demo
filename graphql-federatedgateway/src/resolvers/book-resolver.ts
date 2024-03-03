import {
    getBookById,
    getAllBooks,
    getBooksByAuthor,
    addBook,
    deleteBook,
    getAuthorById,
  } from '../db';
  
  export const resolvers = {
    Query: {
      bookById: (parent: any, { id }: any, context: any, info: any) => {
        return getBookById(id);
      },
      booksByAuthor: (parent: any, { authorId }: any, context: any, info: any) => {
        return getBooksByAuthor(authorId);
      },
      allBooks: (parent: any, args: any, context: any, info: any) => {
        return getAllBooks();
      },
    },
  
    Mutation: {
      addBook: (parent: any, { book }: any, context: any, info: any) => {
        // Create a new book and add it to the data
        const newBook = {
          ...book,
          id: getAllBooks().length + 1, // Generate a new ID
        };
        addBook(newBook);
        return newBook;
      },
      deleteBook: (parent: any, { id }: any, context: any, info: any) => {
        // Delete a book by ID and return true if successful
        const bookToDelete = getBookById(id);
        if (bookToDelete) {
          deleteBook(id);
          return true;
        }
        return false;
      },
    },
  
    Book: {
      author: (book: { author: { id: number; }; }, args: any, context: any, info: any) => {
        // Resolve the author field of a book
        return getAuthorById(book.author.id);
      },
    },
  };
  