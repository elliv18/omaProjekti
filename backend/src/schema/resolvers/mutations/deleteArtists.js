import { prisma } from "../../../generated/prisma-client";


export default {
    Mutation: {
        deleteArtists: async (obj, { input: { ids } }, { currentUser }) => {
            //   mustBeLoggedIn(currentUser);
            //    mustBeAtleastLevel(currentUser, UserLevels.ADMIN);
            let deleted = []
            for (var i = 0; i < ids.length; i++) {
                deleted.push(await prisma.deleteArtist({ id: ids[i] }))
            }

            console.log('** artists **', deleted)
            return { deleted }
        }
    }
}