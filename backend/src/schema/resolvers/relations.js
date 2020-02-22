import { prisma } from "../../generated/prisma-client";

export default {
    Vinyl: {
        async category(vinyl) {
            return await prisma.vinyl({ id: vinyl.id }).category()
        },
        async artists(vinyl) {
            return await prisma.vinyl({ id: vinyl.id }).artists()
        }
    }
};
