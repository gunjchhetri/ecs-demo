const typeDefs = `#graphql
    type Book {
    title: String
    author: Person
    }

    type Query {
    books: [Book]
    }
`;