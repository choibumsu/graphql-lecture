import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import resolvers from "./graphql/resolvers";

const typeDefs = readFileSync("./graphql/schema.graphql", "UTF-8");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service running on ${url}`));
