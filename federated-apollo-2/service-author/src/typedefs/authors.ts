import gql from 'graphql-tag';
const authorTypeDefs =gql`
  type Author {
    id: Int!
    name: String!
    age: Int!
    books: [Book]!
  }

  input AuthorInput {
    name: String!
    age: Int!
  }

  type Query {
    authorById(id: Int!): Author
    allAuthors: [Author]
  }

  type Mutation {
    addAuthor(author: AuthorInput!): Author
  }
  type Book{
    id: Int!
  }
`;

export default authorTypeDefs;
