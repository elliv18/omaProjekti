import { prisma } from "../../generated/prisma-client";
import { USE_AUTH } from "../../environments";
import { mustBeLoggedIn } from "../../helpers/auth";


export default {
    Mutation: {
        createArtist: async (_, args, { currentUser }, info) => {
            if (USE_AUTH == 'true') {
                mustBeLoggedIn(currentUser)
            }
            console.log('createArtist', currentUser)
            return prisma.createArtist(
                {
                    name: args.name,
                    /* author: {
                         connect: {
                             id: args.authorId,
                         },
                     },*/
                },
                info,
            )
        }
    }
}