import gql from 'graphql-tag';
const bookTypeDefs =gql`
type Book @key(fields: "id") {
    id: Int!
    title: String!
    publication: String!
    description: String!
    author: Author @provides(fields: "name")
  }
  input BookInput {
    title: String!
    publication: String!
    description: String!
    authorId: Int!
  }
  extend type Author @key(fields: "id"){
    id: Int!
    name: String! @external
    books: [Book]
  }
  type Query {
    bookById(id: Int!): Book
    booksByAuthor(authorId: Int!): [Book]
    allBooks: [Book] 
  }

   type Mutation {
    addBook(book: BookInput!): Book
    deleteBook(id: Int!): Boolean
  }
`;

export default bookTypeDefs;
