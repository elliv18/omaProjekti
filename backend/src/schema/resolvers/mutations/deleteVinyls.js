import { prisma } from "../../../generated/prisma-client";


export default {
    Mutation: {
        deleteVinyls: async (obj, { input: { ids } }, { currentUser }) => {
            //   mustBeLoggedIn(currentUser);
            //    mustBeAtleastLevel(currentUser, UserLevels.ADMIN);
            //   let deleted = []
            // for (var i = 0; i < ids.length; i++) {
            //   deleted.push(await prisma.deleteVinyl({ id: ids[i] }))
            //}
            const deleted = await prisma.deleteManyVinyls({
                id_in: ids
            })

            console.log('** Vinyls delete **', deleted)
            return deleted
        }
    }
}