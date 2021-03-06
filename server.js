import { GraphQLServer } from "graphql-yoga";
import { typeDefs } from "./src/typeDefs/schema";
import Query from "./src/Resolvers/Query";
import Mutation from "./src/Resolvers/Mutation";
import getUserId from "./src/auth/auth";
const User = require("./src/Model/User");

const dbConnection = require("./src/auth/db");

dbConnection();

const server = new GraphQLServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  context: ({ request }) => {
    return {
      User,
      request,
      userId:
        request && request.headers.authorization ? getUserId(request) : null,
    };
  },
});

server.start(
  {
    port: process.env.PORT || 4000,
  },
  () => console.log("Server is running")
);
