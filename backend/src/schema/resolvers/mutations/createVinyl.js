import { prisma } from "../../../generated/prisma-client";
import { mustBeLoggedIn } from "../../../helpers/auth";
import { USE_AUTH } from "../../../environments";


export default {
    Mutation: {
        createVinyl: async (_, { input: { name, year, type, category, condition, artists } }, { currentUser }, info) => {
            const dbArtists = await prisma.artists()
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
                    artists: artistsTemp
                    /* author: {
                         connect: {
                             id: authorId,
                         },
                     },*/
                },
                info,
            )
            return { vinyl }
        }
    }
}