import { prisma } from "../../../generated/prisma-client";

export default {
    Query: {
        allForSale: async (_, { input: { first, after, filter } }) => {

            /*  const where = filter ? {
                  OR: [
                      { firstName_contains: filter.toLowerCase() },
                      { lastName_contains: filter.toLowerCase() }
                  ]
              } : {}*/
            const all = await prisma.forSales({
                //  where,
                first: first,
                after: after,
            })
            // console.log('ALL ARTIST **', after, first, all)
            console.log('*** FOR SALE ***', all)

            return all
        },


    }
}