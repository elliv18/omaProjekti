export default {
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
        getUserById: (_, args, context, info) => {
            return context.prisma.query.user(
                {
                    where: {
                        id: args.id,
                    },
                },
                info,
            )
        },
    }
}