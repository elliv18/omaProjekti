import signUp from './signUp'
import login from './login'
import createArtist from './createArtist'
import createVinyl from './createVinyl'
import createCategory from './createCategory'

export {
    signUp,
    login,
    createArtist,
    createVinyl,
    createCategory
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