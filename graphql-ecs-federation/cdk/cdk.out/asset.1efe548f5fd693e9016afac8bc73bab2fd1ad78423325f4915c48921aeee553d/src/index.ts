import { ApolloServer } from '@apollo/server';
import { ApolloGateway } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
  async function startApolloServer() {
     
    const supergraphSdl = readFileSync(require.resolve('./schema.graphql'),{encoding:"utf-16le"}).toString();

    const gateway = new ApolloGateway({
      supergraphSdl,
      serviceList:[{name: "books", url: "http://localhost:8000"}]
    }); 
   const server = new ApolloServer({ gateway });
       const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
      listen: { port: 80 },
    });
    console.log(`
      🚀  Server is running!
      📭  Query at ${url}
    `);
  }
  startApolloServer();