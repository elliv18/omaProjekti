import { prisma } from "../../../generated/prisma-client";

export default {
    Query: {
        allArtists: async (_, { input: { first, after } }) => {
            const all = await prisma.artists({
                first: first,
                after: after
            })
            // console.log('ALL ARTIST **', after, first, all)

            return all
        },


    }
}