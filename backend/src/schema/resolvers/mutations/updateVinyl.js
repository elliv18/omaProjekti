import { prisma } from "../../../generated/prisma-client";

export default {
    Mutation: {

        updateVinyls: async (_, { input: { ids, name, forSale } }) => {
            const vinyl = await prisma.updateManyVinyls({
                data:
                {
                    name: name,
                    forSale: forSale
                },
                where: {
                    id_in: ids,
                },

            })

            console.log('Update vinyls*****', ids, vinyl)

            return vinyl
        }

    }
};

