import createArtist from './createArtist'
import signUp from './signUp'
import login from './login'

export {
    createArtist,
    signUp,
    login
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