import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers as bookResolvers } from './resolvers/book-resolver';
// import { readFileSync } from 'fs';
//import gql from 'graphql-tag';
import bookTypeDefs from './typedefs/books';
const port = (8080) as number;
async function startApolloServer() {
  // const typeDefs =gql(readFileSync(require.resolve('../schema.graphql')).toString('utf-8'));
  const schema = buildSubgraphSchema([
    {
      typeDefs: bookTypeDefs,
      resolvers: bookResolvers
    }
  ])
  const server = new ApolloServer({schema});
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port },
  });
  console.log(`
    🚀  Server at ${url}
  `);
}
startApolloServer();