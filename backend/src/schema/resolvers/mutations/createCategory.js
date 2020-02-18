import { prisma } from "../../../generated/prisma-client";
import { mustBeLoggedIn } from "../../../helpers/auth";
import { USE_AUTH } from "../../../environments";


export default {
    Mutation: {
        createCategory: async (_, { input: { name } }, { currentUser }) => {
            console.log('USE AUTH', USE_AUTH)
            if (USE_AUTH == 'true') {
                mustBeLoggedIn(currentUser)
            }
            const category = await prisma.createCategory({
                name: name,
            })


            return { category }
        }
    }
}