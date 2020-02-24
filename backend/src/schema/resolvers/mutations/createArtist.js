import { prisma } from "../../../generated/prisma-client";
import { USE_AUTH } from "../../../environments";
import { mustBeLoggedIn } from "../../../helpers/auth";


export default {
    Mutation: {
        createArtist: async (_, { input: { firstName, lastName } }, { currentUser }) => {
            if (USE_AUTH == 'true') {
                mustBeLoggedIn(currentUser)
            }

            const artist = await prisma.createArtist({
                firstName: firstName,
                lastName: lastName
            })

            return { artist }
        }
    }
}