import { prisma } from "../../generated/prisma-client";
import { mustBeLoggedIn } from "../../helpers/auth";
import { USE_AUTH } from "../../environments";


export default {
    Mutation: {
        createCategory: async (_, args, { currentUser }, info) => {
            console.log('USE AUTH', USE_AUTH)
            if (USE_AUTH == 'true') {
                mustBeLoggedIn(currentUser)
            }

            return prisma.createCategory(
                {
                    name: args.name,
                },
                info,
            )
        }
    }
}