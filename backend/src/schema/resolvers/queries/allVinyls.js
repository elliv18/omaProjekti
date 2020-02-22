import { prisma } from "../../../generated/prisma-client";

export default {
    Query: {

        allVinyls: async () => {
            return await prisma.vinyls()

        },
    }
}