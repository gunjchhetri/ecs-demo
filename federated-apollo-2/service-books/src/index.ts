import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers as bookResolvers } from './resolvers/book-resolver';
import { readFileSync } from 'fs';
import gql from 'graphql-tag';
  async function startApolloServer() {
    const typeDefs =gql(readFileSync(require.resolve('./typedefs/schema.graphql')).toString('utf-8'));
    const schema = buildSubgraphSchema([
      {
        typeDefs: typeDefs,
        resolvers: bookResolvers
      }
    ])
    const server = new ApolloServer({schema});
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
      listen: { port: 4000 },
    });
    console.log(`
      🚀  Server is running!
      📭  Query at ${url}
    `);
  }
  startApolloServer();