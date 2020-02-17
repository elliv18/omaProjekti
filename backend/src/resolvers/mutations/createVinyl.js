import { prisma } from "../../generated/prisma-client";
import { mustBeLoggedIn } from "../../helpers/auth";
import { USE_AUTH } from "../../environments";


export default {
    Mutation: {
        createVinyl: async (_, args, { currentUser }, info) => {
            const dbArtists = await prisma.artists()
            if (USE_AUTH == 'true') {
                mustBeLoggedIn(currentUser)
            }
            if (args.artists.length === 0) {
                throw new Error("Anna vähintään yksi artisti!")
            }
            var artists = []; // temp


            if (dbArtists.length === 0) {
                console.log("eka kerta")
                let temp = []
                args.artists.map(x => {
                    temp.push({ name: x });
                });

                artists = { create: temp }
            }
            else {
                let createArtists = []
                let connectArtists = []
                await args.artists.map(row => {
                    let x = prisma.artist({ name: row }).name()
                    console.log('x', x, 'row', row)

                    if (x === null) {
                        console.log('IF')
                        createArtists.push({ name: row })
                    }
                    else {
                        console.log('else')
                        connectArtists.push({ name: row })
                    }

                })

                artists = { create: createArtists, connect: connectArtists }
                console.log('toka kerta', 'array', artists)

            }


            console.log('Artists', artists)
            return prisma.createVinyl(
                {
                    type: args.type,
                    name: args.name,
                    category: {
                        connect: {
                            id: args.category
                        }
                    },
                    year: args.year,
                    condition: args.condition,
                    artists: artists
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