import { prisma } from "../../../generated/prisma-client";

export default {
    Query: {

        getUserById: async (_, { input: { id } }) => {
            const user = await prisma.user({
                id: id
            })

            return { user }
        },
    }
}