import { prisma } from "../../../generated/prisma-client";

export default {
    Query: {

        getCounts: async () => {
            const vinylCount = await prisma.vinylsConnection().aggregate().count()
            const artistCount = await prisma.artistsConnection().aggregate().count()
            const categoryCount = await prisma.categoriesConnection().aggregate().count()

            return { vinylCount, artistCount, categoryCount }

        },
    }
}