import { prisma } from "../../../generated/prisma-client";

export default {
    Query: {

        allCategories: async (_, { input: { first, after, filter, sortBy } }) => {
            console.log('categories', filter)
            const where = filter ? {
                name_contains: filter.toLowerCase()
            } : {}
            const all = await prisma.categories({
                orderBy: sortBy,
                where,
                first: first,
                after: after
            })

            return all
        },
    }
}




