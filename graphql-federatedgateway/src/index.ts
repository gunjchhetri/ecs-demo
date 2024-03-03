import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers as bookResolvers } from './resolvers/book-resolver';
import { resolvers as authorResolver} from './resolvers/author-resolver';
import bookTypeDefs from './typedefs/books';
import authorTypeDefs from './typedefs/authors';

 
  async function startApolloServer() {
    const schema = buildSubgraphSchema([
      {
        typeDefs: bookTypeDefs,
        resolvers: bookResolvers
      },
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