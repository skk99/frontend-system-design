// Step 3: Server Setup
// This is the main entry point that sets up and starts the GraphQL server

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

// Create new Apollo Server instance
// typeDefs: Schema definition from typeDefs.js
// resolvers: Implementation of the schema from resolvers.js
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server:
// 1. Creates an Express application
// 2. Sets up Apollo Server middleware
// 3. Configures CORS and other HTTP settings
// 4. Opens the server for incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
