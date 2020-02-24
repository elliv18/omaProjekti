import { resolvers, typeDefs } from "./schema";
import { JWT_SECRET, DEVELOPMENT } from "./environments";
const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import createRootAdmin from "./helpers/createRootAdmin";
import generateData from "./helpers/generateData";
dotenv.config();
var faker = require("faker");

createRootAdmin();

generateData(100);

//console.log('---ENV -- ', process.env.JWT_SECRET)
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: async (ctx: any) => {
    const auth = ctx.request.get("Authorization");
    let currentUser = null;
    if (auth != null) {
      try {
        currentUser = await jwt.verify(auth.replace("Bearer ", ""), JWT_SECRET);
      } catch (e) { }
    }
    // console.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));

    return { currentUser };
  }
});

const options = {
  port: 4000,
  cors: {
    creditials: false,
    origin: "*"
  },
  endpoint: "/graphql"
};
server.start(() =>
  console.log(`GraphQL server is running on http://localhost:4000`)
);

/*
schema.grap
createDraft(authorId: ID!, title: String!, content: String!, test: String!): Post
  publish(id: ID!): Post
  deletePost(id: ID!): Post*/

/*
 async (req: any) => (
      console.log('jhdoifbipbfpsfbpf', ...req),
      {
          ...req,
          prisma: new Prisma({
              typeDefs: 'src/generated/prisma.graphql',
              endpoint: 'http://prisma:3060',
          }),
      }),*/
