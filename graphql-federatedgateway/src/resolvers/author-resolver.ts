import {
     
    getBooksByAuthor,
    getAuthorById,
    getAllAuthors,
    addAuthor,
  } from '../db';
  
  export const resolvers = {
    Query: {
      authorById: (_, args: {id: number}, context: any, info: any) => {
        
        return getAuthorById(args.id);
      },
      allAuthors: (_,args: any, context: any, info: any) => {
        return getAllAuthors();
      },
    },
  
    Mutation: { 
      addAuthor: (_,{ author }: any, context: any, info: any) => {
        // Create a new author and add it to the data
        const newAuthor = {
          ...author,
          id: getAllAuthors().length + 1, // Generate a new ID
        };
        addAuthor(newAuthor);
        return newAuthor;
      },
    }, 
    Author: {
      books: (parent: { id: number; }, context: any) => {
        
        // Resolve the books field of an author
        return getBooksByAuthor(parent.id);
      },
    },
  };
  