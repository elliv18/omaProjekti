import { prisma } from "../../../generated/prisma-client";
import { USE_AUTH } from "../../../environments";
import { mustBeLoggedIn } from "../../../helpers/auth";


export default {
    Mutation: {
        createArtist: async (_, { input: { name } }, { currentUser }) => {
            if (USE_AUTH == 'true') {
                mustBeLoggedIn(currentUser)
            }

            const artist = await prisma.createArtist({
                name: name,
            })

            return { artist }
        }
    }
}