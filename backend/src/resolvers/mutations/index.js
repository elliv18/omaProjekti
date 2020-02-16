import signup from './createUser'
import createArtist from './createArtist'

export {
    signup,
    createArtist,
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
}