import { prisma } from "../../../generated/prisma-client";

export default {
    Query: {

        allVinyls: async (_, { input: { first, after, filter, sortBy } }) => {
            const where = filter ? {
                OR: [
                    { name_contains: filter.toLowerCase() },
                    { year_contains: filter.toLowerCase() }
                ]
            } : {}

            console.log('sort', sortBy)
            const all = await prisma.vinyls({
                where,
                first: first,
                after: after,
                orderBy: sortBy
            })

            return all
        },
    }
}

