const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
    Query: {
        /*     posts: (_, args, context, info) => {
                 return context.prisma.query.posts(
                     {
                         where: {
                             OR: [
                                 { title_contains: args.searchString },
                                 { content_contains: args.searchString },
                             ],
                         },
                     },
                     info,
                 )
             },*/
        user: (_, args, context, info) => {
            return context.prisma.query.user(
                {
                    where: {
                        id: args.id,
                    },
                },
                info,
            )
        },
    },
    Mutation: {
        createArtist: (_, args, context, info) => {
            return context.prisma.mutation.createArtist(
                {
                    data: {
                        name: args.name,
                        /* author: {
                             connect: {
                                 id: args.authorId,
                             },
                         },*/
                    },
                },
                info,
            )
        },
        signup: (_, args, context, info) => {
            return context.prisma.mutation.createUser(
                {
                    data: {
                        name: args.name,
                    },
                },
                info,
            )
        },
        /*  publish: (_, args, context, info) => {
              return context.prisma.mutation.updatePost(
                  {
                      where: {
                          id: args.id,
                      },
                      data: {
                          published: true,
                      },
                  },
                  info,
              )
          },
          deletePost: (_, args, context, info) => {
              return context.prisma.mutation.deletePost(
                  {
                      where: {
                          id: args.id,
                      },
                  },
                  info,
              )
          },
          */
    },
}


const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    },
    context: req => ({
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