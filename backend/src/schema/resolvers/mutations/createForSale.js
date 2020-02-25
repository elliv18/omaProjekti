import { prisma } from "../../../generated/prisma-client";
import { mustBeLoggedIn } from "../../../helpers/auth";
import { USE_AUTH } from "../../../environments";


export default {
    Mutation: {
        createForSale: async (_, { input: { vinyls, price } }, { currentUser }) => {
            if (USE_AUTH == 'true') {
                mustBeLoggedIn(currentUser)
            }
            if (vinyls.length === 0) {
                throw new Error("Anna vähintään yksi levy!")
            }

            console.log('createForSale', vinyls, price)
            var vinylTemp = []; // temp
            let temp = []

            vinyls.map(x => {
                temp.push({ id: x });
            });

            vinylTemp = { connect: temp }

            const forSale = await prisma.createForSale({
                vinyls: vinylTemp,
                price: price
            })

            return { forSale }
        }
    }
}