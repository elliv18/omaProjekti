import { prisma } from "../../generated/prisma-client";
import { mustBeLoggedIn } from "../../helpers/auth";
import { USE_AUTH } from "../../environments";


export default {
    Mutation: {
        createVinyl: async (_, args, { currentUser }, info) => {
            console.log('USE AUTH', USE_AUTH)
            if (USE_AUTH == 'true') {
                mustBeLoggedIn(currentUser)
            }

            var artists = []; // temp
            args.artists.map(x => {
                artists.push({ name: x });
            });
            return prisma.createVinyl(
                {
                    type: args.type,
                    name: args.name,
                    category: args.category,
                    year: args.year,
                    condition: args.condition,
                    artists: {
                        create: artists
                    }
                    /* author: {
                         connect: {
                             id: args.authorId,
                         },
                     },*/
                },
                info,
            )
        }
    }
}