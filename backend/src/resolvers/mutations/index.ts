export const resolvers = {
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