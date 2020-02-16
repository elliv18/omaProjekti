export default {
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
        }
    }
}