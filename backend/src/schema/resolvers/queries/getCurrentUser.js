import { prisma } from "../../../generated/prisma-client";
import { mustBeLoggedIn } from "../../../helpers/auth";

export default {
    Query: {
        getCurrentUser: async (_, args, { currentUser }) => {
            mustBeLoggedIn(currentUser);

            const user = await prisma.user({ id: currentUser.id });

            return user;
        }
    }
};
