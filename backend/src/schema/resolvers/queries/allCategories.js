import { prisma } from "../../../generated/prisma-client";

export default {
    Query: {

        allCategories: async () => {
            return await prisma.categories()
        },
    }
}