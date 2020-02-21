import { prisma } from "../../../generated/prisma-client";
import { mustBeLoggedIn } from "../../../helpers/auth";
import { USE_AUTH } from "../../../environments";


export default {
    Mutation: {
        createForSale: async (_, { input: { vinyl, price } }, { currentUser }) => {
            if (USE_AUTH == 'true') {
                mustBeLoggedIn(currentUser)
            }
            if (vinyl.length === 0) {
                throw new Error("Anna vähintään yksi levy!")
            }
            var vinylTemp = []; // temp
            let temp = []

            vinyl.map(x => {
                temp.push({ id: x });
            });

            vinylTemp = { connect: temp }

            const forSale = await prisma.createForSale({
                vinyl: vinylTemp,
                price: price
            })

            return { forSale }
        }
    }
}