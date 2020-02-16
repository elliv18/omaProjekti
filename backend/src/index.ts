import resolvers from './resolvers'
const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
import * as dotenv from "dotenv";
dotenv.config();

console.log('---ENV -- ', process.env.JWT_SECRET)



const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    },
    context: (req: any) => ({
        ...req,
        prisma: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'http://prisma:3060',
        }),
    }),
})
server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))

/*
schema.grap
createDraft(authorId: ID!, title: String!, content: String!, test: String!): Post
  publish(id: ID!): Post
  deletePost(id: ID!): Post*/