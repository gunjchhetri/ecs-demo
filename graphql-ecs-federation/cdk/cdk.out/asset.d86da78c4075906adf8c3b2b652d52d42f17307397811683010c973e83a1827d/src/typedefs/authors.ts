import gql from 'graphql-tag';
const authorTypeDefs =gql`
  type Author @key(fields: "id")  {
    id: Int!
    name: String!
    age: Int!
    # books: [Book]!
  }
  input AuthorInput {
    name: String!
    age: Int!
  }

  extend type Query {
    authorById(id: Int!): Author
    allAuthors: [Author]
  }

  extend type Mutation {
    addAuthor(author: AuthorInput!): Author
  }
  
`;

export default authorTypeDefs;
