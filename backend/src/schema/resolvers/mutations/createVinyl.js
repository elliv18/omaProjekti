import { prisma } from "../../../generated/prisma-client";
import { mustBeLoggedIn } from "../../../helpers/auth";
import { USE_AUTH } from "../../../environments";


export default {
    Mutation: {
        createVinyl: async (_, { input: { name, year, type, category, condition, artists, forSale, price } }, { currentUser }, info) => {
            if (USE_AUTH == 'true') {
                mustBeLoggedIn(currentUser)
            }
            if (artists.length === 0) {
                throw new Error("Anna vähintään yksi artisti!")
            }
            var artistsTemp = []; // temp
            let temp = []

            artists.map(x => {
                temp.push({ name: x });
            });

            artistsTemp = { connect: temp }
            /*
                        if (forSale) {
                            const vinyl = await prisma.vinyl({ name: name })
                            await prisma.createForSale({
                                vinyl: vinyl.id,
                                price: price
                            })
                        }*/


            const vinyl = await prisma.createVinyl(
                {
                    type: type,
                    name: name,
                    category: {
                        connect: {
                            id: category
                        }
                    },
                    year: year,
                    condition: condition,
                    artists: artistsTemp,
                    forSale: forSale
                },
                info,
            )
            return { vinyl }
        }
    }
}