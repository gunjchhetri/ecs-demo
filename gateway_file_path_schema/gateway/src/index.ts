import { ApolloServer } from '@apollo/server';
import { ApolloGateway } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import gql from 'graphql-tag';
  async function startApolloServer() {
     
    const supergraphSdl = readFileSync(require.resolve('./typedefs/schema.graphql')).toString();

    const gateway = new ApolloGateway({
      supergraphSdl
    }); 
   const server = new ApolloServer({ gateway });
       const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
      listen: { port: 5000 },
    });
    console.log(`
      🚀  Server is running!
      📭  Query at ${url}
    `);
  }
  startApolloServer();