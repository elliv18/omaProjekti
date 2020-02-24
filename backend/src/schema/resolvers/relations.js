import { prisma } from "../../generated/prisma-client";

export default {
    Vinyl: {
        async category(vinyl) {
            return await prisma.vinyl({ id: vinyl.id }).category()
        },
        async artists(vinyl) {
            return await prisma.vinyl({ id: vinyl.id }).artists()
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
    }
};
