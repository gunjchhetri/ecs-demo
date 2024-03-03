import gql from 'graphql-tag';
const bookTypeDefs =gql`
type Book @key(fields: "id") {
    id: Int!
    title: String!
    publication: String!
    description: String!
    author: Author
  }
  input BookInput {
    title: String!
    publication: String!
    description: String!
    authorId: Int!
  }
  extend type Author @key(fields: "id"){
    id: Int! @external
    books:[Book]
  }
  extend type Query {
    bookById(id: Int!): Book
    booksByAuthor(authorId: Int!): [Book]
    allBooks: [Book] 
  }

  extend type Mutation {
    addBook(book: BookInput!): Book
    deleteBook(id: Int!): Boolean
  }
  
`;

export default bookTypeDefs;
