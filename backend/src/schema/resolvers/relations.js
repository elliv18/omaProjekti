import { prisma } from "../../generated/prisma-client";

export default {
    Vinyl: {
        async category(vinyl) {
            return await prisma.vinyl({ id: vinyl.id }).category()
        },
        async artists(vinyl) {
            return await prisma.vinyl({ id: vinyl.id }).artists()
        },

        async sale(vinyl) {
            console.log('*** RELATIONS ***', vinyl)
            return await prisma.vinyl({ id: vinyl.id }).sale()
        }
    },

    Category: {
        async vinyls(category) {
            return await prisma.category({ id: category.id }).vinyls()
        }
    },

    Artist: {
        async vinyls(artist) {
            return await prisma.artist({ id: artist.id }).vinyls()
        }
    },

    ForSale: {
        async vinyls(forSale) {
            return await prisma.forSale({ id: forSale.id }).vinyls()
        }
    },


};
