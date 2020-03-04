import { resolvers, typeDefs } from "./schema";
import { JWT_SECRET, PRODUCTION, NODE_ENV, BACKEND_PORT } from "./environments";
const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import createRootAdmin from "./helpers/createRootAdmin";
import generateData from "./helpers/generateData";
dotenv.config();
var faker = require("faker");

createRootAdmin();

generateData(1000);

//console.log('---ENV -- ', process.env.JWT_SECRET)
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  /*  resolverValidationOptions: {
      requireResolversForResolveType: false
    },*/
  context: async (ctx: any) => {
    const auth = ctx.request.get("Authorization");
    let currentUser = null;
    if (auth != null) {
      try {
        currentUser = await jwt.verify(auth.replace("Bearer ", ""), JWT_SECRET);
      } catch (e) {}
    }
    // console.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));

    return { currentUser };
  }
});

const options = {
  port: BACKEND_PORT,
  playground: NODE_ENV === PRODUCTION ? null : "/"
};
server.start(options, () =>
  console.log(
    `Grapg server is running on http://localhost:${BACKEND_PORT}`,
    PRODUCTION,
    NODE_ENV
  )
);
