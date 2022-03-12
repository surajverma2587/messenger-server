require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { createServer } = require("http");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { authMiddleware } = require("./middleware/auth");

const init = async () => {
  try {
    const PORT = 4000;

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const app = express();
    const httpServer = createServer(app);

    const wsServer = new WebSocketServer({
      server: httpServer,
      path: "/graphql",
    });

    const serverCleanup = useServer({ schema }, wsServer);

    const plugins = [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ];

    const server = new ApolloServer({
      schema,
      plugins,
      context: authMiddleware,
    });

    await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await server.start();

    server.applyMiddleware({ app });

    httpServer.listen(PORT, () => {
      console.log(
        `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
      );
      console.log(
        `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to connect to DB | ${error.message}`);
  }
};

init();
