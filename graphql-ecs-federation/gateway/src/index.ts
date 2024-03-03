import { ApolloServer } from '@apollo/server';
import { ApolloGateway } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
  async function startApolloServer() {
     
    const supergraphSdl = readFileSync(require.resolve('./schema.graphql')).toString();

    const gateway = new ApolloGateway({
      supergraphSdl, 
    }); 
   const server = new ApolloServer({ gateway });
   const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
      listen: { port: 80 },
    });
    console.log(`
      🚀  Server at ${url}
    `);
  }
  startApolloServer();