import { prisma } from "../../../generated/prisma-client";

export default {
    Query: {
        allArtists: async (_, { input: { first, after, filter } }) => {

            const where = filter ? {
                name_contains: filter.toLowerCase()
            } : {}
            const all = await prisma.artists({
                where,
                first: first,
                after: after,
            })
            // console.log('ALL ARTIST **', after, first, all)

            return all
        },


    }
}