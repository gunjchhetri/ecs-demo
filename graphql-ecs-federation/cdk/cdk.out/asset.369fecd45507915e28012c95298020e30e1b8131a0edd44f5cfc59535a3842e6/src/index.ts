import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers as authorResolver} from './resolvers/author-resolver';
// import { readFileSync } from 'fs';
// import gql from 'graphql-tag';
import authorTypeDefs from './typedefs/authors';
  async function startApolloServer() {
    // const typeDefs =gql(readFileSync(require.resolve('./typedefs/schema.graphql')).toString('utf-8'));
    const schema = buildSubgraphSchema([
      {
        typeDefs: authorTypeDefs,
        resolvers: authorResolver
      }
    ])
    const server = new ApolloServer({schema});
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
      listen: { port: 3000 },
    });
    console.log(`
      🚀  Server is running!
      📭  Query at ${url}
    `);
  }
  startApolloServer();