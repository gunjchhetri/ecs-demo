import gql from 'graphql-tag';
const bookTypeDefs =gql`
directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION
enum Role {
    ADMIN
    REVIEWER
    USER
  }  
type Book @auth(requires: USER) {
    id: Int!
    title: String!
    publication: String!
    description: String!
    author: Author!
  }
  input BookInput {
    title: String!
    publication: String!
    description: String!
    authorId: Int!
  }

  type Query {
    bookById(id: Int!): Book
    booksByAuthor(authorId: Int!): [Book]
    allBooks: [Book] @auth(requires: USER)
  }

   type Mutation {
    addBook(book: BookInput!): Book
    deleteBook(id: Int!): Boolean
  }
`;

export default bookTypeDefs;
